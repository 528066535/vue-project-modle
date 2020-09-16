import main from '@/resource/template/main'
import login from '@Pages/login/vue/index'

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
        path: '/login',
        meta: { auth: false },
        component:  login
    },
    {
        path: '*',
        redirect: '/dashboard/home',
        meta: { auth: false }
    }
]);
export default menu;