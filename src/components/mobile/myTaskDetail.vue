<template>
  <div class="page-container">
    <div style="position: relative">
      <img src="/static/img/taskDetail-bg.png" style="width: 100%;height: 100px;">
      <div style="position: absolute;bottom:5px;padding:0 15px;width:100%;">
        <router-link to="/myTask" class="fc-theme fs-xl">我的任务</router-link>
        <span class="fc-white">&gt;任务详情</span>
        <!--<a class="float-right fc-theme" @click="cancel()"-->
        <!--v-if="data.status!='合作完成'"><i class="icon-edit"></i>取消任务-->
        <!--</a>-->
        <router-link class="float-right fc-theme" :to="'/taskAdd/'+data.id"
                     v-if="data.masterId == userInfo.id&&(data.status=='待审核'||data.status=='不通过'||data.status=='审核通过')">
          <i class="icon-edit"></i>编辑
        </router-link>
      </div>
    </div>
    <div class="detail-area">
      <label class="fs-xxl">{{data.projectName}}</label>
      <span class="btn btn-theme-border-round margin-left-20">{{data.status}}</span>
      <span class="float-right"><span class="fc-red fs-xxl">{{data.projectBudget?data.projectBudget:'价格面议'}}</span></span>
      <div class="content">
        <template v-if="data.status=='不通过'">
          <span class="fc-red">不通过原因：{{data.reason}}</span><br/>
        </template>
        时间周期：{{data.projectCycle | selections(this.projectCycleMap)}}<br/>
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
          <span v-if="data.empScore">综合评分：{{data.empScore.compScore}}<br/></span>
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
      <a class="btn btn-large btn-theme-round margin-top-20" @click="apply()"
         v-if="data.status=='审核通过'&&userInfo.status=='审核通过'&&data.masterId != userInfo.id">发送申请意向</a>
    </div>
    <!--<div class="task-description">-->
    <!--<group title="推荐列表">-->
    <!--<cell title="推荐人1" :link="'/expertDetail/1/'+data.id"></cell>-->
    <!--<cell title="推荐人2" :link="'/expertDetail/1/'+data.id"></cell>-->
    <!--</group>-->
    <!--</div>-->
    <group title="申请列表" v-if="data.status=='审核通过'&&data.applyList.length">
      <cell :title="item.nickName" :link="'/expertDetail/'+item.id+'/'+data.id" v-for="item in data.applyList"
            :key="item"></cell>
    </group>
    <group title="委托人" v-if="(data.status=='合作中'||data.status=='合作完成')&&data.applyList.length">
      <cell :title="item.nickName" :link="'/expertDetail/'+item.id" v-for="item in data.applyList" :key="item"
            v-if="item.status == '已绑定'"></cell>
    </group>
    <div class="detail-area" v-if="data.status=='合作中'&&data.masterId == userInfo.id">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="finish()">确认合作完成</a>
    </div>
    <group title="评价发包方" v-if="(data.status=='合作完成'&&data.executor&& userInfo.id == data.executor.id)||(data.status=='合作完成'&&data.scoreMap&&data.scoreMap.emp)">
      <cell title="态度">
        <rater v-model="scoreEmp.attitudeScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.emp?true:false"></rater>
      </cell>
      <cell title="及时支付">
        <rater v-model="scoreEmp.payTimeScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.emp?true:false"></rater>
      </cell>
      <cell title="配合度">
        <rater v-model="scoreEmp.coordinationScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.emp?true:false"></rater>
      </cell>
      <x-textarea :max="200" v-model="scoreEmp.comment"
                  :readonly="data.scoreMap&&data.scoreMap.emp?true:false"></x-textarea>
    </group>
    <group title="评价牛人" v-if="(data.status=='合作完成'&&data.masterId == userInfo.id)||(data.status=='合作完成'&&data.scoreMap&&data.scoreMap.master)">
      <cell title="态度">
        <rater v-model="scoreMaster.attitudeScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.master?true:false"></rater>
      </cell>
      <cell title="质量">
        <rater v-model="scoreMaster.qualityScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.master?true:false"></rater>
      </cell>
      <cell title="效率">
        <rater v-model="scoreMaster.effectScore" active-color="#04BE02" slot="value"
               :disabled="data.scoreMap&&data.scoreMap.master?true:false"></rater>
      </cell>
      <x-textarea :max="200" v-model="scoreMaster.comment"
                  :readonly="data.scoreMap&&data.scoreMap.master?true:false"></x-textarea>
    </group>
    <div class="detail-area"
         v-if="data.status=='合作完成'&&data.executor&& userInfo.id == data.executor.id&&(!data.scoreMap||!data.scoreMap.emp)">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="empScore()">发送评价</a>
    </div>
    <div class="detail-area"
         v-if="data.status=='合作完成'&&data.masterId == userInfo.id&&(!data.scoreMap||!data.scoreMap.master)">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="masterScore()">发送评价</a>
    </div>
  </div>
</template>
<script>
  import consts from '../../common/const'
  import {url, rspHandler, selections} from '../../common/utils'
  import {Group, Cell, Rater, XTextarea} from 'vux'
  var config = {
    components: {
      Group,
      Cell,
      Rater,
      XTextarea
    },
    data: function () {
      return {
        data: {},
        trendCompleteMap: {},
        projectCycleMap: {},
        scoreMaster: {
          attitudeScore: 5,
          qualityScore: 5,
          effectScore: 5,
          comment: ''
        },
        scoreEmp: {
          attitudeScore: 5,
          payTimeScore: 5,
          coordinationScore: 5,
          comment: ''
        }
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
        this.$http.get(this.url('userInfo/queryDetailEmp/' + this.$route.params.id)).then(this.rspHandler((data) => {
          data.applyList.each((item, index) => {
            if (item.status === '已绑定') {
              data.executor = item
            }
          })
          this.data = data
          if (data.scoreMap) {
            if (data.scoreMap.master) {
              this.scoreMaster = data.scoreMap.master
            }
            if (data.scoreMap.emp) {
              this.scoreEmp = data.scoreMap.emp
            }
          }
        }))
        selections('100').then((data, map) => {
          this.trendCompleteMap = window.dicMapMap['100']
        })
        selections('300').then((data, map) => {
          this.projectCycleMap = window.dicMapMap['300']
        })
      },
      finish: function () {
        this.$vux.confirm.show({
          title: '确认',
          content: '是否确认完成任务？',
          onConfirm: () => {
            this.$http.get(this.url('employer/completed'), {
              params: {
                id: this.data.id,
                status: '合作完成'
              }
            }).then(this.rspHandler(() => {
              this.refresh()
            }))
          }
        })
      },
      cancel: function () {
        this.$vux.confirm.show({
          title: '取消',
          content: '是否确认取消任务？',
          onConfirm: () => {
//            this.$http.get(this.url('employer/completed'), {
//              params: {
//                id: this.data.id,
//                status: '合作完成'
//              }
//            }).then(this.rspHandler(() => {
//              this.refresh()
//            }))
          }
        })
      },
      empScore: function () {
        var params = this.scoreEmp
        params.taskId = this.data.id
        params.beRatedId = this.data.masterId
        this.$http.post(this.url('score/employer'), params).then(this.rspHandler(() => {
          this.refresh()
        }))
      },
      masterScore: function () {
        debugger
        var params = this.scoreMaster
        params.taskId = this.data.id
        if (!this.data.executor) {
          return
        }
        params.beRatedId = this.data.executor.id
        this.$http.post(this.url('score/master'), params).then(this.rspHandler(() => {
          this.refresh()
        }))
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
