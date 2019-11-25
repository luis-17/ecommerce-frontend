<template>
  <div class="k-container-loader" :style="styleDisplay">
    <div class="k-loader">
      <div class="k-progress" :style="styleProgress">
        <div class="k-blank-line"></div>      
      </div>
      <span class="progress-porcent">{{this.progress}}%</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KLoader',
  inheritAttrs: false,
  props: {
    display: String,
    progress: Number,
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
    styleProgress() {
      return `width: ${this.progress}%`;
    },
    styleDisplay() {
      return `display: ${this.display};`;
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
  .k-container-loader{
    position: relative;
  }
  .k-loader{
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 3rem 0;
    background-color: #cccccc;
    height: 22px;
    overflow: hidden;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 15px;
  }
  .k-loader .k-progress{
    position: relative;
    width: 15%;
    height: 22px;
    background: #51db5f;
    background: -moz-linear-gradient(left, #51db5f 0%, #01d7bd 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, #51db5f), color-stop(100%, #01d7bd));
    background: -webkit-linear-gradient(left, #51db5f 0%, #01d7bd 100%);
    background: -o-linear-gradient(left, #51db5f 0%, #01d7bd 100%);
    background: -ms-linear-gradient(left, #51db5f 0%, #01d7bd 100%);
    background: linear-gradient(to right, #51db5f 0%, #01d7bd 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#51db5f', endColorstr='#01d7bd', GradientType=1 );
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 15px;
    transition: all .2s;
  }
  .k-loader .k-progress .k-blank-line{
    position: absolute;
    left: -10px;
    top: 43%;
    width: 100%;
    background: #fff;
    height: 3.6px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  .k-loader span.progress-porcent{
    padding: 2px 10px 0 0;
    color: #fff;
  }
</style>