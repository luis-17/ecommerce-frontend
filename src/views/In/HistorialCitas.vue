<template lang="pug">
  .page-historial
    .container
      .box-historial
        .box-tabs
          .box-tab-group
            .box-tab-item(:class='{"active": isActiveCP}' @click='isActiveCP=true;isActiveCR=false;')
              a(href='javascipt:void;')
                span CITAS PENDIENTES
            .box-tab-item(:class='{"active": isActiveCR}' @click='isActiveCP=false;isActiveCR=true;')
              a(href='javascipt:void;')
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
                  .box-nombre # {{ row.idcita }} - {{ row.paciente }}
                  .box-detail-item.box-hora
                    .icon
                      img(src='@/assets/images/clock.png')
                    .value {{ row.hora_inicio }}
                  .box-detail-item.box-medico
                    .icon
                      img(src='@/assets/images/doctor.png')
                    .value {{ row.medico }}
                  .box-detail-item.box-especialidad
                    .icon
                      img(src='@/assets/images/quality.png')
                    .value {{ row.especialidad }}
                  .box-action
                    k-button( class='btn-rounded btn-danger btn-sm' type='button' @click='openConfirmAnularCita(row.idcita)') ANULAR CITA
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
                  .box-nombre # {{ row.idcita }} - {{ row.paciente }}
                  .box-detail-item.box-hora
                    .icon
                      img(src='@/assets/images/clock.png')
                    .value {{ row.hora_inicio }}
                  .box-detail-item.box-medico
                    .icon
                      img(src='@/assets/images/doctor.png')
                    .value {{ row.medico }}
                  .box-detail-item.box-especialidad
                    .icon
                      img(src='@/assets/images/quality.png')
                    .value {{ row.especialidad }}
      confirm(
        :show.sync='showConfirm'
        :textTitle='"¿Está seguro de anular la cita?"'
        @confirm='onConfirm')

</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

import Confirm from '@/views/In/Components/Confirm.vue';

