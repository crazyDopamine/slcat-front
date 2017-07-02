<template>
  <div class="page-container">
    <div class="container">
      <div class="text-center fs-xxl">关于我</div>
      <div class="form-area padding-left-0 padding-right-0">
        <div class="form-row">
          <div class="form-field">
            <textarea :placeholder="placeholder" rows="20"></textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="text-right"><label class="fc-theme">范例</label></div>
          <div class="form-field">
            <textarea :placeholder="template" readonly rows="20"></textarea>
          </div>
        </div>
        <div class="btn-area">
          <a class="btn btn-theme-round btn-harf">保存</a>
          <a class="btn btn-gray-d-round btn-harf" @click="$router.go(-1)">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        placeholder: '描述你在专业领域内的经历、成就，充分展示你的实力，更具个人风格的描述对项目方会更有吸引力。\n\r【我的介绍】\n\r' +
        '综合的自我介绍描述，让别人感受到你的与众不同\n\r你的职业经历给你带来的商场经验是什么\n\r你的教育背景\n\r有哪些骄傲的获奖成绩\n\r' +
        '【我擅长的服务】\n\r描述你的技能特长\n\r能提供的服务',
        template: '【自我介绍】\n\r喜欢有挑战的项目，专注于互联网产品，追求极致的设计和用户体验，帮助更多的人把想法变成现实。\n\r' +
        '-拥有五年视觉/交互设计的丰富经验，包括web端、移动端及后台系统的设计\n\r -就职于百度、腾讯等公司，主导及参与过十几个项目的设计过程，积累了丰富的实践经验\n\r' +
        '-北京邮电大学，工业设计毕业\n\r -德国红点设计奖获得者\n\r【提供的服务】\n\r商场app产品的从0-1的主风格定义\n\rWeb网站的整案设计\n\r' +
        'H5页面的风格策划及设计\n\rLogo的整体定义及细节设计\n\r多种风格的图标设计'
      }
    },
    methods: {},
    created: function () {

    }
  }
</script>
