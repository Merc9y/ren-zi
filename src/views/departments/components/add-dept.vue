<template>
  <el-dialog :visible="isShow" title="showTitle" @close="cancelBtn">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width: 80%" placeholder="请选择" @focus="getEmployeeSimple">
        <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
        v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="cancelBtn">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
// import { call } from 'body-parser'
export default {
  props: {
    // 控制窗体是否隐藏
    isShow: {
      type: Boolean,
      default: false
    },
    // 操作当前节点
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      // 获取架构数据
      const { depts } = await getDepartments()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id)
        .some(item => item.name === value)
      isRepeat ? callback(new Error('已有相同部门')) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error('编码已存在')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求一到五十', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑子部门' : '新增子部门'
    }
  },
  methods: {
    cancelBtn() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // this.$emit('close')
      this.$refs.deptForm.resetFields()
      this.$emit('update:isShow', false)
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      this.$refs.deptForm.validate(async isok => {
        if (isok) {
          await addDepartments({
            ...this.formData, pid: this.treeNode.id
          })
          this.$emit('addDepts')
          this.$emit('update:isShow', false)
        }
      })
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
