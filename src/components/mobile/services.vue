<template>
  <div class="page-container">
    <tab class="top-nav-bar" style="position: absolute;top:0;width:100%;">
      <tab-item selected @on-item-click="onTabClick(0)">全部</tab-item>
      <tab-item @on-item-click="onTabClick(item)" v-for="item in selections.type" :key="item.id">{{item.businessName}}</tab-item>
    </tab>
    <div class="data-list service-list list-container" style="position: absolute;top:40px;width:100%;left:0;bottom:0;overflow: auto">
      <div class="data-item margin-bottom-20" v-for="(data,index) in dataList" :key="index">
        <router-link :to="'/serviceDetail/'+data.id">
          <img class="item-img" :src="data.imageUrl | img(1)">
        </router-link>
        <div class="content">
          <label>{{data.businessName}}</label><br/>
          <router-link :to="'/serviceDetail/'+data.id" class="fc-red">了解详情</router-link>
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
        let listContainer = this.$el.querySelector('.list-container')
        if (listContainer) {
          listContainer.scrollTop = 0;
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
