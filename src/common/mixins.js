import consts from './const'
var loadedMixins = {
  data: function () {
    return {
      userInfo: {},
      userInfoLoaded: 0
    }
  },
  created: function () {
    this.$on(consts.loadedEvent, function (userInfo, userInfoLoaded) {
      this.userInfo = userInfo
      this.userInfoLoaded = userInfoLoaded
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedEvent, userInfo, userInfoLoaded)
      }
    })
    this.$on(consts.loadedFailEvent, function () {
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedFailEvent)
      }
    })
  },
  mounted: function () {
    if (window.vm && window.vm.userInfoLoaded === 1) {
      this.$emit(consts.loadedEvent)
    } else if (window.vm && window.vm.userInfoLoaded === 2) {
      this.$emit(consts.loadedFailEvent)
    }
  }
}

export {loadedMixins}
