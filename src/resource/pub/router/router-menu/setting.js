const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    banner: () => import(/* webpackChunkName: "template/blank" */'@Pages/setting/vue/banner'),
    vip: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/setting/vue/vip'),
};

export default {
    component: {

    },

    router: [
        { path: 'setting', name: '设置', component: component.blank,
            children: [
                {
                    name: 'banner轮播图',
                    path: 'banner',
                    component: component.banner,
                },
                {
                    name: 'VIP套餐设置',
                    path: 'vip',
                    component: component.vip,
                }
            ]},
    ]
}