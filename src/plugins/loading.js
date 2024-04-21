//图片懒加载插件
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
//import love from '@/assets/images/Loading.gif'
const loadimage = require('@/assets/images/Loading.gif')
const errorimage = require('@/assets/images/Error.gif')
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: loadimage,
  error: errorimage,
  attempt: 1
})