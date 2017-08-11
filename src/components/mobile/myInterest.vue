<template>
  <div class="page-container bg-white">
    <scroller height="-40" lock-x scrollbar-y use-pulldown use-pullup :pulldown-config="list.pullDownConfig"
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
  import {getAddress, getType, each} from '../../common/utils'
  import consts from '../../common/const'
  import listMixns from '../../common/moduleList'
  import {selections} from '../../common/utils'
  export default {
    mixins: [listMixns],
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
        }
      }
    },
    methods: {
    },
    created: function () {
      this.initList()
      this.$on(consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
</script>
