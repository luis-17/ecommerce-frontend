<template lang="pug">
  div
    k-modal(
      v-if='showConfirm'
      @close='$emit("update:show", false)')
      .text-center
        .mx-auto.w-75
          .box-letter.pb-3 {{ strTextTitle }}
      .k-button-layout
        k-button(@click='regresar' class='btn-light btn-sm') NO
        k-button(@click='$emit("confirm")' class='btn-sm') SI
</template>

<script>
import { mapWrapper } from '@/common/taco';

export default {
  name: 'Confirm',
  dependencies: ['CommonService', 'GenericService'],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    textTitle: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    strTextTitle: null,
    showConfirm: false,
    // textTitle: null,
    showConfirmReject: false,
    showReject: false,
    formReject: {
      reasonsRejection: [],
      comment: null,
    },
  }),
  async created() {
    // console.log(this.textTitle, 'this.textTitle');
    this.strTextTitle = this.textTitle;
  },
  computed: {
    // isOtrosSelected() {
    //   return this.formReject.reasonsRejection.find(r => r.checked && r.descripcion === 'OTROS');
    // },
  },
  watch: {
    show(newValue) {
      this.showConfirm = newValue;
    },
  },
  methods: {
    regresar() {
      this.showConfirm = false;
    },
  },
};
</script>
<style lang="scss" scoped="">
  .box-letter{
    font-size: 26px;
    text-align: center;
    color: #003d71;
    font-weight: 700;
  }
  .k-button-layout{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .k-button-layout button{
    width: 86px;
    min-width: 86px;
    padding: 0.5rem;
    border: unset;
  }
</style>