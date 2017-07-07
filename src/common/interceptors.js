import consts from './const'
import {cookie} from 'vux'

export function httpInterceptor(request, next){
  var ticket = cookie.get(consts.ticketKey);
  if (ticket) {
    request.params.ticket = ticket;
  }
  next((rsp) => {
    if (rsp.data.code === consts.CODE_SUCC) {
      return rsp.data.data
    } else {
      window.vm.$vux.toast.text(rsp.data.msg, 'bottom')
      return rsp.data;
    }
  });
}
