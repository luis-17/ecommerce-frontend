<template lang="pug">
  .k-stepper.vh-100.w-100.fixed-top
    k-center(
      full=''
      v-touch:swipe.left='swipeLeftHandler'
      v-touch:swipe.right='swipeRightHandler')
      .k-stepper-close(@click='close')
      .k-stepper-container.text-white.text-left
        .k-stepper-title.mb-3
          h2 {{ title }}
      .k-stepper-container.text-white.text-center(v-for='line in lines')
        template(v-for='(item, index) in line')
          .k-stepper-box.card.rounded-0(
            v-if='item !== null'
            :class='{ active: item._index === currentStep, inactive: item._index > currentStep }'
            @click='go(item, item._index)')
            .card-body
              h1.font-weight-bold.m-0 {{ item.step }}
              p.mb-0(:class='{ "pt-4": item._index >= currentStep }') {{ item.title }}
              p.small.mb-0 {{ item.subtitle }}
              //- img.rounded.mx-auto.d-block.pt-2(
              //-   v-if='item._index < currentStep'
              //-   src='@/assets/images/Icon_check.svg'
              //-   width='20rem')
          .k-stepper-box.empty(v-else='')
      //- button.btn.btn-info.rounded-0(@click='swipeRightHandler') prev
      //- button.btn.btn-info.rounded-0(@click='swipeLeftHandler') next
</template>

<script>
export default {
  name: 'KStepper',
  inheritAttrs: false,
  props: {
    title: String,
    items: Array,
    numItemsByLine: Number,
    currentStep: Number,
  },
  data() {
    return {
      id: null,
    };
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {
    lines() {
      const lines = this.items.filter(i => i.showInStepper).reduce((acc, cur, idx) => {
        let index = acc.findIndex(a => a.length < this.numItemsByLine);
        if (index === -1) {
          index = acc.push([]) - 1;
        }
        acc[index].push({ ...cur, _index: idx });
        return acc;
      }, []);
      lines.forEach((line) => {
        while (line.length < this.numItemsByLine) {
          line.push(null);
        }
      });
      return lines;
    },
  },
  methods: {
    go(item, index) {
      if (index <= this.currentStep) {
        this.$emit('go', item);
      }
    },
    close() {
      this.$emit('close');
    },
    swipeLeftHandler() {
      this.$emit('swipeLeftHandler');
    },
    swipeRightHandler() {
      this.$emit('swipeRightHandler');
    },
  },
};
</script>
