let menu = [];
menu = menu.concat([
    {
        path: '/error',
        name: '404',
        component:  () => import(/* webpackChunkName: "pages/error/vue/error" */'@Pages/error/vue/error'),

        children: [
        ]
    }
]);
export default menu;