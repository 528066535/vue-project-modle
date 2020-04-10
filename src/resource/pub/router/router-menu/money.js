const component = {
    blank: () => import(/* webpackChunkName: "template/blank" */'@/resource/template/blank'),
    money: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/money/vue'),
};

export default {
    component: {

    },

    router: [
        { path: 'money', name: '充值记录', component: component.money }
    ]
}