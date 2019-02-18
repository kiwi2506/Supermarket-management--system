//引入Vue 
import Vue from 'vue';
//引入element-ui 的组件和样式
import ElementUI from 'element-ui'; //组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; //样式文件

//引入axios
import axios from 'axios'

//把 axios 挂载在Vue的原型上
Vue.prototype.axios = axios;
//引入顶级组件 app.vue
import App from './App.vue'
//引入路由文件
import router from './router'

//引入公用样式
import '@/styles/common.less'

//注册（使用 element-ui）
Vue.use(ElementUI);

//阻止生产提升
Vue.config.productionTip = false
//创建vue 实力对象 挂载dom上 把路由和 APP 顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
