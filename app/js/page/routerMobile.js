/**
 * Created by dongwei on 2017/5/15.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');
var expertDetail = require('./mobile/expertDetail.vue');
var expertList = require('./mobile/expertList.vue');
var main = require('./mobile/main.vue');
var services = require('./mobile/services.vue');
var setView = require('./mobile/set.vue');
var myTask = require('./mobile/myTask.vue');
var taskAdd = require('./mobile/taskAdd.vue');
var taskDetail = require('./mobile/taskDetail.vue');
var taskList = require('./mobile/taskList.vue');
var userInfo = require('./mobile/userInfo.vue');
var userInfoEdit = require('./mobile/userInfoEdit.vue');
Vue.use(VueRouter);
const routes = [
    { path: '/', redirect: '/main' },
    { path: '/expertDetail', component: expertDetail },
    { path: '/expertList', component: expertList },
    { path: '/main', component: main },
    { path: '/services', component: services },
    { path: '/set', component: setView },
    { path: '/myTask', component: myTask },
    { path: '/taskAdd', component: taskAdd },
    { path: '/taskDetail', component: taskDetail },
    { path: '/taskList', component: taskList },
    { path: '/userInfo', component: userInfo },
    { path: '/userInfoEdit', component: userInfoEdit },
]
var router = new VueRouter({
    routes:routes
});

module.exports=router;