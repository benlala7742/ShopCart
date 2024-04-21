<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :floor="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
import home from '@/store/home'
export default {
    name: 'Home',
    components: {
        ListContainer,TodayRecommend,Rank,Like,Floor,Brand
    },
    mounted(){
        this.$store.dispatch("floorList")
    },
    computed: {
        ...mapState({
            floorList:state=>home.state.floorList
        })
    }

}
</script>