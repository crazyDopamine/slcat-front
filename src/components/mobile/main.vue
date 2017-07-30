<template>
  <div class="page-container" style="height: 100%;">
    <!--<div class="main-img-area" @touchstart="touchStart($event)" @touchmove="touchMove($event)"-->
         <!--@touchend="touchEnd($event)" style="touch-action: auto;user-select: none;-webkit-user-drag: none;">-->
      <!--<template v-for="(img,index) in imgs">-->
        <!--<transition name="main-img">-->
          <!--<img v-if="index!=1" class="main-img" :class="['img-'+index,current==index?'active':'',index==noLeave?'no-leave':'']" :src="img" v-show="current==index">-->
          <!--<router-link to="/services" v-if="index==1"><img class="main-img" :class="['img-'+index,current==index?'active':'',index==noLeave?'no-leave':'']" :src="img" v-show="current==index">-->
          <!--</router-link>-->
        <!--</transition>-->
      <!--</template>-->
    <!--</div>-->
    <div class="swiper-container" style="padding-bottom:50px;height:100%;">
      <swiper class="main-img-area" :height="swiperHeight" direction="vertical" :show-dots="false" ref="swiper">
        <swiper-item v-for="item in imgList" :key="item"><img class="main-img" :src="item.img"/></swiper-item>
      </swiper>
    </div>
    <!--<swiper auto height="30px" direction="vertical" :interval=2000 :show-dots="false">-->
      <!--<swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>-->
      <!--<swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>-->
      <!--<swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>-->
      <!--<swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>-->
      <!--<swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>-->
      <!--<swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>-->
    <!--</swiper>-->
    <div class="main-bottom">
      <router-link class="btn" to="/taskAdd">发布项目</router-link>
    </div>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'vux'
  export default {
  	components:{
      Swiper,
      SwiperItem
    },
    data: function () {
      return {
        current: 0,
        swiperHeight:'500px',
        imgList:[{
          url: 'javascript:',
          img: '/static/main/main-1.jpg',
          title: ''
        }, {
          url: '/services',
          img: '/static/main/main-2.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-3.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-4.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-5.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-6.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-7.jpg',
          title: ''
        }, {
          url: 'javascript:',
          img: '/static/main/main-8.jpg',
          title: ''
        }],
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
    },
//    mounted: function () {
//      this.$nextTick(function(){
//      	debugger
//        let swiperContainer = this.$el.querySelector('.swiper-container');
//        this.$refs.swiper.xheight = swiperContainer.offsetHeight-50 + 'px'
//      })
//    },
    created: function () {
        this.swiperHeight = window.screen.height-90 + 'px'
    }
  }
</script>
