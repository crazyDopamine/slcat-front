<template>
  <div class="page-container">
    <template v-if="data.status=='待完善'||data.status=='不通过'">
      <div class="user-info-audit">
        <div class="clearfix">
          <span class="col-14" v-if="data.status=='待完善'">完善资料通过审核后，即可拥有承接项目的资质。</span>
          <span class="col-14" v-if="data.status=='不通过'">审核不通过原因:{{data.reason}}</span>
          <a class="btn col-10 btn-gray-round btn-normal" :class="agreeProtocol?'bg-white fc-theme':''"
             @click="check()">提交审核</a><br/>
        </div>
      </div>
      <group class="user-info-top-check">
        <x-switch title="是否同意协议" v-model="agreeProtocol">
          <router-link to="/set">用户协议</router-link>
        </x-switch>
        <cell title="用户协议" link="/set"></cell>
      </group>
    </template>
    <template v-if="data.status=='待审核'">
      <div class="user-info-audit">
        <div class="clearfix">
          <span class="col-14">审核中，请耐心等待！</span>
        </div>
      </div>
    </template>
    <div class="container user-info">
      <div class="user-info-top">
        <router-link to="/userInfoEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"
                     v-if="data.status!='待审核'">
          <i class="icon-edit"></i>编辑
        </router-link>
        <img class="user-img" :src="data.headImgUrl | img"><br/>
        <label class="fs-xxl">{{data.nickName ? data.nickName : '昵称'}}</label><br/>
        <span>{{data.workExperience | selections(workExperienceMap)}}</span><br/>

        <!--<span class="btn btn-round-border btn-small">未提交审核</span><br/>-->
        <span>{{data.dailyWage ? data.dailyWage : '0'}}元/天</span><br/>
        <template v-if="data.jobTitle">
          <span class="btn btn-gray-round btn-small margin-right-5"
                v-for="item in data.jobTitle.split(',')">{{item}}</span>
        </template>
      </div>
      <div class="user-info-detail">
        <router-link to="/aboutMeEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"
                     v-if="data.status!='待审核'">
          <i class="icon-edit"></i>编辑
        </router-link>
        <label class="fs-xxl">关于我</label><br/>
        <p class="text-left margin-top-10" v-if="!data.selfIntroduction">完善全面的介绍可以让客户更完整立体的了解你</p>
        <p class="text-left margin-top-10" v-if="data.selfIntroduction" v-html="toContent(data.selfIntroduction)"></p>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <router-link to="/skillEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"
                     v-if="data.status!='待审核'"><i
          class="icon-edit"></i>编辑
        </router-link>
        <label class="fs-xxl">擅长技能</label><br/>
        <p class="text-left margin-top-10" v-if="!data.baseSkillList">添加你的技能，可以为你更准确的推荐匹配项目</p>
        <template v-if="data.baseSkillList">
          <div class="text-left">
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10" v-for="item in data.baseSkillList">{{item.skillName}}</span>
          </div>
        </template>
        <template v-if="!data.baseSkillList||!data.baseSkillList.length">
          <div class="margin-top-10">还未添加技能</div>
        </template>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <router-link to="/productionAdd" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"
                     v-if="data.status!='待审核'"><i
          class="icon-add"></i>添加
        </router-link>
        <label class="fs-xxl">作品案例</label><br/>
        <p class="text-left margin-top-10" v-if="!data.worksCases||data.worksCases.length<2">至少添加2个以上的作品案例才可以提交审核</p>
        <div class="text-left margin-top-10" v-if="data.worksCases">
          <div class="margin-bottom-10 clearfix" v-for="item in data.worksCases">
            {{item.workName}}
            <a class="float-right" @click="removeWorksCase(item.id)"
               v-if="data.status!='待审核'">删除</a>
            <router-link class="float-right margin-right-10" :to="'/productionAdd/'+item.id"
                         v-if="data.status!='待审核'">修改
            </router-link>
            <br/>
            <span class="col-6">职责:</span>
            <div class="col-18">{{item.responsibilities}}</div>
            <span class="col-6">描述:</span>
            <div class="col-18" v-html="toContent(item.worksDesc)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {selections} from '../../common/utils'
  import {XSwitch, Group, Cell} from 'vux'
  export default {
    components: {
      XSwitch,
      Group,
      Cell
    },
    data: function () {
      return {
        data: {},
        workExperienceMap:{},
        agreeProtocol: false
      }
    },
    methods: {
      check: function () {
        if (this.agreeProtocol) {
          if (this.data.worksCases.length < 2) {
            window.vm.$vux.toast.text('作品案例不足2个', 'bottom', 2000)
            return
          }
          this.$http.get(this.url('checkMaster'), {params: {id: this.$route.params.id}}).then(this.rspHandler((data) => {
            window.vm.getUserInfo()
          }))
        } else {
          window.vm.$vux.toast.text('请同意协议', 'bottom', 2000)
        }
      },
      removeWorksCase: function (id) {
        this.$vux.confirm.show({
          title: '删除',
          content: '确认删除该案例作品？',
          onConfirm: () => {
            this.$http.get(this.url('techMaster/delWorksCase'), {params: {id: id}}).then(this.rspHandler((data) => {
              window.vm.getUserInfo()
            }))
          }
        })
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent, function () {
        selections('400').then((data, map) => {
          this.workExperienceMap = window.dicMapMap['400']
        })
        this.data = this.userInfo
      })
    }
  }
</script>
