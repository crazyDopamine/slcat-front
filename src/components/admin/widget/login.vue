<template>
    <Modal v-model="loginPop" title="登录" ok-text="登录"  width="400" :closable="false" :mask-closable="false">
        <div class="form-area">
            <div class="form-row clearfix">
                <label class="col-6 text-right padding-right-10">账号：</label>
                <Input class="col-18" type="text" v-model="loginForm.username"></Input>
            </div>
            <div class="form-row clearfix">
                <label class="col-6 text-right padding-right-10">密码：</label>
                <Input class="col-18" type="password" v-model="loginForm.password"></Input>
            </div>
        </div>
        <div slot="footer" class="text-center">
            <Button size="large" class="btn-orange" style="border-radius:20px;width:50%;" :loading="modal_loading" @click="login()">确认</Button>
        </div>
    </Modal>
</template>
<script>
    module.exports = {
        data:function(){
            return {
                loginPop:true,
                modal_loading:false,
                loginForm:{
                    username:'jinkaifeng',
                    password:'123456'
                }
            }
        },
        methods:{
            login:function(){
                this.modal_loading=true;
                // service.get('logistics/login',this.loginForm,function(code,rsp,msg){
                //     console.log(rsp)
                // });
            }
        },
        created:function(){

        }
    }
</script>