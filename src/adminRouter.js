
import VueRouter from 'vue-router'
import taskManage from './components/admin/taskManage.vue'
import userManage from './components/admin/userManage.vue'
import industryManage from './components/admin/industryManage.vue'
import cityManage from './components/admin/cityManage.vue'
import skillManage from './components/admin/skillManage.vue'
import dictionaryManage from './components/admin/dictionaryManage.vue'
import businessTypeManage from './components/admin/businessTypeManage.vue'
import adminManage from './components/admin/adminManage.vue'
import businessTypeDetail from './components/admin/businessTypeDetail.vue'

const routes = [
  {path: '/', redirect: '/userManage'},
  {path: '/taskManage', component: taskManage},
  {path: '/userManage',component: userManage},
  {path: '/industryManage',component: industryManage},
  {path: '/cityManage',component: cityManage},
  {path: '/skillManage',component: skillManage},
  {path: '/dictionaryManage',component: dictionaryManage},
  {path: '/businessTypeManage',component: businessTypeManage},
  {path: '/adminManage',component: adminManage},
  {path: '/businessTypeDetail/:id',component: businessTypeDetail}
]

export default new VueRouter({
  routes
})
