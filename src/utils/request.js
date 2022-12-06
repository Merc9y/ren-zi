import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600 // 定义超时时间

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // npm run dev /prod-api
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      // 如果token存在，再来检查一下时间戳
      if (IsCheckTimeOut()) {
        // 如果IsCheckTimeOut()的返回值为true，则表示超时了
        // 超时，应该执行退出操作
        store.dispatch('user/logout')
        // 跳转到登录页
        router.push('/login')
        // 最后，把promise的状态改为失败的状态即可
        return Promise.reject(new Error('token超时了'))
      }
      // 如果token存在，那么就把token注入到请求头当中
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    // 必须要把这个config返回，否则将无法继续请求数据
    return config
  },
  (error) => {
    // 请求出错，直接把promise的状态变为失败
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    // response 表示的是，服务端给客户端的响应的数据
    const { success, data, message } = response.data
    // success值表示请求成功或者失败
    if (success) {
      // 请求成功, 如果请求成功，就直接把数据data返回
      return data
    } else {
      // 请求失败, 如果请求失败，应该做两件事：提示  改promise的状态
      // this.$message.error() $message === Message
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 既然服务端已经告诉我们，token超时了，那么就应该主动的进行登出操作，然后跳转到首页
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    // 这个函数执行，意味着请求失败，既然请求失败，做两件事就可以了：错误消息提示，promise状态改变
    return Promise.reject(error)
  }
)

// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳 new Date.getTime()
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
