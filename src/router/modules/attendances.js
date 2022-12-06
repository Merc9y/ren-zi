import Layout from '@/layout'

export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: {
        // 路由元信息
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
