<template lang="pug">
  .form-group.custom-control.custom-checkbox
    input.custom-control-input(
      :id='id'
      :name='name'
      type='checkbox'
      autocomplete='off'
      :disabled='disabled',
      :aria-describedby='`${id}Help`'
      :checked='checked'
      @change='$emit("change", $event.target.checked)'
      :class='{"is-invalid": error}')
    label.custom-control-label(:for='id') {{label}} 
      a( :href='condicionesLink' v-if='condiciones' class="text-terciary") {{condiciones}}
    small.form-text.text-muted(
      :id='`${id}Help`'
      v-if='helper'
      v-html='helper')
    .invalid-tooltip(v-if='error' v-text='error')
</template>

<script>
export default {
  name: 'KCheckbox',
  inheritAttrs: false,
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.checked;
    },
    rejectsFalse: true,
    validator: 'new',
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
    name: String,
    label: String,
    error: String,
    helper: String,
    condiciones: String,
    condicionesLink: String,
    disabled: {
      type: Boolean,
      default: false,
    },
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
<style lang="scss">
  .custom-control.custom-checkbox{
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .custom-control.custom-checkbox .custom-control-label::before {
    border-radius: 25%;
  }
  .form-group > label{
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
</style>