import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function initialState(){
  return{
    food: {
      row: Math.floor(Math.random() * 20),
      col: Math.floor(Math.random() * 20)
    },
    direction: {
      x: 1, 
      y: 0,
      desc:'right'
    },
    snake:[
    {
      row:0,
      col:0
    }
    ]
  }
  }



export default new Vuex.Store({
  state: initialState,
  getters:{
  direction(state) {
    return state.direction;
  },
  snake(state){
    return state.snake
  },
  food(state){
    return state.food
  }
  },
  mutations: {
    setDirection(state,{dir}){
      state.direction=dir
    },
    setSnake(state,{newSnake}){
      state.snake=newSnake;
    },
    setFood(state,{newFood}){
      state.food=newFood;
    },
    resetGame(state){
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  actions: {
    setDirection(context,{dir}){
      context.commit({ type: 'setDirection', dir })
    },
    setSnake(context,{newSnake}){
      context.commit({ type: 'setSnake', newSnake })
    },
    setFood(context,{newFood}){
      context.commit({ type: 'setFood', newFood })
    },
    resetGame(context){
      context.commit({type:'resetGame'})
    }
  },
})
