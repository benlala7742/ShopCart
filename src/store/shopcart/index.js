import { reqGetCartList,reqDeleteCartById,reqUpdateChecked } from "@/api"

const actions = {
    async getCartList({commit}){
        let result = await reqGetCartList()
        if(result.code === 200){
            commit("GETCARTLIST",result.data)
        }
    },
    async deleteCartById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async updateChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateChecked(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked === 1 ? dispatch("deleteCartById",item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    updateAllChecked({state,dispatch},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch("updateChecked",{skuId: item.skuId,isChecked: isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state,value){
        state.cartList = value
    }
}

const state = {
    cartList: []
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}