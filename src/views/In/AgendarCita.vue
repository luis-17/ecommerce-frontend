<template lang="pug">
  .page.cita
    .container-fluid
      .row
        section.box-filtros(:class='paso1')
          form(
            novalidate=''
            data-vv-scope='formDatosCita')
            .row
              .col-12
                h4 <strong>PASO 1:</strong> Selecciones Filtros
              .col-12
                k-select(
                  :label='"LA CITA ES PARA:"'
                  :placeholder='"LA CITA ES PARA:"'
                  :data-vv-as='"LA CITA ES PARA:"'
                  name='idcliente'
                  v-validate='"required"'
                  :error='errors.first("formDatosCita.idcliente")'
                  v-model='formDatosCita.idcliente'
                  :options='pacientes')
              .col-12
                k-select(
                  :label='"SELECCIONE LA ESPECIALIDAD"'
                  :placeholder='"SELECCIONE LA ESPECIALIDAD"'
                  :data-vv-as='"SELECCIONE LA ESPECIALIDAD"'
                  name='idespecialidad'
                  v-validate='"required"'
                  :error='errors.first("formDatosCita.idespecialidad")'
                  v-model='formDatosCita.idespecialidad'
                  :options='especialidades')
              .col-12
                k-select(
                  :label='"SELECCIONE MÉDICO"'
                  :placeholder='"SELECCIONE MÉDICO"'
                  :data-vv-as='"SELECCIONE MÉDICO"'
                  name='idmedico'
                  v-validate='"required"'
                  :error='errors.first("formDatosCita.idmedico")'
                  v-model='formDatosCita.idmedico'
                  :options='medicos')
              .col-12
                k-select(
                  :label='"SELECCIONE CONVENIO"'
                  :placeholder='"SELECCIONE CONVENIO"'
                  :data-vv-as='"SELECCIONE CONVENIO"'
                  name='idgarante'
                  v-validate='"required"'
                  :error='errors.first("formDatosCita.idgarante")'
                  v-model='formDatosCita.idgarante'
                  :options='garantes')
              //- k-button-layout.mt-3
              //-   k-button(type='submit') PROCESAR
        section.box-calendario(:class='paso2')
          h4 <strong> PASO 2: </strong> Elija su turno
          .box-wrapper-calendario
            .box-content-calendario
              .box-title-mes
                p {{ arrCalendario.mes }}
                .box-paginate
                  .icon.icon-prev(@click='onPrevPeriodo')
                    img(src='@/assets/images/icons/left-arrow.png')
                  .icon.icon-next(@click='onNextPeriodo')
                    img(src='@/assets/images/icons/right-arrow.png')
              .box-title-semana
                .item-semana.feriado Dom.
                .item-semana Lun.
                .item-semana Mar.
                .item-semana Mie.
                .item-semana Jue.
                .item-semana Vie.
                .item-semana Sab.
              .box-dias
                .box-row(v-for='(row, index) in arrCalendario.calendario')
                  .box-dia( @click='openDialogTurno(rowDet.fecha,rowDet.class, indexDet, index)' v-bind:class='[rowDet.class]' v-for='(rowDet, indexDet) in row') {{ rowDet.dia }}
            .box-leyenda
              .box-item-leyenda
                .box-cuadro.active
                .box-label DISPONIBLE
              .box-item-leyenda
                .box-cuadro.disabled
                .box-label NO DISPONIBLE
              .box-item-leyenda
                .box-cuadro.selected
                .box-label SELECCIONADO
        section.box-confirmacion(:class='paso3')
          h4 <strong> PASO 3: </strong> Confirmación
          .box-resumen
            .box-group
              .box-label PACIENTE:
              p {{ formDatosCita.paciente }}
            .box-group
              .box-label ESPECIALIDAD:
              p {{ formDatosCita.especialidad }}
            .box-group
              .box-label MÉDICO:
              p {{ formDatosCita.medico }}
            .box-group
              .box-label CONVENIO: 
              p {{ formDatosCita.garante }}
            .box-group
              .box-label FECHA/TURNO
              p {{ formDatosCita.fecha_cita }} / {{ formDatosCita.horaCita }}
          .box-action
            k-button(type='button' @click='confirmarCita') CONFIRMAR CITA
      eleccion-turno(
        :show.sync='isModalTurno'
        :selectedFecha='formDatosCita.fecha_cita'
        :textTitle='"Seleccione la hora deseada"'
        :arrHorario='arrHorario'
        @elegirCita='onElegirCita')
      confirm(
        :show.sync='showConfirm'
        :textTitle='"¿Está seguro de reservar la cita?"'
        @confirm='onConfirm')

