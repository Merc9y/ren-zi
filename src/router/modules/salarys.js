import Layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: {
        // 路由元信息
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
