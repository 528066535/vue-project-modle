const component = {
  list: () => import(/* webpackChunkName: "pages/order/vue/list" */'@Pages/order/vue/list'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {},

  router: [
    {
      path: 'order',
      name: '订单',
      component: component.blank,
      redirect: '/dashboard/order/list',
      children: [
        {
          meta: {},
          name: '订单列表',
          path: 'list',
          component: component.list
        }
      ]
    },
  ]
}