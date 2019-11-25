<template lang="pug">
  .page-datos-simulacion
    .container
      .box-barra
        .box-completed
          img(src='@/assets/images/bar_only_64.png')
        .span 64%
      .box-formulario
        h2.m-0 Datos para desembolso
        small La cuenta debe estar a tu nombre
        form(
          novalidate=''
          @submit.prevent='onDatosDesembolso'
          data-vv-scope='formDatosDesembolso')
          .row
            .col-12.col-sm-6
              k-input(
                :label='"Número de cuenta"'
                :placeholder='"Número de cuenta"'
                :data-vv-as='"Número de cuenta"'
                name='numeroCuenta'
                v-validate='{ required: true, numeric: true }'
                :error='errors.first("formDatosDesembolso.numeroCuenta")'
                v-model.trim='formDatosDesembolso.numeroCuenta')
            .col-12.col-sm-6
              k-input(
                :label='"CCI"'
                :placeholder='"CCI"'
                :data-vv-as='"CCI"'
                name='numeroCuentaInter'
                v-validate='{ required: true, numeric: true }'
                :error='errors.first("formDatosDesembolso.numeroCuentaInter")'
                v-model.trim='formDatosDesembolso.numeroCuentaInter')
            .col-12.col-sm-6
              k-select(
                :label='"Entidad bancaria para realizar el desembolso"'
                :placeholder='"--Seleccione--"'
                :data-vv-as='"Entidad bancaria para realizar el desembolso"'
                name='bancoId'
                v-validate='{ required: true }'
                :error='errors.first("formDatosDesembolso.bancoId")'
                v-model.trim='formDatosDesembolso.bancoId'
                :options='bancos')
          .box-action
            k-button.btn.btn-secondary.btn-lg(type='button' @click='onBack') Regresar 
            k-button.btn-lg(type='submit') Continuar
</template>

<script>
import Vue from 'vue';
import moment from 'moment-timezone';
import { mapGetters } from 'vuex';
import globalTypes from '@/store/types/global';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';
import { Validator } from 'vee-validate';

export default {
  name: 'Simulacion',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    bancos: [],
    formDatosDesembolso: {
      numeroCuenta: null,
      numeroCuentaInter: null,
      bancoId: null,
    },
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    ...mapGetters({
      comingView: fuvexTypes.getters.getComingView,
    }),
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'maintenance/list-banks',
          });
          if (data) {
            this.bancos = data.map(d => ({
              value: d.id,
              text: d.nombre,
              raw: d,
            }));
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'evaluations/go-back-disburse-data',
          });
          if (data) {
            this.CommonService.assign(this.formDatosDesembolso, data);
          }
        } 
      },
    }),
    ...mapValidation({
      async onDatosDesembolso() {
        await this.GenericService.store({
          uri: 'evaluations/update-disburse-data',
          data: {
            ...this.formDatosDesembolso,
          },
        });
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'ContratoCredito');
      },
    }),
    async onBack() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'Evaluacion');
      return null;
    },
  },
};
</script>
<style lang="scss" scoped="">
  .page-datos-simulacion{
    // height: calc(100vh - 63px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .page-datos-simulacion .container{
    padding: 0 5rem;
  }
  .page-datos-simulacion .container .box-barra{
    margin: 3rem 0;
    background-color: #cccccc;
    border-radius: 10px;
    color: white;
    height: 22px;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    padding-right: 10px;
    position: relative;
  }
  .page-datos-simulacion .container .box-barra .box-completed{
    position: absolute;
    left: 0;
    top: -5px;
  }
  .page-datos-simulacion .container h2{
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }
  .page-datos-simulacion .box-formulario .box-action{
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
  }
  .page-datos-simulacion .box-formulario small{
    font-size: 0.9rem;
    font-weight: 100;
  }
</style>