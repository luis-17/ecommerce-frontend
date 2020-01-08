<template lang="pug">
  .page-perfil
    .container-fluid
      .row
        .box-sidebar
          .box-content-foto
            .box-foto
              a.link-foto(href='javascript:void(0)')
                img(src='@/assets/images/default.jpg')
              //- a.popup-foto(href='javascript:void(0)' @click='')
              //-   img.mat-icon(src='@/assets/images/photo-camera.png')
              //- input.inputFoto
            .box-info
              h3 ¡Bienvenido {{ user.nombres }}!
          .box-content-menu
            .box-item(@click='verToggleSection("DP")')
              a(href='javascript:void(0)')
                .mat-icon 
                span DATOS PERSONALES
            .box-item(@click='verToggleSection("PF")')
              a(href='javascript:void(0)')
                .mat-icon 
                span PERFIL CLÍNICO
            .box-item(@click='verToggleSection("FA")')
              a(href='javascript:void(0)')
                .mat-icon 
                span FAMILIARES
        .box-content
          .tab.tab-personales(v-show='boolDatosPersonales')
            .box-header
              h3 Edita tu información personal
            .box-form
              form(
                novalidate=''
                @submit.prevent='onDatosPerfilPaciente'
                data-vv-scope='formDatosPerfilPaciente')
                .row
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Nombres"'
                      :placeholder='"Nombres"'
                      :data-vv-as='"Nombres"'
                      name='nombres'
                      maxlength='255'
                      v-validate='"required|max:255"'
                      :error='errors.first("formDatosPerfilPaciente.nombres")'
                      v-model.trim='formDatosPerfilPaciente.nombres'
                      :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Apellido Paterno"'
                      :placeholder='"Apellido Paterno"'
                      :data-vv-as='"Apellido Paterno"'
                      name='apellido_paterno'
                      maxlength='255'
                      v-validate='"required|max:255"'
                      :error='errors.first("formDatosPerfilPaciente.apellido_paterno")'
                      v-model.trim='formDatosPerfilPaciente.apellido_paterno'
                      :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Apellido Materno"'
                      :placeholder='"Apellido Materno"'
                      :data-vv-as='"Apellido Materno"'
                      name='apellido_materno'
                      maxlength='255'
                      v-validate='"required|max:255"'
                      :error='errors.first("formDatosPerfilPaciente.apellido_materno")'
                      v-model.trim='formDatosPerfilPaciente.apellido_materno'
                      :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Correo Electrónico"'
                      :placeholder='"Correo Electrónico"'
                      :data-vv-as='"Correo Electrónico"'
                      name='correo'
                      maxlength='255'
                      v-validate='"required|email"'
                      :error='errors.first("formDatosPerfilPaciente.correo")'
                      v-model.trim='formDatosPerfilPaciente.correo')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      v-mask='"#########"'
                      :label='"Celular"'
                      :placeholder='"Celular"'
                      :data-vv-as='"Celular"'
                      name='telefono'
                      maxlength='9'
                      v-validate='"required|numeric|min:9|max:9"'
                      :error='errors.first("formDatosPerfilPaciente.telefono")'
                      v-model.trim='formDatosPerfilPaciente.telefono')
                  h4.col-lg-12.col-md-6.mt-3.m-0 Datos Adicionales
                  .col-lg-6.col-md-6.col-sm-12
                    label.ml-2.mt-2.mb-0 Tipo de Documento
                    strong.block.ml-2 {{ formDatosPerfilPaciente.tipo_documento }}
                    //- k-select(
                    //-   :label='"Tipo de Documento"'
                    //-   :placeholder='"Tipo de Documento"'
                    //-   :data-vv-as='"Tipo de Documento"'
                    //-   name='tipo_documento'
                    //-   v-validate='"required"'
                    //-   :error='errors.first("formDatosPerfilPaciente.tipo_documento")'
                    //-   v-model='formDatosPerfilPaciente.tipo_documento'
                    //-   :options='tiposDocumentos'
                    //-   :readonly='comboReadOnly')
                  .col-lg-6.col-md-6.col-sm-12
                    label.ml-2.mt-2.mb-0 Número de Documento
                    strong.block.ml-2 {{ formDatosPerfilPaciente.numero_documento }}
                    //- k-input(
                    //-   mask='########'
                    //-   :label='"Número de Documento"'
                    //-   :placeholder='"Número de Documento"'
                    //-   :data-vv-as='"Número de Documento"'
                    //-   name='numero_documento'
                    //-   maxlength='8'
                    //-   v-validate='{ required: true, min: 8, max: 8 }'
                    //-   :error='errors.first("formDatosPerfilPaciente.numero_documento")'
                    //-   v-model.trim='formDatosPerfilPaciente.numero_documento'
                    //-   :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    label.ml-2.mt-2.mb-0 Sexo
                    strong.block.ml-2 {{ obtenSexo }}
                    //- k-select(
                    //-   :label='"Sexo"'
                    //-   :placeholder='"Sexo"'
                    //-   :data-vv-as='"Sexo"'
                    //-   name='sexo'
                    //-   v-validate='"required"'
                    //-   :error='errors.first("formDatosPerfilPaciente.sexo")'
                    //-   v-model='formDatosPerfilPaciente.sexo'
                    //-   :options='sexos'
                    //-   :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    label.ml-2.mt-2.mb-0 Fecha de Nacimiento
                    strong.block.ml-2 {{ formDatosPerfilPaciente.fecha_nacimiento }}
                    //- k-input(
                    //-   type='date'
                    //-   :label='"Fecha de Nacimiento"'
                    //-   :placeholder='"Fecha de Nacimiento"'
                    //-   :data-vv-as='"Fecha de Nacimiento"'
                    //-   name='fecha_nacimiento'
                    //-   maxlength='10'
                    //-   v-validate='"required"'
                    //-   :error='errors.first("formDatosPerfilPaciente.fecha_nacimiento")'
                    //-   v-model.trim='formDatosPerfilPaciente.fecha_nacimiento'
                    //-   :readonly='true')
                  k-button-layout.mt-3
                    k-button(type='submit') Actualizar Datos
          .tab.tab-clinico(v-show='boolDatosClinicos')
            .box-header
              h3 Edita tu perfil clínico
            .box-perfil-content
              .box-perfil
                .box-item
                  img(src='@/assets/images/perfil/peso.png' alt='Peso')
                  .box-item-rpta
                    span.pre-valor PESO
                    span.valor {{ fPerfil.peso }}
                    span.post-valor Kg.
                .box-item
                  img(src='@/assets/images/perfil/talla.png' alt='Estatura')
                  .box-item-rpta
                    span.pre-valor ESTATURA
                    span.valor {{ fPerfil.estatura }}
                    span.post-valor Mt.
                .box-item
                  img(src='@/assets/images/perfil/imc.png' alt='IMC')
                  .box-item-rpta
                    span.pre-valor IMC
                    span.valor {{ fPerfil.imc }}
                .box-item
                  img(src='@/assets/images/perfil/sangre.png' alt='Tipo de Sangre')
                  .box-item-rpta
                    span.pre-valor TIPO DE SANGRE
                    span.valor {{ fPerfil.tipo_sangre }}
                .box-item
                  img(src='@/assets/images/perfil/sexo.png' alt='Sexo')
                  .box-item-rpta
                    span.pre-valor GÉNERO
                    span.valor {{ fPerfil.sexo }}
                .box-item
                  img(src='@/assets/images/perfil/edad.png' alt='Edad')
                  .box-item-rpta
                    span.pre-valor EDAD
                    span.valor {{ fPerfil.edad }}
                    span.post-valor AÑOS
            .box-form
              form(
                novalidate=''
                @submit.prevent='onDatosPerfilClinico'
                data-vv-scope='formDatosPerfilClinico')
                .row
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Peso (en kg.)"'
                      :placeholder='"Peso"'
                      :data-vv-as='"Peso"'
                      name='peso'
                      maxlength='3'
                      v-validate='"required|min:1|max:3|numeric"'
                      :error='errors.first("formDatosPerfilClinico.peso")'
                      v-model.trim='formDatosPerfilClinico.peso')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Estatura (en cm.)"'
                      :placeholder='"Estatura"'
                      :data-vv-as='"Estatura"'
                      name='estatura'
                      maxlength='3'
                      v-validate='"required|max:3|numeric"'
                      :error='errors.first("formDatosPerfilClinico.estatura")'
                      v-model.trim='formDatosPerfilClinico.estatura')
                  .col-lg-6.col-md-6.col-sm-12
                    k-select(
                      :label='"Tipo de Sangre"'
                      :placeholder='"Tipo de Sangre"'
                      :data-vv-as='"Tipo de Sangre"'
                      name='tipo_sangre'
                      v-validate='"required"'
                      :error='errors.first("formDatosPerfilClinico.tipo_sangre")'
                      v-model.trim='formDatosPerfilClinico.tipo_sangre'
                      :options='tiposDeSangre')
                  .col-lg-6.col-md-6.col-sm-12
                    k-input(
                      :label='"Edad"'
                      :placeholder='"Edad"'
                      :data-vv-as='"Edad"'
                      name='edad'
                      v-validate='"required"'
                      :error='errors.first("formDatosPerfilClinico.edad")'
                      v-model.trim='formDatosPerfilClinico.edad'
                      :readonly='true')
                  .col-lg-6.col-md-6.col-sm-12
                    k-select(
                      :label='"Sexo"'
                      :placeholder='"Sexo"'
                      :data-vv-as='"Sexo"'
                      name='sexo'
                      v-validate='"required"'
                      :error='errors.first("formDatosPerfilClinico.sexo")'
                      v-model.trim='formDatosPerfilClinico.sexo'
                      :options='sexos')
                  k-button-layout.mt-3
                    k-button(type='submit') Actualizar Datos
          .tab.tab-familiar(v-show='boolDatosFamiliares')
            .box-header
              h3 Gestionar familiares
            .box-list
              k-button(type='button' @click='$router.push({ name: "RegistrarFamiliar", params: {edit: false, origin: "PerfilPaciente"} })') AGREGAR FAMILIAR
              .table-responsive
                table.table.table-condensed.table-hover
                  thead
                    tr
                      th N° DOC.
                      th FAMILIAR
                      th PARENTESCO
                      th FECHA NAC.
                      th ACCIÓN
                  tbody(v-for='(row, index) in arrFamiliares')
                    tr
                      td {{ row.numero_documento }}
                      td {{ row.nombre_completo }}
                      td {{ row.descripcion_par }}
                      td {{ row.fecha_nacimiento }}
                      td.action
                        a.btn(href='javascript:void(0);' @click='$router.push({ name: "RegistrarFamiliar", params: {edit: row, origin: "PerfilPaciente"} })') Editar
                        a.btn.btn-danger(href='javascript:void(0);' @click='openConfirmQuitarFamiliar(row.idcliente)') Quitar
        confirm(
          :show.sync='showConfirm'
          :textTitle='"¿Está seguro de quitar al familiar?"'
          @confirm='onConfirm')
        router-view
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import accountTypes from '@/store/types/account';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

