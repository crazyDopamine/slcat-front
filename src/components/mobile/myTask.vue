<template>
  <div class="page-container bg-white">
    <tab class="top-nav-bar">
      <tab-item selected @on-item-click="onTabClick">发出</tab-item>
      <tab-item @on-item-click="onTabClick">接受</tab-item>
    </tab>
    <div class="scroll-view list-container">
      <scroller height="-80" lock-x scrollbar-y use-pulldown use-pullup :pulldown-config="list.pullDownConfig"
                :pullup-config="list.pullUpConfig" @on-pulldown-loading="onRefresh" @on-pullup-loading="onLoadMore" ref="scroller">
        <ul class="data-list task-list">
          <li class="data-item" v-for="(data,index) in list.dataList">
            <router-link :to="'/myTaskDetail/'+data.id">
              <label class="title col-16 fs-l">
                {{data.projectName}}<span class="btn btn-theme-round margin-left-5"
                                          style="line-height: 20px;">{{data.status}}</span>
              </label>
              <span class="col-8 text-right" v-show="data.projectBudget"><span class="fc-red fs-xl">{{data.projectBudget}}</span>元</span>
              <span class="col-8 text-right" v-show="!data.projectBudget"><span class="fc-red fs-xl">价格面议</span></span><br/>
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
      </scroller>
    </div>
  </div>
</template>
<script>
  import consts from '../../common/const'
  import {getType} from '../../common/utils'
  import listMixns from '../../common/moduleList'
  import {Tab, TabItem} from 'vux'
  var config = {
    mixins: [listMixns],
    components: {
      Tab,
      TabItem
    },
    data: function () {
      return {
        list: {
          url: 'techMaster/getEmployer',
          params: {
            status: 'send',
          }
        },
        selections: {
          status: []
        },
      }
    },
    methods: {
      onTabClick: function (index) {
        if (index === 0) {
          this.list.params.status = 'send'
        }else if(index === 1){
          this.list.params.status = 'receive'
        }
        this.refreshList(1)
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
  export default config
</script>
