<template>
  <div class="img-input-container">
    <div class="img-item" v-for="(item,index) in imgs">
      <div class="file-movie" v-if="isMovie(item)" @click="showPop(item)">
        <Icon type="ios-videocam-outline" size="30"></Icon>
      </div>
      <img :src="item | img" @click="showPop(item)" v-else>
      <a class="item-remove" @click="remove(index)" v-if="!readOnly">
        <Icon type="ios-close-outline" size="20"></Icon>
      </a>
    </div>
    <div class="img-input-add" v-if="imgs.length<maxLength&&!readOnly">
      <Icon type="plus-circled" size="30" class="icon-add"></Icon>
      <input type="file" @change="upload"/>
    </div>
    <Modal v-model="bigImgPop" class="img-pop" :closable="false" width="1200">
      <div class="text-center">
        <video autoplay controls width="100%" :src="current | movie" v-if="isMovie(current)&&bigImgPop"
               style="max-height:600px;"></video>
        <img :src="current | img(1)" style="max-width:100%;max-height:600px;" v-if="!isMovie(current)">
      </div>
    </Modal>
    <!--<div v-transfer-dom>-->
    <!--<x-dialog v-model="bigImgPop" hide-on-blur>-->
    <!--<div class="img-box">-->
    <!--<video autoplay controls width="100%" :src="current | movie" v-if="isMovie(current)&&bigImgPop"></video>-->
    <!--<img :src="current | img(1)" style="max-width:100%" v-if="!isMovie(current)">-->
    <!--</div>-->
    <!--<div @click="bigImgPop=false">-->
    <!--<x-icon type="ios-close-empty" size="30"></x-icon>-->
    <!--</div>-->
    <!--</x-dialog>-->
    <!--</div>-->
  </div>
</template>
<script type="es6">

  var sizeUnits = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024
  }

  function getSize(sizeStr) {
    var rx = /^(\d*\.?\d*)([KMGT]?B)$/;
    var result = rx.exec(sizeStr);
    if (result) {
      return result[1] * sizeUnits[result[2]];
    }
    return null;
  }

  export default {
    props: {
      maxLength: {
        type: Number,
        default: 4
      },
      value: {
        type: String,
        default: ''
      },
      readOnly: {
        type: Boolean,
        default: false,
        bigImgPop: false
      }
    },
    data: function () {
      return {
        imgs: [],
        current: '',
        accept: 'jpg,jpeg,png,mp4',
        maxSize: '20MB',
        bigImgPop: false
      }
    },
    methods: {
      upload: function (e) {
        var target = e.target
        var file = target.files[0]
        var msg = ''
        var error = false
        var suffix = /\.(\w+)$/.exec(file.name.toLowerCase());
        if (suffix && this.accept.indexOf(suffix[1]) < 0) {
          error = true
          msg += '文件类型不为' + this.accept
        }
        var maxSize = getSize(this.maxSize)
        if (file.size && maxSize && file.size > maxSize) {
          error = true
          if (msg) {
            msg += ','
          }
          msg += '文件大小不可超过' + this.maxSize
        }
        if (error) {
          if (window.vm.$vux) {
            window.vm.$vux.toast.text(msg, 'bottom', 2000)
          } else if (window.vm.$Message) {
            window.vm.$Message.error(msg);
          }
          return
        }
        var formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.url('admin/fileUpload'), formData).then(this.rspHandler((data) => {
          this.imgs.push(data)
          this.$emit('input', this.imgs.toString())
        }))
      },
      remove: function (index) {
        this.imgs.splice(index, 1)
        this.$emit('input', this.imgs.toString())
      },
      showPop: function (img) {
        this.current = img
        this.bigImgPop = true
      },
      isMovie: function (fileName) {
        if (fileName && typeof fileName == 'string' && (fileName.lastIndexOf('.mp4') === fileName.length - 4)) {
          return true
        } else {
          return false
        }
      }
    },
    created: function () {
      if (this.value && typeof this.value == 'string') {
        this.imgs = this.value.split(',')
      } else {
        this.imgs = []
      }
      this.$watch('value', function (v) {
        if (v && typeof v == 'string') {
          this.imgs = v.split(',')
        } else {
          this.imgs = []
        }
      })
    }
  }
</script>
