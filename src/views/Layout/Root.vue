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
// import AvisoSiguiente1 from '@/views/AvisoSiguiente1.vue';
import DatosRepresentanteLegal from '@/views/DatosRepresentanteLegal.vue';
import DatosContactoAdministrativo from '@/views/DatosContactoAdministrativo.vue';
import Pin from '@/views/Pin.vue';
import DatosFinanciamiento from '@/views/DatosFinanciamiento.vue';
import Simulacion from '@/views/Simulacion.vue';
import DatosDesembolso from '@/views/DatosDesembolso.vue';

export default {
  name: 'Root',
  components: {
    Inicio,
    // AvisoSiguiente1,
    DatosRepresentanteLegal,
    DatosContactoAdministrativo,
    Pin,
    DatosFinanciamiento,
    Simulacion,
    DatosDesembolso,
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