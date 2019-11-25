<template lang="pug">
  .form-group.position-relative
    label(v-text='label')
    .form-control.btn-group.btn-group-toggle.border-0.p-0.h-auto(
      :class='{"is-invalid": error}')
      slot
    .invalid-tooltip(v-if='error' v-text='error')
</template>

<script>
export default {
  name: 'KButtonGroup',
  inheritAttrs: false,
  props: {
    label: String,
    error: String,
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
  .form-group{
    margin-bottom: 0.25rem;
  }
  .form-group.position-relative .form-control{
    display: flex;
    justify-content: space-between;
  }
</style>