<template>
  <div class="page-container no-bar-container">
    <div class="container">
      <div class="text-center fs-xxl">作品案例</div>
      <div class="form-area padding-left-0 padding-right-0">
        <div class="form-row">
          <label>作品名称（20字以内）<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.workName"/>
          </div>
        </div>
        <div class="form-row">
          <label>职责（20字以内）<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.responsibilities"/>
          </div>
        </div>
        <!--<div class="form-row">-->
        <!--<label>行业<span class="fc-red">*</span></label><br/>-->
        <!--<div class="form-field">-->
        <!--<popup-radio class="field-select" :options="selections.who" v-model="data.type"></popup-radio>-->
        <!--</div>-->
        <!--</div>-->
        <div class="form-row">
          <label>作品链接（实际作品链接或作品地址）</label><br/>
          <div class="form-field">
            <input type="text" v-model="fieldSet.worksLink"/>
          </div>
        </div>
        <div class="form-row">
          <label>作品描述（500字以内）<span class="fc-red">*</span></label><br/>
          <div class="form-field">
            <textarea rows="10" v-model="fieldSet.worksDesc"></textarea>
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
  import {toNV} from '../../common/utils'
  import {PopupRadio} from 'vux'
  import formValidate from '../../common/formValidate'
  export default {
    mixins: [formValidate],
    components: {
      PopupRadio
    },
    data: function () {
      return {
        fieldSet: {
          workName: '',
          responsibilities: '',
          worksLink: '',
          worksDesc: ''
        },
        rule:{
        	workName:{
        		label:'作品名称',
            required:true,
            maxLength:20
          },
          responsibilities:{
            label:'职责',
            required:true,
            maxLength:20
          },
          worksDesc:{
            label:'作品描述',
            required:true,
            maxLength:500
          }
        }
      }
    },
    methods: {
      submit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.$vux.loading.show({
            text: '正在提交'
          })
          this.$http.post(this.url('techMasterWorksCase/update'), params).then(this.rspHandler((data) => {
            window.vm.getUserInfo()
            this.$vux.loading.hide()
            this.$vux.toast.text('提交成功', 'bottom');
            this.$router.push('/userInfo')
          }))
        }
      }
    },
    created: function () {

    }
  }
</script>
