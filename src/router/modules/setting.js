import Layout from '@/layout'

export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: {
        // 路由元信息
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
