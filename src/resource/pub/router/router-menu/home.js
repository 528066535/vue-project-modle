const component = {
  analyse: () => import(/* webpackChunkName: "pages/home/vue/analyse" */'@Pages/home/vue/analyse'),
  blank: () => import(/* webpackChunkName: "resource/template/blank" */'@/resource/template/blank')
};

export default {
  component: {},

  router: [
    {
      path: 'home',
      name: '首页',
      component: component.blank,
      redirect: '/dashboard/home/analyse',
      children: [
        {
          meta: {
          },
          name: '统计页',
          path: 'analyse',
          component: component.analyse
        }
      ]
    },
  ]
}