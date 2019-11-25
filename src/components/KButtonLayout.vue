<script>
export default {
  name: 'KButtonLayout',
  inheritAttrs: true,
  props: {
    direction: {
      type: String,
      default: 'column',
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
    const self = this;
    return h('div', {
      staticClass: 'k-button-layout container',
    }, [
      h('div', {
        staticClass: 'row',
      }, [
        h('div', {
          staticClass: 'col text-center',
        }, self.$slots.default),
      ]),
    ]);
  },
};
</script>
