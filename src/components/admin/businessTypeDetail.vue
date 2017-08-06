<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Button type="primary" class="float-right" @click="add()">添加</Button>
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page v-show="list.showPage" :current="list.page" :total="list.total" :page-size="list.pageSize"
              @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="fieldSet.id?'修改':'新增'"
      :mask-closable="false">
      <div class="form-area">
        <div class="form-row clearfix">
          <label class="col-6">序列号</label>
          <div class="col-18">
            <Input v-model="fieldSet.index"></Input>
          </div>
        </div>
        <div class="form-row clearfix">
          <Radio-group v-model="fieldSet.type" type="button">
            <Radio label="1">固定显示</Radio>
            <Radio label="2">更多内容</Radio>
          </Radio-group>
        </div>
        <div class="form-row clearfix">
          <img-input v-model="fieldSet.businessName" :maxLength="1"></img-input>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">描述文本：</label>
          <Input v-model="fieldSet.desc" type="textarea" :rows="4" ></Input>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{fieldSet.id ? '修改' : '新增'}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  import {dateFormat, cookie} from 'vux'
  export default {
    mixins: [formValidate, moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        modalLoading: false,
        fieldSet: {
          index: 1,
          type: '1',
          file: '',
          desc: ''
        },
        rule:{
          index:{
          	label:'序列',
            required:true,
            number:true,
            digits:true
          }
        },
        list: {
          columns: [
            {title: '序列', key: 'id'},
            {title: '业务类型名称', key: 'businessName'},
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                return h('div', {}, [
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
                  }, [h('Icon', {props: {type: 'trash-a'}, class: {'margin-right-10': true}}), '删除']),
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.edit(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改'])
                ]);
              }
            }
          ],
          url: 'admin/queryBusinessType',
          params:{
          	id:''
          }
        }
      }
    },
    methods: {
      add: function () {
        this.reset()
        this.pop = true
      },
      edit: function (data) {
        this.reset()
        this.setValues(data)
        this.pop = true
      },
      submit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.modalLoading = true
          this.$http.post(this.url('admin/addBusiness'), params).then(this.rspHandler(() => {
            this.modalLoading = false
            this.pop = false
            this.refreshList(1)
          }, () => {
            this.modalLoading = false
          }))
        }
      },
      reset: function () {
        this.fieldSet = {
          index: 1,
          type: '1',
          file: '',
          desc: ''
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
    },
    created: function () {
      this.initList(this.list)
      if(this.$route.params.id){
        this.list.params.id = this.$route.params.id
      }
      this.$on(this.consts.loadedEvent, function () {
        this.refreshList(1)
      })
    }
  }
</script>
