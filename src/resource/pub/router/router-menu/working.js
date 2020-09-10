const component = {
  list: () => import(/* webpackChunkName: "pages/working/vue/list" */'@Pages/working/vue/list'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {},

  router: [
    {
      path: 'working',
      name: '员工管理',
      component: component.blank,
      redirect: '/dashboard/working/list',
      children: [
        {
          meta: {},
          name: '员工列表',
          path: 'list',
          component: component.list
        }
      ]
    },
  ]
}