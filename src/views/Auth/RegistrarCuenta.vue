<template lang="pug">
  k-modal(@close='$router.push({ name: "Inicio" })')
    form( novalidate='' @submit.prevent='onDatosRegistro' data-vv-scope='formDatosRegistro')
      .row
        h4.mb-4.text-center.col-12 <img src='@/assets/images/favicon.png' /> Crea tu cuenta
        .col-12.col-sm-6
          k-select(
            :label='"Tipo de Documento"'
            :placeholder='"Tipo de Documento"'
            :data-vv-as='"Tipo de Documento"'
            name='tipo_documento'
            v-validate='"required"'
            :error='errors.first("formDatosRegistro.tipo_documento")'
            v-model='formDatosRegistro.tipo_documento'
            :options='tiposDocumentos')
        .col-12.col-sm-6
          k-input(
            mask='########'
            :label='"Número de Documento"'
            :placeholder='"Número de Documento"'
            :data-vv-as='"Número de Documento"'
            name='numero_documento'
            maxlength='8'
            v-validate='{ required: true, min: 8, max: 8 }'
            :error='errors.first("formDatosRegistro.numero_documento")'
            v-model.trim='formDatosRegistro.numero_documento')
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
            name='apellido_paterno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosRegistro.apellido_paterno")'
            v-model.trim='formDatosRegistro.apellido_paterno')
        .col-12.col-sm-6
          k-input(
            :label='"Apellido Materno"'
            :placeholder='"Apellido Materno"'
            :data-vv-as='"Apellido Materno"'
            name='apellido_materno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosRegistro.apellido_materno")'
            v-model.trim='formDatosRegistro.apellido_materno')
        .col-12.col-sm-6
          k-input(
            :label='"Correo Electrónico"'
            :placeholder='"Correo Electrónico"'
            :data-vv-as='"Correo Electrónico"'
            name='correo'
            maxlength='255'
            v-validate='"required|email"'
            :error='errors.first("formDatosRegistro.correo")'
            v-model.trim='formDatosRegistro.correo')
        .col-12.col-sm-6
          k-input(
            v-mask='"#########"'
            :label='"Celular"'
            :placeholder='"Celular"'
            :data-vv-as='"Celular"'
            name='celular'
            maxlength='9'
            v-validate='"required|numeric|min:9|max:9"'
            :error='errors.first("formDatosRegistro.celular")'
            v-model.trim='formDatosRegistro.celular')
        .col-12.col-sm-6
          k-input(
            type='date'
            :label='"Fecha de Nacimiento"'
            :placeholder='"Fecha de Nacimiento"'
            :data-vv-as='"Fecha de Nacimiento"'
            name='fecha_nacimiento'
            maxlength='10'
            v-validate='"required|date_format:yyyy-MM-dd"'
            :error='errors.first("formDatosRegistro.fecha_nacimiento")'
            v-model.trim='formDatosRegistro.fecha_nacimiento')
        .col-12.col-sm-6
          k-select(
            :label='"Sexo"'
            :placeholder='"Sexo"'
            :data-vv-as='"Sexo"'
            name='sexo'
            v-validate='"required"'
            :error='errors.first("formDatosRegistro.sexo")'
            v-model='formDatosRegistro.sexo'
            :options='sexos')
      .row
        .col-12.col-sm-6
          k-input(
            type='password'
            :label='"Clave"'
            :placeholder='"Clave"'
            :data-vv-as='"Clave"'
            name='password'
            maxlength='255'
            v-validate='"required|min:8|max:255"'
            :error='errors.first("formDatosRegistro.password")'
            v-model.trim='formDatosRegistro.password'
            ref='password'
            :all-uppercase='false')
        .col-12.col-sm-6
          k-input(
            type='password'
            :label='"Repita clave"'
            :placeholder='"Repita clave"'
            :data-vv-as='"Repita clave"'
            name='repita_pass'
            maxlength='255'
            v-validate='"required|confirmed:password|min:8|max:255"'
            :error='errors.first("formDatosRegistro.repita_pass")'
            v-model.trim='formDatosRegistro.repita_pass'
            :all-uppercase='false')
        k-button-layout.mt-3
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

import tiposDocumentos from '@/data/tiposDocumentos.json';
import sexos from '@/data/sexos.json';

export default {
  name: 'RegistrarCuenta',
  dependencies: ['AccountService', 'GenericService'],
  data: () => ({
    formDatosRegistro: {
      tipo_documento: null,
      numero_documento: null,
      nombres: null,
      apellido_paterno: null,
      apellido_materno: null,
      correo: null,
      celular: null,
      fecha_nacimiento: null,
      sexo: null,
      password: null,
      repita_pass: null,
    },
  }),
  async created() {
    //await this.fetchData();
  },
  computed: {
    tiposDocumentos: () => tiposDocumentos,
    sexos: () => sexos,
  },
  methods: {
    async onDatosRegistro() {
      const isValid = await this.$validator.validateAll('formDatosRegistro');
      if (isValid) {
        try {
          this.$wait.start('global');
          const arrData = await this.AccountService.registrarCuenta({
            ...this.formDatosRegistro, username: this.formDatosRegistro.numero_documento,
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