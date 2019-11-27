<template lang="pug">
  k-modal(@close='$router.push({ name: "Inicio" })')
    form(
      novalidate=''
      @submit.prevent='onResetPassword'
      data-vv-scope='formResetPassword')
      h4.mb-4.text-center <img src='@/assets/images/favicon.png' /> Recuperación de Cuenta
      k-input(
        type='password'
        :label='"Clave"'
        :placeholder='"Clave"'
        :data-vv-as='"Clave"'
        name='password'
        maxlength='255'
        v-validate='"required|min:8|max:255"'
        :error='errors.first("formResetPassword.password")'
        v-model.trim='formResetPassword.password'
        ref='password'
        :all-uppercase='false')
      k-input(
        type='password'
        :label='"Repita la clave"'
        :placeholder='"Repita la clave"'
        :data-vv-as='"Repita la clave"'
        name='confirmPassword'
        maxlength='255'
        v-validate='"required|confirmed:password|min:8|max:255"'
        :error='errors.first("formResetPassword.confirmPassword")'
        v-model.trim='formResetPassword.confirmPassword'
        :all-uppercase='false')
      k-button-layout
        k-button(type='submit') Aceptar
        br
        k-button(type='link' @click='$router.push({ name: "Inicio" })') Volver al Inicio
      
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'RecuperarCuenta',
  dependencies: ['AccountService', 'GenericService'],
  data: () => ({
    formResetPassword: {
      password: '',
      confirmPassword: '',
    },
  }),
  async created() {
    //await this.fetchData();
  },
  computed: {
    
  },
  methods: {
    async onResetPassword() {
      const isValid = await this.$validator.validateAll('formResetPassword');
      if (isValid) {
        try {
          this.$wait.start('global');
          const arrData = await this.AccountService.actualizarClave({
            password: this.formResetPassword.password,
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