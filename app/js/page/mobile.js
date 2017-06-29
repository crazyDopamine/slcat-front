/**
 * Created by dongwei on 2017/5/15.
 */
var vueInit = require('../common/vueInit');
var css = require('../../sass/mobile/style.scss');
var Vue = require('vue');
var mint = require('mint-ui');
var widget = require('../common/widget/widgetMobile');
widget.init(Vue);
Vue.use(mint);
var router = require('./routerMobile');
var consts = require('../common/const');
var vm;
var config = {
    data:{
        showNav:false,
        path:''
    },
    methods:{
        showMenu:function(show){
            this.$refs.navLeft.show = !this.$refs.navLeft.show;
        },
        login:function(){
            var self = this;
            setTimeout(function(){
                self.userInfoLoaded=consts.loadedStatus;
                self.$emit(consts.loadedEvent);
            },100);
        }
    },
    created:function(){
        this.login();
    },
    mounted:function(){

    }
}
config.router = router;
router.afterEach(function(to,from){
    config.data.path = to.path;
    if(vm)vm.$refs.navLeft.show = false;
});
vm = vueInit.init(config);