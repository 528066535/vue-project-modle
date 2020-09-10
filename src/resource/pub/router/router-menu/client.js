const component = {
  list: () => import(/* webpackChunkName: "pages/client/vue/list" */'@Pages/client/vue/list'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {},

  router: [
    {
      path: 'client',
      name: '客户',
      component: component.blank,
      redirect: '/dashboard/client/list',
      children: [
        {
          meta: {},
          name: '客户列表',
          path: 'list',
          component: component.list
        }
      ]
    },
  ]
}