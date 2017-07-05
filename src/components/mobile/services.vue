<template>
  <div>
    <tab class="top-nav-bar">
      <tab-item selected @on-item-click="onTabClick">全部</tab-item>
      <tab-item @on-item-click="onTabClick">策划</tab-item>
      <tab-item @on-item-click="onTabClick">设计</tab-item>
      <tab-item @on-item-click="onTabClick">活动</tab-item>
      <tab-item @on-item-click="onTabClick">影视</tab-item>
    </tab>
    <!--<button-tab v-model="type" class="top-nav-bar">-->
      <!--<button-tab-item>全部</button-tab-item>-->
      <!--<button-tab-item>策划</button-tab-item>-->
      <!--<button-tab-item>设计</button-tab-item>-->
      <!--<button-tab-item>活动</button-tab-item>-->
      <!--<button-tab-item>影视</button-tab-item>-->
    <!--</button-tab>-->
    <!--<mt-navbar v-model="type" fixed class="top-nav-bar">-->
    <!--<mt-tab-item id="1">全部</mt-tab-item>-->
    <!--<mt-tab-item id="2">策划</mt-tab-item>-->
    <!--<mt-tab-item id="3">设计</mt-tab-item>-->
    <!--<mt-tab-item id="4">活动</mt-tab-item>-->
    <!--<mt-tab-item id="5">影视</mt-tab-item>-->
    <!--</mt-navbar>-->
    <div class="data-list service-list">
      <div class="data-item">
        <img class="item-img" src="/static/img/01.jpg">
        <div class="content">
          <label>品牌微电影定制</label><br/>
          <a class="fc-red">了解详情</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  var config = {
    components: {
      Tab,
      TabItem
    },
    data: function () {
      return {
        type: 0
      }
    },
    methods: {
      onTabClick: function (index) {

      }
    },
    created: function () {

    }
  }
  export default config
</script>
