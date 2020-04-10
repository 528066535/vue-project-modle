const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    userAnalyse: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/user-analyse'),
    bussinessAnalyse: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/bussiness-analyse'),
    sign: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/home/vue/sign'),
};

export default {
    component: {

    },

    router: [
        { path: 'home', name: '统计分析', component: component.blank,
            children: [
                {
                    name: '用户统计',
                    path: 'user',
                    component: component.userAnalyse,
                },
                {
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