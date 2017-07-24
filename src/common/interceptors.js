import consts from './const'
import {cookie} from 'vux'

export function httpInterceptor(request, next){
  var ticket = cookie.get(consts.ticketKey);
  if (ticket) {
    // request.params[consts.ticketKey] = ticket;
    request.headers.set(consts.ticketKey, ticket);
  }
  next((rsp) => {
    if (rsp.data.code !== consts.CODE_SUCC){
      if(window.vm.$vux){
        window.vm.$vux.loading.hide()
        window.vm.$vux.toast.text(rsp.data.message, 'bottom',2000)
      }else if(window.vm.$Message){
        window.vm.$Message.error(rsp.data.message);
      }
    }
  });
}
