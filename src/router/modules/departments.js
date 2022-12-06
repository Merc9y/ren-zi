import Layout from '@/layout'

export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: {
        // 路由元信息
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
