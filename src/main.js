import Router from '@Router'
import routers from '@Router/local-menu'
import routerMenu from '@Router/router-menu'

import store from '@Core/store/index'

let homeRouters = null;
for(let i in routers) {
    if(routers[i].path == '/home') {
        homeRouters = routers[i];
        homeRouters.children = routerMenu.routers;
    }
}

routers.concat(routerMenu.routers);

Router.init('#body', routers, store);