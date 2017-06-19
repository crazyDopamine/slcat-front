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
                <label class="title col-16 fs-l">
                    智能硬件品牌命名<i class="">招募中</i>
                </label>
                <span class="col-8 text-right"><span class="fc-red fs-l">10000</span>元以上</span><br/>
                <span>策划师</span><br/>
                <span>已推荐</span><span class="fc-theme">5</span>
                <span>已申请</span><span class="fc-theme">5</span>
                <span>已浏览</span><span class="fc-theme">5</span>
                <span class="float-right">1个小时前</span>
            </li>
        </ul>
    </div>
</template>
<script>
    module.exports = {
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
</script>