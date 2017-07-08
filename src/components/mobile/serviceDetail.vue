<template>
  <div class="page-container">
    <img class="service-detail-img" :src="'/static/serviceDetail/serviceDetail-'+code+'.jpg'" @click="code++">
    <div style="padding:20px 16px;">
      <a class="btn btn-large btn-theme-round">联系我们</a>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        code: '1'
      }
    },
    methods: {},
    created: function () {
      this.code = this.$route.params.code
    }
  }
</script>
