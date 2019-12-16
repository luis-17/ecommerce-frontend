<template lang="pug">
  .page-home
    .container
      .box-bienvenida.row
        .box-bienvenida-content.col-lg-12
          .box-principal
            .box-principal-content
              .box-titulo
                h3 ¡Bienvenido {{ fPerfil.nombres }}!
              .box-cuerpo AGENDA TU CITA ONLINE, <br> ASÍ DE RÁPIDO
              .box-mini-icono
                img(alt='Adelante...' src='@/assets/images/icons/go.png')
          .box-item.box-agendar-ahora( @click='$router.push({ name: "AgendarCita" })' )
            .box-icono
              img(alt='Agendar Cita' src='@/assets/images/icons/hospital.svg')
            .box-cuerpo Escoge tu especialidad, turno y médico favorito en la fecha que desees y ¡LISTO!
            .box-titulo
              a(href='javascript:void;') AGENDAR CITA
                img(alt='Agendar Cita' src='@/assets/images/icons/go-2.png')
          .box-item.box-historico( @click='$router.push({ name: "HistorialCitas" })' )
            .box-icono
              img(alt='Ver Historial de Citas' src='@/assets/images/icons/history.svg')
            .box-cuerpo Busca entre las citas que reservaste por este medio.
            .box-titulo
              a(href='javascript:void;') IR AL HISTÓRICO
                img(alt='Mira tu historial' src='@/assets/images/icons/go-2.png')
      .box-perfil-paciente
        h2 También puedes actualizar y ver a detalle tu perfil de paciente
        .box-perfil
          .box-item
            img(alt='Peso' src='@/assets/images/perfil/peso.png')
            .box-item-rpta
              span.pre-valor PESO
              span.valor {{ fPerfil.peso }}
              span.post-valor Kg.
          .box-item
            img(alt='Estatura' src='@/assets/images/perfil/talla.png')
            .box-item-rpta
              span.pre-valor ESTATURA
              span.valor {{ fPerfil.estatura / 100 }}
              span.post-valor Mt.
          .box-item
            img(alt='IMC' src='@/assets/images/perfil/imc.png')
            .box-item-rpta
              span.pre-valor IMC
              span.valor {{ fPerfil.imc }}
          .box-item
            img(alt='Tipo de Sangre' src='@/assets/images/perfil/sangre.png')
            .box-item-rpta
              span.pre-valor TIPO DE SANGRE
              span.valor {{ fPerfil.tipo_sangre }}
          .box-item
            img(alt='Sexo' src='@/assets/images/perfil/sexo.png')
            .box-item-rpta
              span.pre-valor SEXO
              span.valor {{ fPerfil.sexo }}
          .box-item
            img(alt='Edad' src='@/assets/images/perfil/edad.png')
            .box-item-rpta
              span.pre-valor EDAD
              span.valor {{ fPerfil.edad }}
              span.post-valor AÑOS
          .box-action-edit
            a(href='javascript:void(0)' @click='$router.push({ name: "PerfilPaciente" })') Editar tus datos
      .box-acciones
        .box-btn
          k-button(type='button' @click='$router.push({ name: "HistorialCitas" })') HISTORIAL
          k-button(class='btn-light' type='button' @click='$router.push({ name: "AgendarCita" })') AGENDAR CITA
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
    fPerfil: {
      estatura: null,
      nombres: null,
      peso: null,
      imc: null,
      tipo_sangre: null,
      sexo: null,
      edad: null,
    },
  }),
  async created() {
    await this.fetchData();
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    ...mapWrapper({
      async fetchData() {
        {
          const data = await this.GenericService.show({
            uri: 'platform/cargar_perfil_general',
          });
          console.log(data, 'dataatartara');
          if (data) {
            this.CommonService.assign(this.fPerfil, data.datos);
          }
        }
      },
    }),
  },
};
</script>
<style lang="scss" scoped="">
  /* Home page */
  $primary: #003d71;
  $accent: #829723;
  $warn: red;
  $suplem: #21b8c6;
  .page-home{
    padding-top: 4rem;
  }
  .page-home .box-bienvenida .box-principal{
      flex: 2.5;
      // background-image: url('/assets/img/home.jpg');
      background-image: url('/home.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px 0 0 6px;
  }
  .page-home .box-bienvenida .box-principal .box-principal-content{
      position: absolute;
  }
  .page-home .box-bienvenida .box-principal h3{
      font-size: 30px;
      font-weight: 800;
  }
  .page-home .box-bienvenida .box-principal .box-cuerpo{
      font-size: 20px;
      width: 75%;
      line-height: 1.15;
  }
  .page-home .box-bienvenida .box-principal::before{
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: #0032a0;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.6;
      border-radius: 6px 0 0 6px;
  }
  .page-home .box-bienvenida .box-bienvenida-content{
      display: flex;
      color: white;
  }
  .page-home .box-bienvenida .box-item{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 20px 40px;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.15;
      cursor: pointer;
      cursor: hand;
      -webkit-transition: all 0.25s;
      -moz-transition: all 0.25s;
      -o-transition: all 0.25s;
      -ms-transition: all 0.25s;
      transition: all 0.25s;
  }
  .page-home .box-bienvenida .box-item:hover{
      background: $accent;
      -webkit-box-shadow: 0px 4px 14px 1px rgba(0,0,0,0.2);
      box-shadow: 0px 4px 14px 1px rgba(0,0,0,0.2);
  }
  .page-home .box-bienvenida .box-agendar-ahora{
      flex: 1.6;
      background-color: $primary; 
      background-color: #0084ad;
      background-color: #002678;
  }
  .page-home .box-bienvenida .box-icono{
      width: 100%;
  }

  .page-home .box-bienvenida .box-historico{
      flex: 1.6;
      border-radius: 0 6px 6px 0;
      background-color: $accent; 
      background-color: #0084ad;
      background-color: #065598;
      background-color: #056e8f;
      background-color: #0033a0;
  }
  .page-home .box-bienvenida .box-titulo{
      width: 100%;
      display: flex;
  }
  .page-home .box-bienvenida .box-titulo > a{
      font-size: 20px;
      font-weight: 800;
      padding-top: 32px;
      color: inherit;
  }
  .page-home .box-bienvenida .box-titulo > a > img{
      height: 32px;
      margin-top: -4px;
      margin-left: -6px;
  }
  .page-home .box-bienvenida .box-agendar-ahora .box-icono > img{
      height: 75px;
  }
  .page-home .box-bienvenida .box-historico .box-icono > img{
      height: 72px;
      padding-bottom: 12px;
  }

  .page-home .box-perfil-paciente{
      margin-top: 5%;
  }
  .page-home .box-perfil-paciente h2{
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      color: $primary; 
      margin-bottom: 3%;
  }
  .page-home .box-perfil-paciente .box-perfil{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 3%;
      border: 1px solid $accent;
      margin-bottom: 5%;
      border-radius: 15px;
      text-align: center;
      position: relative;
  }
  .page-home .box-perfil-paciente .box-perfil p{
      // margin-bottom: 5px;
      // color: $primary;
      margin-bottom: 5px;
      font-weight: 800;
      color: $accent;
      font-size: 18px;
  }
  .page-home .box-perfil-paciente .box-perfil .box-item{
      display: flex;
      min-width: 150px;
  }
  .page-home .box-perfil-paciente .box-perfil .box-action-edit{
      position: absolute;
      bottom: -15px;
      background-color: white;
      font-size: 18px;
      padding: 0 22px;
      font-weight: 600;
  }
  .page-home .box-perfil-paciente .box-perfil .box-action-edit a{
    color: $accent;
  }
  .page-home .box-perfil-paciente .box-perfil .box-item .box-item-rpta{
      display: flex;
      align-items: flex-end;
      position: relative;
      width: 100%;
      color: #00c9d2;
  }
  .page-home .box-perfil-paciente .box-perfil img{
      height: 50px; 
  }
  .page-home .box-perfil-paciente .box-perfil .box-item-rpta .valor{
      margin-left: 4px;
      font-size: 30px;
      font-weight: 400;
      line-height: 0.75;
  }
  .page-home .box-perfil-paciente .box-perfil .box-item-rpta .pre-valor{
      position: absolute;
      top: 0;
      left: 0;
      padding-left: 4px;
      font-size: 12px;
      color: $primary;
  }
  .page-home .box-perfil-paciente .box-perfil .box-item-rpta .post-valor{
      font-weight: 200;
      line-height: 1;
      font-size: 16px;
      padding-left: 4px;
  }
  .page-home .box-acciones .box-btn{
      text-align: center;
      display: flex;
      justify-content: space-evenly;
  }
  .page-home .box-acciones {
      margin-bottom: 5%;
  }
  /* Large devices (laptops/desktops, 992px and up) LG */
  @media only screen and (max-width: 1199px) {
    .page-home .box-bienvenida .box-principal .box-principal-content{
      padding-left: 10px;
    }
    .page-home .box-bienvenida .box-principal h3{
      font-size: 25px;
    }
    .page-home .box-bienvenida .box-principal .box-cuerpo {
      font-size: 18px;
    }
    .page-home .box-perfil-paciente .box-perfil img{
      height: 40px;
    }
    .page-home .box-perfil-paciente .box-perfil .box-item-rpta .valor {
      font-size: 26px;
    }
  }
  @media only screen and (max-width: 992px) {
    .page-home {
          padding-top: 40px;
          margin-right: 60px;
    }
    .page-home .box-bienvenida .box-principal{
          border-radius: 10px 0 10px 0;
          margin-bottom: 10px;
    }
    .page-home .box-bienvenida .box-principal::before{
      border-radius: 10px 0 10px 0;
    }
    .page-home .box-bienvenida .box-bienvenida-content{
      flex-wrap: wrap;
    }
    .page-home .box-bienvenida .box-principal{
      width: 100%;
      flex: unset;
      height: 175px;
    }
    .page-home .box-bienvenida .box-item{
      flex: unset;
      width: 100%;
          justify-content: flex-start;
          margin-bottom: 10px;
          border-radius: 10px 0 10px 0;
    }
    // .page-home .box-bienvenida .box-historico{
    //  border-radius: 0 0 6px 6px;
    // }
    .page-home .box-bienvenida .box-principal h3 {
      font-size: 30px;
    }
    .page-home .box-bienvenida .box-principal .box-cuerpo {
      font-size: 20px;
    }
    .page-home .box-perfil-paciente h2{
      font-size: 22px;
    }
    .page-home .box-perfil-paciente .box-perfil{
      flex-wrap: wrap;
    }
    .page-home .box-perfil-paciente .box-perfil .box-item{
      width: 180px;
      min-width: unset;
      padding: 20px;
    }
    .page-home .box-bienvenida .box-principal .box-principal-content{
      left: 25px;
    }
  }
  @media only screen and (max-width: 768px) {
    .page-home .box-acciones button{
        margin-bottom: 10px;
        // width: 80%;
    }
    .page-home .box-bienvenida .box-principal h3{
        font-size: 20px;
    }
    .page-home .box-bienvenida .box-principal .box-principal-content{
        left: 0;
        margin: 10px 20px;
    }
    .page-home .box-bienvenida .box-item {
        font-size: 15px;
        padding: 20px 25px;
    }
    .page-home .box-bienvenida .box-agendar-ahora .box-icono > img {
        height: 56px;
    }
    .page-home .box-bienvenida .box-titulo > a{
        padding-top: 18px;
    }
  }

  @media (max-width: 576px) {
    .page-home{
      padding-top: 0;
    }
    .page-home .box-acciones .box-btn{
      display: block;
    }
    .page-home .box-acciones button{
      width: 100%;
    }
    .page-home .box-perfil-paciente h2{
      font-size: 18px;
      font-weight: 500;
    }
    .page-home .box-perfil-paciente .box-perfil .box-item {
      width: 120px;
      padding: 16px 0;
    }
    .page-home .box-perfil-paciente .box-perfil .box-item-rpta .pre-valor{
      overflow: hidden;
      width: 80px;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .page-home .box-perfil-paciente {
      margin-bottom: 3rem;
    }
    .page-home .box-bienvenida .box-principal{
      margin-top: 1rem;
    }
  }

  @media (max-width: 420px) {
    .page-home .box-bienvenida .box-principal .box-cuerpo{
      font-size: 14px;
    }
    .page-home .box-bienvenida .box-principal{
      height: 140px;
      font-weight: 300;
    }
    .page-home .box-bienvenida .box-agendar-ahora .box-icono > img{
      height: 40px;
    }
    .page-home .box-bienvenida .box-item{
      font-size: 13px;
      font-weight: 100;
      padding: 10px 20px;
    }
    .page-home .box-bienvenida .box-titulo > a{
      font-size: 15px;
      padding-top: 5px;
    }
    .page-home .box-bienvenida .box-principal .box-principal-content{
      padding: 0;
    }
    .page-home .box-bienvenida .box-historico .box-icono > img{
      height: 36px;
      padding-bottom: 0;
      margin-bottom: 5px;
    }
    .page-home .box-perfil-paciente h2{
      font-size: 16px;
    }
  }
</style>