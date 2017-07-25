<template>
  <div class="page-container">
    <img class="service-detail-img" :src="'/static/serviceDetail/'+code+'.jpg'">
    <div style="padding:20px 16px;">
      <router-link class="btn btn-large btn-theme-round" to="/taskAdd">发布项目</router-link>
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
    methods: {},
    created: function () {
      this.code = this.$route.params.code
    }
  }
</script>
