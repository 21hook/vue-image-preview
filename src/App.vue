<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>

    <button @click="dialogVisible = !dialogVisible"></button>
    <!-- nest -->
    <img-preview
      :img-src="imgURL"
      :current-index="0"
      :visible.snyc="dialogVisible"></img-preview><!-- sending msg during crating VD; continue the creation after the child component returns -->
  </div>
</template>

<script>
import ImgPreview from './ImgPreview'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // import CSS using webpack; CSS in Vue


export default {
  name: 'app',
  components: {ImgPreview}, // component chain
  created() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        const imgURL = [];

        res.data.forEach(elt => imgURL.push(elt.url));
        this.imgURL = imgURL
      })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialogVisible: true,
      imgURL: [],
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
