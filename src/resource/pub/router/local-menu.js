import main from '@/resource/template/main'

let menu = [];
menu = menu.concat([
    {
        path: '/dashboard',
        redirect: '/dashboard/home',
        meta: { auth: false },
        component:  main,

        children: [
        ]
    },
    {
        path: '*',
        redirect: '/dashboard/home',
        meta: { auth: false }
    }
]);
export default menu;