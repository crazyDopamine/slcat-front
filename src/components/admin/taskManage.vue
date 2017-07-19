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
        <Page :total="list.total" :page-size="list.pageSize" @on-change="refreshList($event)" show-elevator></Page>
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
    mixins: [formValidate, moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        popTitle: '详情',
        list: {
          columns: [
            {title: '项目名称', key: 'projectName'},
            {title: '项目预算', key: 'projectBudget'},
            {title: '状态', key: 'status'},
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.showDetail(params.row, e)
                      }
                    }
                  }, '查看')
                ]);
              }
            }
          ],
          url: 'admin/queryEmpList',
          params: {
            status: '待审核',
            businessParentId: ''
          }
        }
      }
    },
    methods: {
      submit: function () {
      },
      showDetail: function (data) {
        console.log(data)
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
</script>
