
import VueRouter from 'vue-router'
import dataManage from './components/admin/dataManage.vue'
import taskManage from './components/admin/taskManage.vue'
import userManage from './components/admin/userManage.vue'

const routes = [
  {path: '/', redirect: '/userManage'},
  {path: '/dataManage', component: dataManage},
  {path: '/taskManage', component: taskManage},
  {path: '/userManage',component: userManage}]

export default new VueRouter({
  routes
})
