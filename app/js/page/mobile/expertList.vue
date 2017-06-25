<template>
    <div>
        <div class="border-bottom">
            <mt-search class="expert-list-search"
                       v-model="params.search"
                       cancel-text="取消"
                       placeholder="牛人一搜就到  搜索专长或其他关键字">
            </mt-search>
            <mt-navbar v-model="tabSwitch" class="expert-list-tab">
                <mt-tab-item id="type">
                    {{tabSelect.type}}<i class="margin-left-5" :class="tabSwitch=='type'?'icon-arrow-up':'icon-arrow-down'"></i>
                </mt-tab-item>
                <mt-tab-item id="location">
                    {{tabSelect.location}}<i class="margin-left-5" :class="tabSwitch=='location'?'icon-arrow-up':'icon-arrow-down'"></i>
                </mt-tab-item>
                <mt-tab-item id="job">
                    {{tabSelect.job}}<i class="margin-left-5" :class="tabSwitch=='job'?'icon-arrow-up':'icon-arrow-down'"></i>
                </mt-tab-item>
            </mt-navbar>
        </div>
        <div class="tab-selections" v-show="tabSwitch!=0">
            <ul class="selections-list">
                <li class="active" @click="tabSwitch=0">
                    test
                    <i class="icon-right float-right"></i>
                </li>
                <li @click="tabSwitch=0">
                    test
                    <i class="icon-right float-right"></i>
                </li>
                <li @click="tabSwitch=0">
                    test
                    <i class="icon-right float-right"></i>
                </li>
            </ul>
        </div>
        <ul class="data-list expert-list">
            <li class="data-item expert-list-item">
                <div class="expert-top">
                    <img class="user-img" src="/dist/static/img/user-default.png">
                    <div class="user-info">
                        <h1>高级服装秀策展达人</h1>
                        <i class="icon-location"></i><span>浦东 上海</span>
                        <i class="icon-time margin-left-5"></i><span>5年</span>
                        <i class="icon-time margin-left-5"></i><span>设计</span>
                    </div>
                </div>
                <div class="expert-middle">
                    <p>这里填写的都是个人介绍啊，从业经历啊，干过哪些大案要案啊，擅长领域啊，个人风格啊等等。</p>
                    <ul class="gray-border-icons margin-top-10 margin-bottom-10">
                        <li>平面设计</li>
                        <li>Photoshop</li>
                        <li>illusrator</li>
                        <li>VI设计</li>
                    </ul>
                    <span class="fc-red float-right">日薪/5000</span>
                </div>
                <div class="expert-bottom">
                    <span class="fc-red fs-xl"><i class="icon-talk"></i>查看Ta的联系方式</span><span class="fc-gray-l">（9元预约，会员免费）</span><br/>
                    <div style="line-height: 30px;">服装展会、T台秀方案设计与执行<i class="icon-arrow-right float-right"></i></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    module.exports = {
        data:function(){
            return {
                selections:{

                },
                params:{
                    search:''
                },
                showTabSelections:false,
                tabSwitch:'type',
                tabSelect:{
                    type:'全部',
                    location:'全国',
                    job:'所有行业'
                }
            }
        },
        methods:{

        },
        created:function(){

        }
    }
</script>