// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {loadedMixins, common} from './common/mixins'
import app from './components/admin/main.vue'
import filters from './common/filters'
import {httpInterceptor} from './common/interceptors'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vueg/css/transition-min.css'
import './sass/admin/style.scss'

Vue.use(VueRouter)
Vue.use(iView)
Vue.mixin(loadedMixins)
Vue.mixin(common)
Vue.use(filters)
Vue.use(VueResource)
Vue.http.interceptors.push(httpInterceptor)

// Vue.use(vueg, router, {
//   duration: '2000',
//   firstEntryDisable: true,
//   forwardAnim: 'fadeOut',
//   backAnim: 'fadeOut',
//   sameDepthDisable: true,
//   shadow:false
// })

let config = {
  render: h => h(app)
}

/* eslint-disable no-new */
window.vm = new Vue(config).$mount('#app-box')

