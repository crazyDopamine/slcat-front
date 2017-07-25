<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Button type="primary" class="float-right" @click="add()">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :total="list.total" :page-size="list.pageSize" @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="popTitle"
      :mask-closable="false">
      <div class="form-area">
        <div class="form-row clearfix">
          <label class="col-8">业务类型名称：</label>
          <Input class="col-16" v-model="fieldSet.businessName"></Input>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">业务分类：</label>
          <Select class="col-16" v-model="fieldSet.parentId">
            <Option v-for="item in selections.parentId" :value="item.id" :key="item">{{ item.businessName }}</Option>
          </Select>
        </div>
      </div>

      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="addSubmit()">添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
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
          businessName: '',
          parentId: ''
        },
        list: {
          columns: [
            {title: '业务类型名称', key: 'businessName'},
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                return h('div',{},[
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
                  }, [h('Icon', {props: {type: 'trash-a'},class:{'margin-right-10':true}}), '删除'])
                ]);
              }
            }
          ],
          url: 'admin/queryBusinessType',
        },
        selections: {
          parentId: []
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
          this.$http.post(this.url('admin/addBusiness'), params).then(this.rspHandler(() => {
            this.modalLoading = false
            this.pop = false
            this.refreshList(1)
          }))
        }
      },
      reset: function () {
        this.fieldSet = {
          businessName: '',
          parentId: ''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$Message.info('点击了确定');
          }
        });
      },
      refreshSelections: function () {
        this.$http.get(this.url('admin/queryBusinessList')).then(this.rspHandler((data)=> {
          this.selections.parentId = data
        }))
      }
    },
    created: function () {
      this.initList(this.list)
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
        this.refreshSelections()
      })
    }
  }
</script>
