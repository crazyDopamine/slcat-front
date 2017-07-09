import {dateFormat, numberComma, numberPad, numberRandom} from 'vux'

export default {
  install: function (Vue) {
    Vue.filter('date',function(date,format){
      if(!format){
        format = 'YYYY-MM-DD'
      }
      return dateFormat(date,format)
    })
    Vue.filter('numberComma',function(num,length){
      return numberComma(num,length)
    })
    Vue.filter('number',function(num,length){
      if(isNaN(Number(num))){
        return ''
      }else{
        return Number(num).toFixed(length)
      }
    })
  }
}
