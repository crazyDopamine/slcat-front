<template>
  <div class="page-container no-bar-container">
    <!--<div class="user-info-audit">-->
      <!--<span class="col-16">完善资料通过审核后，即可拥有承接项目的资质。</span>-->
      <!--<a class="btn col-8 btn-gray-round btn-normal">提交审核</a>-->
    <!--</div>-->
    <div class="container user-info">
      <div class="user-info-top">
        <router-link to="/userInfoEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;">
          <i class="icon-edit"></i>编辑
        </router-link>
        <img class="user-img" src="/static/img/user-img-default.png"><br/>
        <label class="fs-xxl">{{data.nickName?data.nickName:'昵称'}}</label><br/>
        <!--<span class="btn btn-round-border btn-small">未提交审核</span><br/>-->
        <span>{{data.dailyWage?data.dailyWage:'0'}}元/天</span><br/>
        <template v-if="data.jobTitle">
          <span class="btn btn-gray-round btn-small margin-right-5" v-for="item in data.jobTitle.split(',')">{{item}}</span>
        </template>
      </div>
      <div class="user-info-detail">
        <router-link to="/aboutMeEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;">
          <i class="icon-edit"></i>编辑
        </router-link>
        <label class="fs-xxl">关于我</label><br/>
        <p class="text-left margin-top-10" v-if="!data.selfIntroduction">完善全面的介绍可以让客户更完整立体的了解你</p>
        <p class="text-left margin-top-10" v-if="data.selfIntroduction">{{data.selfIntroduction}}</p>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <router-link to="/skillEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i
          class="icon-edit"></i>编辑
        </router-link>
        <label class="fs-xxl">擅长技能</label><br/>
        <p class="text-left margin-top-10" v-if="!data.baseSkillList">添加你的技能，可以为你更准确的推荐匹配项目</p>
        <template v-if="data.baseSkillList">
          <div class="text-left">
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10" v-for="item in data.baseSkillList">{{item.skillName}}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <router-link to="/productionAdd" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i
          class="icon-add"></i>添加
        </router-link>
        <label class="fs-xxl">作品案例</label><br/>
        <p class="text-left margin-top-10" v-if="!data.worksCases||data.worksCases.length<2">至少添加2个以上的作品案例才可以提交审核</p>
        <div class="text-left margin-top-10" v-if="data.worksCases">
          <div v-for="item in data.worksCases">{{item.workName}}<a class="float-right">删除</a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        data:{}
      }
    },
    methods: {
      refresh: function () {
        if (this.$route.params.id) {
          this.$http.get(this.url('techMaster/queryMasterDetail'), {params: {id: this.$route.params.id}}).then(this.rspHandler((data) => {
            this.data = data
          }))
        }else{
        	this.data = this.userInfo
        }
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent,function(){
      	this.refresh()
      })
    }
  }
</script>
