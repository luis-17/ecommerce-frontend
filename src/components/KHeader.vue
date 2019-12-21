<template lang="pug">
  nav.k-header.navbar.container-fluid(:class='{"logged": user.idusuario}')
    section.header-nav 
      a.navbar-brand
        img(src='@/assets/images/logo-h.png')
      slot(name='header')
    section.lateral-nav.box-menu-mobile(:class='classDynamic')
      slot(name='lateralMobile')
</template>

<script>
import { mapGetters } from 'vuex';
import accountTypes from '@/store/types/account';
export default {
  name: 'KHeader',
  inheritAttrs: false,
  props: {
    classDynamic:{
      default: null,
      type: String,
    },
  },
  data: () => ({
    id: null,
    // classDynamic: null,
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
$accent: #829723;
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
  max-width: 1600px;
  display: flex;
  right: 0;
  left: 0;
}
.navbar .lateral-nav{
  display: none;
}
.navbar.logged{
  background-color: white;
}
a.navbar-brand{
  padding: 0;
  margin: 0;
}
a.navbar-brand > img{
  width: 200px;
}
.box-perfil-content{
  display: flex;
  align-items: center;
  padding-right: 30px;
}
.header-nav{
  display: flex;
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
.box-perfil .icon-menu{
  display: none;
}
.box-perfil-content .logout i{
  color: #607d8b;
  font-size: 36px;
}
.box-perfil .box-icon{
  display: none;
}

/*MENU MOBILE*/
/*MENU MOBILE*/
.box-menu-mobile{
    display: none;
}
.box-menu-mobile.semion .otras-opciones{
    display: none;
}
.box-menu-mobile.on .otras-opciones{
    display: flex;
    height: 60px;
    border-bottom: 1px solid rgba(224, 224, 224, 0.18);
    padding: 0 20%;
    justify-content: space-evenly;
    align-items: center;
}
.box-menu-mobile.off{
    display: none !important;
}
.navbar .navbar-content .box-perfil.semion{
    margin-right: 75px;
}

.box-menu-mobile{
    transition: right 1000ms cubic-bezier(0.05, 0.74, 0.27, 0.99), top 1000ms cubic-bezier(0.05, 0.74, 0.27, 0.99);
    will-change: transform;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    position: fixed;
    top: 70px;
    bottom: 0;
    right: 0;
    display: block;
    margin: 0;
    padding: 0 0 20px;
    width: 280px;
    z-index: 120;
    // background-color: #fff;
    box-shadow: 3px 0 8px rgba(0,0,0,.05);
    overflow: hidden;
    border-right: 1px solid #e8eef4;
    background-color: #0033a0;
}

// .box-menu-mobile.collapsed .post-logo-content{
//     visibility: hidden;
// }
.box-menu-mobile .box-mp{
    text-align: center; 
}
.box-menu-mobile .box-mp .box-label-mp{
    padding: 18px 30px;
    margin: 0;
    font-size: 12px;
    border-bottom: 1px solid rgba(224, 224, 224, 0.18);
    letter-spacing: 1px;
    font-weight: bold;
    color: white;
    height: 56px;
}
.box-menu-mobile .items .item{
    border-bottom: 1px solid rgba(224, 224, 224, 0.18);
}
.box-menu-mobile .items .item a{
    padding: 8px 12px;
    color: white;
    text-align: left;
    position: relative;
    display: flex;
    align-items: center;
}
.box-menu-mobile .items .item a:hover > i, 
.box-menu-mobile .items .item a.active > i {
    color: white; 
    background: $accent;
}
.box-menu-mobile .items .nav{
    display: block;
}
.box-menu-mobile .items .item a > span{
    display: inline-block;
    margin-left: 20px;
}
.box-menu-mobile .items .item a > i{
    float: left;
    background-color: #011a50;
    border-radius: 40px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: white;
    text-align: center;
    font-size: 18px;
    position: relative;
    transition: all .15s linear;
    will-change: transform;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
// .box-menu-mobile .items .item a:hover, 
// .box-menu-mobile .items .item a.active {
//     // background-color: #eef3f8;
//     // color: #21252d;
// }
.box-menu-mobile .items .item a:hover > span, 
.box-menu-mobile .items .item a.active > span{
    color: #00aecb; 
}
.box-menu-mobile .items .item a:hover > i, 
.box-menu-mobile .items .item a.active > i {
    color: white; 
}
.box-menu-mobile .otras-opciones{
    display: flex;
    // align-items: center;
}
.box-menu-mobile .otras-opciones .box-icon-menu-sm > a{
    display: flex;
    border: 3px solid #829723;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    justify-content: center;
}
.box-menu-mobile .otras-opciones .box-icon-menu-sm > a > i{
    font-size: 30px;
    height: auto;
    width: auto;
    color: #829723;
    display: flex;
    align-items: center;
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
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .navbar{
    justify-content: space-between;
  }
  .box-perfil .box-icon{
    display: flex;
    padding-right: 0;
    border-left: 1px solid #e0e0e0;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 0.8rem;
    display: none;
    padding-left: 0;
    width: 64px;
    text-align: center;
  }
  .box-perfil .box-icon.visible{
    display: block;
  }
  .box-perfil .box-icon i{
    font-size: 36px;
    color: #829723;
  }
  .box-menu-mobile.semion{
      right: -215px;
  }
  .box-menu-mobile.on{
      display: block;
  }
  .navbar.logged .lateral-nav{
    display: block;
  }
  .box-perfil-content .logout{
    display: none;
  }
  // .box-perfil .box-icon{
    
  // }
  // {

  // }
  .box-perfil-content{
    padding: 0;
  }
  .navbar.logged{
    padding-right: 0;
  }
}
@media (max-width: 768px){ /* 768 a 577 */
  .navbar{
    padding-left: 1rem;
  }
  .navbar-brand {
    margin: 0;
  }
  .box-perfil-content{
    padding: 0;
  }
  // .box-perfil-content .logout{
  //   padding-right: 0;
  //   padding-left: 0.8rem;
  // }
}
@media (max-width: 576px) { /*576 a 376*/
  .box-info{
    display: none;
  }
  a.navbar-brand > img{
    width: 175px;
  }
  .box-photo{
    padding: 0 20px;
  }
  .box-perfil .box-icon img{
    height: 45px;
  }
  .box-perfil .box-icon{
    padding: 0;
  }
  // .box-photo img{
  //   width: 25px;
  //   height: 25px;
  // }
  .box-photo a{
    border: 2px solid #829723;
  }
  .navbar.logged .lateral-nav{
    top: 63px;
  }
  // .box-perfil .box-icon{
  //   padding-left: 0;
  //   width: 64px;
  //   display: block;
  //   text-align: center;
  // }
  .navbar.logged{
    padding-right: 0;
  }
  .box-menu-mobile.semion {
    right: -280px;
  }
}
@media (max-width: 375px) {
  .box-perfil .box-icon{
    border: unset;
  }
  .box-photo{
    padding: 0;
  }
}
</style>