<template lang="pug">
  .page-login
    .box-lateral-blue
      .box-section-bottom
        .box-redes
          a(class='box-facebook' href='https://www.facebook.com/CLINICAPROVIDENCIAOFICIAL')
            img(src='@/assets/images/Icon_Facebook.svg')
          a(class='box-instagram' href='https://www.instagram.com/clinicaprovidenciaperu/')
            img(src='@/assets/images/Icon_Inst.svg')
    div.angle-separator-content
      div.angle-separator-bottom
    .box-forms-content
      .box-forms
        div.luna-corner
        .box-form-login(v-if='boolLogin')
          h1 Inicia sesión y reserva tu cita online en minutos.
          vue-recaptcha(
            ref='invisibleRecaptcha'
            @verify='onVerify'
            @expired='onExpired'
            size='invisible'
            :sitekey='sitekey'
            badge='bottomright')
          form( novalidate='' @submit.prevent='onDatosLogin' data-vv-scope='formDatosLogin')
            .row
              .col-lg-12.col-md-12.col-sm-12.col-xs-12
                k-input(
                  mask='########'
                  :label='"Número de Documento"'
                  :placeholder='"Número de Documento"'
                  :data-vv-as='"Número de Documento"'
                  name='numeroDocumento'
                  maxlength='8'
                  v-validate='{ required: true, min: 8, max: 8 }'
                  :error='errors.first("formDatosLogin.numeroDocumento")'
                  v-model.trim='formDatosLogin.numeroDocumento')
              .col-lg-12.col-md-12.col-sm-12.col-xs-12
                k-input(
                  :label='"Clave"'
                  :placeholder='"Clave"'
                  :data-vv-as='"Clave"'
                  name='clave'
                  maxlength='255'
                  v-validate='{"required": true, "max": 255}'
                  :error='errors.first("formDatosLogin.clave")'
                  v-model.trim='formDatosLogin.clave')
              .col-12.col-md-12
                .box-recaptcha
                  img(src='@/assets/images/recaptcha_16dp.png')
                  span Protección de reCAPTCHA. Privacidad-Condiciones
              k-button-layout.col-lg-12
                k-button(type='submit' class='btn-block') Iniciar sesión
        .box-form-others
          .box-form-options(v-if='boolActionsBtn')
            .box-olvido-clave.text-center
              k-button(type='link' @click='olvideClave' class='mt-2') Olvidé mi clave
            .box-registrate-ahora.text-center
              k-button(type='link' @click='registrateAhora') ¿No tienes cuenta? ¡Regístrate ahora!
          .box-form-content
            .box-olvido-clave-content(v-if='boolOlvidoClave')
              h2 Recuperación de Cuenta
              form( novalidate='' @submit.prevent='onDatosOlvidoClave' data-vv-scope='formDatosOlvidoClave')
                .row
                  .col-lg-12.col-md-12.col-sm-12.col-xs-12
                    k-input(
                      mask='########'
                      :label='"Número de Documento"'
                      :placeholder='"Número de Documento"'
                      :data-vv-as='"Número de Documento"'
                      name='numeroDocumento'
                      maxlength='8'
                      v-validate='{ required: true, min: 8, max: 8 }'
                      :error='errors.first("formDatosOlvidoClave.numeroDocumento")'
                      v-model.trim='formDatosOlvidoClave.numeroDocumento')
                  k-button-layout.col-lg-12.mt-3
                    k-button(type='submit') Recuperar Cuenta
                    k-button(type='link' @click='volverAlInicio') Volver
            .box-registrate-ahora-content(v-if='boolRegistrateAhora')
              h2 Crea tu cuenta.
              form( novalidate='' @submit.prevent='onDatosRegistro' data-vv-scope='formDatosRegistro')
                .row
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
                  k-button-layout.col-lg-12.mt-3
                    k-button(type='submit') Crear Cuenta
                    k-button(type='link' @click='volverAlInicio') Volver
    
