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
        <Page :total="list.total" :current="list.page" :page-size="list.pageSize" @on-change="refreshList($event)"
              show-elevator></Page>
      </div>
    </div>
    <Modal
      v-model="pop"
      :title="popTitle">
      <div class="user-detail">
        <img :src="detail.headImgUrl | img" style="width:120px;"><br/>
        <span>{{detail.nickName}}</span><br/>
        <span>{{detail.dailyWage ? detail.dailyWage : '0'}}元/天</span><br/>
        <template v-if="detail.jobTitle">
          <span class="btn btn-gray-round btn-small margin-right-5"
                v-for="item in detail.jobTitle.split(',')">{{item}}</span>
        </template>
        <br/>
        <label class="fs-xxl">关于我</label><br/>
        <p class="text-left margin-top-10" v-html="toContent(detail.selfIntroduction)"></p><br/>
        <label class="fs-xxl">擅长技能</label><br/>
        <template v-if="detail.baseSkillList">
          <div>
            <span class="btn btn-gray-round btn-small margin-right-5 margin-top-10"
                  v-for="item in detail.baseSkillList">{{item.skillName}}</span>
          </div>
        </template>
        <br/>
        <label class="fs-xxl">作品案例</label><br/>
        <div class="text-left margin-top-10" v-if="detail.worksCases">
          <Collapse>
            <Panel v-for="item in detail.worksCases" :key="item">
              {{item.workName}}
              <a :href="item.worksLink" class="float-right margin-right-20" target="_blank">{{item.worksLink}}</a>
              <p slot="content">
                作品职责：{{item.responsibilities}}<br/>
                作品描述：{{item.worksDesc}}
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div slot="footer">
        <template v-if="detail.status=='待审核'">
          <label class="float-left margin-right-10" style="line-height:30px;">原因:</label>
          <Input type="text" class="col-12" v-model="fieldSet.reason"></Input>
          <Button type="error" :loading="modalLoading" @click="check(detail,'不通过')">不通过</Button>
          <Button type="primary" :loading="modalLoading" @click="check(detail,'审核通过')">通过</Button>
        </template>
        <template v-if="detail.status!='待审核'">
          <label class="float-left margin-right-10" style="line-height:30px;">状态:{{detail.status}}</label>
          <label class="float-left margin-right-10" style="line-height:30px;" v-if="detail.status=='不通过'">原因:{{detail.reason}}</label>
          <Button type="primary" @click="pop=false">关闭</Button>
        </template>
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
        popTitle: '详情',
        detail: {},
        modalLoading: false,
        fieldSet: {
          reason: ''
        },
        list: {
          columns: [
            {title: '昵称', key: 'nickName'},
            {title: '手机号', key: 'phone'},
            {title: '状态', key: 'status'},
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
            status: '待审核'
          }
        }
      }
    },
    methods: {
      showDetail: function (data) {
        this.$http.get(this.url('admin/queryMasterDetail'), {
          params: {
            id: data.id
          }
        }).then(this.rspHandler((data) => {
          this.detail = data
          this.pop = true
        }))
      },
      check: function (data, status) {
        if(status=='不通过'&&!this.fieldSet.reason){
          window.vm.$Message.error('原因不能为空');
          return
        }
        this.modalLoading = true
        this.$http.get(this.url('admin/checkMaster'), {
          params: {
            id: data.id,
            status: status,
            reason: this.fieldSet.reason
          }
        }).then(this.rspHandler((data) => {
          this.modalLoading = false
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
