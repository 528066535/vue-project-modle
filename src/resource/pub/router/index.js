import VueRouter from 'vue-router'
import Data from '@Core/data'
import util from '@Core/util'

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = null;

// 1. 定义 (路由) 组件。
export default {
  /**
   * 获取当前路由地址中的所携带的参数
   */
  get param() {
    let hash = location.hash.split('?')[1];
    let obj = {};
    if (hash) {
      hash = hash.split('&');
      for (let i = 0; i < hash.length; i++) {
        let param = hash[i].split('=');
        obj[param[0]] = decodeURIComponent(param[1]);
      }
    }
    return obj;
  },

  /**
   * 地址跳转
   */
  go(url, param = {}, reload, open) {
    if (open) {
      param = param || {};
      let paramStr = '', paramList = [];
      if (url.includes('?')) {
        paramStr = '?'
      } else {
        paramStr = '&'
      }
      for (let i in param) {
        paramList.push(`${i}=${param[i]}`)
      }

      paramList.join('&');

      window.open(location.protocol + '//' + location.host + '#' + url, '_blank');
      return;
    }

    Vue.nextTick(() => {
      if (router && (url !== router.history.current.path)) {
        const name = router.history.current.name;
        param = param || {};
        let urlParam = util.getUrlParams(url);
        Object.assign(urlParam, param)
        let currentParam = this.param;
        if (currentParam.menu && !param.menu) {
          param.menu = currentParam.menu;
        }

        if (name && param.id) {
          param.fn = name;
        }

        url = url.split('?')[0];

        if (reload) {
          this.replace(param, url, true);
          window.location.reload();
        } else {
          router.push({path: url, query: param});
        }
      } else {
        window.location.reload();
      }
    });
  },

  get url() {
    return location.hash.replace('#', '');
  },

  /**
   * 初始化路由
   */
  init(routers, mode = 'hash') {
    router = new VueRouter({mode: mode, routes: routers});

    router.beforeEach((to, from, next) => {
      if (to.meta.auto && !Data.getToken()) {
        next({path: '/login'});
      }
      if (to.name) {
        document.title = to.name;
      }
      next();
    });

    return router;
  },
}