<template>
  <div>
    <tab class="top-nav-bar">
      <tab-item selected @on-item-click="onTabClick">全部</tab-item>
      <tab-item @on-item-click="onTabClick">全部1</tab-item>
      <tab-item @on-item-click="onTabClick">全部2</tab-item>
      <tab-item v-for="item in selections.type" @on-item-click="onTabClick" :key="item">{{item.businessName}}
      </tab-item>
    </tab>
    <!--<button-tab v-model="type" class="top-nav-bar">-->
    <!--<button-tab-item>全部</button-tab-item>-->
    <!--<button-tab-item v-for="item in selections.type" :key="item">{{item.businessName}}</button-tab-item>-->
    <!--</button-tab>-->
    <ul class="data-list task-list">
      <li class="data-item" v-for="(data,index) in list.dataList">
        <router-link :to="'/taskDetail/'+data.id">
          <label class="title col-16 fs-l">
            {{data.issueName}}<span class="btn btn-theme-round margin-left-5"
                                    style="line-height: 20px;">{{data.status}}</span>
          </label>
          <span class="col-8 text-right"><span class="fc-red fs-l">{{data.projectBudget}}</span>元以上</span><br/>
          <span class="margin-right-5" v-for="item in data.recruitBusinessList">{{item.businessName}}</span><br/>
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
  </div>
</template>
<script>
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
          params: {
            type: ''
          }
        },
        selections: {
          type: []
        }
      }
    },
    methods: {
      onTabClick: function (index) {
        if (index === 0) {
          this.list.params.type = ''
        } else {
//          this.params.type = this.selections.type[index - 1].id
        }
      }
    },
    created: function () {
      var self = this
      this.initList(this.list)
//      this.$watch('type', function (typeIndex) {
//        if (typeIndex === 0) {
//          this.list.params.type = ''
//        } else {
//          this.list.params.type = this.selections.type[typeIndex].id
//        }
//      })
      this.$on(consts.loadedEvent, function () {
        console.log(this)
        this.refreshList(1)
        getType(this).then(function (data) {
          self.selections.type = data
        })
      })
    }
  }
  export default config
</script>
