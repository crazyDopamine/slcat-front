import {mix, each, url} from './utils'
import consts from './const'
var listConfig = {
  url: '',
  dataList: [],
  total: 0,
  page: 1,
  pageSize: 10,
  params: {},
  selected: {}
}
export default {
  methods: {
    initList: function (listNode, options) {
      if (!listNode) {
        listNode = this.list
      }
      var list = mix({}, listConfig, listNode)
      var self = this
      each(list, function (data, key) {
        self.$set(listNode, key, data)
      })
    },
    refreshList: function (page, listNode) {
      var self = this
      if (!listNode) listNode = this
      if (page) {
        listNode.page = page
      }
      var params = {}
      if (listNode.page) {
        params = {page: listNode.page, pageSize: listNode.pageSize}
      }
      params = mix(params, listNode.params)
      listNode.selected = {}
      console.log(this)
      this.$http.get(url(listNode.url), params, function (code, rsp, msg) {
        if (code === consts.CODE_SUCC) {
          if (rsp.data instanceof Array) {
            listNode.dataList = rsp.data
            listNode.total = rsp.data.length
          } else {
            listNode.dataList = rsp.data.dataList
            listNode.total = rsp.data.total
          }
          self.$emit(consts.listLoadEvent, listNode)
        }
      })
    }
  }
}
