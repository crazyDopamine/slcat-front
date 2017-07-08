import consts from './const'
import {cookie} from 'vux'

export function httpInterceptor(request, next){
  // var ticket = cookie.get(consts.ticketKey);
  // if (ticket) {
  //   request.params.ticket = ticket;
  // }
  next((rsp) => {
    if (rsp.data.code !== consts.CODE_SUCC){
      window.vm.$vux.loading.hide()
      window.vm.$vux.toast.text(rsp.data.message, 'bottom',2000)
    }
  });
}
