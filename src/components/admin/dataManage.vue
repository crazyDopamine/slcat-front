<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Radio-group v-model="status" type="button">
          <Radio label="0">全部</Radio>
          <Radio label="1">未审核</Radio>
          <Radio label="2">已审核</Radio>
        </Radio-group>
        <Button type="primary" class="float-right">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page :total="100" show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="popTitle">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>
  </div>
</template>
<script>
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  export default {
    mixins:[formValidate,moduleList],
    data: function () {
      return {
        status:'全部',
        pop:false,
        popTitle:'详情',
        list:{
          columns:[
            {title:'昵称',key:'',render:function(h,obj){
              return h('span','test')
            }},
            {title:'手机号',key:''},
            {title:'状态',key:''},
            {title:'操作',key:''}
          ],
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
