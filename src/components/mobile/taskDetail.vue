<template>
  <div class="page-container">
    <div style="position: relative">
      <img src="/static/img/taskDetail-bg.png" style="width: 100%;height: 100px;">
      <span style="position: absolute;bottom:5px;left:15px;">
                <span class="fc-theme fs-xl">任务大厅</span>
                <span class="fc-white">&gt;任务详情</span>
            </span>
    </div>
    <div class="detail-area">
      <label class="fs-xxl">{{data.companyName}}</label><span
      class="btn btn-theme-border-round margin-left-20">{{data.status}}</span>
      <span class="float-right"><span class="fc-red fs-xxl">{{data.projectBudget}}</span></span>
      <div class="content">
        <template v-if="data.status=='不通过'">
          <span class="fc-red">不通过原因：{{data.reason}}</span><br/>
        </template>
        时间周期：{{data.projectCycle}}<br/>
        <ul class="flex col-24" style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
          <li class="border-right">
            <span>已推荐</span><span class="fc-theme padding-left-5 padding-right-5">{{data.recommendCount}}</span>
          </li>
          <li class="border-right padding-left-10">
            <span>已申请</span><span class="fc-theme padding-left-5 padding-right-5">{{data.applyCount}}</span>
          </li>
          <li class="padding-left-10">
            <span>已浏览</span><span class="fc-theme padding-left-5 padding-right-5">{{data.visitCount}}</span>
          </li>
        </ul>
        <p style="margin-top:30px">
          项目类型：{{data.recruitBusiness ? data.recruitBusiness.parentBusiness.businessName : ''}}/{{data.recruitBusiness ? data.recruitBusiness.businessName : ''}}<br/>
          公司名称：{{data.companyName}}<br/>
          发布时间：{{data.updatedAt | date('YYYY-MM-DD HH:mm:ss')}}<br/>
          倾向让谁完成：{{data.trendComplete | selections(this.trendCompleteMap)}}<br/>
        </p>
        <ul class="gray-icons margin-top-20">
          <li v-for="item in data.baseSkills">{{item.skillName}}</li>
        </ul>
      </div>
      <div class="task-description">
        <label class="title">项目描述</label><br/>
        <!--<label class="display-inline-block margin-top-20">项目需求：</label>-->
        <p v-html="toContent(data.projectDesc)"></p>
        <!--<label class="display-inline-block margin-top-20">人员要求：</label>-->
        <!--<p>-->
        <!--最好有类似风格案例，并愿意沟通需求。-->
        <!--</p>-->
      </div>
      <a class="btn btn-large btn-theme-round margin-top-20" @click="apply()" v-if="data.status=='审核通过'&&userInfo.status=='审核通过'&&data.masterId != userInfo.id">发送申请意向</a>
    </div>
    <!--<div class="task-description">-->
      <!--<group title="推荐列表">-->
        <!--<cell title="推荐人1" :link="'/expertDetail/1/'+data.id"></cell>-->
        <!--<cell title="推荐人2" :link="'/expertDetail/1/'+data.id"></cell>-->
      <!--</group>-->
    <!--</div>-->
    <group title="申请列表" v-if="data.status=='审核通过'&&data.applyList.length">
      <cell :title="item.nickName" :link="'/expertDetail/'+item.id+'/'+data.id" v-for="item in data.applyList" :key="item"></cell>
    </group>
    <group title="委托人" v-if="data.status=='进行中'&&data.applyList.length">
      <cell :title="item.nickName" :link="'/expertDetail/'+item.id" v-for="item in data.applyList" :key="item" v-if="item.status == '已绑定'"></cell>
    </group>
    <div class="detail-area" v-if="data.status=='进行中'&&data.masterId == userInfo.id">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="finish()">确认已完成</a>
    </div>
    <!--<group title="评价" v-if="data.status=='已完成'&&data.masterId == userInfo.id">-->
      <!--<cell title="Your history score">-->
        <!--<rater v-model="masterScore" active-color="#04BE02" slot="value"></rater>-->
      <!--</cell>-->
    <!--</group>-->
  </div>
</template>
<script>
  import consts from '../../common/const'
  import {url, rspHandler, selections} from '../../common/utils'
  import {Group, Cell, Rater} from 'vux'
  var config = {
    components: {
      Group,
      Cell,
      Rater
    },
    data: function () {
      return {
        data: {},
        trendCompleteMap: {},
        masterScore:0,
        empScore:0
      }
    },
    methods: {
      apply: function () {
        this.$vux.loading.show({
          text: '正在提交'
        })
        this.$http.get(this.url('techMaster/applyEmployer/' + this.$route.params.id)).then(this.rspHandler((data) => {
          this.$vux.loading.hide()
          this.$vux.toast.text('提交成功', 'bottom');
        }))
      },
      refresh: function () {
        this.$http.get(url('employer/queryDetail/' + this.$route.params.id)).then(rspHandler((data) => {
          this.data = data
        }))
        selections('100').then((data, map) => {
          this.trendCompleteMap = window.dicMapMap['100']
        })
      },
      finish:function(){
        this.$vux.confirm.show({
          title:'确认',
          content:'是否确认完成任务？',
          onConfirm: () => {
            this.$http.get(this.url('employer/completed'),{params:{
              id:this.data.id,
              status:'已完成'
            }}).then(this.rspHandler(()=>{
              this.refresh()
            }))
          }
        })
      }
    },
    created: function () {
      this.$on(consts.loadedEvent, function () {
        this.refresh()
      })
    }
  }
  export default config
</script>
