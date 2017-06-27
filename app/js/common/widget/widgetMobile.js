/**
 * Created by dongwei on 2017/5/15.
 */
var navLeft = require('./mobile/navLeft.vue');
var select = require('./mobile/select.vue');

module.exports={
    init:function(vue){
        if(!vue||!vue.component)return
        vue.component('nav-left',navLeft);
        vue.component('sl-select',select);
    }
}