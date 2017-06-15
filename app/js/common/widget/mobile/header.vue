<template>
    <header>
        <div class="top-bar">
            <a></a>
        </div>
    </header>
</template>
<script>
    module.exports = {
        data:function(){
            return {bannerSwitch:1}
        },
        methods:{
            nextBanner:function(index){
                if(index>2){
                    index = 1
                }else if(index<1){
                    index = 2;
                }
                this.bannerSwitch=index;
            }
        },
        created:function(){
            var self = this;
            setInterval(function(){
                self.nextBanner(self.bannerSwitch+1);
            },10000);

        }
    }
</script>