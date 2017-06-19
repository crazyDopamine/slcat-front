<template>
    <div>
        <mt-navbar v-model="type" fixed class="top-nav-bar" value="1">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">策划</mt-tab-item>
            <mt-tab-item id="3">设计</mt-tab-item>
            <mt-tab-item id="4">活动</mt-tab-item>
            <mt-tab-item id="5">影视</mt-tab-item>
        </mt-navbar>
        <div class="data-list service-list">
            <div class="data-item">
                <img class="item-img" src="/dist/static/img/01.jpg">
                <div class="content">
                    <label>品牌微电影定制</label><br/>
                    <a class="fc-red">了解详情</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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