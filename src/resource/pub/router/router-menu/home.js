const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    userAnalyse: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/user-analyse'),
    sign: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/sign'),
    bussinessAnalyse: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/bussiness-analyse'),
    userDetail: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/app-user'),
};

export default {
    component: {
        'home/user/detail': component.userDetail,
    },

    router: [
        {   path: 'home',
            name: '统计分析',
            component: component.blank,
            meta: {
                level: '1,2'
            },
            children: [
                {
                    meta: {
                        level: '1,2'
                    },
                    name: '用户统计',
                    path: 'user',
                    component: component.userAnalyse,
                },
                {
                    meta: {
                        level: '1,2'
                    },
                    name: '营收统计',
                    path: 'bussiness',
                    component: component.bussinessAnalyse,
                },
                // {
                //     name: '签名',
                //     path: 'sign',
                //     component: component.sign,
                // },
            ]},
    ]
}