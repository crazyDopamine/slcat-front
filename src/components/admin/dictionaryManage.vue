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
      :title="fieldSet.id?'修改':'新增'"
      :mask-closable="false">
      <div class="form-area">
        <div class="form-row clearfix">
          <label class="col-8">描述：</label>
          <Input class="col-16" v-model="fieldSet.desc"></Input>
        </div>
        <div class="form-row clearfix">
          <label class="col-8">类型：</label>
          <Select class="col-16" v-model="fieldSet.code">
            <Option v-for="item in selections.code" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="addSubmit()">{{fieldSet.id?'修改':'新增'}}</Button>
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
        modalLoading: false,
        fieldSet: {
          desc: '',
          code: ''
        },
        selections: {
          code: [{code: 100, name: '倾向于谁做'}, {code: 200, name: '性别'}, {code: 300, name: '项目周期'},{code:400,name:'工作经验'}]
        },
        codeMap:{
        	100:'倾向于谁做',
          200:'性别',
          300:'项目周期',
          400:'工作经验'
        },
        list: {
          columns: [
            {title: '描述', key: 'desc'},
            {title: '类型', key: 'code',render:(h,params)=>{
            	return h('span',this.codeMap[params.row.code])
            }},
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
                  }, [h('Icon', {props: {type: 'trash-a'},class:{'margin-right-10':true}}), '删除']),
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
                  }, [h('Icon', {props: {type: 'edit'},class:{'margin-right-10':true}}), '修改'])
                ]);
              }
            }
          ],
          url: 'admin/queryDataDictionary',
        }
      }
    },
    methods: {
      add: function () {
        this.reset()
        this.pop = true
      },
      edit:function(data){
        this.reset()
        this.setValues(data)
        this.pop = true
      },
      addSubmit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.modalLoading = true
          this.$http.post(this.url('admin/addDataDictionary'), params).then(this.rspHandler(() => {
            this.modalLoading = false
            this.pop=false
            this.refreshList(1)
          }, () => {
            this.modalLoading = false
          }))
        }
      },
      reset: function () {
        this.fieldSet = {
          desc: '',
          code: ''
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$http.get(this.url('admin/failDataDictionary'), {params:{id:data.id}}).then(this.rspHandler(() => {
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
