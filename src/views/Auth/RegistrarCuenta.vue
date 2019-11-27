<template lang="pug">
  k-modal(@close='$router.push({ name: "Inicio" })')
    //- form(
    //-   novalidate=''
    //-   @submit.prevent='onDatosRegistro'
    //-   data-vv-scope='formDatosRegistro')
    //-   h4.mb-4.text-center <img src='@/assets/images/favicon.png' /> Recuperación de Cuenta
    //-   k-input(
    //-     type='password'
    //-     :label='"Clave"'
    //-     :placeholder='"Clave"'
    //-     :data-vv-as='"Clave"'
    //-     name='password'
    //-     maxlength='255'
    //-     v-validate='"required|min:8|max:255"'
    //-     :error='errors.first("formDatosRegistro.password")'
    //-     v-model.trim='formDatosRegistro.password'
    //-     ref='password'
    //-     :all-uppercase='false')
    //-   k-input(
    //-     type='password'
    //-     :label='"Repita la clave"'
    //-     :placeholder='"Repita la clave"'
    //-     :data-vv-as='"Repita la clave"'
    //-     name='confirmPassword'
    //-     maxlength='255'
    //-     v-validate='"required|confirmed:password|min:8|max:255"'
    //-     :error='errors.first("formDatosRegistro.confirmPassword")'
    //-     v-model.trim='formDatosRegistro.confirmPassword'
    //-     :all-uppercase='false')
    //-   k-button-layout
    //-     k-button(type='submit') Aceptar
    //-     br
    //-     k-button(type='link' @click='$router.push({ name: "Inicio" })') Volver al Inicio
    form( novalidate='' @submit.prevent='onDatosRegistro' data-vv-scope='formDatosRegistro')
      .row
        h4.mb-4.text-center.col-12 <img src='@/assets/images/favicon.png' /> Crea tu cuenta
        .col-lg-12.col-md-12.col-sm-12.col-xs-12
          k-input(
            mask='########'
            :label='"Número de Documento"'
            :placeholder='"Número de Documento"'
            :data-vv-as='"Número de Documento"'
            name='numeroDocumento'
            maxlength='8'
            v-validate='{ required: true, min: 8, max: 8 }'
            :error='errors.first("formDatosRegistro.numeroDocumento")'
            v-model.trim='formDatosRegistro.numeroDocumento')
        .col-12.col-sm-6
          k-input(
            :label='"Nombres"'
            :placeholder='"Nombres"'
            :data-vv-as='"Nombres"'
            name='nombres'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosRegistro.nombres")'
            v-model.trim='formDatosRegistro.nombres')
        .col-12.col-sm-6
          k-input(
            :label='"Apellido Paterno"'
            :placeholder='"Apellido Paterno"'
            :data-vv-as='"Apellido Paterno"'
            name='apellidoPaterno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosRegistro.apellidoPaterno")'
            v-model.trim='formDatosRegistro.apellidoPaterno')
        .col-12.col-sm-6
          k-input(
            :label='"Apellido Materno"'
            :placeholder='"Apellido Materno"'
            :data-vv-as='"Apellido Materno"'
            name='apellidoMaterno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosRegistro.apellidoMaterno")'
            v-model.trim='formDatosRegistro.apellidoMaterno')
        .col-12.col-sm-6
          k-input(
            :label='"Correo Electrónico"'
            :placeholder='"Correo Electrónico"'
            :data-vv-as='"Correo Electrónico"'
            name='correoElectronico'
            maxlength='255'
            v-validate='"required|email"'
            :error='errors.first("formDatosRegistro.correoElectronico")'
            v-model.trim='formDatosRegistro.correoElectronico')
        .col-12.col-sm-6
          k-input(
            v-mask='"#########"'
            :label='"Celular"'
            :placeholder='"Celular"'
            :data-vv-as='"Celular"'
            name='numCelular'
            maxlength='9'
            v-validate='"required|numeric|min:9|max:9"'
            :error='errors.first("formDatosRegistro.numCelular")'
            v-model.trim='formDatosRegistro.numCelular')
        .col-12.col-sm-6
          k-input(
            :label='"Fecha de Nacimiento"'
            :placeholder='"Fecha de Nacimiento"'
            :data-vv-as='"Fecha de Nacimiento"'
            name='fechaNacimiento'
            maxlength='10'
            v-validate='"required|date_format:yyyy-MM-dd"'
            :error='errors.first("formDatosRegistro.fechaNacimiento")'
            v-model.trim='formDatosRegistro.fechaNacimiento'
            :readonly='true')
        .col-12.col-sm-6
          k-select(
            :label='"Sexo"'
            :placeholder='"Sexo"'
            :data-vv-as='"Sexo"'
            name='sexo'
            v-validate='"required"'
            :error='errors.first("formDatosRegistro.sexo")'
            v-model='formDatosRegistro.sexo'
            :options='sexos'
            :readonly='true')
        .col-lg-12.col-md-12.col-sm-12.col-xs-12
          k-input(
            :label='"Clave"'
            :placeholder='"Clave"'
            :data-vv-as='"Clave"'
            name='clave'
            maxlength='255'
            v-validate='{"required": true, "max": 255}'
            :error='errors.first("formDatosRegistro.clave")'
            v-model.trim='formDatosRegistro.clave')
        .col-lg-12.col-md-12.col-sm-12.col-xs-12
          k-input(
            :label='"Repita clave"'
            :placeholder='"Repita clave"'
            :data-vv-as='"Repita clave"'
            name='repitaClave'
            maxlength='255'
            v-validate='{"required": true, "max": 255}'
            :error='errors.first("formDatosRegistro.repitaClave")'
            v-model.trim='formDatosRegistro.repitaClave')
        k-button-layout
          k-button(type='submit') Crear Cuenta
          br
          k-button(type='link' @click='$router.push({ name: "Inicio" })') Volver al Inicio
        //- k-button-layout.col-lg-12.mt-3
        //-   k-button(type='submit') Crear Cuenta
        //-   k-button(type='link' @click='volverAlInicio') Volver
      
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'RegistrarCuenta',
  dependencies: ['AccountService', 'GenericService'],
  data: () => ({
    formDatosRegistro: {
      tipoDocumento: null,
      numeroDocumento: null,
      nombres: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      correo: null,
      celular: null,
      fechaNacimiento: null,
      sexo: null,
      clave: null,
      repitaClave: null,
    },
  }),
  async created() {
    //await this.fetchData();
  },
  computed: {
    
  },
  methods: {
    async onDatosRegistro() {
      const isValid = await this.$validator.validateAll('formDatosRegistro');
      if (isValid) {
        try {
          this.$wait.start('global');
          const arrData = await this.AccountService.registrarCuenta({
            password: this.formDatosRegistro.password,
            token: this.$route.params.tkn,
          });
          const { flag, message } = arrData;
          this.$swal({ type: 'success', text: message }).then(() => {
            this.$router.push({ name: 'Inicio' });
          });
        } catch (err) {
          this.$swal({ type: err.type, text: err.message });
        } finally {
          this.$wait.end('global');
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped="">
  h4{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h4 >img{
    width: 32px;
    margin-right: 4px;
  }
</style>