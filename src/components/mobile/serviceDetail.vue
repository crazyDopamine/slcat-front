<template>
  <div class="page-container">
    <img class="service-detail-img" :src="'/static/serviceDetail/'+code+'.jpg'">
    <div style="padding:20px 16px;">
      <a class="btn btn-large btn-theme-round" @click="callUs()">联系我们</a>
    </div>

  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        code: ''
      }
    },
    methods: {
      callUs: function () {
        this.$vux.confirm.show({
          title: '联系我们',
          content: '4006-4007-09',
          confirmText:'拨打',
          onConfirm () {
            window.open('wtai://wp//mc;4006400709','_self')
//            window.open('tel:4006400709','_self')
          }
        })
      }
    },
    created: function () {
      this.code = this.$route.params.code
    }
  }
</script>
