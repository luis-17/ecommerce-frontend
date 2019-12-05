<template lang="pug">
  .custom-control.custom-radio.custom-control-inline
    input.custom-control-input(
      :id='id'
      type='radio'
      :name='name'
      autocomplete='off'
      :value='value'
      :checked='checked == value'
      @change='$emit("change", $event.target.value)'
      :class='{"is-invalid": error}')
    label.custom-control-label(
      :class='{ active: checked == value }'
      :for='id') {{ label }}
</template>

<script>
import $ from 'jquery';

export default {
  name: 'KButtonRadio',
  inheritAttrs: false,
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.checked;
    },
    validator: 'new',
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {},
    name: String,
    label: String,
    error: String,
    value: {},
    info: String,
  },
  data() {
    return {
      id: null,
    };
  },
  mounted() {
    this.id = this._uid;
    if (this.info) {
      $(this.$refs.info).tooltip();
    }
  },
};
</script>

<style lang="scss">
  .custom-control.custom-radio .custom-control-label::before{
    border-radius: 25% 0;
  }
  .custom-control.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
  .custom-control-label {
    padding-left: 0.5rem;
  }
  .custom-control.custom-radio .custom-control-label::after{
    width: 1.5rem;
    height: 1.5rem;
  }
  .custom-control.custom-radio .custom-control-label::before {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>