import main from '@/resource/template/main'
import login from '@Pages/login/vue/index'

let menu = [];
menu = menu.concat([
    {
        path: '/dashboard',
        meta: { auth: false },
        component:  main,
        redirect:'/dashboard/home/user',


        children: [
        ]
    },
    {
        path: '/login',
        meta: { auth: false },
        component:  login,
    },
    {
        path: '*',
        redirect: '/dashboard/home/user'
    }
]);
export default menu;