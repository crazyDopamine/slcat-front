<template>
    <div class="task-add">
        <div class="form-area">
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">1</span>选择你的项目类型<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <mt-radio class="task-add-type" :options="selections.businessParentId" v-model="data.businessParentId"></mt-radio>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">2</span>选择项目的二级类型<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <sl-select :options="selections.businessId" labelField="businessName" v-model="data.businessId"></sl-select>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">3</span>选择所需技能<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <sl-select :options="selections.price" labelField="name"></sl-select>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">4</span>项目名称<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <input type="text" v-model="data.issueName"/>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">5</span>项目描述<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <textarea rows="4"></textarea>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">6</span>价格预算<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <sl-select :options="selections.price" labelField="name"></sl-select>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">7</span>项目周期<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <sl-select :options="selections.price" labelField="name"></sl-select>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">8</span>公司名称<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <input type="text"/>
                </div>
            </div>
            <div class="form-row">
                <label><span class="btn-black-round margin-right-5">9</span>倾向让谁完成项目<span class="fc-red">*</span></label><br/>
                <div class="form-field">
                    <mt-radio :options="selections.who"></mt-radio>
                </div>
            </div>
            <div class="btn-area">
                <a class="btn btn-theme-round btn-large">发布项目</a>
            </div>
        </div>
    </div>
</template>
<script>
    var utils = require('../../common/utils');
    var consts = require('../../common/const');
    module.exports = {
        data:function(){
            return {
                data:{
                    businessParentId:'',
                    businessId:'',
                    issueName:'',
                    companyName:'',
                    trendComplete:'',
                    projectDesc:'',
                    publisher:'',
                    phone:'',
                    recruitBusinessList:[]
                },
                businessParentIdMap:{},
                selections:{
                    businessParentId:[],
                    businessId:[],
                    type:utils.transformToLV([{id:0,name:'test1'},{id:2,name:'test2'}]),
                    price:[{id:0,name:'test1'},{id:2,name:'test2'}],
                    who:[{label:1,value:'test1'},{label:2,value:'test2'}]
                }
            }
        },
        methods:{
            refreshSelections:function(){
                var self = this;
                utils.getType(this).then(function(data){
                    self.selections.businessParentId = utils.transformToLV(data,'id','businessName');
                    self.businessParentIdMap = {};
                    utils.each(data,function(item,index){
                        self.businessParentIdMap[item.id] = item;
                    });
                });
            }
        },
        created:function(){
            this.$on(consts.loadedEvent,function(){
                this.refreshSelections()
            });
            this.$watch('data.businessParentId',function(id){
                if(this.businessParentIdMap[id]){
//                    this.selections.businessId = this.businessParentIdMap[id].children;
                }
            });
        }
    }
</script>