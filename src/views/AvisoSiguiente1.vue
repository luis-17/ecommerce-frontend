<template lang="pug">
  .page-aviso-sgte-1
    .container
      h2 
        span Vamos bien 
        b FINTECH CAPITAL GROUP, 
        span has pasado la primera evaluación, 
        br 
        span "Estas cerca de obtener tu préstamo". 
        //- .col-12
      .box-action
        k-button-layout.col-lg-12
          k-button(type='button' @click='continuar()') Continuar
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'AvisoSiguiente1',
  dependencies: ['CommonService', 'GenericService'],
  components: {
    // ConfirmRequisitos,
  },
  data: () => ({
    showConfirm: false,
    operadores: [],
    fDatosCliente: {
      id: null,
      nombres: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
    },
  }),
  async created() {
    //await this.fetchData();
  },
  computed: {
    
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    ...mapValidation({
      async continuar(){
        await this.$store.dispatch(fuvexTypes.actions.changeView, 'DatosRepresentanteLegal');
      },
    })
    
  },
};
</script>
<style lang="scss" scoped="">
  .page-aviso-sgte-1{
    height: calc(100vh - 63px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-aviso-sgte-1 .container{
    width: 620px;
  }
  .page-aviso-sgte-1 .container h2{
    text-align: center;
    font-size: 1.8rem;
    color: #000000;
  }
  .page-aviso-sgte-1 .container .box-action{
    position: absolute;
    bottom: 60px;
  }
</style>