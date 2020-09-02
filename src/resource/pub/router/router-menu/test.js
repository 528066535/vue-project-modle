const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    test: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/test/vue/test'),
};

export default {
    component: {

    },

    router: [
        {
            path: 'test',
            meta: {
                level: '1'
            },
            name: '测试',
            component: component.blank,
            children: [
                {
                    name: '界面',
                    path: 'test',
                    meta: {
                        level: '1'
                    },
                    component: component.test,
                },
        ]},
    ]
}