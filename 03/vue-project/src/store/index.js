import * as api from '../api'
import Vuex from 'vuex'

const store  = new Vuex.Store({
    state:{
        isAddBoard : false,
        boards : []
    },
    mutations:{
        SET_IS_ADD_BOARD(state, toggle){
            state.isAddBoard = toggle
        },
        SET_BOARDS(state, boards){
            state.boards = boards
        }
    },
    actions:{
        ADD_BOARD (_, {title}) {
            return api.board.create(title)
        },
        FTECH_BOARDS ({commit}) {
            return api.board.fetch().then(data =>
                {
                    commit('SET_BOARDS', data.list)
                })
        }
    }
})

export default store