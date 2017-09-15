<template>
  <div>
    <admin-header @login-out="loginPop=true"></admin-header>
    <div class="main-body">
      <!--<nav-left :path="path"></nav-left>-->
      <Menu class="menu" theme="dark" :open-names="['user','task','data']" :active-name="path">
        <Submenu name="user">
          <template slot="title">
            <Icon type="ios-people"></Icon>
            用户管理
          </template>
          <router-link to="/userManage">
            <Menu-item name="/userManage">用户管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="task">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            任务管理
          </template>
          <router-link to="/taskManage">
            <Menu-item name="/taskManage">任务管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="user">
          <template slot="title">
            <Icon type="person"></Icon>
            账号管理
          </template>
          <router-link to="/adminManage">
            <Menu-item name="/adminManage">账号管理</Menu-item>
          </router-link>
        </Submenu>
        <Submenu name="data">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            数据管理
          </template>
          <router-link to="/cityManage">
            <Menu-item name="/cityManage">城市管理</Menu-item>
          </router-link>
          <router-link to="/industryManage">
            <Menu-item name="/industryManage">行业管理</Menu-item>
          </router-link>
          <router-link to="/skillManage">
            <Menu-item name="/skillManage">技能管理</Menu-item>
          </router-link>
          <router-link to="/businessTypeManage">
            <Menu-item name="/businessTypeManage">业务类型管理</Menu-item>
          </router-link>
          <router-link to="/dictionaryManage">
            <Menu-item name="/dictionaryManage">数据字典</Menu-item>
          </router-link>
        </Submenu>
      </Menu>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
    <Modal class="login-modal" v-model="loginPop" title="登录" width="360" :closable="false" :mask-closable="false">
      <div class="form-area">
        <h1 class="text-center">搜罗猫运营系统</h1>
        <div class="form-row clearfix">
          <i class="icon-user input-before" style="position:absolute;left:10px;"></i>
          <Input class="col-24" type="text" v-model="loginForm.fieldSet.userName" placeholder="账号"></Input>
        </div>
        <div class="form-row clearfix">
          <i class="icon-key input-before" style="position:absolute;left:10px;"></i>
          <Input class="col-24" type="password" v-model="loginForm.fieldSet.passWord" placeholder="密码"
                 @keyup.enter="login()"></Input>
        </div>
      </div>
      <div slot="footer" class="text-right">
        <Button size="large" type="primary" :loading="modalLoading"
                @click="login()">登陆
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script type="es6">
  import header from './widget/header.vue'
  import router from '../../adminRouter'
  import formValidate from '../../common/formValidate'
  import {cookie} from 'vux'
  let config = {
    router,
    components: {
      'admin-header': header
    },
    mixins: [formValidate],
    data: function () {
      return {
        path: '',
        loginPop: false,
        modalLoading: false,
        loginForm: {
          fieldSet: {
            userName: '',
            passWord: ''
          },
          rule: {
            userName: {
              label: '账号',
              required: true
            },
            passWord: {
              label: '密码',
              required: true
            }
          }
        }
      }
    },
    methods: {
      showMenu: function (show) {
        this.$refs.navLeft.show = !this.$refs.navLeft.show
      },
      login: function () {
        if (this.validate(true, this.loginForm)) {
          var params = this.getValues(this.loginForm)
          this.modalLoading = true
          this.$http.post(this.url('login'), params).then(this.rspHandler((data) => {
            var token = data.token
            cookie.set(this.consts.ticketKey, token)
            this.loginPop = false
            this.modalLoading = false
            this.getUserInfo()
          }), () => {
            this.modalLoading = false
          })
        }
      },
      getUserInfo: function () {
        this.$http.get(this.url('admin/getUserInfo')).then(this.rspHandler((data) => {
          window.vm.userInfo = data
          window.vm.userInfoLoaded = 1
          window.vm.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
        }),(data) => {
          window.vm.userInfo = {}
          window.vm.userInfoLoaded = 2
          window.vm.$emit(this.consts.loadedFailEvent)
          this.loginPop = true
        })
      }
    },
    created: function () {
      window.vm = this
      this.getUserInfo()
      this.path = this.$route.path
      this.$router.afterEach((to, from) => {
        this.path = to.path
      })
      this.validateInit(this.loginForm)
      this.$on(this.consts.loginOutEvent, function () {
        this.loginPop = true
      })
    }
  }
  export default config
</script>
