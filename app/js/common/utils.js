/**
 * Created by dongwei on 2017/5/15.
 */

/**
 * 深度拷贝
 * @returns {*}
 */
var mix = function(){
    var argu = arguments;
    if(argu.length<=0)return {};
    var obj = argu[0];
    if(!obj||typeof obj != 'object')obj={};
    var keys,key;
    for(var i=1;i<argu.length;i++){
        if(argu[i]&&typeof argu[i] == 'object'){
            keys = Object.keys(argu[i]);
            for(var j=0;j<keys.length;j++){
                key = keys[j];
                if(typeof argu[i][key] == 'object') {
                    obj[key]=mix(obj[key],argu[i][key]);
                }else{
                    obj[key]=argu[i][key];
                }
            }
        }
    }
    return obj;
}

/**
 * 获取search参数
 * @returns {{}}
 */
var getSearchObj = function(){
    var  qs = location.search.length>0 ? location.search.substr(1):'',
        args = {},
        items = qs.length>0 ? qs.split('&'):[],
        item = null,name = null,value = null,i = 0,len = items.length;
    for(i = 0;i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}

module.exports={
    mix:mix,
    getSearchObj:getSearchObj
}