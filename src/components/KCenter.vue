<script>
export default {
  name: 'KCenter',
  inheritAttrs: true,
  props: {
    full: {
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
    const self = this;
    return h('div', {
      staticClass: 'k-center container-fluid',
      class: {
        full: self.full,
        default: !self.full,
      },
    }, [
      h('div', {
        staticClass: 'k-center row align-items-center',
        class: {
          full: self.full,
          default: !self.full,
        },
      }, [
        h('div', {
          staticClass: 'mx-auto col-sm-12 col-md-10 col-lg-8 col-xl-6',
        }, [
          h('div', {
            staticClass: 'card rounded-0 bg-transparent border-0',
          }, [
            h('div', {
              staticClass: 'card-body p-0',
            }, self.$slots.default),
          ]),
        ]),
      ]),
    ]);
  },
};
</script>