</template>
<script>
import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';
export default {
  name: 'Inicio',
  dependencies: ['CommonService', 'GenericService', 'reCAPTCHA_SITE_KEY'],
  components: {
    VueRecaptcha,
  },
  data: () => ({
    operadores: [],
    boolLogin: true,
    boolActionsBtn: true,
    boolOlvidoClave: false,
    boolRegistrateAhora: false,
    formDatosLogin: {
      numeroDocumento: null,
      clave: null,
    },
    formDatosOlvidoClave: {
      numeroDocumento: null,
    },
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
    }
  }),
  async created() {
    // await this.fetchData();
  },
  computed: {
    ...mapGetters({
      commingView: fuvexTypes.getters.getComingView,
    }),
    sitekey() {
      return this.reCAPTCHA_SITE_KEY;
    },
  },
  methods: {
    ...mapWrapper({
      
    }),
    ...mapValidation({
      // async continuar() {
      //   await this.$store.dispatch(fuvexTypes.actions.changeView, 'AvisoSiguiente1');
      // },
      async onDatosLogin() {
        try {
          if (process.env.NODE_ENV === 'production') {
            this.$refs.invisibleRecaptcha.execute();
          } else {
            this.onVerify('qwerty');
          }
        } catch (err) {
          if ([400].includes(err.status)) {
            this.$swal({ type: err.type, text: err.message });
          } else {
            throw err;
          }
        }
      },
      async onDatosOlvidoClave() {
        const { flag, message } = await this.GenericService.store({
          uri: 'recuperaPassword',
          data: { ...this.formDatosOlvidoClave },
        });
        if(flag === 1){
          this.$swal({ type: 'success', text: message });
          this.volverAlInicio();
        }
        
      },
      async onVerify(response) {
        try {
          const { vistaHTML, valor, motivo } = await this.GenericService.storeWithToken({
            uri: 'evaluations/register-first-request',
            data: { ...this.formDatosLogin, recaptcha: response },
          });
          if (valor === 1 || valor === 2) {
            await this.$store.dispatch(fuvexTypes.actions.changeView, vistaHTML);
          } else if (valor === 3){
            this.$swal({ type: 'info', text: 'El cliente ya cuenta con un proceso en trámite' });
          } else if (valor === 4){
            this.$swal({ type: 'info', text: 'El cliente ha colocado datos que no coinciden con la solicitud' });
          } else {
            this.$swal({ type: 'info', text: 'Ooops. Error inesperado.' });
          }
        } finally {
          // this.onExpired();
        }
      },
    }),
    onExpired() {
      this.$refs.invisibleRecaptcha.reset();
    },
    olvideClave() {
      this.boolOlvidoClave = true;
      this.boolRegistrateAhora = false;
      this.boolLogin = false;
      this.boolActionsBtn = false;
    },
    registrateAhora() {
      this.boolOlvidoClave = false;
      this.boolRegistrateAhora = true;
      this.boolLogin = false;
      this.boolActionsBtn = false;
    },
    volverAlInicio() {
      this.boolOlvidoClave = false;
      this.boolRegistrateAhora = false;
      this.boolLogin = true;
      this.boolActionsBtn = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
    color: #005794;
    padding: 0 2rem;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .page-login{
    min-height: calc(100vh - 63px);
    background-image: url('../assets/images/bg-app.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #212529;
    width: calc(100% - 30vh);
  }
  .box-lateral-blue{
    background-color: #005794;
    float: right;
    width: 30vh;
    height: calc(100vh - 63px);
    margin-right: -30vh;
    position: relative;
  }
  .box-lateral-blue .box-section-bottom{
    bottom: 5vh;
    position: absolute;
    width: 100%;
  }
  .box-lateral-blue .box-section-bottom .box-redes{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem
  }
  .box-lateral-blue .box-section-bottom .box-redes > a{
    margin-right: 1rem;
  }
  .box-lateral-blue .box-section-bottom .box-libro-rec{
    display: flex;
    padding: 1rem 2.5rem;
  }
  .box-lateral-blue .box-section-bottom .box-redes img{
    width: 30px;
  }
  .box-lateral-blue .box-section-bottom .box-libro-rec span{
    color: white;
    font-weight: 200;
    line-height: 1.1;
  }
  .angle-separator-content{
    position: absolute;
    height: 63px;
    width: 100%;
    top: 0;
    background-color: #005794;
  }
  .angle-separator-content .angle-separator-bottom{
    height: 63px;
    position: absolute;
    width: 100%;
    top: 0;
    background-color: white;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 4% 65%;
    z-index: 1;
  }
  .luna-corner{
    width: 70px;
    height: 80px;
    border-radius: 56% 1% 50%;
    box-shadow: 0px 50px 0px 0 #ffffff;
    border-bottom-left-radius: 4% 45%;
    position: absolute;
    right: 0;
    top: -5rem;
  }
  .box-forms-content .box-forms{
    background-color: white;
    border-radius: 2rem;
    padding: 2.25rem;
    width: 540px;
    position: absolute;
    top: 5.9rem;
    right: calc(30vh - 0%);
  }
  button.k-button.btn-block{
    width: 100%;
  }
  .box-recaptcha{
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .box-recaptcha span{
    color: #a6a6a6;
  }
  .box-recaptcha img{
    width: 18px;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  .info-contacto small > a{
    color: #00d7cb;
  }

  // .box-olvido-clave .btn{
  //   color: #21b8c6;
  // }
  .box-registrate-ahora button{
    color: #829723;
  }

  .btn-green{
    background-color: #829723;
    color: white;
  }
  .box-form-content h2{
    
    text-align: center;
    color: #829723;
  }
  // Small devices (landscape phones, 576px and up)
  @media (max-width: 576px) {
    h1 {
      font-size: 1.25rem;
    }
  }
</style>