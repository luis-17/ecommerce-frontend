<script>
export default {
  name: 'KButton',
  inheritAttrs: true,
  props: {
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'link'].indexOf(value) !== -1;
      },
    },
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
  render(h) {
    return h('button', {
      staticClass: 'k-button btn',
      class: {
        'btn-link': this.type === 'link',
        'btn-primary': this.type !== 'link',
      },
      attrs: {
        type: this.type === 'link' ? 'button' : this.type,
        disabled: this.disabled,
      },
      on: {
        click: e => this.$emit('click', e),
      },
    }, this.$slots.default);
  },
};
</script>

<style lang="scss" scoped="">
  button{
    padding: 0.5rem;
  }
</style>