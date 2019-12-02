<template lang="pug">
  .page-cita
    .container
    	.row
    		.box-filtros
    			form(
            novalidate=''
            @submit.prevent='onDatosFiltroInicial'
            data-vv-scope='formDatosFiltroInicial')
            .row
            	.col-12
            		h4 <strong>PASO 1:</strong> Selecciones Filtros
              .col-12
                k-select(
                  :label='"LA CITA ES PARA:"'
                  :placeholder='"LA CITA ES PARA:"'
                  :data-vv-as='"LA CITA ES PARA:"'
                  name='idpaciente'
                  v-validate='"required"'
                  :error='errors.first("formDatosFiltroInicial.idpaciente")'
                  v-model='formDatosFiltroInicial.idpaciente'
                  :options='pacientes')
              .col-12
                k-select(
                  :label='"SELECCIONE LA ESPECIALIDAD"'
                  :placeholder='"SELECCIONE LA ESPECIALIDAD"'
                  :data-vv-as='"SELECCIONE LA ESPECIALIDAD"'
                  name='idespecialidad'
                  v-validate='"required"'
                  :error='errors.first("formDatosFiltroInicial.idespecialidad")'
                  v-model='formDatosFiltroInicial.idespecialidad'
                  :options='especialidades')
              .col-12
                k-select(
                  :label='"SELECCIONE MÉDICO"'
                  :placeholder='"SELECCIONE MÉDICO"'
                  :data-vv-as='"SELECCIONE MÉDICO"'
                  name='idmedico'
                  v-validate='"required"'
                  :error='errors.first("formDatosFiltroInicial.idmedico")'
                  v-model='formDatosFiltroInicial.idmedico'
                  :options='medicos')
              .col-12
                k-select(
                  :label='"SELECCIONE GARANTE"'
                  :placeholder='"SELECCIONE GARANTE"'
                  :data-vv-as='"SELECCIONE GARANTE"'
                  name='idgarante'
                  v-validate='"required"'
                  :error='errors.first("formDatosFiltroInicial.idgarante")'
                  v-model='formDatosFiltroInicial.idgarante'
                  :options='garantes')
              k-button-layout.mt-3
                k-button(type='submit') Actualizar Datos

</template>