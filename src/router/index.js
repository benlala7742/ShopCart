import Vue from "vue"
import VueRouter from "vue-router"


Vue.use(VueRouter)
import store from "@/store"

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

const router = new VueRouter({
    routes: [
        //Home路由
        {
            path: '/home',
            component: ()=>import('@/pages/Home'),
            meta: {
                showFooter: true
            }
        },
        //Search路由
        {
            name: 'search',
            path: '/search/:keyword?',
            component: ()=>import('@/pages/Search'),
            meta: {
                showFooter: true
            }
        },
        //Login路由
        {
            path: '/login',
            component: ()=>import('@/pages/Login'),
            meta: {
                showFooter: false
            }
        },
        //Register路由
        {
            path: '/register',
            component: ()=>import('@/pages/Register'),
            meta: {
                showFooter: false
            }
        },
        //Detail路由
        {
            path: '/detail/:skuid',
            component: ()=>import('@/pages/Detail'),
            meta: {
                showFooter: true
            }
        },
        //AddCartSuccess陆游
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: ()=>import('@/pages/AddCartSuccess'),
            meta: {
                showFooter: true
            }
        },
        //ShopCart路由
        {
            path: '/shopcart',
            name: 'shopcart',
            component: ()=>import('@/pages/ShopCart'),
            meta: {
                showFooter: true
            }

        },
        //Trade路由
        {
            path: '/trade',
            name: 'trade',
            component: ()=>import('@/pages/Trade'),
            meta: {
                showFooter: true
            },
            beforeEnter: (to,from,next)=>{
                //发现，当刷新时，路由默认是从‘/’跳转到‘/trade’，
                if(from.path === '/shopcart' || from.path === '/'){
                    next()
                }else{
                    next(from.path)
                }
            }

        },
        //Pay路由
        {
            path: '/pay',
            name: 'pay',
            component: ()=>import('@/pages/Pay'),
            meta: {
                showFooter: true
            },
            beforeEnter: (to,from,next)=>{
                if(from.path === '/trade' || from.path === '/'){
                    next()
                }else{
                    next(from.path)
                    return false
                }
            }
        },
        //PaySuccess路由
        {
            path: '/paysuccess',
            name: 'paysuccess',
            component: ()=>import('@/pages/PaySuccess'),
            meta: {
                showFooter: true
            }
        },
        //Center路由
        {
            path: '/center',
            name: 'center',
            component: ()=>import('@/pages/Center'),
            meta: {
                showFooter: true
            },
            children: [
                {
                    path: 'myorder',
                    component: ()=>import('@/pages/Center/MyOrder'),
                },
                {
                    path: 'grouporder',
                    component: ()=>import('@/pages/Center/GroupOrder')
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }

            ]

        },
        //项目运行,访问/时,默认展示Home页面(重定向)
        {
            path: "*",
            redirect: "/home"
        }
    ],
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})

//全局前置守卫
router.beforeEach( async (to,from,next)=>{
    let token = store.state.user.token
    let loginName = store.state.user.userInfo.loginName
    //用户已登录状态
    if(token){
        //用户想进入login页面，禁止通行,留在首页
        if(to.path === '/login' || to.path === '/register'){
            next('/home')
        }else{//用户不进入login页面，进入其他页面
            //如果用户进入其他页面，userInfo中有信息，直接通行
            if(loginName){
                next()
            }else{//否则直接调用store.dispath捞数据/userInfo
                try {//调用actions成功
                    await store.dispatch("getUserInfo")
                    next()  
                } catch (error) {//调用actions失败，表示token过期，无法捞取用户信息，重新登录
                    await store.dispatch("logout")
                    next('/login')
                } 
            }
        }
    }else{
        //用户处于未登录状态
        let toPath = to.path
        //如果用户去的是交易，支付，个人中心页面，则返回至登录页面
        if(toPath.indexOf('trade')!==-1 || toPath.indexOf('pay')!==-1 || toPath.indexOf('center')!==-1){
            //把未登录时想去而被拦截的地址存储在query中，这样在登录成功后直接跳转至想去的地址
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
    }
})

export default router