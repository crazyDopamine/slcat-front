import {mix, each, url, rspHandler, filteNullParams} from './utils'
import consts from './const'
import {Scroller} from 'vux'
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
  },
  pullDownConfig: {
    content: '下拉刷新',
    downContent: '下拉刷新',
    upContent: '释放刷新',
    loadingContent: '加载中'
  },
  pullUpConfig: {
    content: '加载更多',
    downContent: '释放加载',
    upContent: '加载更多',
    loadingContent: '加载中',
  }
}
export default {
  components: {
    Scroller
  },
  methods: {
    initList: function (listNode, options) {
      if (!listNode) {
        listNode = this.list
      }
      listNode.options = mix({}, listNode.options, options)
      var list = mix({}, listConfig, listNode)
      each(list, (data, key) => {
        this.$set(listNode, key, data)
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
          // let listContainer = this.$el.querySelector('.list-container')
          // if (listContainer) {
          //   listContainer.scrollTop = 0;
          // }
        } else {
          listNode.dataList = listNode.dataList.concat(dataList)
        }
        if (this.$refs.scroller) {
          this.$refs.scroller.donePulldown()
          this.$refs.scroller.donePullup()
          if (listNode.pageSize * listNode.page >= listNode.total) {
            this.$refs.scroller.disablePullup()
          } else if (listNode.page === 1) {
            this.$refs.scroller.enablePullup()
          }
          if(options.toTop||options.isClear){
            this.$nextTick(function(){
              this.$refs.scroller.reset({
                top: 0
              })
            })
          }else{
            this.$nextTick(function(){
              this.$refs.scroller.reset()
            })
          }
        }
        // if (this.$vux) {
        //   this.$vux.loading.hide()
        // }
        this.$emit(consts.listLoadEvent, listNode)
        // if (this.$refs.infiniteLoading) {
        //   this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        //   if (listNode.pageSize * listNode.page >= listNode.total) {
        //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        //   } else if (listNode.page === 1) {
        //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        //   }
        // }
        if (successCallback) successCallback()
      }, () => {
        if (this.$refs.scroller) {
          this.$refs.scroller.donePulldown()
          this.$refs.scroller.donePullup()
        }
      })
      if (options.isClear) listNode.dataList = []
      // if (this.$vux) {
      //   this.$vux.loading.show({
      //     text: '加载中'
      //   })
      // }
      filteNullParams(params)
      if (listNode.options.post) {
        this.$http.post(url(listNode.url), params).then(callback, () => {
          if (errorCallback) errorCallback()
          if (this.$refs.scroller) {
            this.$refs.scroller.donePulldown()
            this.$refs.scroller.donePullup()
          }
        })
      } else {
        this.$http.get(url(listNode.url), {params: params}).then(callback, () => {
          if (errorCallback) errorCallback()
        })
      }
    },
    onRefresh: function () {
      this.refreshList(1)
    },
    onLoadMore() {
      this.refreshList(this.list.page + 1, {isClear: false}, null)
    }
  }
}
