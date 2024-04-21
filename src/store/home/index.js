//引入req请求
import { reqCategoryList,reqBannerList, reqFloorList } from '../../api/index'
//home的专属store
const actions = {
    //三级目录
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code === 200){
            commit("CATEGORYLIST",result.data)
        } 
    },
    //轮播图
    async bannerList({commit}){
        let result = await reqBannerList()
        if(result.code === 200){
            commit("BANNERLIST",result.data)
        }
    },
    //尾页
    async floorList({commit}){
        let result = await reqFloorList()
        if(result.code === 200){
            commit('FLOORLIST',result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    BANNERLIST(state,value){
        state.bannerList = value
    },
    FLOORLIST(state,value){
        state.floorList = value
    }
}
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}