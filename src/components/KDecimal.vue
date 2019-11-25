<script>
export default {
  name: 'KDecimal',
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
    maxlength: {
      type: String,
      default: '255',
    },
    placeholder: {
      type: String,
      default: '',
    },
    info: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    wholeNumberPart: Number,
    decimalPart: Number,
  },
  data: () => ({
    id: null,
    oldValue: null,
  }),
  watch: {
    value(newValue, oldValue) {
      this.oldValue = oldValue;
    },
  },
  mounted() {
    const self = this;
    self.id = self._uid;
  },
  computed: {
    pattern1() {
      return `^(\\d{1,${this.wholeNumberPart}})(\\.)?$`;
    },
    pattern2() {
      return `^(\\d{1,${this.wholeNumberPart}})(\\.\\d{1,${this.decimalPart}})?$`;
    },
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
    genInputText() {
      return this.$createElement('input', {
        ref: 'input',
        staticClass: 'form-control',
        class: {
          'is-invalid': this.error,
        },
        attrs: {
          id: this.id,
          name: this.name,
          type: this.internalType,
          maxlength: this.maxlength,
          placeholder: this.placeholder,
          autocomplete: 'off',
          disabled: !!this.readonly,
        },
        domProps: {
          value: this.value,
        },
        on: {
          input: (event) => {
            this.$emit('input', event.target.value);
          },
          keypress: (event) => {
            const key = String.fromCharCode(event.keyCode);
            if (!/(\d|\.)/.test(key) || (key === '.' && `${this.value}`.indexOf('.') !== -1)) {
              event.preventDefault();
              return false;
            }
            return true;
          },
          keyup: () => {
            if (this.value !== '' && this.value !== null) {
              const regexp1 = new RegExp(this.pattern1);
              const regexp2 = new RegExp(this.pattern2);
              if (this.value.startsWith('.')) {
                this.$emit('input', null);
              } else if (regexp1.test(this.value)) {
                // empty
              } else if (!regexp2.test(this.value)) {
                if (regexp2.test(this.oldValue)) {
                  this.$emit('input', this.oldValue);
                } else {
                  this.$emit('input', null);
                }
              }
            }
          },
          blur: () => {
            if (this.value !== '' && this.value !== null && this.value.endsWith('.')) {
              this.$emit('input', this.value.slice(0, -1));
            }
          },
          paste: (event) => {
            // const clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData;
            // const replacedData = clipboardData.getData('text');
            event.preventDefault();
            return false;
          },
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
      self.genInputText(),
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
  label.float-left{
    margin-bottom: 0.25rem;
    margin-top: 0.75rem;
    margin-left: 0.75rem;
  }
  input {
    color: #868686;
    border-color: #bfbfbf;
    background-color: #fafafa;
  }
  input.form-control{
    padding: 0.6rem 0.8rem;
    height: auto;
  }
  input.form-control:focus{
    color: inherit;
    background-color: #fafafa;
    border-color: #06da62;
    outline: 0;
    -webkit-box-shadow: inset -1px -13px 8px -12px rgba(21, 228, 75, 0.25);
    box-shadow: inset -1px -13px 8px -12px rgba(21, 228, 75, 0.25);
  }
  button{
    border-color: #bfbfbf;
  }
  .input-group .input-group-append label{
    margin: 0;
  }
</style>
