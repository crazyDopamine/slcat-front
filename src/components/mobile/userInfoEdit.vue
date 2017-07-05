<template>
  <div class="page-container">
    <div class="container">
      <div class="text-center">
        <img class="user-img" src="/static/img/user-img-default.png">
      </div>
      <div class="form-area padding-left-0 padding-right-0">
        <div class="form-row">
          <label>选择入驻类型<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <checker v-model="data.type" default-item-class="checker-item-radio-default"
                     selected-item-class="checker-item-radio-selected" type="radio">
              <checker-item :value="item.id" v-for="item in selections.type" :key="item">{{item.name}}</checker-item>
            </checker>
          </div>
        </div>
        <div class="form-row">
          <label>昵称<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="data.nickName"/>
          </div>
        </div>
        <div class="form-row">
          <label>职位头衔<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="data.staff"/>
          </div>
        </div>
        <div class="form-row">
          <label>所属行业<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <popup-radio class="field-select" :options="selections.who" v-model="data.type"></popup-radio>
          </div>
        </div>
        <div class="form-row">
          <label>工作经验<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <popup-radio class="field-select" :options="selections.who" v-model="data.type"></popup-radio>
          </div>
        </div>
        <div class="form-row">
          <label>日薪（8小时）<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="number" v-model="data.dailyWage"/>
          </div>
        </div>
        <div class="form-row">
          <label>所在城市<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <x-address title="" class="field-address" value-text-align="left" v-model="data.address"
                       :list="selections.address" hide-district></x-address>
            <!--<popup-radio class="field-select" :options="selections.who" v-model="data.type"></popup-radio>-->
          </div>
        </div>
        <div class="form-row">
          <label>性别<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <div class="form-field">
              <checker v-model="data.sex" default-item-class="checker-item-radio-default"
                       selected-item-class="checker-item-radio-selected" type="radio">
                <checker-item :value="item.id" v-for="item in selections.sex" :key="item">{{item.name}}</checker-item>
              </checker>
            </div>
          </div>
        </div>
        <div class="btn-area">
          <a class="btn btn-theme-round btn-harf">保存</a>
          <a class="btn btn-gray-d-round btn-harf" @click="$router.go(-1)">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Checker, CheckerItem, PopupRadio, ChinaAddressV3Data, XAddress} from 'vux'
  export default{
    components: {
      Checker,
      CheckerItem,
      PopupRadio,
      XAddress
    },
    data: function () {
      return {
        data: {
          type: '',
          nickName: '',
          cityId: '',
          dailyWage: '',
          sex: '',
          staff: '',
          status: '',
          address: [],
          personalInfo: '',
          workExperience: '',
          phone: '',
          recruitBaseSkills: []
        },
        selections: {
          address: ChinaAddressV3Data,
          type: [{id: 'man', name: '男'}, {id: 'woman', name: '女'}],
          sex: [{id: 'man', name: '男'}, {id: 'woman', name: '女'}],
          price: [{id: 1, name: 'test1', value: 1}, {id: 2, name: 'test2', value: 2}],
          who: [{key: 1, value: 'test1'}, {key: 2, value: 'test2'}]
        }
      }
    },
    methods: {
      refreshSelections: function () {

      }
    },
    created: function () {

    }
  }
</script>
