<template>
  <div>
    <div style="position: relative">
      <img src="/dist/static/img/taskDetail-bg.png" style="width: 100%;height: 100px;">
      <span style="position: absolute;bottom:5px;left:15px;">
                <span class="fc-theme fs-xl">任务大厅</span>
                <span class="fc-white">&gt;任务详情</span>
            </span>
    </div>
    <div class="detail-area">
      <label class="fs-xxl">{{data.issueName}}</label><span
      class="btn btn-theme-border-round margin-left-20">{{data.status}}</span>
      <span class="float-right"><span class="fc-red fs-xxl">{{data.projectBudget}}</span></span>
      <div class="content">
        时间周期：{{data.objectCycle}}<br/>
        <ul class="flex col-24" style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
          <li class="border-right">
            <span>已推荐</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
          </li>
          <li class="border-right padding-left-10">
            <span>已申请</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
          </li>
          <li class="padding-left-10">
            <span>已浏览</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
          </li>
        </ul>
        <p style="margin-top:30px">
          项目类型：设计/平面设计<br/>
          公司名称：{{data.companyName}}<br/>
          发布时间：{{data.createAt | date('yyyy-MM-dd HH:mm:ss')}}<br/>
          倾向让谁完成：{{data.trendComplete}}<br/>
        </p>
        <ul class="gray-icons margin-top-20">
          <li v-for="item in data.recruitBusinessList">{{item.businessName}}</li>
        </ul>
      </div>
      <div class="task-description">
        <label class="title">项目描述</label><br/>
        <!--<label class="display-inline-block margin-top-20">项目需求：</label>-->
        <p v-html="data.projectDesc"></p>
        <!--<label class="display-inline-block margin-top-20">人员要求：</label>-->
        <!--<p>-->
        <!--最好有类似风格案例，并愿意沟通需求。-->
        <!--</p>-->
      </div>
      <a class="btn btn-large btn-theme-round margin-top-20">发送申请意向</a>
    </div>
  </div>
</template>
<script>
  import consts from '../../common/const'
  var config = {
    data: function () {
      return {
        data: {}
      }
    },
    methods: {
      apply: function () {
//                this.$http.post(this.url('employer/queryDetail/'+this.$route.params.id)).then(this.rspHandler(function(data){
//                    this.data = data;
//                }));
      }
    },
    created: function () {
      var self = this
      this.$on(consts.loadedEvent, function () {
        this.$http.get(this.url('employer/queryDetail/' + this.$route.params.id)).then(this.rspHandler(function (data) {
          self.data = data
        }))
      })
    }
  }
  export default config
</script>
