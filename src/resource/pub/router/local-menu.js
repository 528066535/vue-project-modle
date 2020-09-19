import main from '@/resource/template/main'

let menu = [];
menu = menu.concat([
  {
    path: '/dashboard',
    meta: {auth: false},
    component: main,

    children: []
  },
  {
    path: '*',
    redirect: '/dashboard/home/index',
    meta: { auth: false }
  }
]);
export default menu;