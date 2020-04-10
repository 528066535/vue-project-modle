const component = {
    suggess: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/suggess/vue'),
};

export default {
    component: {

    },

    router: [
        { path: 'suggess', name: '反馈与建议', component: component.suggess }
    ]
}