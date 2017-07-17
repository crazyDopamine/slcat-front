<template>
  <div class="page-container">
    <div class="table-area container">
      <table class="default">
        <thead>
        <tr>
          <th>昵称</th>
          <th>手机号</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data,index) in list.dataList">
          <td>xxxxx</td>
          <td>18321482348</td>
          <td>未审核</td>
          <td>
            <a>查看详情</a>
          </td>
        </tr>
        </tbody>
      </table>
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
      		url:'employer/queryEmpViewHeader',
          params: {
            status: '待审核',
            businessParentId: ''
          }
        }
      }
    },
    methods: {
      submit: function () {
      }
    },
    created: function () {
      this.initList(this.list, {mothed: 'post'})
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
</script>
