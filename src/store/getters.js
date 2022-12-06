const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 获取user模块下的token
  userId: (state) => state.user.userInfo.userId,
  name: (state) => state.user.userInfo.username,
  avatar: (state) => state.user.userInfo.staffPhoto
}
export default getters
