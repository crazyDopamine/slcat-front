<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Button type="primary" class="float-right" @click="add()">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize" @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="popTitle"
      :mask-closable="false">
      <div class="form-area">
        <div class="form-row clearfix">
          <label class="col-8">账号：</label>
          <Input class="col-16" v-model="fieldSet.userName"></Input>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">密码：</label>
          <Input class="col-16" type="password" v-model="fieldSet.passWord"></Input>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="addSubmit()">添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  import {dateFormat} from 'vux'
  export default {
    mixins: [formValidate, moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        popTitle: '新增',
        modalLoading: false,
        fieldSet: {
          userName: '',
          passWord:''
        },
        rule:{
          userName: {
            label: '账号',
            required: true
          },
          passWord: {
            label: '密码',
            required: true
          }
        },
        list: {
          columns: [
            {title: '账号', key: 'userName'},
            {
              title: '更新时间', key: 'updatedAt', render: (h, params) => {
                return h('span', {}, dateFormat(params.row.updatedAt, 'YYYY-MM-DD'));
              }
            },
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
                        this.remove(params.row, e)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          url: 'admin/getUsers',
        }
      }
    },
    methods: {
      add: function () {
        this.reset()
        this.pop = true
      },
      addSubmit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.modalLoading = true
          this.$http.post(this.url('admin/addUser'), params).then(this.rspHandler(() => {
            this.modalLoading = false
            this.pop=false
            this.refreshList(1)
          }))
        }
      },
      reset: function () {
        this.fieldSet = {
          userName: '',
          passWord:''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
          	console.log(this)
            this.$http.get(this.url('admin/deleteUser/'+data.id)).then(this.rspHandler(() => {
              this.refreshList(1)
            }))
          }
        });
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
