/**
 * Created by dongwei on 2017/5/15.
 */
var Vue = require('vue');
var vueResource = require('vue-resource');
Vue.use(vueResource);
var filters = require('./filters');
var utils = require('./utils');
for(var key in filters){
    Vue.filter(key,filters[key]);
}

module.exports={
    init:function(config){
        var vm;
        var data = {
            userInfo:{},
            userInfoLoaded:0,
        }
        utils.mix(config.data,data);
        vm = new Vue(config).$mount('#app');
        window.vm = vm;
        return vm;
    }
}