<script>
export default {
  name: 'KContainer',
  inheritAttrs: true,
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
  render(h) {
    const self = this;
    return h('div', {
      staticClass: 'k-container container-fluid',
    }, [
      h('div', {
        staticClass: 'row',
      }, [
        h('div', {
          staticClass: 'col',
        }, self.$slots.default),
      ]),
    ]);
  },
};
</script>
