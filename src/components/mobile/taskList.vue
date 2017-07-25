<template>
  <div class="page-container bg-white">
    <tab class="top-nav-bar" v-show="typeLoaded">
      <tab-item selected @on-item-click="onTabClick">全部</tab-item>
      <tab-item v-for="item in selections.type" @on-item-click="onTabClick" :key="item.businessName">
        {{item.businessName}}
      </tab-item>
    </tab>
    <!--<button-tab v-model="type" class="top-nav-bar">-->
    <!--<button-tab-item>全部</button-tab-item>-->
    <!--<button-tab-item v-for="item in selections.type" :key="item">{{item.businessName}}</button-tab-item>-->
    <!--</button-tab>-->
    <vue-pull-refresh :on-refresh="onRefresh" class="top-bar-fixed-bottom">
      <ul class="data-list task-list">
        <li class="data-item" v-for="(data,index) in list.dataList">
          <router-link :to="'/taskDetail/'+data.id">
            <label class="title col-16 fs-l">
              {{data.projectName}}
              <span class="btn btn-theme-round margin-left-5" style="line-height: 20px;">{{data.status}}</span>
            </label>
            <span class="col-8 text-right"><span class="fc-red fs-xl">{{data.projectBudget}}</span>元</span><br/>
            <span class="margin-right-10">{{data.recruitBusiness ? data.recruitBusiness.parentBusiness.businessName : ''}}/{{data.recruitBusiness ? data.recruitBusiness.businessName : ''}}</span>
            <span
              v-for="(item,i) in data.baseSkills">{{item.skillName}}{{i != data.baseSkills.length - 1 ? ',' : ''}}</span><br/>
            <ul class="flex col-16 fs-s" style="line-height: 14px;margin-top:8px;margin-bottom:8px;">
              <li class="border-right">
                <span>已推荐</span><span class="fc-theme padding-left-5 padding-right-5">{{data.recommendCount}}</span>
              </li>
              <li class="border-right padding-left-10">
                <span>已申请</span><span class="fc-theme padding-left-5 padding-right-5">{{data.applyCount}}</span>
              </li>
              <li class="padding-left-10">
                <span>已浏览</span><span class="fc-theme padding-left-5 padding-right-5">{{data.visitCount}}</span>
              </li>
            </ul>
            <span class="float-right">{{data.createdAt | date}}</span>
          </router-link>
        </li>
      </ul>
    </vue-pull-refresh>
    <infinite-loading v-show="list.total>0" :on-infinite="onInfinite" ref="infiniteLoading">
      <span slot="no-more">到底啦</span>
    </infinite-loading>
  </div>
</template>
<script type="es6">
  import consts from '../../common/const'
  import {getType} from '../../common/utils'
  import {Tab, TabItem} from 'vux'
  import listMixns from '../../common/moduleList'
  var config = {
    mixins: [listMixns],
    components: {
      Tab,
      TabItem
    },
    data: function () {
      return {
        list: {
          url: 'employer/queryEmpViewHeader',
          pageSize: 10,
          params: {
            status: '待审核',
            businessParentId: ''
          }
        },
        selections: {
          type: []
        },
        typeLoaded: 0
      }
    },
    methods: {
      onTabClick: function (index) {
        if (index === 0) {
          this.list.params.businessParentId = ''
        } else {
          this.list.params.businessParentId = this.selections.type[index - 1].id
        }
        this.refreshList(1)
      }
    },
    created: function () {
      var self = this
      this.initList(this.list, {post: true})
      this.$on(consts.loadedEvent, function () {
        // this.refreshList(1)
        getType(this).then(function (data) {
          self.typeLoaded = 1
          self.selections.type = data
        })
      })
    }
  }
  export default config
</script>
