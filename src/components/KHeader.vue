<template lang="pug">
  nav.k-header.navbar.container-fluid
    a.navbar-brand
      img(src='@/assets/images/logo-h.png')
    .header-nav
      slot(name='header')
</template>

<script>
export default {
  name: 'KHeader',
  inheritAttrs: false,
  props: {
  },
  data() {
    return {
      id: null,
    };
  },
  mounted() {
    this.id = this._uid;
  },
};
</script>
<style lang="scss" scoped="">
.navbar {
  z-index: 2;
  box-shadow: -1px -4px 18px 0px rgba(70, 70, 70, 0.4);
  padding-left: 7.5rem;
  width: 100%;
  background-color: white;
  position: fixed;
  right: 0;
  z-index: 2;
  color: #607d8b;
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