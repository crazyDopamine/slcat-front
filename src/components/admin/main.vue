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
          <Input class="col-24" type="text" v-model="loginForm.fieldSet.loginName" placeholder="用户名"></Input>
        </div>
        <div class="form-row clearfix">
          <i class="icon-key input-before" style="position:absolute;left:10px;"></i>
          <Input class="col-24" type="password" v-model="loginForm.fieldSet.password" placeholder="密码"
                 @keyup.enter="login()"></Input>
        </div>
      </div>
      <div slot="footer" class="text-right">
        <a size="large" class="btn btn-small btn-orange" style="width:100%;" :loading="modal_loading"
           @click="login()">登陆</a>
      </div>
    </Modal>
  </div>
</template>
<script>
  import header from './widget/header.vue'
  import router from '../../adminRouter'
  let config = {
    router,
    components: {
      'admin-header': header
    },
    data: function () {
      return {
        path: '',
        loginPop: false,
        modal_loading: false,
        loginForm: {
          fieldSet: {
            loginName: '',
            password: ''
          }
        }
      }
    },
    methods: {
      showMenu: function (show) {
        this.$refs.navLeft.show = !this.$refs.navLeft.show
      },
      login: function () {
        setTimeout(() => {
          this.loginPop = false
          this.getUserInfo()
        }, 100)
      },
      getUserInfo: function () {
        window.vm.userInfo = {}
        window.vm.userInfoLoaded = 1
        window.vm.$emit(this.consts.loadedEvent, {}, this.consts.loadedStatus)
        // this.$http.get(this.url('techMaster/queryMasterDetail')).then(this.rspHandler((data) => {
        //   this.userInfo = data
        //   this.userInfoLoaded = 1
        //   this.$emit(this.consts.loadedEvent, data, this.consts.loadedStatus)
        // }))
      }
    },
    created: function () {
//      this.getUserInfo()
      this.loginPop = true
      this.path = this.$route.path
      this.$router.afterEach((to, from) => {
        this.path = to.path
      })
    }
  }
  export default config
</script>
