<template lang="pug">
  nav.k-header.navbar.container-fluid(:class='{"logged": user.idusuario}')
    a.navbar-brand
      img(src='@/assets/images/logo-h.png')
    .header-nav
      slot(name='header')
</template>

<script>
import { mapGetters } from 'vuex';
import accountTypes from '@/store/types/account';
export default {
  name: 'KHeader',
  inheritAttrs: false,
  props: {
  },
  data: () => ({
    id: null,
  }),
  computed: {
    ...mapGetters({
      // notifications: notificationsTypes.getters.getStack,
      user: accountTypes.getters.getUser,
      // inProcess: fuvexTypes.getters.getInProcess,
    }),
  },
  mounted() {
    this.id = this._uid;
  },
  async created() {
    console.log(this.user, 'this.user,this.user');
  },
};
</script>
<style lang="scss" scoped="">
.navbar {
  z-index: 2;
  box-shadow: -1px -4px 18px 0px rgba(70, 70, 70, 0.4);
  padding-left: 3rem;
  width: 100%;
  // background-color: white;
  position: fixed;
  right: 0;
  z-index: 2;
  color: #607d8b;
  min-height: 63px;
}
.navbar.logged{
  background-color: white;
}
a.navbar-brand{
  padding: 0;
}
a.navbar-brand > img{
  width: 200px;
}
.header-nav{
  flex: 1;
}
</style>