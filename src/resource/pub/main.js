import Core from '@Core'
import Store from '@Pub/store/index'
import Router from '@Pub/router'
import routers from '@Pub/router/local-menu'
import routerMenu from '@Pub/router/router-menu'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

let homeRouters = null;
for(let i in routers) {
    if(routers[i].path == '/dashboard') {
        homeRouters = routers[i];
        homeRouters.children = routerMenu.routers;
    }
}

routers.concat(routerMenu.routers);

export function createApp (mode) {
    let router = Router.init(routers,mode);
    let store = Store;
    let app = new Vue({
        Core,
        router,
        store
    });
    return { app, router, store }
}