// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins} from './common/mixins'
import App from './mobile.vue'
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
import './sass/mobile/style.scss'

import {ToastPlugin} from 'vux'
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.mixin(loadedMixins)

const routes = [
  {path: '/', redirect: '/main'},
  {path: '/expertDetail', component: expertDetail},
  {path: '/expertList', component: expertList},
  {path: '/main', component: main},
  {path: '/services', component: services},
  {path: '/set', component: setView},
  {path: '/myTask/:type', component: myTask},
  {path: '/taskAdd', component: taskAdd},
  {path: '/taskDetail/:id', component: taskDetail},
  {path: '/taskList', component: taskList},
  {path: '/userInfo', component: userInfo},
  {path: '/userInfoEdit', component: userInfoEdit},
  {path: '/aboutMeEdit', component: aboutMeEdit},
  {path: '/productionAdd', component: productionAdd},
  {path: '/skillEdit', component: skillEdit}
]

const router = new VueRouter({
  routes
})
let config = {
  router,
  render: h => h(App)
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app-box')
