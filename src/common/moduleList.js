import {mix, each, url, rspHandler, filteNullParams} from './utils'
import consts from './const'
var listConfig = {
  url: '',
  dataList: [],
  total: 0,
  page: 1,
  pageSize: 10,
  showPage:true,
  params: {},
  selected: {},
  options: {}
}
export default {
  methods: {
    initList: function (listNode, options) {
      if (!listNode) {
        listNode = this.list
      }
      listNode.options = mix({}, listNode.options, options)
      var list = mix({}, listConfig, listNode)
      var self = this
      each(list, function (data, key) {
        self.$set(listNode, key, data)
      })
    },
    refreshList: function (page, listNode, isPost) {
      var self = this
      if (!listNode) listNode = this.list
      if (page) {
        listNode.page = page
      }
      var params = {}
      if (listNode.page) {
        params = {pageNumber: listNode.page, pageSize: listNode.pageSize}
      }
      params = mix(params, listNode.params)
      listNode.selected = {}
      if (!listNode.url) return
      var callback = rspHandler((data) => {
        if (data instanceof Array) {
          listNode.dataList = data
          listNode.pageSize = data.length
          listNode.total = data.length
          listNode.showPage = false
        } else {
          listNode.dataList = data.rows
          listNode.total = data.total
        }
        if (this.$vux) {
          this.$vux.loading.hide()
        }
        this.$emit(consts.listLoadEvent, listNode)
      })
      listNode.dataList = []
      if (this.$vux) {
        this.$vux.loading.show({
          text: '加载中'
        })
      }
      filteNullParams(params)
      if (listNode.options.mothed) {
        this.$http.post(url(listNode.url), params, {
          // contentType: 'application/json'
        }).then(callback)
      } else {
        this.$http.get(url(listNode.url), {params: params}).then(callback)
      }
    }
  }
}
