<script>
export default {
  name: 'KSelect',
  inheritAttrs: false,
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.value;
    },
    validator: 'new',
  },
  props: {
    value: {},
    name: String,
    label: String,
    error: String,
    options: Array,
    placeholder: {
      type: String,
      default: '',
    },
    info: String,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    id: null,
    flag: false,
  }),
  mounted() {
    const self = this;
    self.id = self._uid;
  },
  methods: {
    genLabel() {
      return this.$createElement('label', {
        staticClass: 'float-left',
        class: {
          filled: !!this.value,
        },
        attrs: {
          for: this.id,
        },
        domProps: {
          textContent: this.label,
        },
      });
    },
    genSelect() {
      return this.$createElement('select', {
        ref: 'select',
        staticClass: 'custom-select form-control',
        class: {
          'is-invalid': this.error,
          'custom-select-selected': this.value !== null,
        },
        attrs: {
          id: this.id,
          name: this.name,
          autocomplete: 'off',
          disabled: !!this.readonly,
        },
        domProps: {
          value: this.value,
        },
        on: {
          input: event => this.$emit('input', event.target.value),
          change: event => this.$emit('change', event.target.value),
        },
      }, [
        this.genDefaultOption(),
        ...this.options.map(o => this.genOption(o)),
      ]);
    },
    genDefaultOption() {
      return this.$createElement('option', {
        attrs: {
          disabled: this.value !== null,
        },
        domProps: {
          value: null,
          textContent: this.placeholder,
        },
      });
    },
    genOption({ value, text: textContent }) {
      return this.$createElement('option', {
        domProps: {
          value,
          textContent,
        },
      });
    },
    genInvalidTooltip() {
      return this.$createElement('div', {
        staticClass: 'invalid-tooltip rounded-0',
        domProps: {
          textContent: this.error,
        },
      });
    },
    genInfoIcon() {
      return this.$createElement('font-awesome-icon', {
        staticClass: 'text-primary',
        attrs: {
          role: 'button',
          focusable: 'false',
          tabindex: '-1',
          icon: 'info-circle',
        },
      });
    },
  },
  render(h) {
    const self = this;
    return h('div', {
      // staticClass: 'form-label-group',
    }, [
      self.genLabel(),
      self.genSelect(),
      self.genInvalidTooltip(),
      self.info
        ? h('div', {
          staticClass: 'position-absolute pt-1m',
        }, [
          this.genInfoIcon(),
          h('small', {
            staticClass: 'ml-1 k-text-info',
            domProps: {
              textContent: self.info,
            },
          }),
        ]) : null,
    ]);
  },
};
</script>
<style lang="scss" scoped="">
.form-label-group {
  margin-bottom: 1.25rem;
}
label{
  margin-bottom: 0.25rem;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
}
select {
  color: #868686;
  border-color: #bfbfbf;
  background-color: #fafafa;
}
select.form-control{
  padding: 0.6rem 0.8rem;
  height: auto;
}
select.form-control{
  padding: 0.6rem 0.8rem;
  height: auto;
}
select.form-control:focus{
  color: inherit;
  background-color: #fafafa;
  border-color: #829723;
  outline: 0;
  -webkit-box-shadow: inset -1px -13px 8px -12px rgba(21, 228, 75, 0.25);
  box-shadow: inset -1px -13px 8px -12px rgba(21, 228, 75, 0.25);
}
button{
  border-color: #bfbfbf;
}
</style>