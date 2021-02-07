const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    appUser: () => import(/* webpackChunkName: "template/blank" */'@Pages/account/vue/app-user'),
    activeUser: () => import(/* webpackChunkName: "template/blank" */'@Pages/account/vue/active-user'),
    bussiness: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/account/vue/bussiness'),
    device: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/account/vue/device'),
    place: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/account/vue/place'),
};

export default {
    component: {

    },

    router: [
        {   path: 'account', name: '账号管理', component: component.blank,
            meta: {
                level: '1,2'
            },
            children: [
                {
                    name: 'app用户',
                    path: 'user',
                    component: component.appUser,
                    meta: {
                        level: '1,2'
                    },
                },
                {
                    name: '活跃用户',
                    path: 'active-user',
                    component: component.activeUser,
                    meta: {
                        level: '1,2'
                    },
                },
                {
                    name: '二级运营商',
                    path: 'bussiness',
                    component: component.bussiness,
                    meta: {
                        level: '1'
                    },
                },
                {
                    name: '设备管理',
                    path: 'device',
                    component: component.device,
                    meta: {
                        level: '1'
                    },
                },
                {
                    name: '合作点管理',
                    path: 'place',
                    component: component.place,
                    meta: {
                        level: '1,2'
                    },
                },
            ]},
    ]
}
