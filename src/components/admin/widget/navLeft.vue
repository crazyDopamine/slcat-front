<template>
    <nav>
        <ul class="nav-left">
            <li :class="path==data.path?'active':''" v-for="data in menu">
              <router-link :to="data.path">
                <i :class="data.icon"></i>
                {{data.name}}
              </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
    module.exports = {
        props: ['path'],
        data:function(){
            return {
                menu:[
                    {name:'用户管理',path:'/userManage',icon:'icon-goods'},
                    {name:'任务管理',path:'/taskManage',icon:'icon-Truck'},
                    {name:'数据管理',path:'/dataManage',icon:'icon-Driver'},
                ]
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