</template>

<script>
import moment from 'moment-timezone';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

import Confirm from '@/views/In/Components/Confirm.vue';
import EleccionTurno from '@/views/In/Components/EleccionTurno.vue';
export default {
  name: 'AgendarCita',
  dependencies: ['AccountService', 'GenericService'],
  components: {
    Confirm,
    EleccionTurno,
  },
  data: () => ({
    paso1: 'section-active',
    paso2: 'section-inactive',
    paso3: 'section-inactive',
    showConfirm: false,
    isModalTurno: false,
    pacientes: [],
    especialidades: [],
    medicos: [],
    garantes: [],
    arrHorario: [],
    arrCalendario: {
      mes: null,
      periodoAnterior: null,
      periodoSiguiente: null,
      calendario: [],
      // idxSelected: null,
      // idxDetSelected: null,
    },
    formDatosCita: {
      paciente: null,
      idcliente: null,
      idmedico: null,
      medico: null,
      idespecialidad: null,
      especialidad: null,
      garante: null,
      idgarante: null,
      idhorario: null,
      hora_inicio: null,
      hora_fin: null,
      duracionCita: null,
      fecha_cita: null,
      horaCita: null,
      periodoActual: (moment().format('Y') + moment().format('MM')).toString(),
    },
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    // ...mapGetters({
    //   user: accountTypes.getters.getUser,
    // }),
    isSelectedFecha(row){
      return this.formDatosCita.fecha_cita === row.fecha;
    },
  },
  watch: {
    $route: 'fetchData',
    'formDatosCita.idcliente': function (newValue) {
      const findPaciente = this.pacientes.find(e => e.value === newValue);
      if (findPaciente) {
        this.formDatosCita.paciente = findPaciente.raw.paciente;
      }
    },
    'formDatosCita.idespecialidad': async function (newValue) {
      // console.log(newValue, 'newValue especialidad');
      // console.log(parseInt(newValue), 'parseInt(newValue) ');
      const findEspec = this.especialidades.find(e => e.value === parseInt(newValue));
      // console.log(findEspec, 'findEspec');
      // console.log(findEspec.raw, 'findEspec.raw');
      if (findEspec) {
        this.formDatosCita.especialidad = findEspec.raw.descripcion;
      }
      // cargamos medicos
      try {
        this.$wait.start('global');
        this.formDatosCita.idmedico = null;
        this.formDatosCita.medico = null;
        await this.loadMedicosPorEsp();
        await Vue.nextTick();
        this.errors.remove('idmedico', 'formDatosCita');
      } catch (err) {
        this.$swal({ type: err.type, text: err.message });
      } finally {
        this.$wait.end('global');
      }
    },
    'formDatosCita.idmedico': async function (newValue) {
      const findMedico = this.medicos.find(e => e.value === parseInt(newValue));
      if (findMedico) {
        this.formDatosCita.medico = findMedico.raw.descripcion;
      }
      // cargamos programaciones
      try {
        this.$wait.start('global');
        // this.formDatosCita.idmedico = null;
        // this.formDatosCita.medico = null;
        // if(this.formDatosCita.idmedico){
        await Vue.nextTick();
        await this.loadFechasProgramadas();
        // }
       
        // await Vue.nextTick();
        // this.errors.remove('idmedico', 'formDatosCita');
      } catch (err) {
        this.$swal({ type: err.type, text: err.message });
      } finally {
        this.$wait.end('global');
      }
    },
    'formDatosCita.idgarante': function (newValue) {
      const findGarante = this.garantes.find(e => e.value === newValue);
      if (findGarante) {
        this.formDatosCita.garante = findGarante.raw.descripcion_gar;
      }
    },
    'formDatosCita.periodoActual': async function (newValue, oldValue) {
      // cargamos programaciones
      try {
        this.$wait.start('global');
        this.formDatosCita.idmedico = null;
        this.formDatosCita.medico = null;
        await this.loadMedicosPorEsp();
        await Vue.nextTick();
        this.errors.remove('idmedico', 'formDatosCita');
      } catch (err) {
        this.$swal({ type: err.type, text: err.message });
      } finally {
        this.$wait.end('global');
      }
    },
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_paciente',
          });
          if (data) {
            this.pacientes = data.datos.map(d => ({
              value: d.id,
              text: d.paciente,
              raw: d,
            }));
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_especialidades',
          });
          if (data) {
            this.especialidades = data.datos.map(d => ({
              value: d.idespecialidad,
              text: d.descripcion,
              raw: d,
            }));
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_garante',
          });
          if (data) {
            this.garantes = data.datos.map(d => ({
              value: d.idgarante,
              text: d.descripcion_gar,
              raw: d,
            }));
          }
        }
        {
          const { datos } = await this.GenericService.store({
            uri: 'platform/cargar_fechas_mock',
          });
          if (datos) {
            this.arrCalendario.mes = datos.mes;
            this.arrCalendario.periodoAnterior = datos.periodoAnterior;
            this.arrCalendario.periodoSiguiente = datos.periodoSiguiente;
            this.arrCalendario.calendario = datos.calendario;
          }
        }
      },
      async onConfirm() {
        this.formDatosCita.fecha_cita = moment(this.formDatosCita.fecha_cita,'DD-MM-YYYY').format('YYYY-MM-DD');
        const { flag } = await this.GenericService.store({
          uri: 'platform/registrar_cita',
          data: {
            ...this.formDatosCita,
          },
        });
        // console.log(flag, 'flagflagflag');
        if(flag === 1){
          this.$swal({ type: 'success', text: 'Se registró la cita correctamente', timer: 3000 }).then(() => {
            this.$router.push({ name: 'HistorialCitas' });
          });
        }
        if(flag === 0){
          this.$swal({ type: 'error', text: 'Ocurrió un error al registrar la cita. Inténtelo nuevamente.', timer: 3000 });
          return;
        }
        
      },
      async confirmarCita() {
        if(!this.formDatosCita.idcliente){
          this.$swal({ type: 'warning', text: 'Falta seleccionar paciente' });
          return;
        }
        if(!this.formDatosCita.idgarante){
          this.$swal({ type: 'warning', text: 'Falta seleccionar convenio' });
          return;
        }
        if(!this.formDatosCita.idhorario){
          this.$swal({ type: 'warning', text: 'Falta seleccionar horario' });
          return;
        }
        this.showConfirm = true;
      },
      async onElegirCita(params) {
        // console.log(params, 'params aqui horariooo');
        const strInicio = this.timeToDecimal(params.turno.hora_inicio);
        const strFin = this.timeToDecimal(params.turno.hora_fin);
        const strDuracionCita = (strFin - strInicio) * 60;
        this.formDatosCita.hora_inicio = params.turno.hora_inicio;
        this.formDatosCita.horaCita = params.turno.hora_inicio;
        this.formDatosCita.idhorario = params.turno.idhorario;
        this.formDatosCita.hora_fin = params.turno.hora_fin;
        this.formDatosCita.duracionCita = strDuracionCita;
        this.paso3 = 'section-active';
      },
      async openDialogTurno(fecha, clase, idx, idxParent) {
        // console.log(idx, 'idx');
        // console.log(clase.trim(), 'clase.trim()');
        if(!(clase.includes('active'))){
          return false;
        }
        try{
          this.$wait.start('global');
          await Vue.nextTick();
          this.formDatosCita.fecha_cita = fecha;
          this.arrCalendario.calendario.map((rowParent,index) => {
            rowParent.map((rowChild, indexChild) => {
              if(this.arrCalendario.calendario[index][indexChild].class.includes('selected')){
                this.arrCalendario.calendario[index][indexChild].class = 'active';
              }
            });
          });
          this.arrCalendario.calendario[idxParent][idx].class = this.arrCalendario.calendario[idxParent][idx].class + ' selected';
          this.isModalTurno = true;
          const { datos } = await this.GenericService.store({
            uri: 'platform/cargar_horario',
            data: {
              idespecialidad: this.formDatosCita.idespecialidad,
              idmedico: this.formDatosCita.idmedico,
              fecha: this.formDatosCita.fecha_cita,
            },
          });
          if (datos) {
            this.arrHorario = datos;
          }
        }catch (err) {
          this.$swal({ type: err.type, text: err.message });
          this.arrHorario = [];
          this.isModalTurno = false;
          this.arrCalendario.calendario[idxParent][idx].class = ' active';
          this.formDatosCita.fecha_cita = null;
          this.formDatosCita.hora_inicio = null;
          this.formDatosCita.horaCita = null;
          this.formDatosCita.idhorario = null;
          this.formDatosCita.hora_fin = null;
          this.formDatosCita.duracionCita = null;
        }finally{
          this.$wait.end('global');
        }
      },
    }),
    // async openConfirmAnularCita(idcita) {
    //   this.showConfirm = !this.showConfirm;
    //   this.selectedIdCita = idcita;
    // },
    async loadMedicosPorEsp() {
      // console.log();
      try{
        this.$wait.start('global');
        const { datos } = await this.GenericService.store({
          uri: 'platform/cargar_medicos_por_especialidad',
          data: {
            idespecialidad: this.formDatosCita.idespecialidad,
            periodo: this.formDatosCita.periodoActual,
          },
        });
        await Vue.nextTick();
        this.medicos = datos.map(d => ({
          value: d.idmedico,
          text: d.descripcion,
          raw: d,
        }));
        setTimeout(() => this.formDatosCita.idmedico = this.medicos[0].value, 10);
        // ;
        this.paso2 = 'section-active';
      } catch (err) {
        this.$swal({ type: err.type, text: err.message });
        this.medicos = [];
        const mockDatos = await this.GenericService.store({
          uri: 'platform/cargar_fechas_mock',
          data: {
            periodo: this.formDatosCita.periodoActual,
          },
        });
        if (mockDatos.datos) {
          this.arrCalendario.mes = mockDatos.datos.mes;
          this.arrCalendario.periodoAnterior = mockDatos.datos.periodoAnterior;
          this.arrCalendario.periodoSiguiente = mockDatos.datos.periodoSiguiente;
          this.arrCalendario.calendario = mockDatos.datos.calendario;
        }
      } finally {
        this.$wait.end('global');
      }
      
      // console.log('antes');
      // if (datos && flag === 1) {
      //   console.log(datos, flag, 'datos, flag');
      //   this.medicos = datos.map(d => ({
      //     value: d.idmedico,
      //     text: d.descripcion,
      //     raw: d,
      //   }));
      //   this.formDatosCita.idmedico = this.medicos[0].value;
      // }else{
      //   console.log('elsee xd');
      //   this.medicos = [];
      // }
    },
    async loadFechasProgramadas() {
      if(!this.formDatosCita.idmedico){
        return;
      }
      const { datos } = await this.GenericService.store({
        uri: 'platform/cargar_fechas_programadas',
        data: {
          idespecialidad: this.formDatosCita.idespecialidad,
          periodo: this.formDatosCita.periodoActual,
          idmedico: this.formDatosCita.idmedico,
        },
      });
      if (datos) {
        this.arrCalendario.mes = datos.mes;
        this.arrCalendario.periodoAnterior = datos.periodoAnterior;
        this.arrCalendario.periodoSiguiente = datos.periodoSiguiente;
        this.arrCalendario.calendario = datos.calendario;
      }
    },
    async onPrevPeriodo(){
      this.formDatosCita.periodoActual = this.arrCalendario.periodoAnterior;
      
    },
    async onNextPeriodo(){
      this.formDatosCita.periodoActual = this.arrCalendario.periodoSiguiente;
    },
    timeToDecimal(time) {
      const hoursMinutes = time.split(':');
      const hours = parseInt(hoursMinutes[0], 10);
      const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
    }
  },
};
</script>

