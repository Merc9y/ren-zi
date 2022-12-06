import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/login', '/404'] // no redirect whitelist

// 权限拦截通过路由守卫来实现，主要通过两个路由守卫，前置路由守卫和后置路由守卫
// 需要同时配合白名单和vuex

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 获取token
  const token = store.getters.token
  // 判断token是否存在
  if (token) {
    // 如果token存在
    if (to.path === '/login') {
      // 如果用户在拥有token的情况下去login，那么就让用户去首页
      next('/')
    } else {
      // 存在token，并且也没有去首页
      // 获取userId -- 从vuex中user模块内的userInfo对象里面获取userId
      if (!store.getters.userId) {
        // 如果没有拿到id，那么就表示并没有获取用户的信息
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 如果token不存在
    // 就判断一下用户要去的地方是否在白名单当中
    if (whiteList.indexOf(to.path) > -1) {
      // 如果 > -1 就表示用户要去的地方就在白名单当中
      next()
    } else {
      // 如果没有token，并且要去的地方没有在白名单当中，那么就让用户去login登录
      next('/login')
    }
  }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
