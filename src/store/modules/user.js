import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// export default {
//   state() {
//     return {
//       token: getToken() || ''
//     }
//   }
// }

export default {
  namespaced: true,
  state: {
    // token存储 除了存储到vuex 还要做数据持久化 - 可以把token同时存储到cookie中
    // 每次页面刷新的时候，都应该从cookie中取值，如果没有值，再去设置为''
    token: getToken() || '',
    // 使用userInfo来存储登录用户的信息，之所以设置为空对象，目的是在getters中取属性的时候防止报错
    userInfo: {}
  },
  mutations: {
    // mutation的名字建议使用常量
    // setToken
    SET_TOKEN(state, token) {
      state.token = token
      // 利用setToken方法，将token值存储到cookie中
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      // 删除token主要删除两个位置，一个是vuex中state的token 另外一个就是cookie中的token
      state.token = ''
      // 调用removeToken()方法删除token
      removeToken()
    },
    // 给userInfo进行赋值 -- result 需要是一个对象
    SET_USER_INFO(state, result) {
      state.userInfo = result
    },
    // 清空用户资料
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  // 获取数据流程：action -> mutation -> state
  // action 请求接口，获取数据
  // mutation 接收action传递过来的数据，把数据存储到state中
  // state 存储数据
  actions: {
    // 调用登录的接口，请求数据，数据请求成功之后，调用mutation，将数据存储到state
    async login(context, data) {
      const res = await login(data)
      // { data: { 服务端真实响应的数据 } }  --> res.data
      // 表示登录成功 setToken
      context.commit('SET_TOKEN', res)
      // 调用方法，存储时间戳
      setTimeStamp()
    },
    // 获取用户的资料
    async getUserInfo(context) {
      const result = await getUserInfo()
      const baseInfo = await getUserDetailById(result.userId)
      context.commit('SET_USER_INFO', { ...result, ...baseInfo })
      return result
    },
    // 定义一个退出的方法
    logout(context) {
      context.commit('REMOVE_TOKEN') // 清空token
      context.commit('REMOVE_USER_INFO') // 清空用户资料
    }
  }
}
