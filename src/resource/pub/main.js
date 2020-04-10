import Core from '@Core'
import Store from '@Pub/store/index'
import Router from '@Pub/router'
import routers from '@Pub/router/local-menu'
import routerMenu from '@Pub/router/router-menu'
import ElementUI from 'element-ui'
import '@Pub/filter';
import '@Pub/prototype-extend';
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'
import echarts from '../third/echarts/echarts.min'
window.echarts = echarts

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'A7qoLGM1RZZavTwRjhcvKu1r79VzPNxh'
})

Vue.use(ElementUI);
import { createComponent } from '../components'

let homeRouters = null;
for(let i in routers) {
    if(routers[i].path == '/dashboard') {
        homeRouters = routers[i];
        homeRouters.children = routerMenu.routers;
    }
}

routers.concat(routerMenu.routers);

console.log(routers)

export function createApp (mode) {
    let router = Router.init(routers,mode);
    let store = Store;
    let app = new Vue({
        Core,
        router,
        store
    });
    createComponent(Vue);

    window.dialogVm = new Vue({
        el: '.dialog-detail',

        data: {
            width: '',
            title: '',
            style: '',

            subWidth: '',
            subTitle: ''
        },

        methods: {
            close(){
                this.width = '';
                this.title = '';
                this.style = '';
            },

            closeSub(){
                this.subWidth = '';
                this.subTitle = '';
            }
        },

        mounted(){
            $('.download-iframe').on('load', function () {
                if($('.download-iframe')[0].contentDocument.location != 'about:blank'){
                    dialog.error('下载文件失败，请联系管理员!');
                }
            });
        }
    });
    return { app, router, store }
}