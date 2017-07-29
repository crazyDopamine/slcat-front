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
          <label class="col-8">城市名称：</label>
          <Input class="col-16" v-model="fieldSet.cityName"></Input>
        </div>
        <!--<div class="form-row clearfix">-->
          <!--<label class="col-8">城市名称：</label>-->
          <!--<Input class="col-16" v-model="fieldSet.cityName"></Input>-->
        <!--</div>-->
      </div>
      <div slot="footer">
        <Button type="primary" :loading="modalLoading" @click="submit()">{{fieldSet.id?'修改':'新增'}}</Button>
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
        modalLoading:false,
        fieldSet: {
          cityName: '',
          hotTop: 0
        },
        list: {
          columns: [
            {title: '城市名称', key: 'cityName'},
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
          url: 'admin/queryCityList',
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
      submit: function () {
        if (this.validate(true)) {
          var params = this.getValues()
          this.modalLoading = true
          this.$http.post(this.url('admin/addCity'), params).then(this.rspHandler(() => {
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
          cityName: '',
          hotTop: 10
        }
      },
      remove: function (data) {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认是否删除！</p>',
          onOk: () => {
            this.$http.get(this.url('admin/failCity'), {params:{id:data.id}}).then(this.rspHandler(() => {
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
