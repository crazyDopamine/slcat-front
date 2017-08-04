<template>
  <div class="page-container">
    <img class="service-detail-img" :src="'/static/serviceDetail/'+code+'.jpg'">
    <div style="padding:20px 16px;">
      <a class="btn btn-large btn-theme-round" href="tel:4006400709">联系我们</a>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        code: '',
        showTell:false
      }
    },
    methods: {
      callUs: function () {
        this.showTell = true
      }
    },
    created: function () {
      this.code = this.$route.params.code
    }
  }
</script>
