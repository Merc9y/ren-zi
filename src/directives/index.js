export const errorimg = {
  // 在对象当中去编写指令的内容
  // 会在指令插入节点之后，执行
  inserted(dom, options) {
    // dom 对应的是手册中的el属性 options对应的是手册中的binding
    // 如果想要获取指令绑定的值 options.value
    // 下面用到的是js原生绑定事件的写法,
    // 在js原生语法中,onerror这个事件的触发时机，是资源加载失败
    dom.onerror = function () {
      // v-errorimg="http://image.baidu.com/index.png"
      dom.src = options.value
    }
  }
}
