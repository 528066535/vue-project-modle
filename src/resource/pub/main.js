import Core from '@Core'
import Store from '@Pub/store/index'
import Router from '@Pub/router'
import routers from '@Pub/router/local-menu'
import routerMenu from '@Pub/router/router-menu'

let homeRouters = null;
for(let i in routers) {
    if(routers[i].path == '/home') {
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