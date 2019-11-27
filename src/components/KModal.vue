<script>
export default {
  name: 'KModal',
  inheritAttrs: false,
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
      staticClass: 'k-modal container-fluid vh-100 fixed-top k-backdrop',
    }, [
      h('div', {
        staticClass: 'row align-items-center vh-100',
      }, [
        h('div', {
          staticClass: 'mx-auto col-sm-12 col-md-9 col-lg-5',
        }, [
          h('div', {
            staticClass: 'card',
          }, [
            h('div', {
              staticClass: 'card-header border-0 bg-white d-flex pt-3',
            }, [
              // h('img', {
              //   staticClass: 'ml-auto',
              //   attrs: {
              //     src: require('@/assets/images/icon_close.svg'),
              //     width: '15rem',
              //   },
              //   on: {
              //     click(event) {
              //       self.$emit('close', event);
              //     },
              //   },
              // }),
            ]),
            h('div', {
              staticClass: 'card-body py-1 dummy-modal',
            }, self.$slots.default),
          ]),
        ]),
      ]),
    ]);
  },
};
</script>
<style lang="scss" scoped="">
.card-body{
  color: #a6a6a6;
  font-weight: 200;
}
.card-header img{
  width: 24px;
}
// .item {
//   background-color: #1973B8 !important;
// }
// .card{
//   border-radius: 15px;
// }
// .card .card-header{
//   border-radius: 15px;
// }
</style>