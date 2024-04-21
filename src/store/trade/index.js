import { reqUserAddressInfo,reqOrderInfo } from "@/api"
import { Promise } from "core-js"

const actions = {
    async getUserAddressInfo({commit}){
        let result = await reqUserAddressInfo()
        if(result.code === 200){
            commit("GETUSERADDRESSINFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async getUserOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code === 200){
            commit("GETUSERORDERINFO",result.data)
            return "ok"
        }
    }
}

const mutations = {
    GETUSERADDRESSINFO(state,value){
        state.addressInfoList = value
    },
    GETUSERORDERINFO(state,value){
        state.orderInfo = value
    }
}

const state = { 
    addressInfoList: [],
    orderInfo: {}
}

export default {
    actions,
    mutations,
    state
}