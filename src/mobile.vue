<template>
  <div id="app">
    <x-header class="slc-header">
      <img src="/static/img/solomioLOGO.png">
      <a slot="overwrite-left" class="icon-nav" @click="showMenu()"></a>
    </x-header>
    <nav-left ref="navLeft" :path="path"></nav-left>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {XHeader, Icon} from 'vux'
  import navLeft from './components/mobile/widget/navLeft.vue'
  import consts from './common/const'
  export default {
    components: {Icon, XHeader, 'nav-left': navLeft},
    name: 'app',
    data: function () {
      return {
        path: '',
        showNav: false
      }
    },
    methods: {
      showMenu: function (show) {
        this.$refs.navLeft.show = !this.$refs.navLeft.show
      },
      login: function () {
        var self = this
        setTimeout(function () {
          self.userInfo = {}
          self.userInfoLoaded = consts.loadedStatus
          self.$emit(consts.loadedEvent, {}, consts.loadedStatus)
        }, 100)
      }
    },
    created: function () {
      var self = this
      this.login()
      this.path = this.$route.path
      this.$router.afterEach(function (to, from) {
        self.path = to.path
        self.$refs.navLeft.show = false
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>
