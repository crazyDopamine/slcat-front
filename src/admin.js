// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins, common} from './common/mixins'
import vueg from 'vueg'
import filters from './common/filters'
import {httpInterceptor} from './common/interceptors'
import 'vux/src/styles/reset.less';
import 'vueg/css/transition-min.css'
import './sass/admin/style.scss'

Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.mixin(loadedMixins)
Vue.mixin(common)
Vue.use(filters)
Vue.use(VueResource)
Vue.http.interceptors.push(httpInterceptor)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})

Vue.use(vueg, router, {
  forwardAnim: 'fadeInRight',
  backAnim: 'fadeInleft'
})

let config = {
  router,
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
      setTimeout(() => {
        this.getUserInfo()
      }, 100)
    },
    getUserInfo: function () {
      this.$http.get(this.url('techMaster/queryMasterDetail')).then(this.rspHandler((data) => {
        this.userInfo = data
        this.userInfoLoaded = 1
        this.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
      }))
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
    router.afterEach(route => {
      var container = this.$el.querySelector('.main-container');
      container.scrollTop = 0;
    })
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app')

