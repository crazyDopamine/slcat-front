<template>
  <div class="page-container">
    <tab class="top-nav-bar">
      <tab-item selected @on-item-click="onTabClick(0)">全部</tab-item>
      <tab-item @on-item-click="onTabClick(item)" v-for="item in selections.type" :key="item">{{item.businessName}}</tab-item>
    </tab>
    <div class="data-list service-list">
      <div class="data-item" v-for="(data,index) in dataList">
        <img class="item-img" :src="'/static/img/'+data.businessCode+'.jpg'">
        <div class="content">
          <label>{{data.businessName}}{{data.businessCode}}</label><br/>
          <router-link :to="'/serviceDetail/'+data.businessCode" class="fc-red">了解详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  import {getAddress, getType, each} from '../../common/utils'
  var config = {
    components: {
      Tab,
      TabItem
    },
    data: function () {
      return {
        type: 0,
        dataList:[],
        selections: {
          type: []
        }
      }
    },
    methods: {
      onTabClick: function (item) {
        if(item===0){
        	this.dataList = [];
          each(this.selections.type,(data,index)=>{
          	this.dataList = this.dataList.concat(data.children)
          })
        }else{
        	this.dataList = item.children
        }
      },
      refreshSelections:function(){
        getType(this).then((data) => {
          this.selections.type = data
          this.onTabClick(0)
        })
      }
    },
    created: function () {
      this.refreshSelections()
    }
  }
  export default config
</script>
