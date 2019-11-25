<template lang="pug">
  .page-datos-contacto-administrativo
    .container
      .box-formulario
        h2 Datos Contacto Administrativo
        form(
          novalidate='')
          .row
            .col-12.col-sm-6
              k-input(
                :label='"Nro de DNI "'
                :placeholder='"Nro de DNI "'
                :data-vv-as='"Nro de DNI"'
                name='dniContacto'
                maxlength='10'
                v-validate='"required"'
              )
            .col-12.col-sm-6
              k-input(
                :label='"Nombre "'
                :placeholder='"Nombre"'
                :data-vv-as='"Nombre"'
                name='nombreContacto'
                v-validate='"required"'
              )
            .col-12.col-sm-12
              k-input(
                :label='"Email"'
                :placeholder='"Email"'
                :data-vv-as='"Email"'
                name='emailContacto'
                v-validate='"required"'
              )
            .col-12.col-sm-6
              k-input(
                :label='"Celular"'
                :placeholder='"Celular "'
                :data-vv-as='"Celular"'
                name='celularContacto'
                v-validate='"required"'
              )
            .col-12.col-sm-6
              k-select(
                :label='"Operador"'
                :placeholder='"Operador"'
                :data-vv-as='"Operador"'
                name='operador'
                v-validate='{ required: true, numeric: true, max: 2 }'
                :options='operadores')
            .col-12.col-sm-6
              k-input(
                :label='"Telf. Fijo "'
                :placeholder='"Telf. Fijo "'
                :data-vv-as='"Telf. Fijo"'
                name='telfContacto'
                v-validate='"required"'
              )
            .col-12.col-sm-6
              k-input(
                :label='"Anexo "'
                :placeholder='"Anexo"'
                :data-vv-as='"Anexo"'
                name='anexoContacto'
                v-validate='"required"'
              )
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
  name: 'DatosContactoAdministrativo',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    operador: null,
    showConfirm: false,
    operadores: [],
    fDatosCliente: {
      id: null,
      nombres: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
    },
  }),
  async created() {
    //await this.fetchData();
  },
  computed: {
    
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    ...mapValidation({
      async continuar(){
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'Pin');
      },
    })
    
  },
};
</script>
<style lang="scss" scoped="">
  .page-datos-contacto-administrativo{
    // height: calc(100vh - 63px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .page-datos-contacto-administrativo .container{
    padding: 0 5rem;
  }
  .page-datos-contacto-administrativo .container .box-barra{
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
  .page-datos-contacto-administrativo .container .box-barra .box-completed{
    position: absolute;
    left: 0;
  }
  .page-datos-contacto-administrativo .container h2{
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }
  .page-datos-contacto-administrativo .box-formulario .box-action{
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
  }
</style>