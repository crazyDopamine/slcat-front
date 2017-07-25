<template>
  <header>
    <div class="header">
      <img src="/static/img/solomioLOGO.png">
      <a class="float-right margin-top-15" @click="loginOut()"><Icon type="log-out margin-right-10"></Icon>退出</a>
      <span class="float-right margin-top-15 margin-right-20">欢迎搜罗猫运营系统</span>
    </div>
  </header>
</template>
<script>
  import {cookie} from 'vux'
  export default {
    data: function () {
      return {}
    },
    methods: {
      loginOut: function () {
        cookie.remove(this.consts.ticketKey);
        window.vm.$emit(this.consts.loginOutEvent);
      }
    },
    created: function () {
    }
  }
</script>
