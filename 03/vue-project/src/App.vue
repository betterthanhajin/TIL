<template>
  <onHeader/>
  <router-view></router-view>
</template>

<script>
import onHeader from './components/onHeader.vue'

export default {
  name: 'App',
  props:{
    title: String,
    likes: Number
  },
  components: {
    onHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
