<template>
  <div>
    <Game @reset="reset" :key="myKey"></Game>
  </div>
</template>

<script>
import Game from '../components/Game'
export default {
  data(){
    return{
       myKey:0
    }
  },
  methods:{
    reset(){
      this.myKey ++
    }
  },
  components:{
    Game
  }
}
</script>