<template lang="pug">
  div.k-title
    p.k-title.h3(v-if='title') {{ title }}
    p.k-steps.mt-3.mb-1.text-secondary(v-if='steps') {{ steps }}
    p.k-subtitle.h5.mb-3(v-if='subtitle')
      | {{ subtitle }}
      span.ml-2(
        v-if='info'
        ref='info'
        data-toggle='tooltip'
        data-placement='top'
        :title='info')
        font-awesome-icon.text-primary(
          role='button'
          focusable='false'
          tabindex='-1'
          icon='question-circle')
    p.text-muted.small(v-if='help') {{ help }}
</template>

<script>
import $ from 'jquery';

export default {
  name: 'KTitle',
  inheritAttrs: true,
  props: {
    title: String,
    steps: String,
    subtitle: String,
    info: String,
    help: String,
  },
  data() {
    return {
      id: null,
    };
  },
  mounted() {
    this.id = this._uid;
    if (this.info) {
      $(this.$refs.info).tooltip();
    }
  },
};
</script>
