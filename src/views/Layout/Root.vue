<template lang="pug">
  #root
    component(
      :is='view'
      :class='{ "k-bottom": view !== "ValidacionInicial" }')
</template>
<script>
import { mapGetters } from 'vuex';
// import solicitudTypes from '@/store/types/solicitud';
import fuvexTypes from '@/store/types/fuvex';
import Inicio from '@/views/Inicio.vue';

export default {
  name: 'Root',
  components: {
    Inicio,
  },
  computed: {
    ...mapGetters({
      comingView: fuvexTypes.getters.getComingView,
      view: fuvexTypes.getters.getView,
    }),
  },
  async created() {
    await this.$store.dispatch(fuvexTypes.actions.changeView, 'Inicio');
  },
};
</script>