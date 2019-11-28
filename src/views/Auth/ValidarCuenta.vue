<template lang="pug">
  k-modal(@close='$router.push({ name: "Inicio" })')
    h4.mb-4.text-center <img src='@/assets/images/favicon.png' /> Validación de Cuenta
    p(:class=`{ "text-success": flag === 1, "text-danger": flag === 0 }`) {{ mensaje }}
    k-button-layout
      k-button(type='link' @click='$router.push({ name: "Inicio" })') Volver al Inicio
      
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';

export default {
  name: 'ValidarCuenta',
  dependencies: ['AccountService', 'GenericService'],
  data: () => ({
    mensaje: null,
    flag: null,
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.store({
            uri: 'validaRegistro',
            data: {
              token: this.$route.params.tkn,
            },
          });
          console.log(data, 'datatatat');
          if (data) {
            const { flag, message } = data;
            this.mensaje = message;
            this.flag = flag;
          }
        }
      },
    }),
  },
};
</script>
<style lang="scss" scoped="">
  h4{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h4 >img{
    width: 32px;
    margin-right: 4px;
  }
  p {
    font-size: 16px;
    text-align: center;
  }
</style>