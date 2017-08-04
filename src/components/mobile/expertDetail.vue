<template>
  <div class="page-container no-bar-container">
    <!--<div class="user-info-audit">-->
    <!--<span class="col-16">完善资料通过审核后，即可拥有承接项目的资质。</span>-->
    <!--<a class="btn col-8 btn-gray-round btn-normal">提交审核</a>-->
    <!--</div>-->
    <div class="container user-info">
      <div class="user-info-top">
        <img class="user-img" :src="data.headImgUrl | img"><br/>
        <label class="fs-xxl">{{data.nickName ? data.nickName : '昵称'}}</label><br/>
        <!--<span class="btn btn-round-border btn-small">未提交审核</span><br/>-->
        <span>{{data.dailyWage ? data.dailyWage : '0'}}元/天</span><br/>
        <span>{{data.workExperience | selections(workExperienceMap)}}</span><br/>
        <template v-if="data.jobTitle">
          <span class="btn btn-gray-round btn-small margin-right-5"
                v-for="item in data.jobTitle.split(',')">{{item}}</span>
        </template>
      </div>
      <div class="user-info-detail">
        <label class="fs-xxl">关于我</label><br/>
        <!--<p class="text-left margin-top-10" v-if="!data.selfIntroduction">完善全面的介绍可以让客户更完整立体的了解你</p>-->
        <p class="text-left margin-top-10" v-if="data.selfIntroduction" v-html="toContent(data.selfIntroduction)"></p>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <label class="fs-xxl">擅长技能</label><br/>
        <!--<p class="text-left margin-top-10" v-if="!data.baseSkillList">添加你的技能，可以为你更准确的推荐匹配项目</p>-->
        <template v-if="data.baseSkillList">
          <div class="text-left">
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10" v-for="item in data.baseSkillList">{{item.skillName}}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <label class="fs-xxl">作品案例</label><br/>
        <!--<p class="text-left margin-top-10" v-if="!data.worksCases||data.worksCases.length<2">至少添加2个以上的作品案例才可以提交审核</p>-->
        <div class="text-left margin-top-10" v-if="data.worksCases">
          <div class="margin-bottom-10 clearfix" v-for="item in data.worksCases">
            {{item.workName}}<br/>
            <span class="col-6">职责:</span><div class="col-18">{{item.responsibilities}}</div>
            <span class="col-6">描述:</span><div class="col-18" v-html="toContent(item.worksDesc)"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin:0 15px;" v-if="task&&task.status=='审核通过'">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="submit()">确认委托</a>
    </div>
  </div>
</template>
<script type="es6">
  import {selections} from '../../common/utils'
  export default {
    data: function () {
      return {
        data: {},
        workExperienceMap:{},
        task:null
      }
    },
    methods: {
      refresh: function () {
        if (this.$route.params.id) {
          this.$http.get(this.url('techMaster/queryMasterDetail'), {params: {id: this.$route.params.id}}).then(this.rspHandler((data) => {
            this.data = data
          }))
        }
        if(this.$route.params.taskId){
          this.$http.get(this.url('employer/queryDetail/' + this.$route.params.taskId)).then(this.rspHandler((data) => {
            this.task = data
          }))
        }
        selections('400').then((data, map) => {
          this.workExperienceMap = window.dicMapMap['400']
        })
      },
      submit: function () {
        if (this.$route.params.taskId) {
          this.$vux.confirm.show({
            title:'确认',
            content:'是否确认当前牛人为项目委托人？',
            onConfirm: () => {
              this.$http.get(this.url('employer/confirm'),{params:{
                taskId:this.$route.params.taskId,
                masterId:this.$route.params.id
              }}).then(this.rspHandler(()=>{
              	this.$router.go(-1)
              }))
            }
          })
        }
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent, function () {
        this.refresh()
      })
    }
  }
</script>
