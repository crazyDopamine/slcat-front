import {mix, each, url, rspHandler, filteNullParams} from './utils'
import consts from './const'
import VuePullRefresh from 'vue-pull-refresh'
import InfiniteLoading from 'vue-infinite-loading'
var listConfig = {
  url: '',
  dataList: [],
  total: 0,
  page: 0,
  pageSize: 10,
  showPage: true,
  params: {},
  selected: {},
  options: {
    isClear: true
  }
}
export default {
  components: {
    'vue-pull-refresh': VuePullRefresh,
    InfiniteLoading
  },
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
    refreshList: function (page, options, listNode, successCallback, errorCallback) {
      if (!listNode) listNode = this.list
      var options = mix({}, listNode.options, options)
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
        let dataList
        if (data instanceof Array) {
          dataList = data
          listNode.pageSize = data.length
          listNode.total = data.length
          listNode.showPage = false
        } else {
          dataList = data.rows
          listNode.total = data.total
        }
        if (options.isClear) {
          listNode.dataList = dataList
        } else {
          listNode.dataList = listNode.dataList.concat(dataList)
        }
        // if (this.$vux) {
        //   this.$vux.loading.hide()
        // }
        this.$emit(consts.listLoadEvent, listNode)
        if (this.$refs.infiniteLoading) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          if (listNode.pageSize * listNode.page >= listNode.total) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          } else if (listNode.page === 1) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
          }
        }
        if (successCallback)successCallback()
      })
      if (options.isClear)listNode.dataList = []
      // if (this.$vux) {
      //   this.$vux.loading.show({
      //     text: '加载中'
      //   })
      // }
      filteNullParams(params)
      if (listNode.options.post) {
        this.$http.post(url(listNode.url), params).then(callback, ()=> {
          if (errorCallback)errorCallback()
        })
      } else {
        this.$http.get(url(listNode.url), {params: params}).then(callback, ()=> {
          if (errorCallback)errorCallback()
        })
      }
    },
    onRefresh: function () {
      return new Promise((resolve, reject) => {
        this.refreshList(1, null, null, resolve, reject)
      });
    },
    onInfinite() {
      this.refreshList(this.list.page+1, {isClear: false}, null)
    }
  }
}
