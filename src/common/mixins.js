import consts from './const'
import {rspHandler, url, toKV, toMap, toContent, mix} from './utils'
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
    this.$on(consts.loadedFailEvent, function () {
      this.userInfo = {}
      this.userInfoLoaded = 2;
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedFailEvent, this.userInfo, this.userInfoLoaded)
      }
    })
    this.$on(consts.loginOutEvent, function () {
      this.userInfo = {}
      this.userInfoLoaded = 0;
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loginOutEvent, this.userInfo, this.userInfoLoaded)
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
      consts: consts
    }
  },
  methods: {
    rspHandler: rspHandler,
    url: url,
    toKV: toKV,
    toMap: toMap,
    toContent : toContent,
    mix:mix
  }
}

export {loadedMixins, common}
