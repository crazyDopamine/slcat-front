<template>
  <div class="page-container no-bar-container">
    <!--<div class="user-info-audit">-->
    <!--<span class="col-16">完善资料通过审核后，即可拥有承接项目的资质。</span>-->
    <!--<a class="btn col-8 btn-gray-round btn-normal">提交审核</a>-->
    <!--</div>-->
    <div class="container user-info">
      <div class="user-info-top">
        <a class="float-right" @click="interest()">
          <x-icon class="btn-interest" type="ios-heart" size="30" v-if="data.isWatched"></x-icon>
          <x-icon class="btn-interest" type="ios-heart-outline" size="30" v-if="!data.isWatched"></x-icon>
        </a>
        <img class="user-img" :src="data.headImgUrl | img"><br/>
        <label class="fs-xxl">{{data.nickName ? data.nickName : '昵称'}}</label><br/>
        <!--<span class="btn btn-round-border btn-small">未提交审核</span><br/>-->
        <span>{{data.dailyWage ? data.dailyWage : '0'}}元/天</span><br/>
        <span>{{data.workExperience | selections(workExperienceMap)}}</span><br/>
        <template v-if="data.jobTitle">
          <span class="btn btn-gray-round btn-small margin-right-5"
                v-for="item in data.jobTitle.split(/[,，]/g)">{{item}}</span>
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
          <div class="text-center">
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10" v-for="item in data.baseSkillList">{{item.skillName}}</span>
          </div>
        </template>
        <template v-if="data.ownerSkills">
          <label class="fs-xxl">其他技能</label><br/>
          <div class="text-center">
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10"
                  v-for="item in data.ownerSkills.split(/[,，]/g)" :key="item">{{item}}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="container user-info">
      <div class="user-info-detail">
        <label class="fs-xxl">作品案例</label><br/>
        <!--<p class="text-left margin-top-10" v-if="!data.worksCases||data.worksCases.length<2">至少添加2个以上的作品案例才可以提交审核</p>-->
        <div class="text-left margin-top-20" v-if="data.worksCases">
          <div class="margin-bottom-10 clearfix" v-for="item in data.worksCases">
            {{item.workName}}<br/>
            <span>职责:</span><br/>
            <div class="padding-left-20">{{item.responsibilities}}</div>
            <span>描述:</span><br/>
            <div class="padding-left-20" v-html="toContent(item.worksDesc)"></div>
            <div class="col-24 margin-top-5">
              <img-input v-model="item.imgUrls" readOnly></img-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin:0 15px;">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="pay9()" v-if="!data.phone">查看联系方式（9元）</a>
      <a class="btn btn-large btn-theme margin-top-20" :href="'tel:'+ data.phone"
         v-if="data.phone">联系方式：{{data.phone}}</a>
    </div>
    <div style="margin:0 15px;" v-if="task&&task.status=='审核通过'">
      <a class="btn btn-large btn-theme-round margin-top-20" @click="submit()">确认委托</a>
    </div>
    <Confirm v-model="payPop" title="订单详情" confirm-text="确认支付" @on-confirm="onPayConfirm()">
      <div class="model-detail">
        <div class="clearfix">
          <label class="col-10 text-right">订单金额:</label>
          <span class="col-14 text-left padding-left-10">9元</span>
        </div>
        <div class="clearfix">
          <label class="col-10 text-right">支付方式:</label>
          <span class="col-14 text-left padding-left-10">微信支付</span>
        </div>
      </div>
    </Confirm>
  </div>
</template>
<script type="es6">
  import {selections} from '../../common/utils'
  import {Confirm} from 'vux'
  export default {
    components: {
      Confirm
    },
    data: function () {
      return {
        data: {},
        workExperienceMap: {},
        task: null,
        payPop: false,
        payForm: {},
        wxConfig: {}
      }
    },
    methods: {
      refresh: function () {
        selections('400').then((data, map) => {
          this.workExperienceMap = window.dicMapMap['400']
          if (this.$route.params.id) {
            this.$http.get(this.url('techMaster/queryMasterDetail'), {params: {id: this.$route.params.id}}).then(this.rspHandler((data) => {
              this.data = data
            }))
          }
          if (this.$route.params.taskId) {
            this.$http.get(this.url('employer/queryDetail/' + this.$route.params.taskId)).then(this.rspHandler((data) => {
              this.task = data
            }))
          }
        })
      },
      interest: function () {
        let params = {masterId: this.data.id}
        if (this.data.isWatched) {
          params.operateType = 'cancle'
        } else {
          params.operateType = 'watch'
        }
        this.$http.get(this.url('employer/watchMaster'), {params: params}).then(this.rspHandler(() => {
          this.refresh();
        }))
      },
      submit: function () {
        if (this.$route.params.taskId) {
          this.$vux.confirm.show({
            title: '确认',
            content: '是否确认当前牛人为项目委托人？',
            onConfirm: () => {
              this.$http.get(this.url('employer/confirm'), {
                params: {
                  taskId: this.$route.params.taskId,
                  masterId: this.$route.params.id
                }
              }).then(this.rspHandler(() => {
                this.$router.go(-1)
              }))
            }
          })
        }
      },
      pay9: function () {
        this.$http.post(this.url('masterOrder'), {
          free: 0.01,
          unActiveMasterId: this.data.id,
          body: '查看联系方式'
        }).then(this.rspHandler((data) => {
          this.payForm = data
          this.payPop = true
        }))
      },
      onPayConfirm: function () {
        var self = this
        wx.chooseWXPay({
          timestamp: this.payForm.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: this.payForm.nonceStr, // 支付签名随机串，不长于 32 位
          package: this.payForm.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: this.payForm.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: this.payForm.paySign, // 支付签名
          success: function (res) {
            self.$vux.toast.text('支付成功', 'bottom')
            self.refresh()
          }
        });
      },
      wxInit: function () {
        var url = "http://" + window.location.host + "/mobile.html";
        this.$http.get(this.url('getJsSign'), {params: {url: url}}).then(this.rspHandler((data) => {
          this.wxConfig = data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.sign,// 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }))
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent, function () {
        this.refresh()
        this.wxInit();
      })
    }
  }
</script>
