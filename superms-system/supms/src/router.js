//引入Vue
import Vue from 'vue'
//引入路由
import Router from 'vue-router'

//引入home组件（后面再来修改）
// import Home from './views/Home.vue'

//注册路由 （使用路由）
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login', //引入路径
      name: 'Login', // 名字
      component: () => import( './views/Login/Login.vue') //引入登录组件
    },
    {
      path: '/', //引入路径
      name: 'index', // 名字
      component: () => import( './views/Index/Index.vue'), //引入后端首页组件
      children:[
        {
          path:'/',
          name:'hone',
          component:()=> import('./views/Home/Home.vue')
        },
        {
          path:'/accountmanage',
          name:'AccountManage',
          component:()=> import('./views/AccountManage/AccountManage.vue')
        },
        {
          path:'/accountadd',
          name:'AccountAdd',
          component:()=> import('./views/AccountAdd/AccountAdd.vue')
        },
        {
          path:'/passwordmodify',
          name:'PasswordModify',
          component:()=> import('./views/PasswordModify/PasswordModify.vue')
        },
        {
          path:'/goods',
          name:'Goods',
          component:()=> import('./views/Goods/Goods.vue')
        },
        {
          path:'/goodsadd',
          name:'GoodsAdd',
          component:()=> import('./views/GoodsAdd/GoodsAdd.vue')
        },
        {
          path:'/salesstatistics',
          name:'SalesStatistics',
          component:()=> import('./views/SalesStatistics/SalesStatistics.vue')
        }
      ]
    }
 
  ]
})
