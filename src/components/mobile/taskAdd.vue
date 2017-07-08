<template>
  <div class="task-add page-container">
    <div class="form-area">
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">1</span>选择你的项目类型<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <checker v-model="data.businessParentId" default-item-class="checker-item-default"
                   selected-item-class="checker-item-selected" type="radio">
            <checker-item :value="item.id" v-for="item in selections.businessParentId" :key="item"
                          @on-item-click="onTypeChange(item)">{{item.businessName}}
            </checker-item>
          </checker>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">2</span>选择项目的二级类型<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <popup-radio class="field-select" :options="selections.businessId" v-model="data.businessId"
                       placeholder="请选择"></popup-radio>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">3</span>选择所需技能<span class="fc-red">*</span></label><br/>
        <!--<span v-for="(value,key) in skillList" @click="skillList[key]=false">{{value}}{{key}}</span>-->
        <div class="form-field">
          <!--<popup-radio class="field-select" :options="selections.skillList" @on-change="onSkillChange"-->
          <!--placeholder="请选择"></popup-radio>-->
          <checker v-model="data.skillList" default-item-class="checker-item-default"
                   selected-item-class="checker-item-selected" type="checkbox">
            <checker-item :value="item.id" v-for="item in selections.skillList" :key="item">{{item.skillName}}
            </checker-item>
          </checker>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">4</span>项目名称<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <input type="text" v-model="data.projectName"/>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">5</span>项目描述<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <textarea rows="4" v-model="data.projectDesc"></textarea>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">6</span>价格预算(元)<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <input type="number" v-model="data.projectBudget"/>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">7</span>项目周期<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <popup-radio class="field-select" :options="selections.projectCycle" v-model="data.projectCycle"
                       placeholder="请选择"></popup-radio>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">8</span>公司名称<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <input type="text" v-model="data.companyName"/>
        </div>
      </div>
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">9</span>倾向让谁完成项目<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <checker v-model="data.trendComplete" default-item-class="checker-item-radio-default"
                   selected-item-class="checker-item-radio-selected" type="radio">
            <checker-item :value="item.value" v-for="item in selections.trendComplete" :key="item">{{item.desc}}
            </checker-item>
          </checker>
        </div>
      </div>
      <div class="btn-area">
        <a class="btn btn-theme-round btn-large" @click="submit()">发布项目</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {toKV, getType, getSkill, selections, url, rspHandler} from '../../common/utils'
  import consts from '../../common/const'
  import {Checker, CheckerItem, PopupPicker, PopupRadio} from 'vux'
  export default{
    components: {
      Checker,
      CheckerItem,
      PopupPicker,
      PopupRadio
    },
    data: function () {
      return {
        data: {
          businessParentId: '',
          businessId: '',
          projectName: '',
          projectDesc: '',
          projectBudget: '',
          projectCycle: '',
          companyName: '',
          trendComplete: '',
          skillList: [],
          status: '招募中'
        },
        businessParentIdMap: {},
        selections: {
          businessParentId: [],
          businessId: [],
          skillList: [],
          projectCycle: [],
          trendComplete: []
        }
      }
    },
    methods: {
      refreshSelections: function () {
        var self = this
        getType(this).then(function (data) {
          self.selections.businessParentId = data
        })
        getSkill(this).then(function (data) {
          self.selections.skillList = data
        })
        selections(300, this).then(function (data) {
          self.selections.projectCycle = toKV(data, 'value', 'desc')
        })
        selections(100, this).then(function (data) {
          self.selections.trendComplete = data
        })
      },
      onTypeChange: function (data) {
        this.selections.businessId = toKV(data.children, 'id', 'businessName')
        this.data.businessId = ''
      },
      submit: function () {
        var self = this
        this.$vux.loading.show({
          text: '提交中'
        })
        this.$http.post(url('employer/add'), this.data).then(rspHandler(function (data) {
          self.$vux.loading.show({
            text: data
          })
          setTimeout(function () {
            self.$vux.loading.hide()
            self.$router.push('/taskList')
          }, 1000)
        }))
      }
    },
    created: function () {
      this.$on(consts.loadedEvent, function () {
        this.refreshSelections()
      })
    }
  }
</script>
