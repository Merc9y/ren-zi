<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @add="add"></tree-tools>
        <!-- 树形组件 -->
        <!--
          常用参数：
          data 树型组件展示需要用到的数据
            [
              {
                label: '',
                children: [
                  {}
                ]
              }
            ]
          props 设置的是树型组件展示数据的时候参考的对象字段
            默认参考的是label和children，通过props属性的设置，就可以把属性改为任意的属性
            :props="defaultProps"

            defaultProps: {
              label: '展示内容的字段',
              children: '二级(子集展示的字段)'
            }
        -->
        <el-tree :data="list" :props="defaultProps" :default-expand-all="true">
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @del-dept="del"
            @add="add"
          ></tree-tools>
        </el-tree>
      </el-card>
    </div>

    <add-dept :is-show="showDialog" @close="showDialog = false"></add-dept>
  </div>
</template>

<script>
// vue --> 单向数据流 父组件把数据给子组件 ，子组件来进行渲染， 当子组件想要进行修改数据的操作时，应该把行为传递给父组件
// 由父组件来进行处理
import { getDepartments, delDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'

import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      list: [
        {
          name: '我是一级',
          manager: '哈哈哈',
          child: [
            {
              name: '我是二级',
              manager: '嘿嘿嘿'
            }
          ]
        },
        {
          name: '我是第二个一级标题',
          manager: '嘎嘎嘎',

          child: [
            {
              name: '我是第二个二级标题',
              manager: '测试'
            }
          ]
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // 定义一个对象，将整个对象传递到头部的tree-tools组件中
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      showDialog: false
    }
  },
  created() {
    // 为什么我们在钩子函数中调用方法，而不是直接把请求数据的代码放在钩子函数中？？？
    // 因为我们随时可能碰到重新请求数据的需求，比如修改、添加等等操作都需要在完成操作后重新请求数据。
    // 如果把请求的代码放到钩子函数中，就无法再次发起请求，除非把组件销毁再重新加载，但是这样的操作很明显是不划算的
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      // 将一级的根数据进行赋值
      this.company = { name: res.companyName, manager: res.companyManage }
      // console.log(tranListToTreeData(res.depts, ''))
      this.list = tranListToTreeData(res.depts, '')
      console.log(this.list)
    },
    // 用户在tree-tools组件中点击了删除，监听的函数
    async del(id) {
      // console.log(id)
      // 调用封装的删除的api，进行删除操作
      try {
        await delDepartments(id)
        // 重新获取数据
        this.getDepartments()
        // 提示用户删除成功
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 用户在tree-tools组件中点击了添加
    add(node) {
      console.log(123)
      this.showDialog = true
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
