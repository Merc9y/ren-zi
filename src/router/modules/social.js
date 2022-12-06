import Layout from '@/layout'

export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: {
        // 路由元信息
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
