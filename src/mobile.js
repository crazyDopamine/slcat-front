// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins, common} from './common/mixins'
import aboutMeEdit from './components/mobile/aboutMeEdit.vue'
import expertDetail from './components/mobile/expertDetail.vue'
import expertList from './components/mobile/expertList.vue'
import main from './components/mobile/main.vue'
import myTask from './components/mobile/myTask.vue'
import productionAdd from './components/mobile/productionAdd.vue'
import services from './components/mobile/services.vue'
import setView from './components/mobile/set.vue'
import skillEdit from './components/mobile/skillEdit.vue'
import taskAdd from './components/mobile/taskAdd.vue'
import taskDetail from './components/mobile/taskDetail.vue'
import taskList from './components/mobile/taskList.vue'
import userInfo from './components/mobile/userInfo.vue'
import userInfoEdit from './components/mobile/userInfoEdit.vue'
import serviceDetail from './components/mobile/serviceDetail.vue'
import vueg from 'vueg'
import filters from './common/filters'
import {httpInterceptor} from './common/interceptors'
import navLeft from './components/mobile/widget/navLeft.vue'
import 'vux/src/styles/reset.less';
import 'vueg/css/transition-min.css'
import './sass/mobile/style.scss'

import {ToastPlugin, LoadingPlugin, XHeader, Icon} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.mixin(loadedMixins)
Vue.mixin(common)
Vue.use(filters)
Vue.use(VueResource)
Vue.http.interceptors.push(httpInterceptor)


// Vue.http.options.emulateJSON = true

const routes = [
  {path: '/', redirect: '/main'},
  {path: '/expertDetail', component: expertDetail},
  {path: '/expertList', component: expertList},
  {path: '/main', component: main},
  {path: '/services', component: services},
  {path: '/set', component: setView},
  {path: '/myTask', component: myTask},
  {path: '/taskAdd', component: taskAdd},
  {path: '/taskDetail/:id', component: taskDetail},
  {path: '/taskList', component: taskList},
  {path: '/userInfo', component: userInfo},
  {path: '/userInfo/:id', component: userInfo},
  {path: '/userInfoEdit', component: userInfoEdit},
  {path: '/aboutMeEdit', component: aboutMeEdit},
  {path: '/productionAdd', component: productionAdd},
  {path: '/skillEdit', component: skillEdit},
  {path: '/serviceDetail/:code', component: serviceDetail}
]

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

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app')
