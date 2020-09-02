const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    list: () => import(/* webpackChunkName: "template/blank" */'@Pages/video/vue/list'),
    category: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/video/vue/category'),
    auth: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/video/vue/auth'),
};

export default {
    component: {

    },

    router: [
        { path: 'video', name: '视频', component: component.blank,
            meta: {
                level: '1'
            },
            children: [
                {
                    name: '列表',
                    path: 'user',
                    component: component.list,
                    meta: {
                        level: '1'
                    },
                },
                {
                    name: '分类管理',
                    path: 'category',
                    component: component.category,
                    meta: {
                        level: '1'
                    },
                }
                // {
                //     name: '作者管理',
                //     path: 'auth',
                //     component: component.auth,
                // }
            ]},
    ]
}