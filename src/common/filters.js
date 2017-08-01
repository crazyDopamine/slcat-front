import {dateFormat, numberComma, numberPad, numberRandom} from 'vux'

var selectionsFilter = function (value, selectionsMap) {
  if(selectionsMap&&selectionsMap[value]){
    return selectionsMap[value].desc
  }else{
    return value
  }
  // if (window.dicLoaded[code] === 2 && window.dicMapMap[code][value]) {
  //   return window.dicMapMap[code][value].desc
  // } else if(window.dicLoaded[code] === 1){
  //   return value
  // } else{
  //   if(!window.vm)return value
  //   window.vm.$on('selection-'+code,function(){
  //     vm.$forceUpdate()
  //   })
  //   selections(code).then((data)=>{
  //     window.vm.$emit('selection-'+code)
  //   })
  // }
  // return value
}
export default {
  install: function (Vue) {
    Vue.filter('date', function (date, format) {
      if (!format) {
        format = 'YYYY-MM-DD'
      }
      return dateFormat(date, format)
    })
    Vue.filter('numberComma', function (num, length) {
      return numberComma(num, length)
    })
    Vue.filter('number', function (num, length) {
      if (isNaN(Number(num))) {
        return ''
      } else {
        return Number(num).toFixed(length)
      }
    })
    Vue.filter('selections', selectionsFilter)

    Vue.filter('img', function(src,type){
      var defaultImg = '/static/img/user-img-default.png'
      var smallImgDic = 'upload/'
      var bigImgDic = 'upload/'
      if(!src)return defaultImg
      if(src.indexOf('http')>=0){
        return src
      }else{
        return window.baseUrl+src
      }
    })
  }
}
