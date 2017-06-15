/**
 * Created by dongwei on 2017/5/15.
 */
var vueInit = require('../common/vueInit');
var css = require('../../sass/mobile/style.scss');
var Vue = require('vue');
var mint = require('mint-ui');
Vue.use(mint);
var vm;
var config = {
    data:{
    },
    methods:{
        showMenu:function(){
            console.log(11);
        }
    },
    created:function(){
    },
    mounted:function(){
    }
}
vm = vueInit.init(config);