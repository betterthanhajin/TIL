<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/board">board</router-link>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    title:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