import Confirm from '@/views/In/Components/Confirm.vue';

import tiposDocumentos from '@/data/tiposDocumentos.json';
import sexos from '@/data/sexos.json';
import tiposDeSangre from '@/data/tiposDeSangre.json';

export default {
  name: 'PerfilPaciente',
  dependencies: ['CommonService', 'AccountService', 'GenericService'],
  components: {
    Confirm,
  },
  data: () => ({
    comboReadOnly: false,
    showConfirm: false,
    boolDatosPersonales: true,
    boolDatosClinicos: false,
    boolDatosFamiliares: false,
    arrFamiliares: [],
    selectedIdCliente: null,
    fPerfil: {
      peso: null,
      estatura: null,
      sexo: null,
      tipo_sangre: null,
      edad: null,
      imc: null,
    },
    formDatosPerfilPaciente: {
      tipo_documento: null,
      numero_documento: null,
      nombres: null,
      apellido_paterno: null,
      apellido_materno: null,
      correo: null,
      telefono: null,
      fecha_nacimiento: null,
      sexo: null,
    },
    formDatosPerfilClinico: {
      peso: null,
      estatura: null,
      tipo_sangre: null,
      edad: null,
      sexo: null,
    },
  }),
  async created() {
    await this.fetchData();
  },
  watch: {
    $route: function (val) {
      // console.log(val,'valroutee');
      this.fetchData();
    },
  },
  // async activated() {
  //   // console.log('updated');
  //   await this.fetchData();
  // },
  computed: {
    ...mapGetters({
      user: accountTypes.getters.getUser,
    }),
    tiposDocumentos: () => tiposDocumentos,
    sexos: () => sexos,
    tiposDeSangre: () => tiposDeSangre,
    obtenSexo() {
      let strSexo = null
      if(this.formDatosPerfilPaciente.sexo === 'M'){
        strSexo = 'MASCULINO';
      }
      if(this.formDatosPerfilPaciente.sexo === 'F'){
        strSexo = 'FEMENINO';
      }
      return strSexo;
    },
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_perfil_general',
          });
          // console.log(data, 'cargar_citas_pendientes');
          if (data) {
            // this.fPerfil = data.datos;
            await Vue.nextTick();
            this.CommonService.assign(this.fPerfil, data.datos);
            this.CommonService.assign(this.formDatosPerfilPaciente, data.datos);
            this.CommonService.assign(this.formDatosPerfilClinico, data.datos);
            await Vue.nextTick();
            // console.log(this.formDatosPerfilPaciente, 'this.formDatosPerfilPaciente');
            // setTimeout(() => {
            //   // console.log(data.datos, 'data.datos timeout');
            //   this.comboReadOnly = true;
            //   // console.log('1seg');
            // }, 2000);
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_familiares',
          });
          if (data) {
            this.arrFamiliares = data.datos;
          }
        }
      },
      async onConfirm() {
        await this.GenericService.store({
          uri: 'platform/anular_familiar',
          data: {
            idcliente: this.selectedIdCliente,
          },
        });
        this.$swal({
          type: 'success',
          text: 'Se quitó al familiar correctamente',
          timer: 3000,
        }).then(() => {
          this.showConfirm = false;
          this.selectedIdCliente = null;
          this.fetchData();
        });
      },
    }),
    ...mapValidation({
      async onDatosPerfilPaciente() {
        await this.GenericService.store({
          uri: 'platform/editar_perfil',
          data: {
            ...this.formDatosPerfilPaciente,...this.formDatosPerfilClinico,
          },
        });
        this.$swal({
          type: 'success',
          text: 'Información actualizada correctamente.',
          timer: 3000,
        });
      },
      async onDatosPerfilClinico() {
        await this.GenericService.store({
          uri: 'platform/editar_perfil',
          data: {
            ...this.formDatosPerfilClinico,...this.formDatosPerfilPaciente,
          },
        });
        this.$swal({
          type: 'success',
          text: 'Información actualizada correctamente.',
          timer: 3000,
        });
        await this.fetchData();
      },
    }),
    async openConfirmQuitarFamiliar(idcliente) {
      this.showConfirm = !this.showConfirm;
      this.selectedIdCliente = idcliente;
    },
    async verToggleSection(section) {
      if (section === 'DP') {
        this.boolDatosPersonales = true;
        this.boolDatosClinicos = false;
        this.boolDatosFamiliares = false;
      }
      if (section === 'PF') {
        this.boolDatosPersonales = false;
        this.boolDatosClinicos = true;
        this.boolDatosFamiliares = false;
      }
      if (section === 'FA') {
        this.boolDatosPersonales = false;
        this.boolDatosClinicos = false;
        this.boolDatosFamiliares = true;
      }
    },
    editarFamiliar(idcliente) {

    },
    quitarFamiliar(idcliente) {

    },
  },
};
</script>
<style lang="scss" scoped="">
.page-perfil{
    padding: 0;
}
.page-perfil .box-sidebar{
    padding-top: 64px;
    background-color: #f2f5f7;
    width: 300px;
    height: calc(100vh - 70px);
}
.page-perfil .box-foto{
    text-align: center;
    position: relative;
}
.page-perfil .box-foto .link-foto{
    border: 3px solid #829723;
    border-radius: 50%;
    display: inline-block;
}
.page-perfil .box-foto .inputFoto{
    position: absolute;
    width: 30px;
    bottom: 4px;
    right: 85px;
}
.page-perfil .box-foto .link-foto > img{
    height: 110px;
    border-radius: 50%;
    width: 110px;
}
.page-perfil .box-foto .popup-foto{
    position: absolute;
    bottom: 0;
    left: 60%;
    z-index: 1;
    background: white;
    border-radius: 50%;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
}
.page-perfil .box-foto .popup-foto .mat-icon{
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page-perfil .box-info{
  width: 100%;
}
.page-perfil .box-info h3{
    width: 75%;
    margin: auto;
    text-align: center;
    line-height: 1;
    padding-top: 10px;
    color: #003d71;
}
.page-perfil .box-content-menu{
    margin-top: 16px;
    display: block;
}
.page-perfil .box-content-menu .box-item{
    border-bottom: 1px solid #d4d4d4;
}
.page-perfil .box-content-menu .box-item a.active{
    color: #003d71;
}
.page-perfil .box-content-menu .box-item a{
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 18px;
}
.page-perfil .box-content-menu .box-item a .mat-icon{
    padding-left: 4px;
}
.page-perfil .box-content-menu .box-item span{
    margin-left: 16px;
}
.page-perfil .box-content{
    padding-top: 3%;
    padding-left: 4%;
    flex: 0.95;
    width: 100%;
    min-width: 280px;
}
.page-perfil .box-content .tab.show{
    display: block;
}
.page-perfil .box-content .tab.hide{
    display: none;
}
.page-perfil .box-content .box-header h3{
    margin-bottom: 24px;
}
.page-perfil .box-content .box-form .mat-form-field{
    width: 100%;
}
.page-perfil .box-content .box-form .box-action{
    margin-top: 2%;
    text-align: center;
}
.page-perfil .box-content .box-form .box-action button{
    width: 280px;
}
.page-perfil .box-perfil-content .box-perfil{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    // padding: 3%;
    border: 1px solid #829723;
    margin-bottom: 5%;
    border-radius: 15px;
    text-align: center;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    padding: 1.5rem;
    // padding-bottom: 0;
}
.page-perfil .box-perfil-content .box-perfil p{
    // margin-bottom: 5px;
    // color: #003d71;
    margin-bottom: 5px;
    font-weight: 800;
    color: #829723;
    font-size: 18px;
}
.page-perfil .box-perfil-content .box-perfil .box-item{
    display: flex;
    min-width: 150px;
    // margin-bottom: 1.45rem;
    width: 180px;
    min-width: unset;
    padding: 20px;
}

.page-perfil .box-perfil-content .box-perfil .box-item .box-item-rpta{
    display: flex;
    align-items: flex-end;
    position: relative;
    // width: 100%;
    color: #00c9d2;
}
.page-perfil .box-perfil-content .box-perfil img{
    height: 50px; 
}
.page-perfil .box-perfil-content .box-perfil .box-item-rpta .valor{
    margin-left: 4px;
    font-size: 30px;
    font-weight: 400;
    line-height: 0.75;
}
.page-perfil .box-perfil-content .box-perfil .box-item-rpta .pre-valor{
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 4px;
    font-size: 12px;
    color: #003d71;
    width: 100px;
    text-align: left;
}
.page-perfil .box-perfil-content .box-perfil .box-item-rpta .post-valor{
    font-weight: 200;
    line-height: 1;
    font-size: 16px;
    padding-left: 4px;
}
/*familiar*/
.page-perfil .box-content .box-list button{
    margin-bottom: 20px;
    float: right;
}
.page-perfil .box-content .box-list table td.action{
    display: flex;
}
.page-perfil .box-content .box-list table td.action > a{
    height: 30px;
    padding: 0 0.5rem;
    margin: 0 10px 0 0;
    display: flex;
    justify-content: center;
    width: auto;
    color: white;
    background-color: #829723;
    align-items: center;
}
.page-perfil .box-content .box-list table td.action > a.btn-danger{
    background-color: red;
}
.page-perfil .box-content .box-list table td.action > a > .mat-icon{
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (max-width: 1199px){

}
@media (max-width: 992px){ /* 992 a 769*/
  .page-perfil{
    margin-right: 65px;
  }
  .page-perfil .box-sidebar{
    width: 220px;
    padding-top: 32px;
  }
  .page-perfil .box-foto .link-foto > img{
    height: 80px;
    width: 80px;
  }
  .page-perfil .box-info h3{
    width: 100%;
    font-size: 20px;
  }
  .page-perfil .box-content-menu .box-item a{
    font-size: 15px;
    height: 40px;
  }
}
@media (max-width: 768px){ /* 768 a 577 */
  .page-perfil .box-perfil-content .box-perfil{
    justify-content: center;
    padding: 4px 12px;
  }
  .page-perfil .box-perfil-content .box-perfil .box-item{
    width: 50%;
    padding: 12px 0;
    justify-content: center;
  }
  .page-perfil .box-perfil-content .box-perfil img{
    height: 40px;
  }
  .page-perfil .box-perfil-content .box-perfil .box-item-rpta .valor{
    font-size: 22px;
  }
  .page-perfil .box-perfil-content .box-perfil .box-item-rpta .pre-valor{
    // width: 80px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
  }
  .page-perfil .box-perfil-content .box-perfil .box-item .box-item-rpta{
    flex: 1;
  }
  .page-perfil .box-content .box-list button{
    width: 100%;
    min-width: 100%;
  }
  .page-perfil .box-list table{
    font-size: 12px;
  }
  .page-perfil .box-content{
    padding: 1rem;
    padding-right: 0;
  }
}
@media (max-width: 576px) { /*576 a 376*/
  .page-perfil{
    margin-right: 0;
  }
  .page-perfil .box-sidebar{
    width: 100%;
    height: auto;
    padding-bottom: 2.45rem;
  }
  .page-perfil .box-content .box-header h3{
    text-align: center;
    margin-bottom: 1rem;
    font-size: 20px;
  }
  .page-perfil .box-content{
    margin-bottom: 1.5rem;
  }
}
@media (max-width: 375px) {
  .page-perfil .box-perfil-content .box-perfil .box-item-rpta .pre-valor{
    font-size: 10px;
  }
  .page-perfil .box-perfil-content .box-perfil img[data-v-052a255d] {
    height: 36px;
  }
}
</style>