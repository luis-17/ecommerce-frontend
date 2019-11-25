<script>
import rmask from 'vue-r-mask';
import uniqueId from 'lodash/uniqueId';
import {
  isMobile, isFirefox, mobileVendor,
} from 'mobile-device-detect';
import Pikaday from 'pikaday';
import moment from 'moment-timezone';

export default {
  name: 'KInput',
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
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'password', 'date'].indexOf(value) !== -1;
      },
    },
    mask: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    disableDayFn: Function,
    allUppercase: {
      type: Boolean,
      default: true,
    },
    onlyInteger: {
      type: Boolean,
      default: false,
    },
    onlyDecimal: {
      type: Boolean,
      default: false,
    },
  },
  directives: { rmask },
  data: () => ({
    id: null,
    showPassword: false,
  }),
  mounted() {
    const self = this;
    self.id = self._uid;
    if (self.isInputDate && ((!isMobile && !isFirefox) || mobileVendor === 'Apple')) {
      self.datePicker = new Pikaday({
        field: self.$refs.input,
        trigger: self.$refs.calendarButton,
        onOpen() {
          if (self.value) {
            self.datePicker.setMoment(moment(self.value, 'YYYY-MM-DD'));
          }
        },
        onSelect(date) {
          self.$emit('input', moment(date).format('YYYY-MM-DD'));
        },
        disableDayFn(date) {
          if (self.disableDayFn) {
            return self.disableDayFn(date);
          }
          return false;
        },
        i18n: {
          previousMonth: 'Anterior',
          nextMonth: 'Siguiente',
          months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'S\u00E1bado'],
          weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'S\u00E1b'],
        },
      });
    }
  },
  computed: {
    isInputText() {
      return this.type === 'text';
    },
    isInputPassword() {
      return this.type === 'password';
    },
    isInputDate() {
      return this.type === 'date';
    },
    internalType() {
      if (this.isInputPassword) {
        return this.showPassword ? 'text' : 'password';
      }
      return 'text';
    },
    inputDirectives() {
      const directives = [];
      if (this.mask) {
        directives.push({
          name: 'mask',
          rawName: 'v-mask',
          value: this.mask,
        });
      }
      if (this.onlyInteger) {
        directives.push({
          name: 'rmask',
          rawName: 'v-rmask',
          value: /\d{0,100}/,
        });
      }
      return directives;
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
            const value = this.allUppercase ? event.target.value.toUpperCase() : event.target.value;
            this.$emit('input', value === '' ? null : value);
          },
          change: (event) => {
            const value = this.allUppercase ? event.target.value.toUpperCase() : event.target.value;
            this.$emit('change', value === '' ? null : value);
          },
          keyup: (event) => {
            const value = this.allUppercase ? event.target.value.toUpperCase() : event.target.value;
            this.$emit('keyup', value === '' ? null : value);
          },
        },
        directives: this.inputDirectives,
      });
    },
    genInvalidTooltip() {
      return this.$createElement('div', {
        staticClass: 'invalid-tooltip ',
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
    genPasswordIcon() {
      return this.$createElement('font-awesome-icon', {
        attrs: {
          role: 'button',
          focusable: 'false',
          tabindex: '-1',
          icon: this.showPassword ? 'eye-slash' : 'eye',
        },
      });
    },
    genPasswordButton() {
      return this.$createElement('button', {
        staticClass: 'btn btn-light ',
        attrs: {
          tabindex: '-1',
          type: 'button',
        },
        on: {
          click: () => {
            this.showPassword = !this.showPassword;
          },
        },
      }, [
        this.genPasswordIcon(),
      ]);
    },
    genCalendarIcon() {
      return this.$createElement('font-awesome-icon', {
        staticClass: 'text-primary',
        attrs: {
          role: 'button',
          focusable: 'false',
          tabindex: '-1',
          icon: 'calendar-alt',
        },
      });
    },
    genCalendarButton() {
      const id = uniqueId('cal');
      return this.$createElement('label', {
        ref: 'calendarButton',
        attrs: {
          for: id,
        },
      }, [
        this.$createElement('span', {
          staticClass: 'btn border',
          style: {
            padding: '0.78rem 1.25rem !important',
          },
        }, [
          this.genCalendarIcon(),
        ]),
        this.$createElement('input', {
          staticClass: 'position-absolute',
          attrs: {
            id,
            tabindex: '-1',
            type: 'date',
          },
          style: {
            width: '0px',
            visibility: 'hidden',
            left: 0,
          },
          on: {
            change: (event) => {
              this.$emit('input', event.target.value);
            },
          },
        }),
      ]);
    },
    genInputPassword() {
      return this.$createElement('div', {
        staticClass: 'input-group',
        class: {
          'is-invalid': this.error,
        },
      }, [
        this.genInputText(),
        this.$createElement('div', {
          staticClass: 'input-group-append',
        }, [
          this.genPasswordButton(),
        ]),
      ]);
    },
    genInputDate() {
      return this.$createElement('div', {
        staticClass: 'input-group',
        class: {
          'is-invalid': this.error,
        },
      }, [
        this.genInputText(),
        this.$createElement('div', {
          staticClass: 'input-group-append',
        }, [
          this.genCalendarButton(),
        ]),
      ]);
    },
  },
  render(h) {
    const self = this;
    return h('div', {
      staticClass: 'mb-3pp',
    }, [
      self.genLabel(),
      self.isInputText
        ? self.genInputText()
        : self.isInputPassword
          ? self.genInputPassword()
          : self.genInputDate(),
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
  // .form-group-jp {
  //   margin-bottom: 1.25rem;
  // }
  label.float-left{
    margin-bottom: 0.25rem;
    margin-top: 0.75rem;
    margin-left: 0.5rem;
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
    border-color: #829723;
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