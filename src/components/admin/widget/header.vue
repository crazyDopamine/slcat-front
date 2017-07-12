<template>
    <header>
        <div class="header">
            <img src="/dist/img/logo.png">
            <a class="float-right margin-top-15" @click="loginOut()">退出</a>
            <span class="float-right margin-top-15 margin-right-20">欢迎使用有色在线配送系统</span>
        </div>
    </header>
</template>
<script>
    var utils = require('../../utils');
    var consts = require('../../const');
    module.exports = {
        data:function(){
            return {

            }
        },
        methods:{
            nextBanner:function(index){
                if(index>2){
                    index = 1
                }else if(index<1){
                    index = 2;
                }
                this.bannerSwitch=index;
            },
            loginOut:function(){
                utils.cookie.delete(consts.ticketKey);
                this.$emit(consts.loginOutEvent);
            }
        },
        created:function(){
            var self = this;
            setInterval(function(){
                self.nextBanner(self.bannerSwitch+1);
            },10000);

        }
    }
</script>