import axios from "axios"
import nProgress from "nprogress"
import "nprogress/nprogress.css"
import goods from '../store/goods'
import user from '../store/user'

const requests = axios.create({
    baseURL: "/api",
    timeout: 500000
})

//请求拦截器：在发请求前，请求拦截器可以检测到，在发出请求前做一些事情
requests.interceptors.request.use((config)=>{
    nProgress.start()
    if(goods.state.uuid_token){
        config.headers.userTempId = goods.state.uuid_token
    }
    if(user.state.token){
        config.headers.token = user.state.token
    }
    return config
})

//响应拦截器：在响应之前做一些事情
requests.interceptors.response.use((res)=>{
    nProgress.done()
    return res.data
},(error)=>{
    console.log('请求出错：', error);
    // return Promise.reject(new Error('faile'))
})

export default requests