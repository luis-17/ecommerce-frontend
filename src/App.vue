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
  computed: {
    ...mapGetters({
      notifications: notificationsTypes.getters.getStack,
      user: accountTypes.getters.getUser,
      inProcess: fuvexTypes.getters.getInProcess,
    }),
  },
  created() {
    window.addEventListener('beforeunload', this.handler);
  },
  methods: {
    showStepper() {
      this.$store.dispatch(fuvexTypes.actions.showStepper);
    },
    async logout() {
      await this.$store.dispatch(accountTypes.actions.logout);
      await this.$store.dispatch(fuvexTypes.actions.closeProcess);
    },
    INTERVAL__9000$ping() {
      if (this.user.username) {
        this.$store.dispatch(accountTypes.actions.keepAlive).catch(async () => {
          await this.$store.dispatch(accountTypes.actions.logout);
          await this.$store.dispatch(fuvexTypes.actions.closeProcess);
          this.$swal({
            type: 'warning',
            title: 'Sesi\u00F3n expirada',
          }).then(() => {
            this.$router.push({ name: 'Login' });
          });
        });
      }
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
</style>