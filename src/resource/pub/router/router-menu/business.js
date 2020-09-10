const component = {
  list: () => import(/* webpackChunkName: "pages/business/vue/list" */'@Pages/business/vue/list'),
  label: () => import(/* webpackChunkName: "pages/business/vue/list" */'@Pages/business/vue/label'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {},

  router: [
    {
      path: 'business',
      name: '商品',
      component: component.blank,
      redirect: '/dashboard/business/list',
      children: [
        {
          meta: {},
          name: '商品列表',
          path: 'list',
          component: component.list
        },
        {
          meta: {},
          name: '标签列表',
          path: 'label',
          component: component.label
        }
      ]
    },
  ]
}