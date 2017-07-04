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
      if (userInfoLoaded) {
        this.userInfo = userInfo
        this.userInfoLoaded = userInfoLoaded
      }
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedEvent, this.userInfo, this.userInfoLoaded)
      }
    })
    this.$on(consts.loadedFailEvent, function (userInfo, userInfoLoaded) {
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedFailEvent, this.userInfo, this.userInfoLoaded)
      }
    })
  },
  mounted: function () {
    if (this.userInfoLoaded === consts.loadedStatus) {
      this.$emit(consts.loadedEvent, this.userInfo, this.userInfoLoaded)
    } else if (this.userInfoLoaded === consts.loadedFailEvent) {
      this.$emit(consts.loadedFailEvent, this.userInfo, this.userInfoLoaded)
    } else {
      this.$emit(consts.loadedEvent)
    }
  }
}

export {loadedMixins}
