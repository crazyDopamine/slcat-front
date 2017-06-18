<template>
    <div class="nav-container" v-show="show">
        <div class="mask" @click="show=false"></div>
        <nav class="nav-left" :class="show?'show':'hidden'">
            <div class="text-center">
                <img class="user-avatar margin-bottom-10" src="/dist/static/img/solomiologo2.png"><br/>
                <span>昵称</span>
            </div>
            <ul class="menu">
                <li v-for="data in menu" :class="path==data.path?'active':''">
                    <router-link :to="data.path">{{data.name}}</router-link>
                    <i v-if="path==data.path" class="icon-right float-right"></i>
                </li>
            </ul>
            <div class="margin-top-20 fc-gray-l" >
                021－555565656<br/>
                周一至周五<br/>
                10:00-19:00
            </div>
        </nav>
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
                    {name:'任务大厅',path:'/taskList'},
                    {name:'我的任务',path:'/myTask/1'},
                    {name:'我的工作',path:'/myTask/2'},
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