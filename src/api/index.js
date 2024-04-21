//当前模块:API进行统一管理
import requests from './request'
import mockrequests from './mockrequest'

//三级联动接口
//   /api/product/getBaseCategoryList   GET   无参数

export const reqCategoryList = ()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}
export const reqBannerList = ()=>{
    return mockrequests({url:'/banner',method:'get'})
}
export const reqFloorList = ()=>{
    return mockrequests({url:'/floor',method:'get'})
}

//获取搜索模快接口  
//   /api/list         POST    有参数
//当前接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>{
    return requests({url:'/list',method:'post',data:params})
}

//产品信息接口
//    /api/item/{ skuid }   GET   有参数
export const reqGetGoodsInfo = (skuid)=>{
    return requests({url:`/item/${skuid}`,method:'get'})
}

//将产品添加/更新到购物车中
//    /api/cart/addToCart/{ skuId }/{ skuNum }   POST   有两个参数
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}

//获取购物车列表数据接口
//    /api/cart/cartList      GET
export const reqGetCartList = ()=>{
    return requests({url:`/cart/cartList`,method:'get'})
}

//删除购物车列表数据接口
//     /api/cart/deleteCart/{ skuId }   DELETE
export const reqDeleteCartById = (skuId)=> {
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

//切换所选商品状态
//     /api/cart/checkCart/{ skuId }/{ isChecked }   GET
export const reqUpdateChecked = (skuId,isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

//获取验证码接口
//     /api/user/passport/sendCode/{phone}   GET
export const reqGetPassport = (phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

//注册用户接口
//     /api/user/passport/register   POST  参数： phone,code,password
export const reqRegister = (data)=>{
    return requests({url:`/user/passport/register`,data,method:'post'})
}

//登录用户接口
//     /api/user/passport/login    POST   参数: phone,password
export const reqLogin = (data)=>{
    return requests({url:'/user/passport/login',data,method:'post'})
}

//获取用户信息API
//     /api/user/passport/auth/getUserInfo     GET
export const reqUserInfo = ()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}

//退出登录API
//     /api/user/passport/logout     GET
export const reqLogout = ()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}

//获取用户地址信息API
//     /api/user/userAddress/auth/findUserAddressList   GET
export const reqUserAddressInfo = ()=>{
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

//获取用户订单API
//     /api/order/auth/trade   GET
export const reqOrderInfo = ()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}

//提交订单API
//     /api/order/auth/submitOrder?tradeNo={tradeNo}   POST　　参数:tradeNo,data...
export const reqsubmitOrder = (tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}

//获取订单支付信息API
//     /api/payment/weixin/createNative/{orderId}  GET     参数:orderId
export const reqPayInfo = (orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

//查询支付订单状态API
//     /api/payment/weixin/queryPayStatus/{orderId}  GET   参数:orderId
export const reqPayStatus = (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

//获取我的订单列表API
//     /api/order/auth/{page}/{limit}    GET    参数: page,limit
export const reqMyorderList = (page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}