export default {
  name: 'HistorialCitas',
  dependencies: ['AccountService', 'GenericService'],
  components: {
    Confirm,
  },
  data: () => ({
    showConfirm: false,
    isActiveCP: true,
    isActiveCR: false,
    citasPendientes: [],
    citasRealizadas: [],
    flag: null,
    selectedIdCita: null,
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    // ...mapGetters({
    //   user: accountTypes.getters.getUser,
    // }),
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_citas_pendientes',
          });
          console.log(data, 'cargar_citas_pendientes');
          if (data) {
            this.citasPendientes = data.datos;
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_citas_realizadas',
          });
          console.log(data, 'cargar_citas_realizadas');
          if (data) {
            this.citasRealizadas = data.datos;
          }
        }
      },
      async onConfirm() {
        console.log(this.selectedIdCita, 'this.selectedIdCita')
        // console.log('click moofff');
        await this.GenericService.store({
          uri: 'platform/anular_cita',
          data: {
            idcita: this.selectedIdCita,
          },
        });
        this.$swal({
          type: 'success',
          title: 'Se anuló la cita correctamente',
          timer: 3000,
        }).then(() => {
          // this.$router.push({ name: 'Formalizador/HistorialCreditos' });
          // this.$router.go();
          this.showConfirm = false;
          this.selectedIdCita = null;
          this.fetchData();
        });
      },
    }),
    async openConfirmAnularCita(idcita) {
      this.showConfirm = !this.showConfirm;
      this.selectedIdCita = idcita;
    }
  },
};
</script>
<style lang="scss" scoped="">
  // @import 'src/var.scss';
  /* Historial page */
  .page-historial{
    padding-top: 4rem;
  }
  .page-historial .box-tabs .box-tab-group{
    display: flex;
      justify-content: center;
      font-size: 22px;
      width: 80%;
      margin: auto;
      color: white;
      border-radius: 15px;
  }
  .page-historial a{
    color: inherit;
  }
  .page-historial p{
    margin:0;
  }
  .page-historial .box-tabs .box-tab-group .box-tab-item{
    padding: 10px;
    text-align: center;
    width: 100%;
    background-color: #003d71;
    opacity: 0.5;
  }
  .page-historial .box-tabs .box-tab-group .box-tab-item:first-child{
    border-right: 1px solid;
    border-radius: 10px 0 0 0;
  }
  .page-historial .box-tabs .box-tab-group .box-tab-item:last-child{
    border-radius: 0 0 10px 0;
  }
  .page-historial .box-tabs .box-tab-group .box-tab-item.active{
    opacity: 1;
  }
  .page-historial .box-content-tabs{
    width: 80%;
    margin: auto;
  }
  .page-historial .box-content-tabs .box-tab{
    margin-top: 10px;
  }
  .page-historial .box-content-tabs .box-tab .box-periodo{
    padding: 6px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #829723;
  }
  .page-historial .box-content-items .box-item{
    display: flex;
  }
  .page-historial .box-content-items .box-item .box-fecha{
    width: 180px;
    text-align: center;
    position: relative;
  }
  .page-historial .box-content-items .box-item .box-fecha .box-content-fecha{
    margin: 0 45px;
    background-color: #21b8c6;
    color: white;
    height: 80px;
    border-radius: 15px 0;
    padding: 0.3rem;
  }
  .page-historial .box-content-items .box-item .box-fecha .box-content-fecha .mes{
    line-height: 1;
    padding: 8px 0 4px;
    font-size: 15px;
  }
  .page-historial .box-content-items .box-item .box-fecha .box-content-fecha .dia{
    font-size: 40px;
    line-height: 1;
    font-weight: 800;
  }
  .page-historial .box-content-items .box-item .box-detail{
    font-size: 18px;
    padding-bottom: 5%;
  }
  .page-historial .box-content-items .box-item .box-detail .box-detail-item{
    display: flex;
    align-items: center;
  }
  // .page-historial .box-content-items .box-item .box-detail .box-detail-item .value{
  //   margin-left: 0.5rem;
  // }
  .page-historial .box-content-items .box-item .box-detail .box-nombre{
    font-weight: 800;
    color: #21b8c6;
  }
  .page-historial .box-content-items .box-item .box-detail .box-detail-item{
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  .page-historial .box-content-items .box-item .box-detail .box-detail-item .icon{
    margin-right: 10px;
  }
  .page-historial .box-content-items .box-item .box-detail .box-detail-item .icon img{
    height: 25px;
  }
  .page-historial .box-detail .box-action{
    margin-top: 10px;
  }
  .page-historial .box-detail .box-action button{
    // margin: 0 10px 0 0;
    width: 140px;
    min-width: 140px;
    padding: 0.3rem;
  }
  .page-historial .box-content-items .timeline{
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #21b8c6;
    top: 0;
    left: 50%;
    z-index: -1;
  }
  .page-historial .box-end{
    left: 44%;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      background-color: #21b8c6;
      position: absolute;
      bottom: 0;
  }
  @media (max-width: 1199px){

  }
  @media (max-width: 992px){ /* 992 a 769*/

  }
  @media (max-width: 768px){ /* 768 a 577 */
    .page-historial .box-tabs .box-tab-group{
      width: 100%;
      font-size: 18px;
    }
    .page-historial .box-content-tabs{
      width: 100%;
    }
    .box-historial{
      margin-right: 4rem;
    }
    .page-historial .box-content-items .box-item .box-detail{
      font-size: 16px;
    }
    .page-historial .box-content-items .box-item .box-fecha{
      width: 86px;
    }
    .page-historial .box-content-items .box-item{
      justify-content: space-between;
    }
    .page-historial .box-content-items .box-item .box-fecha .box-content-fecha{
      margin: 0;
    }
    .page-historial .box-end{
      left: 38%;
    }
  }
  @media (max-width: 576px) { /*576 a 376*/
    .page-historial{
      padding-top: 1rem;
    }
    .page-historial .box-tabs .box-tab-group{
      font-size: 15px;
    }
    .page-historial .box-content-items .box-item .box-detail{
      font-size: 15px;
      margin-left: 0.8rem;
      flex: 1;
    }
    .page-historial .box-content-items .box-item .box-detail .box-detail-item{
      font-size: 13px;
    }
    .page-historial .box-content-items .box-item .box-fecha{
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .page-historial .box-content-items .box-item .box-fecha .box-content-fecha{
      height: 60px;
    }
    // .page-historial .box-content-items .timeline{
    //   display: none;
    // }
    .page-historial .box-end{
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      margin: auto;
    }
    .page-historial .box-content-items .box-item .box-fecha .box-content-fecha .mes{
      font-size: 12px;
    }
    .page-historial .box-content-items .box-item .box-fecha .box-content-fecha .dia{
      font-size: 26px;
    }
    .page-historial .box-content-items .box-item .box-detail{
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    .page-historial .box-content-items .box-item .box-detail .box-detail-item .icon img{
      height: 20px;
    }
    .page-historial .box-content-items .box-item .box-detail .box-nombre{
      padding-bottom: 0.4rem;
    }
    .page-historial .box-content-items .box-item .box-detail .box-detail-item{
      margin: 0;
      line-height: 1.25;
    }
  }
  @media (max-width: 375px) {
    .page-historial .box-tabs .box-tab-group{
      font-size: 12px;
    }
    .page-historial .box-content-items .box-item .box-detail{
      font-size: 13px;
    }
    .page-historial .box-content-items .box-item .box-detail .box-detail-item{
      font-size: 12px;
    }
  }
</style>