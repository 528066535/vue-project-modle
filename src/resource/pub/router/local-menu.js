import main from '@/resource/template/main'
import login from '@Pages/login/vue/index'
import index from '@Pages/index/index-new'

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
        path: '/index',
        meta: { auth: false },
        component:  index,
    },
    {
        path: '*',
        redirect: '/index'
    }
]);
export default menu;