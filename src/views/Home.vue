<template lang="pug">
  .page-home
    .container
      .box-title
        h3 En breve te enviaremos un mensaje de 4 dígitos, el cual debes ingresar en la plataforma para firmar digitalmente los documentos contractuales. 
      .box-formulario
        
</template>

<script>
import Vue from 'vue';
import moment from 'moment-timezone';
import { mapGetters } from 'vuex';
import globalTypes from '@/store/types/global';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';
import { Validator } from 'vee-validate';

export default {
  name: 'Home',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    plazos: [],
    formDatosPin: {
      d1: null,
      d2: null,
      d3: null,
      d4: null,
    },
  }),
  async created() {
    // await this.fetchData();
  },
  computed: {
    ...mapGetters({
      comingView: fuvexTypes.getters.getComingView,
    }),
    isReady() {
      return !!this.formDatosPin.d1 && !!this.formDatosPin.d2 && !!this.formDatosPin.d3 && !!this.formDatosPin.d4;
    },
  },
  watch: {
    
  },
  methods: {
    async continuar() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'DatosFinanciamiento');
    },
    ...mapWrapper({
    }),
    ...mapValidation({
      async onDatosPin() {
        await this.GenericService.store({
          uri: 'evaluations/update-pin-data',
          data: {
            pin: `${this.formDatosPin.d1}${this.formDatosPin.d2}${this.formDatosPin.d3}${this.formDatosPin.d4}`,
          },
        });
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'DescargaCartaDscto');
      },
    }),
    // async reenviarPin() {

    // },
    async onBack() {
      await this.$store.dispatch(fuvexTypes.actions.changeView, 'ContratoCredito');
      return null;
    },
    onInputSelection(ref) {
      setInputSelection(this.$refs[ref], 0, -1);
    },
  },
};
</script>
<style lang="scss" scoped="">
  
</style>