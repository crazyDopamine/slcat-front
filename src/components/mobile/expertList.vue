<template>
  <div class="page-container bg-white">
    <search
      class="expert-list-search"
      v-model="list.params.queryParam"
      :autoFixed="false"
      ref="search"
      @on-submit="refreshList(1)"
      placeholder="搜索技能"></search>
    <!--<Button-group>-->
    <!--<Button>取消</Button>-->
    <!--<Button type="primary">确定</Button>-->
    <!--</Button-group>-->
    <!--<div>-->
    <!--<Button>{{tabSelect.businessParentId}}</Button>-->
    <!--<Button>{{tabSelect.cityId}}</Button>-->
    <!--<Button>{{tabSelect.industryId}}</Button>-->
    <!--</div>-->
    <tab class="top-nav-bar border-bottom-0 no-selected">
      <!--<tab-item selected @on-item-click="onTabClick">{{tabSelect.businessParentId}}-->
        <!--<i class="margin-left-5" :class="tabSwitch==0?'icon-arrow-up':'icon-arrow-down'"></i></tab-item>-->
      <tab-item @on-item-click="onTabClick">{{tabSelect.cityId}}
        <i class="margin-left-5" :class="tabSwitch==0?'icon-arrow-up':'icon-arrow-down'"></i>
      </tab-item>
      <tab-item @on-item-click="onTabClick">{{tabSelect.industryId}}
        <i class="margin-left-5" :class="tabSwitch==1?'icon-arrow-up':'icon-arrow-down'"></i>
      </tab-item>
    </tab>
    <popup v-model="selectionsShow" class="tab-selections" position="bottom" @on-hide="tabSwitch=-1">
      <ul class="selections-list">
        <li :class="item.id==list.params.cityId?'active':''" @click="onSelectClick(item.id,item.cityName,'cityId')"
            v-for="item in selections.cityId" v-if="tabSwitch==0">
          {{item.cityName}}
          <i class="icon-right float-right" v-if="item.id==list.params.cityId"></i>
        </li>
        <li :class="item.id==list.params.industryId?'active':''"
            @click="onSelectClick(item.id,item.industryName,'industryId')"
            v-for="item in selections.industryId" v-if="tabSwitch==1">
          {{item.industryName}}
          <i class="icon-right float-right" v-if="item.id==list.params.industryId"></i>
        </li>
      </ul>
    </popup>
    <scroller height="-124" lock-x scrollbar-y use-pulldown use-pullup :pulldown-config="list.pullDownConfig"
              :pullup-config="list.pullUpConfig" @on-pulldown-loading="onRefresh" @on-pullup-loading="onLoadMore" ref="scroller">
      <ul class="data-list expert-list">
        <li class="data-item expert-list-item" v-for="(data,index) in list.dataList">
          <router-link :to="'/expertDetail/'+data.id">
            <div class="expert-top">
              <img class="user-img" :src="data.headImgUrl | img">
              <div class="user-info">
                <h1>{{data.nickName}}</h1>
                <i class="icon-location"></i><span>{{data.cityName}}</span>
                <i class="icon-time margin-left-5"></i><span>{{data.workExperience | selections(workExperienceMap)}}</span>
                <img src="static/img/icon-job.png" class="img-icon margin-left-5"></img><span>{{data.industryName}}</span>
              </div>
            </div>
            <div class="expert-middle">
              <p v-html="toContent(data.selfIntroduction)"></p>
              <ul class="gray-border-icons margin-top-10 margin-bottom-10">
                <li v-for="item in data.jobTitle.split(',')" v-if="data.jobTitle">{{item}}</li>
              </ul>
              <span class="fc-red float-right">日薪/{{data.dailyWage}}</span>
            </div>
            <div class="expert-bottom">
              <span class="fc-red fs-xl"><i class="icon-talk"></i>查看Ta的联系方式</span><span
              class="fc-gray-l">（9元预约，会员免费）</span><br/>
              <div style="line-height: 30px;">服装展会、T台秀方案设计与执行<i class="icon-arrow-right float-right"></i></div>
            </div>
          </router-link>
        </li>
      </ul>
    </scroller>
    <!--<infinite-loading v-show="list.total>0" :on-infinite="onInfinite" ref="infiniteLoading">-->
    <!--<span slot="no-more">到底啦</span>-->
    <!--</infinite-loading>-->
  </div>
</template>
<script type="es6">
  import {Tab, TabItem, Search, Popup} from 'vux'
  import {getAddress, getType, each} from '../../common/utils'
  import consts from '../../common/const'
  import listMixns from '../../common/moduleList'
  import {selections} from '../../common/utils'
  export default {
    mixins: [listMixns],
    components: {
      Tab,
      TabItem,
      Search,
      Popup
    },
    data: function () {
      return {
        selections: {},
        selectionsShow: false,
        list: {
          url: 'techMaster/queryMasterList',
          params: {
            queryParam: '',
            businessParentId: '',
            cityId: '',
            industryId: ''
          },
        },
        showTabSelections: false,
        tabSwitch: -1,
        tabSelect: {
          businessParentId: '全部',
          cityId: '全国',
          industryId: '所有行业'
        },
        workExperienceMap:{},
        selections: {
          businessParentId: [],
          cityId: [],
          industryId: []
        }
      }
    },
    methods: {
      onTabClick: function (index) {
        this.tabSwitch = index
        this.selectionsShow = true
      },
      onSelectClick: function (id, name, field) {
        this.list.params[field] = id
        this.tabSelect[field] = name
        this.tabSwitch = -1
        this.refreshList(1)
        this.selectionsShow = false
      },
      refreshSelctions: function () {
        selections('400').then((data, map) => {
          this.workExperienceMap = window.dicMapMap['400']
        })
        getType(this).then((data) => {
          this.selections.businessParentId = []
          this.selections.businessParentId.push({id: '', businessName: "全部"})
          each(data, (item, index) => {
            this.selections.businessParentId.push(item)
            this.selections.businessParentId = this.selections.businessParentId.concat(item.children)
          })
        })
        getAddress(this).then((data) => {
          this.selections.cityId = []
          this.selections.cityId.push({id: '', cityName: "全国"})
          this.selections.cityId = this.selections.cityId.concat(data)
        })
        this.$http.get(this.url('industry/getAllIndustry')).then(this.rspHandler((data) => {
          this.selections.industryId = []
          this.selections.industryId.push({id: '', industryName: "全部"})
          this.selections.industryId = this.selections.industryId.concat(data)
        }))
      }
    },
    created: function () {
      this.initList()
      this.$on(consts.loadedEvent, function () {
        this.refreshSelctions()
        this.refreshList(1)
      })
    }
  }
</script>
