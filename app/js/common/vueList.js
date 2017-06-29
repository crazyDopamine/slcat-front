

module.exports= {
    init:function(listNode){
        utils.mix(listNode,utils.mix({},listConfig,listNode));
    }
}