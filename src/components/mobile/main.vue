<template>
  <div class="page-container" style="height: 100%;">
    <div class="swiper-container" style="padding-bottom:50px;height:100%;">
      <swiper class="main-img-area" :height="swiperHeight" dots-position="center" ref="swiper">
        <swiper-item v-for="(item,index) in imgList" :key="item">
          <template v-if="index==1">
            <router-link to="/services">
              <img class="main-img" :src="item.img"/>
            </router-link>
          </template>
          <template v-if="index!=1">
            <img class="main-img" :src="item.img"/>
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div class="main-bottom">
      <router-link class="btn" to="/taskAdd">发布项目</router-link>
    </div>
  </div>
</template>
<script>
  import {Swiper, SwiperItem, Scroller} from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem,
      Scroller
    },
    data: function () {
      return {
        current: 0,
        swiperHeight: '500px',
        imgList: [{
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
        moveStartTop: 0,
        moveStart: 0,
        moveEnd: 0,
        changeY: 100,
        noLeave: 0
      }
    },
    methods: {
      touchStart: function (e) {
        this.moveStart = e.touches[0].clientY
        var container = this.$el.querySelector('.main-img-area')
        this.moveStartTop = container.scrollTop
      },
      touchMove: function (e) {
//        var clientY = e.touches[0].clientY

//        var height = this.$el.querySelector('.main-img-area').clientHeight
//        if (clientY - this.moveStart > 0) {
//          if (this.current > 0) {
//            var lastImg = this.$el.querySelector('.main-img.img-' + (this.current - 1))
//            lastImg.style.display = 'inline-block'
//            lastImg.style.top = '0px'
//            var img = this.$el.querySelector('.main-img.img-' + this.current)
//            img.style.top = (clientY - this.moveStart) + 'px'
//          }
//        } else {
//          if (this.current < this.imgs.length - 1) {
//            var nextImg = this.$el.querySelector('.main-img.img-' + (this.current + 1))
//            nextImg.style.display = 'inline-block'
//            nextImg.style.top = (height - (this.moveStart - clientY)) + 'px'
//            var img = this.$el.querySelector('.main-img.img-' + this.current)
//            this.noLeave = this.current
//          }
//        }
      },
      touchEnd: function (e) {
        var clientY = e.changedTouches[0].clientY
        if (this.intervalIndex != 0)return
        if (clientY - this.moveStart > 0) {
          var container = this.$el.querySelector('.main-img-area')
          var nextImg = this.$el.querySelector('.main-img.img-' + (this.imgIndex - 1))
          if (nextImg) container.scrollToElement(nextImg, 0)
          this.imgIndex--
        } else {
          var container = this.$el.querySelector('.main-img-area')
          var nextImg = this.$el.querySelector('.main-img.img-' + (this.imgIndex + 1))
          if (nextImg) container.scrollToElement(nextImg, 0)
          this.imgIndex++
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
      this.swiperHeight = document.documentElement.clientHeight - 90 + 'px'
    }
  }
</script>
