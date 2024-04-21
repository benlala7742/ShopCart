import { reqGetPassport,reqRegister,reqLogin,reqUserInfo,reqLogout } from "@/api"
import { Promise } from "core-js"

const actions = {
    async getCode({commit},phone){
        let result = await reqGetPassport(phone)
        if(result.code === 200){
            commit("GETCODE",result.data)
        }
    },
    async register({commit},user){
        let result = await reqRegister(user)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async login({commit},user){
        let result = await reqLogin(user)
        if(result.code === 200){
            commit("LOGIN",result.data.token)
            localStorage.setItem("token",result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code === 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async logout({commit}){
        let result = await reqLogout()
        if(result.code === 200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}

const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    LOGIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem("token")
    }
}

const state = {
    code: '',
    token: localStorage.getItem("token"),
    userInfo: {}
}

export default {
    actions,
    mutations,
    state
}