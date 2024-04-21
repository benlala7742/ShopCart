import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入home,search的store
import home from './home/index'
import search from './search/index'
import goods from './goods/index'
import shopcart from './shopcart/index'
import user from './user/index'
import trade from './trade'

export default new Vuex.Store({
    modules:{
        home,
        search,
        goods,
        shopcart,
        user,
        trade
    }
})