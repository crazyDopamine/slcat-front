<template>
    <div>
        <div style="position: relative">
            <img src="/dist/static/img/taskDetail-bg.png" style="width: 100%;height: 100px;">
            <span style="position: absolute;bottom:5px;left:15px;">
                <span class="fc-theme fs-xl">任务大厅</span>
                <span class="fc-white">&gt;任务详情</span>
            </span>
        </div>
        <div class="detail-area">
            <label class="fs-xxl">标志设计</label><span class="btn btn-theme-border-round margin-left-20">招募中</span>
            <span class="float-right"><span class="fc-red fs-xxl">5000</span>元以上</span>
            <div class="content">
                时间周期：小于一周<br/>
                <ul class="flex col-24" style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
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
                <p style="margin-top:30px">
                    项目类型：设计/平面设计<br/>
                    公司名称：上海美喵信息科技有限公司<br/>
                    发布时间：2017-5-6 12:01:23<br/>
                    倾向让谁完成：个人<br/>
                </p>
                <ul class="gray-icons margin-top-20">
                    <li>平面设计</li>
                    <li>Photoshop</li>
                    <li>illusrator</li>
                    <li>VI设计</li>
                </ul>
            </div>
            <div class="task-description">
                <label class="title">项目描述</label><br/>
                <label class="display-inline-block margin-top-20">项目需求：</label>
                <p>
                    1.按照设计要求完成logo设计，并有至少三种配色选择。<br/>
                    2.设计后，logo配色需要应用到app主要页面上<br/>
                    3. 需要迎合玩潮流的年轻人<br/>
                    4.简单明了，偏好对比度高的色彩搭配，参考案例snapchat、live.ly、PocketVedio
                </p>
                <label class="display-inline-block margin-top-20">人员要求：</label>
                <p>
                    最好有类似风格案例，并愿意沟通需求。
                </p>
            </div>
            <a class="btn btn-large btn-theme-round margin-top-20">发送申请意向</a>
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