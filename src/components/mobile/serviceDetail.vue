<template>
  <div class="page-container">
    <template v-for="(data,index) in datas" v-if="showAll||data.caseShow">
      <img class="service-detail-img" :src="data.caseUrl | img(1)" v-if="data.caseUrl">
      <div class="service-detail-text" v-html="toContent(data.caseText)" v-if="data.caseText"></div>
      <div class="clearfix" v-if="!showAll&&data.caseShow&&datas[index+1]&&!datas[index+1].caseShow">
        <a class="float-right margin-right-20 fs-l fc-theme" @click="showAll=true" style="line-height: 40px;">显示更多</a>
      </div>
    </template>
    <div style="padding:20px 16px;">
      <a class="btn btn-large btn-theme-round" href="tel:4006400709">联系我们</a>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        datas: {},
        showAll: false
      }
    },
    methods: {
      refresh: function () {
        if (this.$route.params.id) {
          this.$http.get(this.url('business/queryCaseBases'), {params: {id: this.$route.params.id}}).then(this.rspHandler((data) => {
            this.datas = data
          }))
        }
      }
    },
    created: function () {
      this.refresh()
    }
  }
</script>
