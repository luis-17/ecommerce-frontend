<template lang="pug">
  .page-historial
    .container
      .box-historial
        .box-tabs
          .box-tab-group
            .box-tab-item(:class='{"active": isActiveCP}' @click='isActiveCP=true;isActiveCR=false;')
              a(href='')
                span CITAS PENDIENTES
            .box-tab-item(:class='{"active": isActiveCR}' @click='isActiveCP=false;isActiveCR=true;')
              a(href='')
                span CITAS REALIZADAS
        .box-content-tabs
          .box-tab.box-tab-cp(v-if='isActiveCP')
            .box-periodo
            .box-content-items(v-for='(row, index) in citasPendientes')
              .box-item
                .box-fecha
                  .box-content-fecha
                    p.mes {{ row.mes }}
                    p.dia {{ row.dia }}
                  .timeline
                  .box-end(v-if='index == citasPendientes.length - 1')
                .box-detail
                  .box-nombre {{ row.idcita }} {{ row.paciente }}
                  .box-detail-item.box-hora
                    .icon
                    .value {{ row.hora_inicio }}
                  .box-detail-item.box-medico
                    .icon
                    .value {{ row.medico }}
                  .box-detail-item.box-especialidad
                    .icon
                    .value {{ row.especialidad }}
                  .box-action
                    k-button( class='btn-rounded btn-danger btn-sm' type='button' @click='openConfirmAnularCita') ANULAR CITA
                    //- k-button(class='btn-light ml-4' type='button' @click='$router.push({ name: "AgendarCita" })') PAGAR CITA
          .box-tab.box-tab-cr(v-if='isActiveCR')
            .box-periodo
            .box-content-items(v-for='(row, index) in citasRealizadas')
              .box-item
                .box-fecha
                  .box-content-fecha
                    p.mes {{ row.mes }}
                    p.dia {{ row.dia }}
                  .timeline
                  .box-end(v-if='index == citasRealizadas.length - 1')
                .box-detail
                  .box-nombre {{ row.idcita }} {{ row.paciente }}
                  .box-detail-item.box-hora
                    .icon
                    .value {{ row.hora_inicio }}
                  .box-detail-item.box-medico
                    .icon
                    .value {{ row.medico }}
                  .box-detail-item.box-especialidad
                    .icon
                    .value {{ row.especialidad }}

</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'HistorialCitas',
  dependencies: ['AccountService', 'GenericService'],
  data: () => ({
    isActiveCP: true,
    isActiveCR: false,
    citasPendientes: [],
    citasRealizadas: [],
    flag: null,
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_citas_pendientes',
          });
          // console.log(data, 'dataatartara');
          if (data) {
            this.citasPendientes, data.datos;
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_citas_realizadas',
          });
          // console.log(data, 'dataatartara');
          if (data) {
            this.citasRealizadas, data.datos;
          }
        }
      },
    }),
    async openConfirmAnularCita() {
      console.log('confirm');
    }
  },
};
</script>
<style lang="scss" scoped="">
  // @import 'src/var.scss';
  /* Historial page */
  .page.historial .box-tabs .box-tab-group{
    display: flex;
      justify-content: center;
      font-size: 22px;
      width: 80%;
      margin: auto;
      color: white;
      border-radius: 15px;
  }
  .page.historial a{
    color: inherit;
  }
  .page.historial p{
    margin:0;
  }
  .page.historial .box-tabs .box-tab-group .box-tab-item{
    padding: 10px;
    text-align: center;
    width: 100%;
    background-color: #003d71;
    opacity: 0.5;
  }
  .page.historial .box-tabs .box-tab-group .box-tab-item:first-child{
    border-right: 1px solid;
    border-radius: 10px 0 0 0;
  }
  .page.historial .box-tabs .box-tab-group .box-tab-item:last-child{
    border-radius: 0 0 10px 0;
  }
  .page.historial .box-tabs .box-tab-group .box-tab-item.active{
    opacity: 1;
  }
  .page.historial .box-content-tabs{
    width: 80%;
    margin: auto;
  }
  .page.historial .box-content-tabs .box-tab{
    margin-top: 10px;
  }
  .page.historial .box-content-tabs .box-tab .box-periodo{
    padding: 6px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #829723;
  }
  .page.historial .box-content-items .box-item{
    display: flex;
  }
  .page.historial .box-content-items .box-item .box-fecha{
    width: 180px;
    text-align: center;
    position: relative;
  }
  .page.historial .box-content-items .box-item .box-fecha .box-content-fecha{
    margin: 0 45px;
    background-color: #21b8c6;
    color: white;
    height: 80px;
  }
  .page.historial .box-content-items .box-item .box-fecha .box-content-fecha .mes{
    font-size: 20px;
    line-height: 1;
    padding: 8px 0 4px;
  }
  .page.historial .box-content-items .box-item .box-fecha .box-content-fecha .dia{
    font-size: 40px;
    line-height: 1;
    font-weight: 800;
  }
  .page.historial .box-content-items .box-item .box-detail{
    font-size: 18px;
    padding-bottom: 5%;
  }
  .page.historial .box-content-items .box-item .box-detail .box-nombre{
    font-weight: 800;
    color: #21b8c6;
  }
  .page.historial .box-content-items .box-item .box-detail .box-detaiil-item{
    display: flex;
    align-items: center;
  }
  .page.historial .box-content-items .box-item .box-detail .box-detaiil-item .icon{
    margin-right: 10px;
  }
  .page.historial .box-detail .box-action{
    margin-top: 10px;
  }
  .page.historial .box-detail .box-action button{
    margin: 0 10px 0 0;
  }
  .page.historial .box-content-items .timeline{
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #21b8c6;
    top: 0;
    left: 50%;
    z-index: -1;
  }
  .page.historial .box-end{
    left: 44%;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      background-color: #21b8c6;
      position: absolute;
      bottom: 0;
  }
</style>