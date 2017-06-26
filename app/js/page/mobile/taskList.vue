<template>
    <div>
        <mt-navbar v-model="type" fixed class="top-nav-bar" value="1">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">策划</mt-tab-item>
            <mt-tab-item id="3">设计</mt-tab-item>
            <mt-tab-item id="4">活动</mt-tab-item>
            <mt-tab-item id="5">影视</mt-tab-item>
        </mt-navbar>
        <ul class="data-list task-list">
            <li class="data-item">
                <router-link :to="'/taskDetail/1'">
                    <label class="title col-16 fs-l">
                        智能硬件品牌命名<i class="">招募中</i>
                    </label>
                    <span class="col-8 text-right"><span class="fc-red fs-l">10000</span>元以上</span><br/>
                    <span>策划师</span><br/>
                    <ul class="flex col-16 fs-s"  style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
                        <li class="border-right">
                            <span>已推荐</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
                        </li>
                        <li class="border-right padding-left-10">
                            <span>已申请</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
                        </li>
                        <li class="padding-left-10">
                            <span>已浏览</span><span class="fc-theme padding-left-5 padding-right-5">5</span>
                        </li>
                    </ul>
                    <span class="float-right">1个小时前</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    var service = require('../../common/services');
    var config = {
        data:function(){
            return {
                type:"1"
            }
        },
        methods:{

        },
        created:function(){

        }
    }
    module.exports = config;
</script>