import axios from "axios"

const requests = axios.create({
    baseURL: "/mock",
    timeout: 500000
})

//请求拦截器：在发请求前，请求拦截器可以检测到，在发出请求前做一些事情
requests.interceptors.request.use((config)=>{
    return config
})

//响应拦截器：在响应之前做一些事情
requests.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    console.log('请求出错：', error);
    // return Promise.reject(new Error('faile'))
})

export default requests