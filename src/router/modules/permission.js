import Layout from '@/layout'

export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: {
        // 路由元信息
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
