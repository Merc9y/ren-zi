import request from '@/utils/request'

/**
 * 登录接口
 * @param {object} data 登录需要的数据 data中应该包含mobile 和 password
 * @returns promise
 */
export function login(data) {
  // request.get() request.post()  request({})
  return request({
    url: '/sys/login', // api/sys/login
    method: 'post',
    data // post方法的参数就传递到data中就可以了
  })
}

/**
 *  获取用户的基本资料
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 根据id获取登录用户的相信信息
 * @param {string} id 用户的id
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getInfo(token) {}

export function logout() {}
