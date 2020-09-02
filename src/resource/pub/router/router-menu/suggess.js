const component = {
    suggess: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/suggess/vue'),
};

export default {
    component: {

    },

    router: [
        {
            path: 'suggess',
            meta: {
                level: '1'
            },
            name: '反馈与建议', component: component.suggess }
    ]
}