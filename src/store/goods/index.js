import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import { Promise } from "core-js"
import { getUUID } from '../../utils/uuid_token'
const actions = {
    async getGoodsInfo({commit},skuid){
        let result = await reqGetGoodsInfo(skuid)
        if(result.code === 200){
            commit("GETGOODSINFO",result.data)
        }
    },
    async addOrupdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200){
            //代表服务器加入购物车成功
            return "ok"
        }else{
            //代表服务器加入购物车失败
            return Promise.reject(new Error("faile"))
        }
    },
}
const mutations = {
    GETGOODSINFO(state,value){
        state.goodsList = value
    }
}
const state = {
    goodsList: {},
    uuid_token: getUUID()
}
const getters = {
    categoryView(state){
        return state.goodsList.categoryView || {}
    },
    skuInfo(state){
        return state.goodsList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsList.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}