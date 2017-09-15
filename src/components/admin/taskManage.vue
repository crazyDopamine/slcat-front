<template>
  <div class="page-container">
    <div class="table-area container">
      <div class="table-top-bar">
        <Radio-group v-model="list.params.status" type="button" @on-change="refreshList(1)">
          <Radio label="">全部</Radio>
          <Radio label="待审核">待审核</Radio>
          <Radio label="待平台跟进">待平台跟进</Radio>
          <!--<Radio label="已审核">已审核</Radio>-->
        </Radio-group>
        <!--<Button type="primary" class="float-right">添加</Button>-->
      </div>
      <Table :columns="list.columns" :data="list.dataList" border></Table>
      <div class="table-bottom-bar">
        <Page :total="list.total" :current="list.page" :page-size="list.pageSize" @on-change="refreshList($event)"
              show-elevator></Page>
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
          <span>{{detail.projectBudget?detail.projectBudget:'价格面议'}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">时间周期：</label>
          <span>{{detail.projectCycle | selections(this.selectionsMap.projectCycleMap)}}</span>
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
          <label class="col-6">申请人：</label>
          <span>{{detail.publisher}}</span>
        </div>
        <div class="detail-row">
          <label class="col-6">联系方式：</label>
          <span>{{detail.phone}}</span>
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
          <div class="col-18">
            <p v-html="toContent(detail.projectDesc)"></p>
          </div>
        </div>
        <div class="detail-row">
          <div class="text-left margin-top-10" v-if="detail.applyList">
            <label class="col-6">申请人：</label>
            <Collapse class="col-18">
              <Panel v-for="(item,index) in detail.applyList" :key="index">
                {{item.nickName}}
                <span class="float-right margin-right-20">{{item.status}}</span>
                <p slot="content">
                  手机：{{item.phone}}<br/>
                  综合评分：{{item.score}}<br/>
                  日薪：{{item.dailyWage}}元/天<br/>
                  简介：{{item.selfIntroduction}}
                  <img-input v-model="item.imgUrls" readOnly></img-input>
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <div slot="footer">
        <template v-if="detail.status=='待审核'">
          <label class="float-left margin-right-10" style="line-height:30px;">理由:</label>
          <Input type="text" class="col-12" v-model="fieldSet.reason"></Input>
          <Button type="error" :loading="modalLoading" @click="check(detail,'不通过')">不通过</Button>
          <Button type="primary" :loading="modalLoading" @click="check(detail,'审核通过')">通过</Button>
        </template>
        <template v-if="detail.status!='待审核'">
          <Button type="primary" @click="pop=false">关闭</Button>
          <Button type="primary" @click="check(detail,'待审核')">重置</Button>
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
        detail: {},
        modalLoading: false,
        selectionsMap: {
          trendCompleteMap: {},
          projectCycleMap: {}
        },
        fieldSet: {
          reason: ''
        },
        list: {
          columns: [
            {title: '项目名称', key: 'projectName'},
            {
              key: 'recruitBusiness.businessName',
              title: '项目类型',
              key: 'action',
              render: (h, params) => {
                return h('span', params.row.recruitBusiness.businessName)
              }
            },
            {
              title: '项目预算', key: 'projectBudget', render: (h, params) => {
              return h('span', {}, (params.row.projectBudget?params.row.projectBudget:'价格面议'));
            }
            },
            {title: '项目预算', key: 'projectBudget'},
            {title: '状态', key: 'status'},
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                let btns = [h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: (e) => {
                      this.showDetail(params.row, e)
                    }
                  }
                }, [h('Icon', {props: {type: 'ios-paper-outline'}, class: {'margin-right-10': true}}), '查看'])]
                if (params.row.status == '待平台跟进') {
                  btns.push(h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        this.follow(params.row, e)
                      }
                    }
                  }, [h('Icon', {props: {type: 'play'}, class: {'margin-right-10': true}}), '跟进']))
                }
                return h('div', btns);
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
      refreshSelections: function () {
        selections('100').then((data, map) => {
          this.selectionsMap.trendCompleteMap = window.dicMapMap['100']
        })
        selections('300').then((data, map) => {
          this.selectionsMap.projectCycleMap = window.dicMapMap['300']
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
      },
      check: function (data, status) {
        if (status == '不通过' && !this.fieldSet.reason) {
          window.vm.$Message.error('原因不能为空');
          return
        }
        this.$http.get(this.url('admin/checkEmp'), {
          params: {
            id: data.id,
            status: status,
            reason: this.fieldSet.reason
          }
        }).then(this.rspHandler((data) => {
          this.pop = false
          this.refreshList(1)
        }))
      },
      follow: function (data) {
        this.$Modal.confirm({
          title: '跟进',
          content: '确认是否跟进！',
          onOk: () => {
            this.$http.get(this.url('admin/runningEmp'), {
              params: {
                id: data.id
              }
            }).then(this.rspHandler((data) => {
              this.refreshList(1)
            }))
          }
        });
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
