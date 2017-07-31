<template>
  <div class="page-container no-bar-container">
    <div class="container">
      <div class="text-center">
        <div class="file-input-area">
          <img class="user-img" :src="fieldSet.headImgUrl | img">
          <input class="file-input" type="file" @change="upload($event)">
        </div>
        <!--<img class="user-img" :src="userInfo.headImgUrl?userInfo.headImgUrl:'/static/img/user-img-default.png'">-->
      </div>
      <div class="form-area padding-left-0 padding-right-0">
        <div class="form-row">
          <label>选择入驻类型<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <checker v-model="fieldSet.recruitType" default-item-class="checker-item-radio-default"
                     selected-item-class="checker-item-radio-selected" type="radio">
              <checker-item :value="item.value" v-for="item in selections.recruitType" :key="item">{{item.desc}}</checker-item>
            </checker>
          </div>
        </div>
        <div class="form-row">
          <label>昵称<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.nickName"/>
          </div>
        </div>
        <div class="form-row">
          <label>手机号<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.phone"/>
          </div>
        </div>
        <div class="form-row">
          <label>职位头衔<span class="fc-red">*</span>（多个头衔请用","隔开）</label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.jobTitle"/>
          </div>
        </div>
        <!--<div class="form-row">-->
        <!--<label>职位类型<span class="fc-red">*</span></label><br/>-->
        <!--<div class="form-field">-->
        <!--<popup-radio class="field-select" :options="selections.who" v-model="fieldSet.type"></popup-radio>-->
        <!--</div>-->
        <!--</div>-->
        <div class="form-row">
          <label>所属行业<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <popup-radio class="field-select" :options="selections.industryId"
                         v-model="fieldSet.industryId"></popup-radio>
          </div>
        </div>
        <div class="form-row">
          <label>工作经验<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <popup-radio class="field-select" :options="selections.workExperience"
                         v-model="fieldSet.workExperience"></popup-radio>
          </div>
        </div>
        <div class="form-row">
          <label>日薪（8小时）<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="number" v-model="fieldSet.dailyWage"/>
          </div>
        </div>
        <div class="form-row">
          <label>所在城市<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <popup-radio class="field-select" :options="selections.cityId" v-model="fieldSet.cityId"></popup-radio>
            <!--<x-address title="" class="field-address" value-text-align="left" v-model="fieldSet.cityId"-->
            <!--:list="selections.address" hide-district></x-address>-->
            <!--<popup-radio class="field-select" :options="selections.who" v-model="fieldSet.type"></popup-radio>-->
          </div>
        </div>
        <div class="form-row">
          <label>性别<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <div class="form-field">
              <checker v-model="fieldSet.sex" default-item-class="checker-item-radio-default"
                       selected-item-class="checker-item-radio-selected" type="radio">
                <checker-item :value="item.value" v-for="item in selections.sex" :key="item">{{item.desc}}
                </checker-item>
              </checker>
            </div>
          </div>
        </div>
        <div class="btn-area">
          <a class="btn btn-theme-round btn-harf" @click="submit()">保存</a>
          <a class="btn btn-gray-d-round btn-harf" @click="$router.go(-1)">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Checker, CheckerItem, PopupRadio, ChinaAddressV3Data, XAddress} from 'vux'
  import {getAddress, selections} from '../../common/utils'
  import formValidate from '../../common/formValidate'
  export default{
    components: {
      Checker,
      CheckerItem,
      PopupRadio,
      XAddress
    },
    mixins: [formValidate],
    data: function () {
      return {
        fieldSet: {
          headImgUrl:'',
          recruitType: '',
          nickName: '',
          phone: '',
          jobTitle: '',
          industryId:'',
          workExperience: '',
          dailyWage: '',
          cityId: '',
          sex: ''
        },
        rule: {
          recruitType: {
            required: true,
            label: '入驻类型'
          },
          nickName: {
            required: true,
            maxLength: 20,
            label: '昵称',
          },
          phone: {
            required: true,
            phoneNumber: true,
            label: '手机号'
          },
          jobTitle: {
            required: true,
            label: '职位头衔'
          },
//          jobTitle:{
//            required:true,
//            label:'职位头衔'
//          },
          workExperience: {
            required: true,
            label: '工作经验'
          },
          dailyWage: {
            required: true,
            min: 0,
            label: '日薪'
          },
          cityId: {
            required: true,
            label: '所在城市'
          },
          sex: {
            required: true,
            label: '性别'
          }
        },
        selections: {
          recruitType: [],
          cityId: [],
          sex: [],
          dailyWage: [],
          workExperience: [],
          industryId:[]
        }
      }
    },
    methods: {
      refreshSelections: function () {
        getAddress(this).then((data) => {
          this.selections.cityId = this.toKV(data, 'id', 'cityName')
        })
        selections(100, this).then((data) => {
          this.selections.recruitType = data
        })
        selections(200, this).then((data) => {
          this.selections.sex = data
        })
        selections(400, this).then((data) => {
          this.selections.workExperience = this.toKV(data, 'value', 'desc')
        })
        this.$http.get(this.url('industry/getAllIndustry')).then(this.rspHandler((data) => {
          this.selections.industryId = this.toKV(data,'id','industryName')
        }))
      },
      submit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.$vux.loading.show({
            text: '正在提交'
          })
          this.$http.post(this.url('techMaster/update'), params).then(this.rspHandler((data) => {
          	window.vm.getUserInfo()
            this.$vux.loading.hide()
            this.$vux.toast.text('提交成功', 'bottom');
            this.$router.push('/userInfo')
          }))
        }
      },
      upload:function(e){
      	var target = e.target
//      	target.value = ''
        var file = target.files[0]
        var formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.url('admin/fileUpload'),formData).then(this.rspHandler((data)=>{
        	this.fieldSet.headImgUrl = data
        }))
      }
    },
    created: function () {
      this.validateInit();
      this.$on(this.consts.loadedEvent, function () {
      	this.setValues(this.userInfo)
        this.refreshSelections();
      })
    }
  }
</script>
