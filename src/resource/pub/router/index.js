import VueRouter from 'vue-router'
import Data from '@Core/data'
import routerMenu from '@Pub/router/router-menu'
import routers from '@Pub/router/local-menu'
import util from '@Pub/util'

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
    init(routers, mode='hash'){
        router = new VueRouter({mode: mode,routes: routers});

        router.beforeEach((to, from, next) => {
            if(!Data.getToken() && to.path != '/login' && to.path != '/index') {
                document.location.href = '/#/login'
                next({path: '/login'});
            }
            if(to.name) {
                document.title = to.name;
            }
            next();
        });

        return router;
    },

    /**
     * 地址跳转
     */
    go(url, param={}, reload, open){
        if(open){
            param = param || {};
            let paramStr = '', paramList = [];
            if(url.includes('?')){
                paramStr = '?'
            }
            else {
                paramStr = '&'
            }
            for(let i in param) {
                paramList.push(`${i}=${param[i]}`)
            }

            paramList.join('&');

            window.open(location.protocol + '//' + location.host + '#' + url, '_blank');
            return;
        }

        Vue.nextTick(() => {
            if(router && (url !== router.history.current.path)){
                const name = router.history.current.name;
                param = param || {};
                let urlParam = util.getUrlParams(url);
                param = $.extend(urlParam, param);
                let currentParam = this.param;
                if(currentParam.menu && !param.menu){
                    param.menu = currentParam.menu;
                }

                if(name && param.id){
                    param.fn = name;
                }

                url = url.split('?')[0];

                if(reload){
                    this.replace(param, url, true);
                    window.location.reload();
                }
                else {
                    router.push({path: url, query: param});
                }
            }else{
                window.location.reload();
            }
        });
    },

    back(){
        router && router.go(-1);
    },
}