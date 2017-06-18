<template>
    <div class="nav-container" v-show="show">
        <nav class="nav-left" :class="show?'show':'hidden'">
            <div class="text-center">
                <img src="/dist/static/img/solomiologo2.png">
            </div>
            <ul class="menu">
                <li v-for="data in menu">
                    <router-link :to="data.path">{{data.name}}</router-link>
                </li>
            </ul>
        </nav>
        <div class="mask" @click="show=false"></div>
    </div>
</template>
<script>
    module.exports = {
        props:['path'],
        data:function(){
            return {
                menu:[
                    {name:'首页',path:'/main'},
                    {name:'服务',path:'/services'},
                    {name:'任务',path:'/taskList'},
                    {name:'我的工作',path:'/myTask'},
                    {name:'个人主页',path:'/userInfo'},
                    {name:'免费发布任务',path:'/taskAdd'},
                    {name:'设置',path:'/set'},
                ],
                show:false
            }
        },
        methods:{
            show:function(show){
                this.show = show;
            }
        },
        created:function(){

        }
    }
</script>