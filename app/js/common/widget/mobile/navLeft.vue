<template>
    <nav>
        <ul class="nav-left">
            <li>
                <router-link to="/" slot="left">
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
    module.exports = {
        data:function(){
            return {

            }
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