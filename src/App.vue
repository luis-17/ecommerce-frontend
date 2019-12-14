<template lang="pug">
  div
    vue-element-loading(
      :active='$wait.waiting("global")'
      :is-full-screen='true')
      vue-simple-spinner(
        :size='50'
        :line-size='7'
        :message='$t("messages.processing")')
    vue-element-loading(
      :active='$wait.waiting("uploading")'
      :is-full-screen='true')
      vue-simple-spinner(
        :size='50'
        :line-size='7'
        :message='$t("messages.uploading")')
    k-header
      template(
        v-if='$can("logged", "USER")'
        v-slot:header='')
        .box-menu
          ul.box-content-menu
            li
              a( href='javascript:void(0)' @click='$router.push({ name: "Home" })' ) INICIO
            li
              a( href='javascript:void(0)' @click='$router.push({ name: "AgendarCita" })' ) AGENDAR CITA
            li
              a( href='javascript:void(0)' @click='$router.push({ name: "HistorialCitas" })' ) HISTORIAL
        .box-perfil
          .box-perfil-content
            .box-photo
              a( href='javascript:void(0);' @click='$router.push({ name: "PerfilPaciente" })')
                img(src='@/assets/images/default.jpg')
            .box-info
              .box-info-rol Bienvenido
              .box-info-nickname {{ user.nombres }}
            .logout
              a.logout-text(href='javascript:void(0)' @click='cerrarSesion')
                img(src='@/assets/images/icons/shutdown.png')
      template(
        v-else=''
        v-slot:form='')
    .vh-app
      router-view
</template>

<script>
import { mapGetters } from 'vuex';
import notificationsTypes from '@/store/types/notifications';
import fuvexTypes from '@/store/types/fuvex';
import accountTypes from '@/store/types/account';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'App',
  mixins: [vueinterval],
  data: () => ({
    username: null,
  }),
  computed: {
    ...mapGetters({
      notifications: notificationsTypes.getters.getStack,
      user: accountTypes.getters.getUser,
      inProcess: fuvexTypes.getters.getInProcess,
    }),
  },
  created() {
    window.addEventListener('beforeunload', this.handler);
    // console.log(accountTypes.getters.getUser, 'accountTypes.getters.getUser')
    this.username = accountTypes.getters.getUser;
  },
  methods: {
    showStepper() {
      this.$store.dispatch(fuvexTypes.actions.showStepper);
    },
    async cerrarSesion() {
      await this.$store.dispatch(accountTypes.actions.logout);
      await this.$store.dispatch(fuvexTypes.actions.closeProcess);
      this.$router.push({ name: 'Inicio' });
    },
    INTERVAL__9000$ping() {
      // if (this.user.username) {
      //   this.$store.dispatch(accountTypes.actions.keepAlive).catch(async () => {
      //     await this.$store.dispatch(accountTypes.actions.logout);
      //     await this.$store.dispatch(fuvexTypes.actions.closeProcess);
      //     this.$swal({
      //       type: 'warning',
      //       title: 'Sesi\u00F3n expirada',
      //     }).then(() => {
      //       this.$router.push({ name: 'Login' });
      //     });
      //   });
      // }
    },
  },
  watch: {
    notifications(newValue) {
      if (newValue && newValue.length > 0) {
        ((item) => {
          this.$swal({
            type: item.type,
            text: item.message,
          });
        })(newValue[newValue.length - 1]);
      }
    },
  },
  async onIdle() {
    if (this.user.username) {
      await this.$store.dispatch(accountTypes.actions.logout);
      await this.$store.dispatch(fuvexTypes.actions.closeProcess);
      this.$swal({
        type: 'warning',
        title: 'Sesi\u00F3n expirada',
      }).then(() => {
        this.$router.push({ name: 'Login' });
      });
    }
  },
  onActive() {
    // is active
  },
};
</script>
<style lang="scss">
  @import '@/assets/custom.scss';
  @import '@/../node_modules/bootstrap/scss/bootstrap.scss';
  @import '@/assets/form.scss';
  @import '@/../node_modules/pikaday/scss/pikaday.scss';
  .navbar-brand{
    margin-left: 1rem;
  }
  .box-perfil{

  }
  .box-perfil-content{
    display: flex;
    align-items: center;
    padding-right: 30px;
  }
  .header-nav{
    display: flex;
  }
  .box-info{
    display: inline-block;
    padding: 2px 20px;
    border-left: 1px solid #e0e0e0;
    font-weight: 300;
  }
  .box-info .box-info-rol{
    font-weight: bold;
  }
  .box-photo{
    display: flex;
    padding: 4px 20px;
  }
  .box-photo a{
    border: 3px solid #829723;
    border-radius: 50%;
  }
  .box-photo img{
    height: 40px;
    border-radius: 50%;
    width: 40px;
  }
  .box-perfil-content .logout{
    display: inline-block;
    border-left: 1px solid #e0e0e0;
    padding: 8px 20px;
  }
  .box-perfil-content .logout img{
    width: auto;
    height: 26px;
  }
  
</style>