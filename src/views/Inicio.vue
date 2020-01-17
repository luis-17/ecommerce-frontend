<template lang="pug">
  .page-login
    .box-lateral-blue
      .box-section-bottom
        .box-redes
          a(class='box-facebook' href='https://www.facebook.com/CLINICAPROVIDENCIAOFICIAL')
            img(src='@/assets/images/Icon_Facebook.svg')
          a(class='box-instagram' href='https://www.instagram.com/clinicaprovidenciaperu/')
            img(src='@/assets/images/Icon_Inst.svg')
    .box-forms
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
                name='username'
                maxlength='8'
                v-validate='{ required: true, min: 8, max: 8 }'
                :error='errors.first("formDatosLogin.username")'
                v-model.trim='formDatosLogin.username')
            .col-lg-12.col-md-12.col-sm-12.col-xs-12
              k-input(
                type='password'
                :label='"Clave"'
                :placeholder='"Clave"'
                :data-vv-as='"Clave"'
                name='password'
                maxlength='255'
                v-validate='{"required": true, "max": 255}'
                :error='errors.first("formDatosLogin.password")'
                v-model.trim='formDatosLogin.password'
                :all-uppercase='false')
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
            k-button(type='link' @click='$router.push({ name: "RegistrarCuenta" })') ¿No tienes cuenta? ¡Regístrate ahora!
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
</template>
<script>
import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';
import { mapGetters } from 'vuex';
import { mapWaitingActions } from 'vue-wait';
// import fuvexTypes from '@/store/types/fuvex';
import store from 'store2';
import accountTypes from '@/store/types/account';
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
      username: null,
      password: null,
    },
    formDatosOlvidoClave: {
      numeroDocumento: null,
    },
  }),
  async created() {
    // await this.fetchData();
  },
  computed: {
    // ...mapGetters({
    //   commingView: fuvexTypes.getters.getComingView,
    // }),
    sitekey() {
      return this.reCAPTCHA_SITE_KEY;
    },
  },
  methods: {
    ...mapWaitingActions({
      login: {
        action: accountTypes.actions.login,
        loader: 'global',
      },
    }),
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
        const arrData = await this.GenericService.store({
          uri: 'recuperaPassword',
          data: { ...this.formDatosOlvidoClave },
        });
        // console.log(arrData, 'arrDataaatr');
        const { flag, message } = arrData;
        if(flag === 1){
          this.$swal({ type: 'success', text: message });
          this.volverAlInicio();
        }
      },
      async onVerify(response) {
        try {
          // const arrData = await this.GenericService.storeWithToken({
          //   uri: 'login',
          //   data: { ...this.formDatosLogin, recaptcha: response },
          // });
          const arrData = await this.login({ ...this.formDatosLogin, recaptcha: response });
          // console.log(arrData, 'arrDataarrData');
          const { flag, token } = arrData;
          if (flag === 1) {
            store.set('TID', token);
            this.$router.push({ name: "Home" })
            // await this.$store.dispatch(fuvexTypes.actions.changeView, 'Home');
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
    // min-height: calc(100vh - 63px);
    min-height: calc(100vh);
    background-image: url('../assets/images/bg-app.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // background-color: #212529;
    width: calc(100% - 230px);
  }
  .box-lateral-blue{
    background-color: #005794;
    float: right;
    width: 230px;
    height: calc(100vh);
    margin-right: -230px;
    position: relative;
  }
  .box-lateral-blue .box-section-bottom{
    position: absolute;
    width: 100%;
    bottom: 12vh;
  }
  .box-lateral-blue .box-section-bottom .box-redes{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem
  }
  .box-lateral-blue .box-section-bottom .box-redes > a.box-facebook{
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
  .box-forms{
    background-color: white;
    border-radius: 2rem;
    padding: 2.25rem;
    width: 540px;
    position: absolute;
    top: 5.9rem;
    right: 230px;
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
  
  @media (max-width: 1199px){

  }
  @media (max-width: 992px){ /* 992 a 769*/
    .box-forms {
      background-color: rgba(255,255,255,0.75);
    }
    .box-recaptcha span {
      color: #4e4e4e;
    }
  }
  @media (max-width: 768px){ /* 768 a 577 */
    .page-login{
      width: 100%;
    }
    .box-lateral-blue{
      display: none;
    }
    .box-forms{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      right: 0;
      left: 0;
      margin: auto;
    }
  }
  @media (max-width: 576px) { /*576 a 376*/
    .box-forms{
      width: auto;
      margin: 0 1rem;
    }
    .box-form-login{
      color: #00386c;
      font-size: 16px;
    }
    h1{
      font-size: 1.25rem;
      margin-bottom: 1rem;
      padding: 0;
    }
    .box-recaptcha{
      // text-align: center;
      text-align: center;
      font-size: 12px;
      line-height: 0.5;
    }
  }
  @media (max-width: 375px) {
    
  }
</style>