<template>
    <div>
        <div class="home-title">Personal Boards</div>
        <div class="board-list" ref="boardList">
            <div class="board-item" v-for="b in boards" :key="b.id"
            :data-bgcolor="b.bgColor" ref="boardItem">
            <router-link :to="`/b/${b.id}`">
                <div class="board-item-title">{{ b.title }}</div>
            </router-link>
            </div>
            <div class="board-item">
                <a class="new-board-btn" 
                href="" @click.prevent="addBoard">
                Create new Board..
                </a>
            </div>
        </div>
        <AddBoard v-if="addboard" @close="addboard = false" @submit="onAddBoard()"/>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddBoard from './AddBoard.vue'

export default {
    components:{
        AddBoard
    },

    created() {
        this.fetchData()
    },
    data(){
        return{
            addboard: false,
            loading:false
        }
    },

    computed:{
        ...mapState({
            isAddBoard: 'isAddBoard',
            boards : 'boards'
        })
    }

    methods: {
        ...mapMutations([
            'SET_IS_ADD_BOARD'
        ]),
        ...mapActions([
            'FETCH_BOARDS'
        ]),
        fetchData() {
            this.loading = true
            this.FETCH_BOARDS().finally(_=>{
                this.loading = false
            })
        //     board.fetch()
        //     .then(data => {
        //         this.boards = data.list
        //     })
        //     .finally(_=>{
        //         this.loading = false
        //     })
        // },
        // addBoard() {
        //     this.addboard = true
        // },
        // onAddBoard(title){
        //     console.log(title)
        // }
    }
}
}
</script>