<template lang="pug">
  .k-upload.form-group.position-relative(:class='{ up: isUp }')
    label {{ label }}
    .form-control.border-0.p-0.pl-4(@click='onProxyFileUpload')
      small.text-primary {{ placeholder }}
    input(
      ref='file'
      type='file'
      :accept='accept'
      @change='onAddedFile($event)'
      autocomplete='off'
      v-show='false')
    
</template>

<script>
import $ from 'jquery';

function getFilePathExtension(path) {
  const filename = path.split('\\').pop().split('/').pop();
  return filename.substr((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1);
}

export default {
  name: 'KUpload',
  inheritAttrs: false,
  props: {
    label: String,
    placeholder: String,
    accept: {
      type: String,
      required: true,
    },
    isUp: {
      type: Boolean,
      default: false,
    },
    info: String,
    infoLector: String,
    numerador: Number,
    required: {
      type: Boolean,
      default: false,
    },
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
  methods: {
    onProxyFileUpload() {
      this.$refs.file.click();
    },
    onAddedFile(e) {
      console.log('add files');
      const files = e.target.files || e.dataTransfer.files;
      console.log(files.length, 'files.length')
      if (!files.length) {
        return;
      }
      const fileExtension = getFilePathExtension(files[0].name).toUpperCase();
      console.log(this.accept, 'this.acceptttt');
      if (this.accept) {
        const accept = this.accept.toUpperCase();
        if (accept.indexOf(fileExtension) !== -1) {
          console.log(files[0], 'files[0]ff');
          this.$emit('onAddedFile', files[0]);
        } else {
          this.$swal({
            type: 'warning',
            title: 'Oops...',
            text: 'Archivo no v\u00E1lido',
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped="">
.k-upload {
  cursor: pointer;
  background-image: url('./../assets/images/adjuntar-jp.svg');
  background-position: 98% 50%;
  background-repeat: no-repeat;
  background-size: 18px;
  height: 45px;
  border-radius: 6px;
  // background-color: #eaeaea;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  margin-top: 30px;
  &.up {
    background-image: url('./../assets/images/Icon_Archivo.svg') !important;
    background-size: 15px;
    p {
      color: #1973B8 !important;
    }
    small {
      display: block;
    }
  }
  &:hover {
    background-color: #F4F4F4;
  }
  .form-control {
    background-color: transparent;
    height: auto !important;
    display: flex;
    font-size: 20px;

    small {
      font-size: 14px;
    }
  }
  label {
    position: absolute;
    top: -24px;
  }
}
</style>
