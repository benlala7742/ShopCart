import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import store from './store/index'
import "./mock/mockServe"
import "swiper/css/swiper.css"

Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
import * as API from '@/api/index'
import { MessageBox } from 'element-ui'
//按需添加组件，通过挂载原型的方式！！！
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

//引入表单校验插件
import "@/plugins/validate"

//引用图片懒加载插件
import "@/plugins/loading"
new Vue({
  render: h => h(App),
  //全局事件总线配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
