// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins, common} from './common/mixins'
import vueg from 'vueg'
import filters from './common/filters'
import {httpInterceptor} from './common/interceptors'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'vueg/css/transition-min.css'
import './sass/admin/style.scss'

import dataManage from './components/admin/dataManage.vue'
import taskManage from './components/admin/taskManage.vue'
import userManage from './components/admin/userManage.vue'

import navLeft from './components/admin/widget/navLeft.vue'
import header from './components/admin/widget/header.vue'

Vue.use(VueRouter)
Vue.use(iView)
Vue.mixin(loadedMixins)
Vue.mixin(common)
Vue.use(filters)
Vue.use(VueResource)
Vue.http.interceptors.push(httpInterceptor)

const routes = [
  {path: '/', redirect: '/userManage'},
  {path: '/dataManage', component: dataManage},
  {path: '/taskManage', component: taskManage},
  {path: '/userManage',component: userManage}]

const router = new VueRouter({
  routes
})

Vue.use(vueg, router, {
  forwardAnim: 'fadeInRight',
  backAnim: 'fadeInleft'
})

let config = {
  router,
  components: {
    'nav-left': navLeft,
    'admin-header': header
  },
  data: function () {
    return {
      path: '',
      loginPop: false,
      modal_loading: false,
      loginForm: {
        fieldSet: {
          loginName: '',
          password: ''
        }
      }
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
      this.userInfo = {}
      this.userInfoLoaded = 1
      this.$emit(this.consts.loadedEvent, {}, this.consts.loadedStatus)
      // this.$http.get(this.url('techMaster/queryMasterDetail')).then(this.rspHandler((data) => {
      //   this.userInfo = data
      //   this.userInfoLoaded = 1
      //   this.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
      // }))
    }
  },
  created: function () {
    this.login()
    this.path = this.$route.path
    this.$router.afterEach((to, from) => {
      this.path = to.path
    })
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app')

