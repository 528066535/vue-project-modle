const component = {
  test: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/test/vue/test'),
  detail: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/test/vue/detail'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {
    'test/home/detail': component.detail,
  },

  router: [
    {
      path: 'test',
      name: '测试界面1',
      component: component.blank,
      redirect: '/dashboard/test/home',
      children: [
        {
          meta: {
          },
          name: '用户统计',
          path: 'home',
          component: component.test,
        }
      ]
    }
  ]
}