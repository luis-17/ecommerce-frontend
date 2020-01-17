<template lang="pug">
  k-modal(@close='$router.push({ name: "HistorialCitas" })')
    .text-center
      .mx-auto.w-75
        .box-letter.pb-3 ¿Está seguro de pagar la cita?
    .k-button-layout
      form.alignet-form-vpos2(name='f1' id='f1' action='#' method='POST')
        input(type='hidden' name='acquirerId' :value="fCita.acquirerId")
        input(type='hidden' name='idCommerce' :value="fCita.idCommerce")
        input(type='hidden' name='purchaseOperationNumber' :value="purchaseOperationNumber")
        input(type='hidden' name='purchaseAmount' :value="fCita.purchaseAmount")
        input(type='hidden' name='purchaseCurrencyCode' :value="fCita.purchaseCurrencyCode")
        input(type='hidden' name='language' :value="fCita.language")
        input(type='hidden' name='shippingFirstName' :value="fCita.shippingFirstName")
        input(type='hidden' name='shippingLastName' :value="fCita.shippingLastName")
        input(type='hidden' name='shippingEmail' :value="fCita.shippingEmail")
        input(type='hidden' name='shippingAddress' :value="fCita.shippingAddress")
        input(type='hidden' name='shippingZIP' value='No ZIP')
        input(type='hidden' name='shippingCity' value='Lima')
        input(type='hidden' name='shippingState' value='Lim')
        input(type='hidden' name='shippingCountry' value='PE')
        input(type='hidden' name='userCommerce' :value="fCita.userCommerce")
        input(type='hidden' name='userCodePayme' value='')
        input(type='hidden' name='descriptionProducts' :value="fCita.descriptionProducts")
        input(type='hidden' name='programmingLanguage' :value="fCita.programmingLanguage")
        input(type='hidden' name='purchaseVerification' :value="purchaseVerification")
        k-button(@click='$router.push({ name: "HistorialCitas" })' class='btn-light btn-sm') NO
        k-button(onclick="javascript:AlignetVPOS2.openModal('https://integracion.alignetsac.com/','2');" class='btn-sm') SI
      
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import fuvexTypes from '@/store/types/fuvex';
import { mapWrapper, mapValidation } from '@/common/taco';
import { mapTaco } from '@/common/util';
import vueinterval from 'vue-interval/dist/VueInterval.common';
// import parentescos from '@/data/parentescos.json';

export default {
  name: 'ConfirmarPago',
  dependencies: ['CommonService', 'AccountService', 'GenericService'],
  props:['fCita'],
  data: () => ({
    purchaseOperationNumber: null,
    purchaseVerification: null,
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
          const { flag, purchaseVerification, purchaseOperationNumber } = await this.GenericService.store({
            uri: 'platform/registrar_transaccion',
            data: {
              idcita: this.fCita.idcita,
            },
          });
          // console.log(this.formDatosCita, 'this.formDatosCita');
          if(flag === 1){
            this.purchaseVerification = purchaseVerification;
            this.purchaseOperationNumber = purchaseOperationNumber;
          }
          if(flag === 0){
            this.$swal({ type: 'error', text: 'Ocurrió un error al registrar la transacción. Inténtelo nuevamente.', timer: 5000 });
            return;
          }
        }
      },
      async confirmarPago() {

      },
    }),
    // async onDatosFamiliar() {
    //   const isValid = await this.$validator.validateAll('formDatosFamiliar');
    //   if (isValid) {
    //     try {
    //       this.$wait.start('global');
    //       let method = 'agregar_familiar';
    //       if(this.edit){
    //         method = 'editar_familiar';
    //       }
    //       const arrData = await this.GenericService.store({
    //         uri: 'platform/'+method,
    //         data: this.formDatosFamiliar,
    //       });
    //       const { flag, message } = arrData;
    //       this.$swal({ type: 'success', text: message }).then(() => {
    //         this.$router.push({ name: this.origin });
    //       });
    //     } catch (err) {
    //       this.$swal({ type: err.type, text: err.message });
    //     } finally {
    //       this.$wait.end('global');
    //     }
    //   }
    // },
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
  @media (max-width: 576px) { /*576 a 376*/
    .k-button-layout .k-button + .k-button{
      margin-top: 0 !important;
    }
    .box-letter{
      font-size: 20px;
    }
  }
</style>