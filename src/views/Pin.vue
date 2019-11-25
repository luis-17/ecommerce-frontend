<template lang="pug">
  .page-datos-pin
    .container
      .box-title
        h3 En breve te enviaremos un mensaje de 4 dígitos, el cual debes ingresar en la plataforma para firmar digitalmente los documentos contractuales. 
      .box-formulario
        form(
          novalidate=''
          @submit.prevent='onDatosPin'
          data-vv-scope='formDatosPin')
          .row
            .col.text-center
              input.form-control.pin(
                :placeholder='"0"'
                type='text'
                ref='d1'
                maxlength='1'
                @keyup='onInputSelection("d2", $event)'
                v-model='formDatosPin.d1')
              span.mx-4.pin-separator -
              input.form-control.pin(
                :placeholder='"0"'
                type='text'
                ref='d2'
                maxlength='1'
                @keyup='onInputSelection("d3", $event)'
                v-model='formDatosPin.d2')
              span.mx-4.pin-separator -
              input.form-control.pin(
                :placeholder='"0"'
                type='text'
                ref='d3'
                maxlength='1'
                @keyup='onInputSelection("d4", $event)'
                v-model='formDatosPin.d3')
              span.mx-4.pin-separator -
              input.form-control.pin(
                :placeholder='"0"'
                type='text'
                ref='d4'
                maxlength='1'
                @keyup='onInputSelection("d1", $event)'
                v-model='formDatosPin.d4')
          .row
            .col.text-center
              .box-info
                .info-1 Ingresa el código de 4 dígitos enviado a tu celular
                .info-2 ¿No te llegó el código? 
                  a(href='javascript:void(0)' @click='reenviarPin') 
                    strong Solicita otro 
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

function setInputSelection(input, startPos, endPos) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(startPos, endPos);
  } else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', endPos);
    range.moveStart('character', startPos);
    range.select();
  }
}

export default {
  name: 'DatosFinanciamiento',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    plazos: [],
    formDatosPin: {
      d1: null,
      d2: null,
      d3: null,
      d4: null,
    },
  }),
  async created() {
    // await this.fetchData();
  },
  computed: {
    ...mapGetters({
      comingView: fuvexTypes.getters.getComingView,
    }),
    isReady() {
      return !!this.formDatosPin.d1 && !!this.formDatosPin.d2 && !!this.formDatosPin.d3 && !!this.formDatosPin.d4;
    },
  },
  watch: {
    
  },
  methods: {
    async continuar() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'DatosFinanciamiento');
    },
    ...mapWrapper({
    }),
    ...mapValidation({
      async onDatosPin() {
        await this.GenericService.store({
          uri: 'evaluations/update-pin-data',
          data: {
            pin: `${this.formDatosPin.d1}${this.formDatosPin.d2}${this.formDatosPin.d3}${this.formDatosPin.d4}`,
          },
        });
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'DescargaCartaDscto');
      },
    }),
    // async reenviarPin() {

    // },
    async onBack() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'ContratoCredito');
      return null;
    },
    onInputSelection(ref) {
      setInputSelection(this.$refs[ref], 0, -1);
    },
  },
};
</script>
<style lang="scss" scoped="">
  .page-datos-pin{
    // height: calc(100vh - 63px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .page-datos-pin .container{
    padding: 0 5rem;
  }
  .page-datos-pin .container .box-barra{
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
  .page-datos-pin .container .box-barra .box-completed{
    position: absolute;
    left: 0;
    top: -4px;
  }

  .page-datos-pin .box-formulario .box-action{
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
  }
  .page-datos-pin .pin {
    width: 76px;
    height: 80px;
    display: inline-block;
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    padding: 1rem;
    color: #005794;
    background-color: #fafafa;
  }
  .page-datos-pin .pin::placeholder { /* Firefox, Chrome, Opera */ 
    color: #005794; 
  } 
    
  .page-datos-pin .pin:-ms-input-placeholder { /* Internet Explorer 10-11 */ 
    color: #005794; 
  } 
    
  .page-datos-pin .pin::-ms-input-placeholder { /* Microsoft Edge */ 
    color: #005794; 
  }
  .page-datos-pin .pin-separator {
    position: relative;
    top: -15px;
  }
  .page-datos-pin .box-title h3{
    color: black;
    text-align: center;
    font-size: 1.5rem;
    margin: 5rem 6rem 2rem 6rem;
    display: block;
    padding-bottom: 1rem;
  }
  .page-datos-pin .box-info{
    font-weight: 100;
    margin-top: 2rem;
  }
  .page-datos-pin .box-info strong{
    font-weight: bold;
  }
</style>