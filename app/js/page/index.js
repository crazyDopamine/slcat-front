/**
 * Created by dongwei on 2017/5/15.
 */
var vueInit = require('../common/vueInit');
var css = require('../../sass/mobile/style.scss');
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
vm = vueInit.init(config);