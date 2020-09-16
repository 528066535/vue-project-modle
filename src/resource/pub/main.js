import Core from '@Core'
import Store from '@Pub/store/index'
import Router from '@Pub/router'
import routers from '@Pub/router/local-menu'
import { createComponent } from '../components'
import routerMenu from '@Pub/router/router-menu'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

let homeRouters = null;
for (let i in routers) {
  if (routers[i].path === '/dashboard') {
    homeRouters = routers[i];
    homeRouters.children = routerMenu.routers;
  }
}
routers.concat(routerMenu.routers);

export function createApp(mode) {
  let router = Router.init(routers, mode);
  let store = Store;
  let app = new Vue({
    Core,
    router,
    store
  });
  createComponent(Vue)
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
  return {app, router, store}
}