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
          <label class="col-8">业务类型名称：</label>
          <Input class="col-16" v-model="fieldSet.businessName"></Input>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">业务分类：</label>
          <Select class="col-16" v-model="fieldSet.parentId" clearable>
            <Option v-for="item in selections.parentId" :value="item.id" :key="item">{{ item.businessName }}</Option>
          </Select>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">图片：<br/>(建议宽度300-600像素)</label>
          <div class="col-16">
            <img-input v-model="fieldSet.imageUrl" :maxLength="1"></img-input>
          </div>
        </div>
        <!--<div class="form-row clearfix">-->
        <!--<Upload multiple :action="uploadUrl" :on-success="onUploaded" :headers="uploadHeaders">-->
        <!--<Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>-->
        <!--</Upload>-->
        <!--</div>-->
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
        uploadUrl: '',
        uploadHeaders: {},
        fieldSet: {
          businessName: '',
          parentId: '',
          imageUrl: ''
        },
        list: {
          columns: [
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
                        this.showDetail(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'ios-paper-outline'}, class: {'margin-right-10': true}}), '查看详情']),
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
                  }, [h('Icon', {props: {type: 'edit'}, class: {'margin-right-10': true}}), '修改']),
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
                  }, [h('Icon', {props: {type: 'trash-a'}, class: {'margin-right-10': true}}), '删除'])
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
          businessName: '',
          parentId: '',
          imageUrl: ''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$http.get(this.url('admin/deleteBusiness'),{params:{id:data.id}}).then(this.rspHandler((data)=>{
              this.refreshList()
            }))
          }
        });
      },
      showDetail: function (data) {
        this.$router.push('/businessTypeDetail/'+data.id)
      },
      refreshSelections: function () {
        this.$http.get(this.url('admin/queryBusinessList')).then(this.rspHandler((data) => {
          this.selections.parentId = data
        }))
      }
    },
    created: function () {
      this.initList(this.list)

      this.$on(this.consts.loadedEvent, function () {
        this.uploadUrl = this.url('admin/fileUpload')
        this.uploadHeaders = {}
        this.uploadHeaders[this.consts.ticketKey] = cookie.get(this.consts.ticketKey)
        this.refreshList(1)
        this.refreshSelections()
      })
    }
  }
</script>
