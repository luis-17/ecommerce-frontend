<template lang="pug">
  .k-root()
    //- k-stepper(
    //-   v-if='stepper.show'
    //-   :title='stepper.title'
    //-   :items='stepper.items'
    //-   :numItemsByLine='stepper.numItemsByLine'
    //-   :currentStep='stepper.currentStep'
    //-   @swipeLeftHandler='swipeLeftHandler'
    //-   @swipeRightHandler='swipeRightHandler'
    //-   @go='goToStep'
    //-   @close='closeStepper')
    div()
      router-view
</template>

<script>
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';

export default {
  name: 'InRoot',
  computed: {
    // ...mapGetters({
    //   stepper: fuvexTypes.getters.getStepper,
    // }),
  },
  methods: {
    // async goToStep(item) {
    //   await this.$store.dispatch(fuvexTypes.actions.changeView, item.view);
    //   await this.$store.dispatch(fuvexTypes.actions.closeStepper);
    //   this.$router.push({ name: 'Fuvex/RegistroSolicitud' });
    // },
    // async closeStepper() {
    //   await this.$store.dispatch(fuvexTypes.actions.closeProcess);
    //   this.$router.push({ name: 'Fuvex/Home' });
    // },
    // swipeLeftHandler() {
    //   this.$store.dispatch(fuvexTypes.actions.nextStepper);
    // },
    // swipeRightHandler() {
    //   this.$store.dispatch(fuvexTypes.actions.prevStepper);
    // },
  },
};
</script>
<style lang="scss" scoped="">
    .k-root{
        // padding-top: 8rem;
        position: relative;
        top: 70px;
    }
</style>