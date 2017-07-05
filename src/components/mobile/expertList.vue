<template>
  <div>
    <div>
      <search
        class="expert-list-search"
        :autoFixed="false"
        v-model="params.search"
        ref="search"
        placeholder="搜索专长或其他关键字"></search>
      <tab class="top-nav-bar border-bottom-0 no-selected">
        <tab-item selected @on-item-click="onTabClick">{{tabSelect.type}}
          <i class="margin-left-5" :class="tabSwitch==0?'icon-arrow-up':'icon-arrow-down'"></i></tab-item>
        <tab-item @on-item-click="onTabClick">{{tabSelect.location}}
          <i class="margin-left-5" :class="tabSwitch==1?'icon-arrow-up':'icon-arrow-down'"></i></tab-item>
        <tab-item @on-item-click="onTabClick">{{tabSelect.job}}
          <i class="margin-left-5" :class="tabSwitch==2?'icon-arrow-up':'icon-arrow-down'"></i></tab-item>
      </tab>
    </div>
    <div class="tab-selections" v-show="tabSwitch!=-1">
      <div class="tab-selections-mask" v-show="tabSwitch!=-1" @click="tabSwitch=-1"></div>
      <ul class="selections-list">
        <li :class="item.id==params.type?'active':''" @click="onSelectClick(item.id,item.businessName,'type')"
            v-for="item in selections.type" :key="item" v-if="tabSwitch==0">
          {{item.businessName}}
          <i class="icon-right float-right" v-if="item.id==params.type"></i>
        </li>
        <li :class="item.id==params.location?'active':''" @click="onSelectClick(item.id,item.cityName,'location')"
            v-for="item in selections.location" v-if="tabSwitch==1">
          {{item.cityName}}
          <i class="icon-right float-right" v-if="item.id==params.location"></i>
        </li>
        <li :class="item.id==params.job?'active':''" @click="onSelectClick(item.id,item.name,'job')"
            v-for="item in selections.job" v-if="tabSwitch==2">
          test
          <i class="icon-right float-right" v-if="item.id==params.job"></i>
        </li>
      </ul>
    </div>
    <ul class="data-list expert-list">
      <li class="data-item expert-list-item">
        <div class="expert-top">
          <img class="user-img" src="/static/img/user-default.png">
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
  import {Tab, TabItem, Search} from 'vux'
  import {getAddress, getType} from '../../common/utils'
  import consts from '../../common/const'
  export default {
    components: {
      Tab,
      TabItem,
      Search
    },
    data: function () {
      return {
        selections: {},
        params: {
          type: '',
          location: '',
          job: ''
        },
        showTabSelections: false,
        tabSwitch: -1,
        tabSelect: {
          type: '全部',
          location: '全国',
          job: '所有行业'
        },
        selections: {
          type: [],
          location: [],
          job: []
        }
      }
    },
    methods: {
      onTabClick: function (index) {
        this.tabSwitch = index
      },
      onSelectClick: function (id, name, field) {
        this.params[field] = id
        this.tabSelect[field] = name
        this.tabSwitch = -1
      },
      refreshSelctions: function () {
        getType(this).then((data) => {
          this.selections.type = data
        })
        getAddress(this).then((data) => {
          this.selections.location = data
        })
      }
    },
    created: function () {
      this.$on(consts.loadedEvent, function () {
        this.refreshSelctions();
      })
    }
  }
</script>
