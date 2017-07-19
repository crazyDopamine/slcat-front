<template>
  <div class="page-container">
    <div class="table-area">
      <table class="default">
        <thead>
        <tr>
          <th>参数名</th>
          <th>参数code</th>
          <th>参数值</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data,index) in dataList">
          <td>{{data.name}}</td>
          <td>{{data.no}}</td>
          <td>{{data.mobile}}</td>
          <td>
            <a>修改</a>
            <a>删除</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="table-bar clearfix">
        <Page class="float-right d-page" v-show="total>=pageSize" :total="total" :page-size="pageSize" @on-change="refresh($event)" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  export default {
    mixins:[formValidate,moduleList],
    data: function () {
      return {
        list:{
          dataList:[{},{},{},{},{}],
          params:{

          }
        }
      }
    },
    methods: {
      submit: function () {
      }
    },
    created: function () {
      this.validateInit()
    }
  }
</script>
