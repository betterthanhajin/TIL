<template>
    <Modal>
        <div class="header">
            <h2>
                Create New Board
                <a href="" class="modal-default-button" @click.prevent="close"> 
                    &times;
                </a>
            </h2>
        </div>
        <div class="body">
            <form id="add-board-form"
            @submit.prevent="addBoard">
            <input class="form-control" type="text" v-model="input"
            ref="input">
            </form>
        </div>
        <div class="footer">
            <button class="btn" :class="{'btn-success': valid}" 
            type="submit" form="add-board-form" :disabled="!valid">
            Create Board</button>
        </div>
    </Modal>
</template>
<script>
import Modal from './testModal.vue'
export default {
    components:{
        Modal
    },
    data() {
        return{
            input:'',
            valid:false,
            test:false
        }
    },
    watch: {
        input(v) {
            this.valid = v.trim().length > 0
        }
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        close() {
            this.$emit('close')
        },
        addBoard() {
            this.$emit('close')
            this.$emit('submit', this.input)
        }
    }
}
</script>
<style scoped>

</style>