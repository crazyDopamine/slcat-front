/**
 * Created by dongwei on 2017/5/15.
 */
var vueInit = require('../common/vueInit');
var css = require('../../sass/admin/styleAdmin.scss');
var router = require('./routerAdmin');
var Vue = require('vue');
var iview = require('iview');
iview.install(Vue);
var vm;
var config = {
    data:{
    },
    created:function(){
    },
    mounted:function(){
    }
}
router.init(config,Vue);
vm = vueInit.init(config);