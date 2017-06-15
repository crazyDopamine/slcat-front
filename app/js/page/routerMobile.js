/**
 * Created by dongwei on 2017/5/15.
 */
var VueRouter = require('vue-router');
const routes = [
    // { path: '/', redirect: '/main' },
    // { path: '/main', component: dayPage },
]
var router = new VueRouter({
    routes:routes
});

module.exports={
    init:function(config,Vue){
        Vue.use(VueRouter);
        config.routes = router;
    }
};