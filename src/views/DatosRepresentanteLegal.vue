<template lang="pug">
  .page-datos-representante-legal
    .container
      .box-formulario
        h2 Datos Representante Legal
        form(
          novalidate='')
          .row
            .col-12.col-sm-6
              k-input(
                :label='"Nro de DNI del Representate Legal 1"'
                :placeholder='"Nro de DNI del Representate Legal 1"'
                :data-vv-as='"Nro de DNI del Representate Legal 1"'
                name='dniRepresentante'
                maxlength='10'
                v-validate='"required"'
                :readonly='true')
            .col-12.col-sm-6
              k-input(
                :label='"Nombre representante 1"'
                :placeholder='"Nombre representante 1"'
                :data-vv-as='"Nombre representante 1"'
                name='nombreRepresentante'
                v-validate='"required"'
                :readonly='true')
          .box-action
            k-button.btn.btn-secondary.btn-lg(type='button' @click='onBack') Regresar 
            k-button.btn-lg(type='button' @click='continuar()') Continuar 
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'DatosRepresentanteLegal',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    profesiones: [],
    formDatosPersonales: {
      fechaNacimiento: null,
      profesionId: null,
      departamentoId: null,
      provinciaId: null,
      distritoId: null,
      domicilio: null,
      referenciaDomicilio: null,
    },
    provincias: [],
    distritos: [],
  }),
  computed: {
    
  },
  methods: {
    async continuar() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'DatosContactoAdministrativo');
    }
  },
};
</script>
<style lang="scss" scoped="">
  .page-datos-representante-legal{
    // height: calc(100vh - 63px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .page-datos-representante-legal .container{
    padding: 0 5rem;
  }
  .page-datos-representante-legal .container .box-barra{
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
  .page-datos-representante-legal .container .box-barra .box-completed{
    position: absolute;
    left: 0;
  }
  .page-datos-representante-legal .container h2{
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }
  .page-datos-representante-legal .box-formulario .box-action{
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
  }
</style>