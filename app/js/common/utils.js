/**
 * Created by dongwei on 2017/5/15.
 */
var Vue = require('vue');
/**
 * 深度拷贝
 * @returns {*}
 */
var mix = function () {
    var argu = arguments;
    if (argu.length <= 0)return {};
    var obj = argu[0];
    if (!obj || typeof obj != 'object')obj = {};
    var keys, key;
    for (var i = 1; i < argu.length; i++) {
        if(argu[i] && argu[i] instanceof Array){
            if(!(obj instanceof Array)){
                obj=[];
            }
            for(var k=0;k<argu[i].length;k++){
                if(typeof argu[i][k] == 'object'){
                    obj.push(mix({}, argu[i][k]));
                }else{
                    obj.push(argu[i][k]);
                }
            }
        }else if (argu[i] && typeof argu[i] == 'object') {
            keys = Object.keys(argu[i]);
            for (var j = 0; j < keys.length; j++) {
                key = keys[j];
                if (typeof argu[i][key] == 'object') {
                    obj[key] = mix(obj[key], argu[i][key]);
                } else {
                    obj[key] = argu[i][key];
                }
            }
        }
    }
    return obj;
}

var transformToLV = function(array,valueField,labelField){
    if(!valueField)valueField='id';
    if(!labelField)labelField='name';
    var result = [];
    each(array,function(data,index){
        result.push({value:data[valueField],label:data[labelField]});
    });
    return result;
}

var cookie = {
    set:function (name, value) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 1);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get:function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(name, '', -1);
    }
}

var each = function(array,callback){
    if(array instanceof Array){
        for(var i=0;i<array.length;i++){
            callback(array[i],i);
        }
    }else if(typeof array=='object'){
        var keys=Object.keys(array);
        for(var i=0;i<keys.length;i++){
            callback(array[keys[i]],keys[i]);
        }
    }

}

var url = function(url){
    if(url.indexOf('http://')<0){
        return window.baseUrl + url;
    }else{
        return url;
    }
}

window.dicMap = {};
var selections = function(code){
    if(!window.dicMap[code]){
        window.vm.$http.get(window.vm.url('dataDictionary/getByCode/'+code)).then(window.vm.rspHandler(function(data){
            window.dicMap[code] = data;
        }));
    }
    return window.dicMap[code];
}

window.type = [];
window.typeLoaded = 0;
var getType = function(vm){
    var promise = new Promise(function(success,fail){
        if(!window.typeLoaded){
            vm.$http.get(vm.url('/business/getBusinessInfo')).then(vm.rspHandler(function(data){
                window.type = data;
                window.typeLoaded = 1;
                success(window.type);
            }));
        }else{
            success(window.type);
        }
    });
    return promise;
}


module.exports={
    mix:mix,
    each:each,
    transformToLV:transformToLV,
    cookie:cookie,
    url:url,
    selections:selections,
    getType:getType
}