<template lang="pug">
  k-modal(@close='$router.push({ name: "PerfilPaciente" })')
    form( novalidate='' @submit.prevent='onDatosFamiliar' data-vv-scope='formDatosFamiliar')
      .row
        h4.mb-4.text-center.col-12 <img src='@/assets/images/favicon.png' /> Registro de Familiares
        .col-12.col-sm-6
          k-select(
            :label='"Tipo de Documento"'
            :placeholder='"Tipo de Documento"'
            :data-vv-as='"Tipo de Documento"'
            name='tipo_documento'
            v-validate='"required"'
            :error='errors.first("formDatosFamiliar.tipo_documento")'
            v-model='formDatosFamiliar.tipo_documento'
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
            :error='errors.first("formDatosFamiliar.numero_documento")'
            v-model.trim='formDatosFamiliar.numero_documento')
        .col-12.col-sm-6
          k-select(
            :label='"Parentesco"'
            :placeholder='"Parentesco"'
            :data-vv-as='"Parentesco"'
            name='idparentesco'
            v-validate='"required"'
            :error='errors.first("formDatosFamiliar.idparentesco")'
            v-model='formDatosFamiliar.idparentesco'
            :options='parentescos')
        .col-12.col-sm-6
          k-input(
            :label='"Nombres"'
            :placeholder='"Nombres"'
            :data-vv-as='"Nombres"'
            name='nombres'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosFamiliar.nombres")'
            v-model.trim='formDatosFamiliar.nombres')
        .col-12.col-sm-6
          k-input(
            :label='"Apellido Paterno"'
            :placeholder='"Apellido Paterno"'
            :data-vv-as='"Apellido Paterno"'
            name='apellido_paterno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosFamiliar.apellido_paterno")'
            v-model.trim='formDatosFamiliar.apellido_paterno')
        .col-12.col-sm-6
          k-input(
            :label='"Apellido Materno"'
            :placeholder='"Apellido Materno"'
            :data-vv-as='"Apellido Materno"'
            name='apellido_materno'
            maxlength='255'
            v-validate='"required|max:255"'
            :error='errors.first("formDatosFamiliar.apellido_materno")'
            v-model.trim='formDatosFamiliar.apellido_materno')
        .col-12.col-sm-6
          k-input(
            :label='"Correo Electrónico"'
            :placeholder='"Correo Electrónico"'
            :data-vv-as='"Correo Electrónico"'
            name='correo'
            maxlength='255'
            v-validate='"required|email"'
            :error='errors.first("formDatosFamiliar.correo")'
            v-model.trim='formDatosFamiliar.correo')
        .col-12.col-sm-6
          k-input(
            type='date'
            :label='"Fecha de Nacimiento"'
            :placeholder='"Fecha de Nacimiento"'
            :data-vv-as='"Fecha de Nacimiento"'
            name='fecha_nacimiento'
            maxlength='10'
            v-validate='"required|date_format:yyyy-MM-dd"'
            :error='errors.first("formDatosFamiliar.fecha_nacimiento")'
            v-model.trim='formDatosFamiliar.fecha_nacimiento')
        .col-12.col-sm-6
          k-select(
            :label='"Sexo"'
            :placeholder='"Sexo"'
            :data-vv-as='"Sexo"'
            name='sexo'
            v-validate='"required"'
            :error='errors.first("formDatosFamiliar.sexo")'
            v-model='formDatosFamiliar.sexo'
            :options='sexos')
        k-button-layout.mt-3
          k-button(type='submit') Procesar
          br
          k-button(type='link' @click='$router.push({ name: "PerfilPaciente" })') Atrás
      
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
// import parentescos from '@/data/parentescos.json';

export default {
  name: 'RegistrarCuenta',
  dependencies: ['CommonService', 'AccountService', 'GenericService'],
  props:['edit'],
  data: () => ({
    formDatosFamiliar: {
      idcliente: null,
      tipo_documento: null,
      numero_documento: null,
      nombres: null,
      apellido_paterno: null,
      apellido_materno: null,
      correo: null,
      fecha_nacimiento: null,
      sexo: null,
      idparentesco: null,
    },
    parentescos: [],
  }),
  async created() {
    await this.fetchData();
    if(this.edit){
      this.CommonService.assign(this.formDatosFamiliar, this.edit);
    }
  },
  computed: {
    tiposDocumentos: () => tiposDocumentos,
    sexos: () => sexos,
    // parentescos: () => parentescos,
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_parentesco',
          });
          if (data) {
            this.parentescos = data.datos.map(d => ({
              value: d.idparentesco,
              text: d.descripcion_par,
            }));
          }
        }
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_familiares',
          });
          // console.log(data, 'cargar_citas_pendientes');
          if (data) {
            this.arrFamiliares = data.datos;
          }
        }
      },
    }),
    async onDatosFamiliar() {
      const isValid = await this.$validator.validateAll('formDatosFamiliar');
      if (isValid) {
        try {
          this.$wait.start('global');
          let method = 'agregar_familiar';
          if(this.edit){
            method = 'editar_familiar';
          }
          const arrData = await this.GenericService.store({
            uri: 'platform/'+method,
            data: this.formDatosFamiliar,
          });
          const { flag, message } = arrData;
          this.$swal({ type: 'success', text: message }).then(() => {
            this.$router.push({ name: 'PerfilPaciente' });
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