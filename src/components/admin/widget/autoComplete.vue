<template>
    <div class="auto-complete">
        <div class="auto-complete-mask" v-show="showFilter&&filter.length>0" @click="showFilter=false"></div>
        <input class="auto-complete-input" :value="value" @input="onInput" @click="showFilter=!showFilter">
        <ul class="auto-complete-options-container" v-show="showFilter&&filter.length>0">
            <li v-for="item in filter" @click="onItemClick(item)">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    var config = {
        props:{
            value:{
                type:String,
                default:''
            },
            options:{
                type:Array,
                default:function(){
                    return [];
                }
            },
            valueKey:{
                type:String,
                default:''
            }
        },
        data:function(){
            return {
                showFilter:false
            }
        },
        computed: {
            filter: function () {
                var self = this;
                return this.options.filter(function (item) {
                    return item.indexOf(self.value)>=0;
                })
            }
        },
        methods:{
            onInput:function(e){
                this.showFilter=true;
                this.$emit('input',e.target.value);
            },
            onItemClick:function(data){
                this.showFilter=false;
                this.$emit('input',data);
            }
        },
        created:function(){
        }
    };
    module.exports = config;
</script>