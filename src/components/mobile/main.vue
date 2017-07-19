<template>
  <div class="page-container" style="padding-bottom:50px;">
    <div class="main-img-area" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
         @touchend="touchEnd($event)">
      <template v-for="(img,index) in imgs">
        <transition name="main-img">
          <img class="main-img" :class="['img-'+index,current==index?'active':'',index==noLeave?'no-leave':'']" :src="img" v-show="current==index">
        </transition>
      </template>
    </div>
    <div class="main-bottom">
      <router-link class="btn" to="/taskAdd">发布项目</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        current: 0,
        imgs: ['/static/main/main-1.jpg', '/static/main/main-2.jpg', '/static/main/main-3.jpg',
          '/static/main/main-4.jpg', '/static/main/main-5.jpg', '/static/main/main-6.jpg',
          '/static/main/main-7.jpg', '/static/main/main-8.jpg'],
        moveStart: 0,
        moveEnd: 0,
        changeY: 100,
        noLeave: 0
      }
    },
    methods: {
      touchStart: function (e) {
        this.moveStart = e.touches[0].clientY
      },
      touchMove: function (e) {
        var clientY = e.touches[0].clientY
        var height = this.$el.querySelector('.main-img-area').clientHeight
        if (clientY - this.moveStart > 0) {
          if (this.current > 0) {
            var lastImg = this.$el.querySelector('.main-img.img-' + (this.current - 1))
            lastImg.style.display = 'inline-block'
            lastImg.style.top = '0px'
            var img = this.$el.querySelector('.main-img.img-' + this.current)
            img.style.top = (clientY - this.moveStart) + 'px'
          }
        } else {
          if (this.current < this.imgs.length - 1) {
            var nextImg = this.$el.querySelector('.main-img.img-' + (this.current + 1))
            nextImg.style.display = 'inline-block'
            nextImg.style.top = (height - (this.moveStart - clientY)) + 'px'
            var img = this.$el.querySelector('.main-img.img-' + this.current)
            this.noLeave = this.current
          }
        }
      },
      touchEnd: function (e) {
        var clientY = e.changedTouches[0].clientY
        if (clientY - this.moveStart > 0) {
          if (this.current > 0) {
            var img = this.$el.querySelector('.main-img.img-' + (this.current - 1))
            img.style.top = '0px'
            this.current--
          }
        } else if (this.moveStart - clientY > 0){
          if (this.current < this.imgs.length - 1) {
            var img = this.$el.querySelector('.main-img.img-' + (this.current + 1))
            img.style.top = '0px'
            this.current++
          }
        }
      }
    }
    ,
    created: function () {
    }
  }
</script>
