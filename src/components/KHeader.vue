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
  height: 63px;
}
a.navbar-brand{
  padding: 0;
}
a.navbar-brand > img{
  width: 200px;
}
</style>