import main from '@/resource/template/main'
import relate from '@Pages/wx/vue/relate'

let menu = [];
menu = menu.concat([
  {
    path: '/dashboard',
    meta: {auth: false},
    component: main,

    children: []
  },
  {
    path: '/relate',
    meta: {auth: false},
    component: relate
  },
  {
    path: '*',
    redirect: '/dashboard/home/index',
    meta: { auth: false }
  }
]);
export default menu;