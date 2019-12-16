<template lang="pug">
  div
    k-modal(v-if='isModalTurno' @close='$emit("update:show", false)')
      .header-modal.text-center
        .mx-auto
          h2.box-letter.pb-3 {{ strTextTitle }}
      .body-modal
        .box-fecha
          h3 <i class="fas fa-calendar-alt"></i> {{selectedFecha}}
        .box-turnos
          .box-content-turnos
            .box-turno
              .box-eleccion
                label(v-for='(item, index) in arrHorario')
                  k-button-radio(
                    :label='item.hora_inicio'
                    name='hora_inicio'
                    :value='item.hora_inicio'
                    v-on:change="onChangeHorarios(item)")
      .k-button-layout.text-center
        k-button(@click='elegirTurno' type='button' class='btn-sm') ELEGIR
        k-button(@click='regresar' type='link' class='') REGRESAR
        
</template>

<script>
import { mapWrapper } from '@/common/taco';

export default {
  name: 'EleccionTurno',
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
    selectedFecha: {
      type: String,
      default: null,
    },
    arrHorario: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    strTextTitle: null,
    isModalTurno: false,
    strSelectedFecha: null,
    selectedTurno: null,
  }),
  async created() {
    this.strTextTitle = this.textTitle;
    this.strSelectedFecha = this.selectedFecha;
    // console.log(this.selectedFecha, 'SELECYEDFECHA');
  },
  computed: {
    // console.log(this.selectedFecha);
  },
  watch: {
    show(newValue) {
      this.isModalTurno = newValue;
    },
  },
  methods: {
    ...mapWrapper({
      async elegirTurno() {
        console.log(this.selectedTurno, 'this.selectedTurno');
        if(!this.selectedTurno){
          this.$swal({
            type: 'warning',
            text: 'Seleccione un turno para reservar su cita.',
          });
          return;
        }
        this.$emit('elegirCita', {
          turno: this.selectedTurno,
        });
        this.$emit("update:show", false);
      },
      async onChangeHorarios(item) {
        console.log(item, 'itemitem');
        this.selectedTurno = item;
      },
    }),
    async regresar() {
      this.$emit("update:show", false);
      this.selectedTurno = null;
    },
  },
};
</script>
<style lang="scss" scoped="">
  .box-turnos{
      min-height: 200px;
  }
  .box-eleccion {
    margin: 1.75rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .k-button, 
  .k-button-layout .k-button + .k-button{
    margin: auto;
    display: block;
  }
  h2{
    color: #829723;
    font-size: 1.3rem;
    text-transform: uppercase;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1rem;
  }
  .box-fecha h3{
    text-align: center;
    color: #005794;
    margin-top: 1rem;
    margin-bottom: 0;
    background-color: #ececec;
    padding: 0.4rem;
    border-radius: 5px;
  }
  .box-eleccion .rb-turno {
      width: auto;
      margin: 8px;
      padding: 10px 20px;
      background-color: rgba(1, 87, 155, 0.09);
      border-radius: 10px;
      font-size: 16px;
      color: #b1b1b1;
  }
  .box-eleccion .rb-turno.mat-radio-checked{
      background-color: #21b8c6;
      color: white;
  }
  .box-eleccion .rb-turno label{
      margin: 0;
  }
  .box-turnos .box-action{
      display: flex;
      justify-content: center;
      padding: 25px 20px 0;
  }
  .box-turnos .box-action button{
      min-width: 200px;
  }

  .box-turnos label{
      // display: block;
      position: relative;
      // padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 110px;
  }
  /* Hide the browser's default radio button */
  .box-turnos label input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
  }
  
  /* Create a custom radio button */
  .box-turnos label .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }
  
  /* On mouse-over, add a grey background color */
  .box-turnos label:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  /* When the radio button is checked, add a blue background */
  .box-turnos label input:checked ~ .checkmark {
    background-color: #21B8C6;
  }
  
  /* Create the indicator (the dot/circle - hidden when not checked) */
  .box-turnos label .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the indicator (dot/circle) when checked */
  .box-turnos label input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the indicator (dot/circle) */
  .box-turnos label .checkmark:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
  }
</style>