<style lang="scss" scoped="">

  $primary: #003d71;
  $accent: #829723;
  $warn: red;
  $suplem: #21b8c6;
  /* Cita page */
  .page.cita{
    padding-top: 4rem;
    margin: 0 0.75rem;
  }
  .page.cita .row{
      justify-content: center;
  }
  .page.cita .box-filtros{
      padding: 16px 22px;
      border: 1px solid $accent;
      border-radius: 20px 0 20px 0;
      width: 285px;
  }
  .page.cita .box-filtros .mat-form-field{
      width: 100%;
  }
  .page.cita .box-filtros h4{
      font-weight: 400;
      color: $suplem;
      font-size: 18px;
      margin-bottom: 12px;
  }
  .page.cita .box-filtros h4 strong{
      font-size: 22px;
  }
  .page.cita .box-filtros .form-group{
      margin-bottom: 0.2rem;
  }
  .page.cita .box-filtros button{
      width: 100%;
      margin-top: 12px;
  }
  .page.cita section.section-active{
      border: 2px solid #829723;
  }
  .page.cita section.section-inactive{
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
  }
  .page.cita .box-calendario{
      margin: 0 24px;
      padding: 16px 22px;
      border: 1px solid $accent;
      border-radius: 20px 0 20px 0;
  }
  .page.cita .box-calendario .box-content-calendario{
    min-width: 310px;
  }
  .page.cita .box-calendario .box-wrapper-calendario{
      overflow: auto;
  }
  .page.cita .box-calendario h4{
      font-weight: 400;
      color: $suplem;
      font-size: 18px;
      margin-bottom: 12px;
  }
  .page.cita .box-calendario h4 strong{
      font-size: 22px;
  }
  .page.cita .box-calendario .box-title-mes{
      position: relative;
      display: block;
      height: 100%;
  }
  .page.cita .box-calendario .box-title-mes p{
      text-align: center;
      font-size: 20px;
      text-transform: uppercase;
      margin: 0;
  }
  .page.cita .box-calendario .box-title-mes .icon{
      -webkit-transition: all 0.25s;
      -moz-transition: all 0.25s;
      -o-transition: all 0.25s;
      -ms-transition: all 0.25s;
      transition: all 0.25s;
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: $suplem;
      background-color: $primary;
      color: white;
      border-radius: 50%;
      padding: 2px;
      cursor: pointer;
      width: 28px;
      height: 28px;
  }
  .page.cita .box-calendario .box-title-mes .icon img{
    width: 16px;
    margin-left: -1px;
  }
  .page.cita .box-calendario .box-title-mes .icon:hover{
      background-color: $accent;
  }
  .page.cita .box-calendario .box-title-mes .icon-prev{
      left: 0;
  }
  .page.cita .box-calendario .box-title-mes .icon-next{
      right: 0;
  }
  .page.cita .box-calendario .box-title-mes .icon-next img{
    margin-left: 1px;
  }
  .page.cita .box-calendario .box-title-semana{
      display: flex;
      text-transform: uppercase;
      justify-content: center;
      padding-top: 12px;
  }
  .page.cita .box-calendario .box-title-semana .item-semana{
      width: 45px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 4px;
  }
  .page.cita .box-calendario .box-title-semana .item-semana.feriado{
      color: red;
  }
  .page.cita .box-calendario .box-dias .box-row {
      display: flex;
      justify-content: center;
  }
  .page.cita .box-calendario .box-dias .box-row .box-dia{
      width: 45px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid;
      border-radius: 4px;
      margin: 4px;
      opacity: 0.45;
      cursor: not-allowed;
  }
  .page.cita .box-calendario .box-dias .box-row .box-dia.active:hover{
      background-color: #879b2c;
      color: white;
      border: 1px solid white;
      font-size: 16px;
  }
  .page.cita .box-calendario .box-dias .box-row .box-dia.active{
      border: 1px solid $suplem;
      opacity: 1;
      cursor: pointer;
      background-color: #c0f0f4;
      font-weight: 600;
      color: $primary;
  }
  .page.cita .box-calendario .box-dias .box-row .box-dia.active.selected{
      background-color: #879b2c;
      color: white;
      border: 1px solid white;
      font-size: 16px;
  }
  .page.cita .box-leyenda .box-cuadro{
      width: 35px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid;
      border-radius: 4px;
      margin: 4px;
      opacity: 0.45;
      cursor: not-allowed;
  }
  .page.cita .box-leyenda{
      display: flex;
      justify-content: space-between;
  }
  .page.cita .box-leyenda .box-item-leyenda{
      display: flex;
      align-items: center;
  }
  .page.cita .box-leyenda .box-cuadro.active{
      border: 1px solid $suplem;
      opacity: 1;
      cursor: pointer;
      background-color: #c0f0f4;
      font-weight: 600;
      color: $primary;
  }
  .page.cita .box-leyenda .box-cuadro.selected{
      background-color: #879b2c;
      color: white;
      border: 1px solid white;
      font-size: 16px;
      opacity: 1;
  }
  .page.cita .box-confirmacion{
      padding: 16px 22px;
      border: 1px solid $accent;
      border-radius: 20px 0 20px 0;
  }
  .page.cita .box-confirmacion .box-resumen{
      font-size: 16px;
  }
  .page.cita .box-confirmacion h4{
      font-weight: 400;
      color: $suplem;
      font-size: 18px;
      margin-bottom: 12px;
  }
  .page.cita .box-confirmacion h4 strong{
      font-size: 22px;
  }
  .page.cita .box-confirmacion .box-group .box-label{
      margin: 0;
      font-weight: bold;
      // color: $primary;
  }
  .page.cita .box-confirmacion .box-group p{
      // color: $accent;
      font-weight: 300;
      margin-bottom: 0.5rem;
      font-size: 15px;
      line-height: 1.15;
  }
  .page.cita .box-confirmacion button{
    width: 100%;
    min-width: 100%;
  }
  .page.cita .box-confirmacion .box-action{
      padding-top: 10px;
  }
  @media (max-width: 1199px){
    .page.cita .box-filtros{
      width: 22%;
    }
    .page.cita .box-confirmacion{
      min-width: 22%;
    }
    .page.cita .box-confirmacion .box-group p{
      max-width: 200px;
    }
  }
  @media only screen and (max-width: 992px){
    .page.cita {
      padding-top: 40px;
      margin-right: 65px;
    }
    .page.cita section.section-active{
        width: 80%;
        margin-bottom: 20px;
    }
    .page.cita section.section-inactive{
        width: 80%;
        margin-bottom: 20px;
    }
    .page.cita section.section-inactive{
        width: 80%;
        margin-bottom: 20px;
    }
    .page.cita section.section-active{
        width: 94%;
    }
    .page.cita section.section-inactive{
        width: 94%;
    }
    .page.cita section.section-inactive{
        width: 94%;
    }
  }
  @media (max-width: 768px){ /* 768 a 577 */
    .page.cita{
      margin-left: 0;
    }
    .page.cita section.box-calendario{
      margin: 0;
    }
    .page.cita .box-confirmacion{
      margin-top: 1rem;
    }
  }
  @media (max-width: 576px) { /*576 a 376*/
    // .page.cita .box-leyenda{
    //   display: block;
    // }
    .page.cita .box-leyenda .box-item-leyenda{
      display: block;
    }
    .page.cita .box-leyenda .box-cuadro{
      margin: auto;
    }
    .page.cita .box-item-leyenda .box-label{
      font-size: 12px;
    }
    .page.cita .box-filtros{
      width: 100%;
      margin: 0 0.5rem;
    }
    .page.cita .box-calendario{
      width: 100%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    .page.cita .box-confirmacion{
      width: 100%;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    // .page.cita section.section-active{
    //   width: 100%;
    // }
  }
  @media (max-width: 375px) {
    
  }
</style>