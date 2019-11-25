<template lang="pug">
  nav.k-footer.navbar.navbar-expand-lg
    a.navbar-brand.mx-auto
      img(src='@/assets/images/logo.png' width='76px')
</template>

<script>
export default {
  name: 'KFooter',
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
