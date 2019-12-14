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
  background-color: white;
  position: fixed;
  z-index: 2;
  color: #607d8b;
  min-height: 63px;
  max-width: 1440px;
  display: flex;
  right: 0;
  left: 0;
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
.box-content-menu{
  display: flex;
  margin: 0;
  font-size: 20px;
  list-style: none;
}
.box-content-menu li{
  padding: 12px 20px 12px 12px;
}
.box-menu{
  display: flex;
  flex: 2;
  align-items: center;
}
.box-content-menu li a{
  color: #003d71;
  transition: all 0.25s;
  text-decoration: none;
  font-weight: normal;
}
.box-content-menu li a.active{
  color: #829723;
  font-weight: 600;
}
.box-content-menu li a:hover{
  color: #829723;
}
@media (max-width: 1199px){
  .box-content-menu li{
    padding: 12px;
    font-size: 18px;
  }
}
@media (max-width: 992px){ /* 992 a 769*/
  .box-menu{
    display: none;
  }
  .header-nav{
    flex: unset;
  }
  .navbar{
    justify-content: space-between;
  }
}
@media (max-width: 768px){ /* 768 a 577 */
  
}
@media (max-width: 576px) { /*576 a 376*/

}
@media (max-width: 375px) {

}
</style>