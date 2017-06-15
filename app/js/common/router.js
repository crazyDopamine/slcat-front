/**
 * Created by dongwei on 2017/5/15.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');
// var dayPage = require('../page/day.vue');
// var weekPage = require('../page/week.vue');
// var mouthPage = require('../page/mouth.vue');
// var seasonPage = require('../page/season.vue');
Vue.use(VueRouter);
const routes = [
    // { path: '/', redirect: '/day' },
    // { path: '/day', component: dayPage },
    // { path: '/week', component: weekPage },
    // { path: '/mouth', component: mouthPage },
    // { path: '/season', component: seasonPage }
]
var router = new VueRouter({
    routes:routes
});

module.exports=router;