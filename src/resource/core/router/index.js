import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

let router = null;

// 1. 定义 (路由) 组件。
export default {
    /**
     * 获取当前路由地址中的所携带的参数
     */
    get param(){
        let hash = location.hash.split('?')[1];
        let obj = {};
        if(hash){
            hash = hash.split('&');
            for(let i = 0; i < hash.length; i++){
                let param = hash[i].split('=');
                obj[param[0]] = decodeURIComponent(param[1]);
            }
        }
        return obj;
    },

    get url(){
        return location.hash.replace('#', '');
    },

    /**
     * 初始化路由
     */
    init(el, routers){
        router = new VueRouter({routes: routers});

        router.beforeEach((to, from, next) => {
            if(to.path.indexOf('/dashboard') >= 0 || !to.name){

            }else{
                document.title = to.name;
            }
            next();
        });

        new Vue({
            el: el,
            router: router
        });
    },
}