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
      <div class="user-detail">
        <img src="static/img/user-default.png" style="width:120px;"><br/>
        <span>{{detail.nickName}}</span>
      </div>
      <div slot="footer">
        <label class="float-left margin-right-10" style="line-height:30px;">理由:</label><Input type="text" class="col-12"
                                                                                              v-model="fieldSet.msg"></Input>
        <Button type="error" :loading="modal_loading" @click="check(detail,'不通过')">不通过</Button>
        <Button type="primary" :loading="modal_loading" @click="check(detail,'通过')">通过</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  export default {
    mixins: [formValidate, moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        popTitle: '详情',
        detail: {},
        modal_loading: false,
        fieldSet: {
          msg: ''
        },
        list: {
          columns: [
            {title: '昵称', key: 'nickName'},
            {title: '手机号', key: 'phone'},
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
          url: 'admin/queryMasterList',
          params: {
            status: ''
          }
        }
      }
    },
    methods: {
      submit: function () {
      },
      showDetail: function (data) {
        this.$http.get(this.url('admin/queryMasterDetail'), {
          params: {
            id: data.id
          }
        }).then(this.rspHandler((data)=> {
          this.detail = data
          this.pop = true
        }))
      },
      check: function (data, status) {
        this.$http.get(this.url('admin/checkMaster'), {
          params: {
            id: data.id,
            status: status
          }
        }).then(this.rspHandler((data)=> {
          this.pop = false
          this.refreshList(1)
        }))
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
