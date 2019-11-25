<template lang="pug">
  .page-datos-financiamiento
    .container
      .box-formulario
        h2 Datos del financiamiento
        form(
          novalidate=''
          @submit.prevent='onDatosFinanciamiento'
          data-vv-scope='formDatosFinanciamiento')
          .row
            .col-12.col-sm-6
              k-select(
                :label='"Motivo de préstamo"'
                :placeholder='"Motivo"'
                :data-vv-as='"Motivo"'
                name='motivo'
                v-validate='{ required: true, numeric: true, max: 2 }'
                :error='errors.first("formDatosFinanciamiento.motivo")'
                v-model.trim='formDatosFinanciamiento.motivo'
                :options='motivos')
            .col-12.col-sm-6
              k-select(
                :label='"Moneda"'
                :placeholder='"Moneda"'
                :data-vv-as='"Moneda"'
                name='moneda'
                v-validate='{ required: true, numeric: true, max: 2 }'
                :error='errors.first("formDatosFinanciamiento.moneda")'
                v-model.trim='formDatosFinanciamiento.moneda'
                :options='monedas')
            .col-12.col-sm-6
              k-input(
                :label='labelMontoMaximo'
                :placeholder='"Monto"'
                :data-vv-as='"Monto"'
                name='monto'
                maxlength='6'
                v-validate='{ required: true, numeric: true, min_value: this.labels.montoMinimo, max_value: this.labels.montoMaximo }'
                :error='errors.first("formDatosFinanciamiento.monto")'
                v-model.trim='formDatosFinanciamiento.monto'
                :only-integer='true')
            .col-12.col-sm-6
              k-select(
                :label='"Plazo desde 3 a 14 meses"'
                :placeholder='"Plazo"'
                :data-vv-as='"Plazo"'
                name='plazo'
                v-validate='{ required: true, numeric: true, max: 2 }'
                :error='errors.first("formDatosFinanciamiento.plazo")'
                v-model.trim='formDatosFinanciamiento.plazo'
                :options='plazos')
          .box-action
            k-button.btn.btn-secondary.btn-lg(type='button' @click='onBack') Regresar 
            k-button.btn-lg(type='button' @click='continuar()') Continuar
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
  name: 'DatosFinanciamiento',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    monedas: [],
    motivos: [],
    plazos: [],
    labels: {
      montoMaximo: null,
      montoMinimo: null,
      tipoProductoId: null,
      plazoMaximo: null,
    },
    formDatosFinanciamiento: {
      // id: null,
      monto: null,
      plazo: null,
    },
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    ...mapGetters({
      comingView: fuvexTypes.getters.getComingView,
    }),
    labelMontoMaximo() {
      return `Monto máximo S/ ${this.labels.montoMaximo}`;
    },
  },
  watch: {
    
  },
  methods: {
    async continuar() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'DatosDesembolso');
    },
    ...mapWrapper({
      
    }),
    ...mapValidation({
      async onDatosFinanciamiento() {
        await this.GenericService.store({
          uri: 'evaluations/update-finance-data',
          data: {
            ...this.formDatosFinanciamiento,
          },
        });
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'Evaluacion');
      },
    }),
    async onBack() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'AvisoSiguiente2');
      return null;
    },
    disableDayFn(date) {
      return moment().isBefore(date, 'day');
    },
  },
};
</script>
<style lang="scss" scoped="">
  .page-datos-financiamiento{
    // height: calc(100vh - 63px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .page-datos-financiamiento .container{
    padding: 0 5rem;
  }
  .page-datos-financiamiento .container .box-barra{
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
  .page-datos-financiamiento .container .box-barra .box-completed{
    position: absolute;
    left: 0;
    top: -5px;
  }
  .page-datos-financiamiento .container h2{
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }
  .page-datos-financiamiento .box-formulario .box-action{
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
  }
</style>