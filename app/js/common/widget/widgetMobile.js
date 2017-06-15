/**
 * Created by dongwei on 2017/5/15.
 */
var msHeader = require('./header.vue');
var msFooter = require('./footer.vue');

module.exports={
    widget:function(vue){
        if(!vue||!vue.component)return
        // Vue.component('ms-header',msHeader);
        // Vue.component('ms-footer',msFooter);
    }
}