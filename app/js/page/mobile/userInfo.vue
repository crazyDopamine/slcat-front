<template>
    <div class="page-container" style="padding-top:0;">
        <div class="user-info-audit">
            <span class="col-16">完善资料通过审核后，即可拥有承接项目的资质。</span>
            <a class="btn col-8 btn-gray-round btn-normal">提交审核</a>
        </div>
        <div class="container user-info">
            <div class="user-info-top">
                <router-link to="/userInfoEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i class="icon-edit"></i>编辑</router-link>
                <img class="user-img" src="/dist/static/img/user-img-default.png"><br/>
                <label class="fs-xxl">昵称</label><br/>
                <span class="btn btn-round-border btn-small">未提交审核</span><br/>
                <span>0元/天</span><br/>
                <span class="btn btn-gray-round btn-small">自由职业</span>
            </div>
            <div class="user-info-detail">
                <router-link to="/aboutMeEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i class="icon-edit"></i>编辑</router-link>
                <label class="fs-xxl">关于我</label><br/>
                <p class="text-left margin-top-10">完善全面的介绍可以让客户更完整立体的了解你</p>
            </div>
        </div>
        <div class="container user-info">
            <div class="user-info-detail">
                <router-link to="/skillEdit" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i class="icon-edit"></i>编辑</router-link>
                <label class="fs-xxl">擅长技能</label><br/>
                <p class="text-left margin-top-10">添加你的技能，可以为你更准确的推荐匹配项目</p>
            </div>
        </div>
        <div class="container user-info">
            <div class="user-info-detail">
                <router-link to="/productionAdd" class="btn btn-text fc-theme" style="position: absolute;right:0;top:0;"><i class="icon-add"></i>添加</router-link>
                <label class="fs-xxl">作品案例</label><br/>
                <p class="text-left margin-top-10">至少添加2个以上的作品案例才可以提交审核</p>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data:function(){
            return {

            }
        },
        methods:{

        },
        created:function(){

        }
    }
</script>