<template>
    <div>
        <mt-navbar v-model="list.params.type" fixed class="top-nav-bar">
            <mt-tab-item id="">全部</mt-tab-item>
            <mt-tab-item :id="item.id" v-for="item in selections.type" :key="item">{{item.businessName}}</mt-tab-item>
        </mt-navbar>
        <ul class="data-list task-list">
            <li class="data-item" v-for="(data,index) in list.dataList">
                <router-link :to="'/taskDetail/'+data.id">
                    <label class="title col-16 fs-l">
                        {{data.issueName}}<span class="btn btn-theme-round margin-left-5" style="line-height: 20px;">{{data.status}}</span>
                    </label>
                    <span class="col-8 text-right"><span class="fc-red fs-l">{{data.projectBudget}}</span>元以上</span><br/>
                    <span class="margin-right-5" v-for="item in data.recruitBusinessList">{{item.businessName}}</span><br/>
                    <ul class="flex col-16 fs-s"  style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
                        <li class="border-right">
                            <span>已推荐</span><span class="fc-theme padding-left-5 padding-right-5">{{data.recommendCount}}</span>
                        </li>
                        <li class="border-right padding-left-10">
                            <span>已申请</span><span class="fc-theme padding-left-5 padding-right-5">{{data.applyCount}}</span>
                        </li>
                        <li class="padding-left-10">
                            <span>已浏览</span><span class="fc-theme padding-left-5 padding-right-5">{{data.visitCount}}</span>
                        </li>
                    </ul>
                    <span class="float-right">{{data.createdAt | date}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    var consts = require('../../common/const');
    var utils = require('../../common/utils');
    var mixins = require('../../common/mixins');
    var listNode = {};
    var config = {
        mixins:[mixins.list],
        data:function(){
            return {
                list:utils.mix({},mixins.listConfig,{url:'employer/queryEmpViewHeader',params:{
                    type:""
                }}),
                selections:{
                    type:[]
                }
            };
        },
        methods:{
        },
        created:function(){
            var self = this;
            this.$on(consts.loadedEvent,function(){
                this.refresh(1);
                utils.getType(this).then(function(data){
                    self.selections.type=data;
                });
//                this.$forceUpdate();
            });
        }
    }
    module.exports = config;
</script>