import consts from './const'
import {rspHandler, url, toKV, toMap} from './utils'
var loadedMixins = {
  data: function () {
    return {
      userInfo: {},
      userInfoLoaded: 0
    }
  },
  created: function () {
    this.$on(consts.loadedEvent, function (userInfo) {
      this.userInfo = userInfo
      this.userInfoLoaded = 1
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedEvent, userInfo)
      }
    })
    this.$on(consts.loadedFailEvent, function (userInfo, userInfoLoaded) {
      this.userInfo = {}
      this.userInfoLoaded = 2;
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedFailEvent, this.userInfo, this.userInfoLoaded)
      }
    })
  },
  mounted: function () {
    if (!window.vm) {
      return
    }
    if (window.vm.userInfoLoaded === 1) {
      this.$emit(consts.loadedEvent, window.vm.userInfo)
    } else if (window.vm.userInfoLoaded === 2) {
      this.$emit(consts.loadedFailEvent, window.vm.userInfo)
    }
  }
}

var common = {
  data: function () {
    return {
      consts: {
        ticketKey: 'ticket',
        loginEvent: 'loginEvent',
        loadedEvent: 'loaded',
        loadedFailEvent: 'loadedFail',
        listLoadEvent: 'listLoadEvent',
        formErrorEvent: 'formErrorEvent',
        CODE_SUCC: '000000', //成功
        CODE_FAIL: '200000', //失效
        CODE_ERROR: '-999999', //失败
        CODE_PARAM_ERR: '10002', //参数错误
        CODE_VERIFI_ERROR: "10012", //验证码错误
      }
    }
  },
  methods: {
    rspHandler: rspHandler,
    url: url,
    toKV:toKV,
    toMap:toMap
  }
}

export {loadedMixins, common}
