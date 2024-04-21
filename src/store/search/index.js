import { reqGetSearchInfo } from "@/api"
//search的专属store
const actions = {
    async getSearchList({commit},params={}){
        //调用这个函数去获取服务器数据的时候，至少要传递一个参数（空对象）
        //params形参，实在用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,value){
        state.searchList = value
    }   
}
const state = {
    searchList: {}
}
//计算属性，在项目中为了简化数据而生
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}