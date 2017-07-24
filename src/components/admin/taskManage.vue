<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Radio-group v-model="list.params.status" type="button" @on-change="refreshList(1)">
          <Radio label="">全部</Radio>
          <Radio label="待审核">待审核</Radio>
          <!--<Radio label="已审核">已审核</Radio>-->
        </Radio-group>
        <!--<Button type="primary" class="float-right">添加</Button>-->
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page :total="list.total" :page-size="list.pageSize" @on-change="refreshList($event)" show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="popTitle">
      <div class="detail-area">
        <div class="detail-row">
          <label class="col-6">项目名称：</label>
          <span>{{detail.projectName}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">状态：</label>
          <span>{{detail.status}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">项目预算：</label>
          <span>{{detail.projectBudget}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">时间周期：</label>
          <span>{{detail.projectCycle}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">项目类型：</label>
          <span>{{detail.recruitBusiness ? detail.recruitBusiness.parentBusiness.businessName : ''}}/{{detail.recruitBusiness ? detail.recruitBusiness.businessName : ''}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">公司名称：</label>
          <span>{{detail.companyName}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">申请时间：</label>
          <span>{{detail.updatedAt | date}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">倾向让谁完成：</label>
          <span>{{detail.trendComplete | selections(this.selectionsMap.trendCompleteMap)}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">所需技术：</label>
          <span>{{detail.status}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">项目描述：</label>
          <p>{{detail.projectDesc}}</p>
        </div>
      </div>
      <div slot="footer">
        <template v-if="detail.status=='待审核'">
          <label class="float-left margin-right-10" style="line-height:30px;">理由:</label>
          <Input type="text" class="col-12" v-model="fieldSet.msg"></Input>
          <Button type="error" :loading="modalLoading" @click="check(detail,'不通过')">不通过</Button>
          <Button type="primary" :loading="modalLoading" @click="check(detail,'通过')">通过</Button>
        </template>
        <template v-if="detail.status!='待审核'">
          <Button type="primary" @click="pop=false">关闭</Button>
        </template>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import formValidate from '../../common/formValidate'
  import moduleList from '../../common/moduleList'
  import {selections} from '../../common/utils'
  import {dateFormat} from 'vux'
  export default {
    mixins: [formValidate, moduleList],
    data: function () {
      return {
        status: 0,
        pop: false,
        popTitle: '详情',
        detail:{},
        modalLoading:false,
        selectionsMap:{
          trendCompleteMap:{}
        },
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
    	refreshSelections:function(){
        selections('100').then((data,map) => {
          this.selectionsMap.trendCompleteMap = window.dicMapMap['100']
        })
      },
      showDetail: function (data) {
        this.$http.get(this.url('admin/detailEmp'), {
          params: {
            id: data.id
          }
        }).then(this.rspHandler((data) => {
          this.detail = data
          this.pop = true
        }))
//        this.detail = data
//        this.pop = true
      },
      check: function (data, status) {
        this.$http.get(this.url('admin/checkEmp'), {
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
      	this.refreshSelections()
        this.refreshList(1)
      })
    }
  }
</script>
