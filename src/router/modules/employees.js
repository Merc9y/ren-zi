import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        // 路由元信息
        title: '员工',
        icon: 'people'
      }
    }
  ]
}
