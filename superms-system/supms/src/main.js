//引入Vue 
import Vue from 'vue';
//引入element-ui 的组件和样式
import ElementUI from 'element-ui'; //组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; //样式文件


//引入 message 单个组件 
import {Message} from 'element-ui'


//引入封装好的 get 和post  请求  
import req from '@/api/request'

//把 axios 挂载在Vue的原型上
Vue.prototype.req = req;
//引入顶级组件 app.vue
import App from './App.vue'
//引入路由文件
import router from './router'

//引入公用样式
import '@/styles/common.less'

//注册（使用 element-ui）
Vue.use(ElementUI);

// 全局路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
// 获取token
const token = window.localStorage.getItem('token');
// 有token
if (token) {
  // 直接放行
  next();
} else {  // 否则是没有
  // 如果去的是登录页
  if (to.path === '/login') {
    // 直接放行
    next();
  } else {
    // 如果去的是其他页,跳转到登录页
    Message.error('请登录以后再操作！')
    // 跳转到登录页
    return next({"path": "/login"})
  }
}
})


//阻止生产提升
Vue.config.productionTip = false
//创建vue 实力对象 挂载dom上 把路由和 APP 顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
