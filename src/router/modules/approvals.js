import Layout from '@/layout'

export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: {
        // 路由元信息
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
