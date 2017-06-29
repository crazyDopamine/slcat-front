var consts = require('./const');
var utils = require('./utils');
var mint = require('mint-ui');
var listConfig = {
    url:'',
    dataList:[],
    total:0,
    page:1,
    pageSize:10,
    params:{},
    selected:{}
}
var dicMap = {};

module.exports={
    loaded:{
        created: function () {
            this.$on(consts.loadedEvent,function(){
                var children = this.$children;
                for(var i = 0;i<children.length;i++){
                    children[i].$emit(consts.loadedEvent,this.userInfo);
                }
            });
            this.$on(consts.loadedFailEvent,function(){
                var children = this.$children;
                for(var i = 0;i<children.length;i++){
                    children[i].$emit(consts.loadedFailEvent,this.userInfo);
                }
            });
        },
        mounted:function(){
            if(window.vm&&window.vm.userInfoLoaded==consts.loadedStatus){
                this.$emit(consts.loadedEvent);
            }else if(window.vm&&window.vm.userInfoLoaded==consts.loadedFailStatus){
                this.$emit(consts.loadedFailEvent);
            }
        }
    },
    url:{
        methods:{
            url:function(url){
                if(url.indexOf('http://')<0){
                    return window.baseUrl + url;
                }else{
                    return url;
                }
            },
            rspHandler:function(callback){
                return function(rsp){
                    var data = rsp.data;
                    if(data.code==consts.CODE_SUCC){
                        callback(data.data)
                    }else{
                        mint.Toast({message:data.msg,position: 'bottom'});
                    }
                }
            }
        }
    },
    list:{
        methods:{
            refresh:function(page,listNode,options){
                var self = this;
                if(!listNode)listNode = this.list;
                if(page){
                    listNode.page=page;
                }
                var params = {};
                if(listNode.page){
                    params = {page:listNode.page,pageSize:listNode.pageSize};
                }
                params=utils.mix(params,listNode.params);
                listNode.selected={};
                this.$http.get(this.url(listNode.url),{params:params}).then(function(rsp){
                    var data = rsp.data;
                    if(data.code==consts.CODE_SUCC){
                        if(data.data instanceof Array){
                            listNode.dataList = data.data;
                            listNode.total = data.data.length;
                        }else{
                            listNode.dataList = data.data.dataList;
                            listNode.total=data.data.total;
                        }
                        self.$emit(consts.listLoadEvent,listNode);
                    }else{
                        mint.Toast({message:data.msg,position: 'bottom'});
                    }
                });
            }
        }
    },
    listConfig:listConfig
}