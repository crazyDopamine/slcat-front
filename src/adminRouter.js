
import VueRouter from 'vue-router'
import taskManage from './components/admin/taskManage.vue'
import userManage from './components/admin/userManage.vue'
import industryManage from './components/admin/industryManage.vue'
import cityManage from './components/admin/cityManage.vue'
import skillManage from './components/admin/skillManage.vue'
import dictionaryManage from './components/admin/dictionaryManage.vue'
import businessTypeManage from './components/admin/businessTypeManage.vue'

const routes = [
  {path: '/', redirect: '/userManage'},
  {path: '/taskManage', component: taskManage},
  {path: '/userManage',component: userManage},
  {path: '/industryManage',component: industryManage},
  {path: '/cityManage',component: cityManage},
  {path: '/skillManage',component: skillManage},
  {path: '/dictionaryManage',component: dictionaryManage},
  {path: '/businessTypeManage',component: businessTypeManage}
  ]

export default new VueRouter({
  routes
})
