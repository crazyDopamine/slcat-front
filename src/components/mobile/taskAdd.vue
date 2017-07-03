<template>
  <div class="task-add">
    <div class="form-area">
      <div class="form-row">
        <label><span class="btn-black-round margin-right-5">1</span>选择你的项目类型<span class="fc-red">*</span></label><br/>
        <div class="form-field">
          <checker v-model="data.type" default-item-class="checker-item-default"
                   selected-item-class="checker-item-selected" type="radio">
            <checker-item :value="item.id" v-for="item in selections.businessParentId" :key="item">{{item.name}}
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
            <checker-item :value="item.key" v-for="item in selections.skillList" :key="item">{{item.value}}
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
          <popup-radio class="field-select" :options="selections.who" v-model="data.objectCycle"
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
            <checker-item :value="item.id" v-for="item in selections.type" :key="item">{{item.name}}</checker-item>
          </checker>
        </div>
      </div>
      <div class="btn-area">
        <a class="btn btn-theme-round btn-large">发布项目</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {toNV, each, getType} from '../../common/utils'
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
          type2: '',
          businessParentId: '',
          businessId: '',
          projectName: '',
          projectDesc: '',
          projectBudget: '',
          objectCycle: '',
          companyName: '',
          trendComplete: '',
          skillList: []
        },
        businessParentIdMap: {},
        selections: {
          businessParentId: [{id: 0, name: '类型3'}, {id: 2, name: '类型4'}],
          businessId: [{key: 0, value: '类型1'}, {key: 2, value: '类型2'}],
          skillList: [{key: 0, value: '技能1'}, {key: 2, value: '技能2'}],
          type: [{id: 0, name: 'test1'}, {id: 2, name: 'test2'}],
          price: [{value: 0, name: 'test1'}, {value: 2, name: 'test2'}],
          who: [{key: 1, value: 'test1'}, {key: 2, value: 'test2'}]
        }
      }
    },
    methods: {
      refreshSelections: function () {
        var self = this
        getType(this).then(function (data) {
          self.selections.businessParentId = toNV(data, 'id', 'businessName')
          self.businessParentIdMap = {}
          each(data, function (item, index) {
            self.businessParentIdMap[item.id] = item
          })
        })
      },
      onSkillChange: function (value) {
        if (!this.skillList[value]) {
          this.$set(this.skillList, value, true)
          console.log(this.skillList)
        }
      }
    },
    created: function () {
      this.$on(consts.loadedEvent, function () {
        this.refreshSelections()
      })
      this.$watch('data.businessParentId', function (id) {
        if (this.businessParentIdMap[id]) {
//                    this.selections.businessId = this.businessParentIdMap[id].children;
        }
      })
    }
  }
</script>
