<template>
    <div class="type-nav">
            <div class="container">
                <div @mouseleave="leave" @mouseenter="enter">
                    <h2 class="all">全部商品分类</h2>
                    <Transition name="sort">
                        <div class="sort" @click="goSearch" v-show="isShow">
                            <div class="all-sort-list2">
                                <!-- 一级联动 -->
                                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                                    <h3 @mouseenter="changeIndex(index)" :class="{current:currentIndex===index}">
                                        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    </h3>
                                    <!-- 二三级联动 -->
                                    <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                        <div class="subitem">
                                            <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                                <dt>
                                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data(){
        return{
            currentIndex: -1,
            isShow: true
        }
    },
    mounted(){
        if(this.$route.path !== '/home'){
            this.isShow = false
        }   
    },
    computed: {
        ...mapState({
            categoryList: state=>state.home.categoryList
        })
    },
    methods: {
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },100),
        enter(){
            this.isShow = true
        },
        leave(){
            this.currentIndex = -1
            if(this.$route.path !== '/home'){
                this.isShow = false
            }
        },
        goSearch(event){
            let element = event.target
            //获取到当前这个事件的节点，若带有data-categoryname属性，则一定是a标签
            let {categoryname,category1id,category2id,category3id} = element.dataset
            if(categoryname){
                let location = {name: 'search'}
                let query = {categoryName:categoryname}
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else if(category3id){
                    query.category3Id = category3id
                }
                location.query = query
                if(this.$route.params){
                    location.params = this.$route.params
                }
                this.$router.push(location)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .current{
                        background-color: skyblue;
                    }
                }
            }
            .sort-enter,.sort-leave-to{
                height: 0px;
            }
            .sort-enter-to,.sort-leave{
                height: 1000px;
            }
            .sort-enter-active,.sort-leave-active{
                transition: all .5s linear;
            }
        }
}
</style>