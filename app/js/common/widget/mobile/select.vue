<template>
    <div class="sl-select">
        <input class="sl-select-input" ref="input" v-model="text" :readOnly="!filterable" :placeholder="placeholder" @click="show=!show"/><span class="select-icon"></span>
        <mt-picker class="sl-select-picker" ref="picker" :slots="slots" v-show="show" :valueKey="labelField" showToolbar>
            <div class="text-right padding-right-20 padding-top-10">
                <a class="btn btn-theme btn-normal" @click="submit();">确定</a>
            </div>
        </mt-picker>
        <div class="sl-select-mask" v-show="show" @click="show=false;"></div>
    </div>
</template>
<script>
    module.exports = {
        props:{
            value:[String,Number],
            options:[Array],
            labelField:{
                type:String,
                default:'name'
            },
            valueField:{
                type:String,
                default:'id'
            },
            placeholder:{
                type:String,
                default:'请选择'
            }
        },
        data:function(){
            return {
                show:false,
                slots:[
                    {
                        values:this.options,
                    }
                ],
                text:'',
                filterable:false
            }
        },
        methods:{
            show:function(show){
                this.show = show;
            },
            submit:function(){
                var values = this.$refs.picker.getValues();
                if(!values[0])return;
                this.text=values[0][this.labelField];
                this.$emit('input', values[0][this.valueField]);
                this.show=false;
            }
        },
        created:function(){

        }
    }
</script>