<template lang="pug">
  .page-historial
    .container
      .box-historial
        .box-tabs
          .box-tab-group
            .box-tab-item(class:'' @click='onTabMe("CP")')
              a(href='')
                span CITAS PENDIENTES
            .box-tab-item(class:'' @click='onTabMe("CR")')
              a(href='')
                span CITAS REALIZADAS
        .box-content-tabs
          .box-tab.box-tab-cp(v-if='')
            .box-periodo
            .box-content-items(v-for)
              .box-item
                .box-fecha
                  .box-content-fecha
                    p.mes {{ row.mes }}
                    p.dia {{ row.dia }}
                  .timeline
                  .box-end(v-if='')
                .box-detail
                  .box-nombre {{ row.idcita }} {{ row.paciente }}
                  .box-detail-item.box-hora
                    .icon

</template>