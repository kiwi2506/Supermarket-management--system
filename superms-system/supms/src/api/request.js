//引入axios  
import axios from "axios";

//引入qs 
import qs from "qs";

//设置 默认的服务器请求根目录  
axios.defaults.baseURL="http://127.0.0.1:3000";

// 写一个axios的请求拦截器 （在axios请求发送之前 搞点事情）
axios.interceptors.request.use((config) => {
    // 获取token
    const token = window.localStorage.getItem('token');
    // 在请求头中携带token
    config.headers.authorization = `Bearer ${token}` 
    return config;
})


//封装 get 和 post  请求 然后暴露出去 
export default {
    get (url,params= {}){
        return new Promise((resolve,rejects) =>{
            axios.get(url,{
                params
            })
            .then(response =>{
                resolve(response.data)
            })
            .catch(err =>{
                rejects(err);
            })
        })
    },
    post (url,params= {}){
        return new Promise((resolve,rejects) =>{
            axios.post(url,qs.stringify(params))
            .then(response =>{
                resolve(response.data)
            })
            .catch(err =>{
                rejects(err);
            })
        })
    },

}