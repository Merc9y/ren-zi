import request from '@/utils/request'

/**
 * 获取公司组织架构
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据id删除部门信息
 * @param {string} id 删除的部门id
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门
 * @param {object} data 新增的数据对象
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/** *
 * 获取部门详情
 * ***/
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
