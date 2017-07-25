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
          <label class="col-8">行业名称：</label>
          <Input class="col-16" v-model="fieldSet.industryName"></Input>
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
          industryName: ''
        },
        list: {
          columns: [
            {title: '行业名称', key: 'industryName'},
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
          url: 'admin/queryAllIndustry',
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
          this.$http.post(this.url('admin/addIndustry'), params).then(this.rspHandler(() => {
            this.modalLoading = false
            this.pop=false
            this.refreshList(1)
          }))
        }
      },
      reset: function () {
        this.fieldSet = {
          industryName: ''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$http.get(this.url('admin/failIndustry'), {params:{id:data.id}}).then(this.rspHandler(() => {
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
