/**
 * Created by dongwei on 2017/5/15.
 */

/**
 * 深度拷贝
 * @returns {*}
 */
import consts from './const'
var mix = function () {
  var argu = arguments
  if (argu.length <= 0) return {}
  var obj = argu[0]
  if (!obj || typeof obj !== 'object') obj = {}
  var keys, key
  for (let i = 1; i < argu.length; i++) {
    if (argu[i] && argu[i] instanceof Array) {
      if (!(obj instanceof Array)) {
        obj = []
      }
      for (let k = 0; k < argu[i].length; k++) {
        if (typeof argu[i][k] === 'object') {
          obj.push(mix({}, argu[i][k]))
        } else {
          obj.push(argu[i][k])
        }
      }
    } else if (argu[i] && typeof argu[i] === 'object') {
      keys = Object.keys(argu[i])
      for (let j = 0; j < keys.length; j++) {
        key = keys[j]
        if (key === undefined) continue
        if (typeof argu[i][key] === 'object') {
          obj[key] = mix(obj[key], argu[i][key])
        } else {
          obj[key] = argu[i][key]
        }
      }
    }
  }
  return obj
}

var each = function (array, callback) {
  if (array instanceof Array) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i)
    }
  } else if (typeof array === 'object') {
    var keys = Object.keys(array)
    for (let i = 0; i < keys.length; i++) {
      callback(array[keys[i]], keys[i])
    }
  }
}

var toNV = function (array, valueField, labelField) {
  if (!valueField) valueField = 'id'
  if (!labelField) labelField = 'name'
  var result = []
  each(array, function (data, index) {
    result.push({value: data[valueField], name: data[labelField]})
  })
  return result
}

var toMap = function (array, valueField) {
  if (!valueField) valueField = 'id'
  var result = {}
  each(array, function (data, index) {
    result[data[valueField]] = data
  })
  return result
}

var url = function (url) {
  if (!url) url = ''
  if (url.indexOf('http://') < 0) {
    return window.baseUrl + url
  } else {
    return url
  }
}

var rspHandler = function (callback) {
  return function (rsp) {
    var data = rsp.data
    if (data.code === consts.CODE_SUCC) {
      callback(data.data)
    } else {
      window.vm.$vux.toast.text(rsp.msg, 'bottom')
    }
  }
}

window.dicMap = {}
var selections = function (code) {
  if (!window.dicMap[code]) {
    window.vm.$http.get(url('dataDictionary/getByCode/' + code)).then(rspHandler(function (data) {
      window.dicMap[code] = data
    }))
  }
  return window.dicMap[code]
}

window.type = []
window.typeLoaded = 0
var getType = function (vm) {
  var promise = new Promise(function (resolve, reject) {
    if (!window.typeLoaded) {
      vm.$http.get(url('business/getBusinessInfo')).then(rspHandler(function (data) {
        window.type = data
        window.typeLoaded = 1
        resolve(window.type)
      }))
    } else {
      resolve(window.type)
    }
  })
  return promise
}

export {
  mix,
  each,
  toNV,
  url,
  selections,
  getType,
  rspHandler,
  toMap
}
