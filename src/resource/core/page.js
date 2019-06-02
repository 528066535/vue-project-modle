/**
 * Created by 蒋鑫强 on 2017/3/22.
 * 创建一个Vue路由生成的页面
 */

export default {
    computed: {

    },
    data(){
        return {

        };
    },

    watch:{
        '$route'(to, from){
            if(to.path === from.path){
                //同一个地址参数变化，刷新当前页isEvaluate面
                window.location.reload();
            }
        }
    },

    methods: {

    },

    created(){

    },

    mounted(){

    },

    beforeDestroy(){
        for(let key in this.$refs){
            if(this.$refs[key]){
                this.$refs[key].$destroy();
            }
        }
    },

    destroyed(){
        for(let key in this.data){
            this.data[key] = null;
        }
    }
};