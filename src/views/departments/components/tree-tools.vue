<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 左侧部分 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧部分 -->
    <!-- element 会把整个屏幕的宽度分成24份，:span=1 占据一份 -->
    <el-col :span="6">
      <el-row type="flex" justify="end">
        <!-- 只有一级根的时候，treeNode.manager才会为空，其他的时候都是有值的 -->
        <el-col>{{ treeNode.manager ? treeNode.manager : '负责人' }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async operateDepts(type) {
      // console.log(type)
      // if (type === 'add') {
      //   // 添加
      // } else if (type === 'edit') {
      //   // 编辑操作
      // } else if (type === 'del') {
      //   // 删除操作
      // }

      switch (type) {
        case 'add':
          // 添加操作
          // 向父组件抛出一个事件
          this.$emit('add', this.treeNode)
          break
        case 'edit':
          // 编辑操作
          break
        case 'del':
          // 删除操作
          // 先和用户确认一下，是否删除
          try {
            await this.$confirm('你确认要删除吗?')
            // 如果用户点击了确认，那么就会向下执行
            console.log(this.treeNode.id)
            this.$emit('del-dept', this.treeNode.id)
          } catch (err) {
            console.log('取消了')
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
