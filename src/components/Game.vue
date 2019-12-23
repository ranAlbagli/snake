<template>
  <div :style="{display:'flex', flexDirection:'column',height:'100vh'}">
    <div class="score-container">
      <div class="header">
        <img width="30px" height="30px" src="../assets/apple.png" />
        <div>{{this.snake.length-1}}</div>
      </div>
      <div class="header">
        <img width="30px" height="30px" src="../assets/trophy.png" />
        <div>{{record}}</div>
      </div>
    </div>
    <div class="board">
      <div v-for="(row, index) in board" :key="index">
        <div v-for="(cell, idx) in row" :key="idx">
          <div
             class="cell"
            :style="{'backgroundColor': (cell.row+cell.col)%2===0? '#A9D750': '#A3D14A' }"
            :class="getClass(cell)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeService from "../services/storeService";
import Swal from "sweetalert2";

const SIZE = 25;
const board = [];
for (let row = 0; row < SIZE; row++) {
  const cols = [];
  for (let col = 0; col < SIZE; col++) {
    cols.push({
      row,
      col
    });
  }
  board.push(cols);
}

export default {
  data() {
    return {
      board,
      isGameOver: false,
    };
  },

  created() {
    document.onkeydown = this.onkeydown;
    this.reset();
  },

  computed: {
    direction() {
      return this.$store.getters.direction;
    },
    snake() {
      return this.$store.getters.snake;
    },
    record() {
      return storeService.load();
    },
    food(){
        return this.$store.getters.food;
    }
  },
  methods: {
    reset() {
      this.$store.dispatch({ type: "resetGame" });
      setTimeout(
        () => {
          this.isGameOver = false;
          this.moveSnake();
        },
        2000
      );
    },

    moveSnake() {
      if (this.isGameOver) return;
      const isfoodEaten = this.isfoodEaten();
      let newSnake= JSON.parse(JSON.stringify(this.snake));
      let newSnakeHead = newSnake[newSnake.length - 1];
      newSnakeHead = {
        row: newSnakeHead.row + this.direction.x,
        col: newSnakeHead.col + this.direction.y
      };
      newSnake.push(newSnakeHead);
      if (!isfoodEaten) newSnake.shift();
      this.$store.dispatch({ type: "setSnake", newSnake });
      const newFood = isfoodEaten ? this.getRandomFoodCoords() : this.food;
      this.$store.dispatch({ type: "setFood", newFood });
      if (this.isOutOfBorders() || this.isSelfCollision()) this.gameOver();
      setTimeout(
        () => {
         this.moveSnake();
       }, this.snake.length ? 250 / this.snake.length + 50 : 250);
    },

    getRandomFoodCoords() {
      const newFood = {
        row: Math.floor(Math.random() * SIZE),
        col: Math.floor(Math.random() * SIZE)
      };
      return this.isSnake(newFood) ? this.getRandomFoodCoords() : newFood;
    },

    onkeydown(e) {
    if(e.keyCode<36 ||e.keyCode>40) return 
      e.preventDefault();
      let dir = {};
      switch (e.keyCode) {
        case 38: //up
          if (this.direction.desc === "down") return; // snake looking down
          dir = { x: 0, y: -1, desc: "up" };
          break;
        case 40: //down
          if (this.direction.desc === "up") return; // snake looking up
          dir = { x: 0, y: 1, desc: "down" };
          break;
        case 37: // left
          if (this.direction.desc === "right") return; // snake looking right
          dir = { x: -1, y: 0, desc: "left" };
          break;
        case 39: // right
          if (this.direction.desc === "left") return; // snake looking left
          dir = { x: 1, y: 0, desc: "right" };
          break;
      }
      this.$store.dispatch({ type: "setDirection", dir });
    },

    getClass(cell) {
      if (this.isSnakeHead(cell)) return `head-${this.direction.desc}`; // check if the cell is head
      if (this.isFood(cell)) return "food"; // check if the cell is food
      if (this.isTail(cell)) return "tail"; // check if the cell is food
      if (this.isSnake(cell)) return "body"; // check if the cell is the snake's body
      return;
    },

    isOutOfBorders() {
      const snakeHead = this.snake[this.snake.length - 1];
      return (
        snakeHead.col > SIZE - 1 ||
        snakeHead.col < 0 ||
        snakeHead.row > SIZE - 1 ||
        snakeHead.row < 0
      );
    },

    isfoodEaten() {
      const snakeHead = this.snake[this.snake.length - 1];
      return snakeHead.row === this.food.row && snakeHead.col === this.food.col;
    },

    isSnakeHead(cell) {
      const snakeHead = this.snake[this.snake.length - 1];
      return snakeHead.row === cell.row && snakeHead.col === cell.col;
    },

    isTail(cell) {
      const snakeTail = this.snake[0];
      return snakeTail.row === cell.row && snakeTail.col === cell.col;
    },

    isFood(cell) {
      return this.food.row === cell.row && this.food.col === cell.col;
    },

    isSnake(cell) {
      return this.snake.find(inSnake => inSnake.row === cell.row && inSnake.col === cell.col);
    },

    isSelfCollision() {
      let snake = JSON.parse(JSON.stringify(this.snake));
      let snakeHead = snake[snake.length - 1];
      snake.pop(); // remove the head from the snake array 
      return snake.find(inSnake =>inSnake.row === snakeHead.row && inSnake.col === snakeHead.col);
    },
    gameOver() {
      let isBreakTheRecord = false;
      if (this.snake.length - 1 > storeService.load()) {
        storeService.store(this.snake.length - 1);
        isBreakTheRecord = true;
      }
      this.isGameOver = true;
      Swal.fire({
        width: "300px",
        title: "Game Over",
        text: `You score ${this.snake.length - 1} ${
          isBreakTheRecord ? "and set a new record" : ""
        } `,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Play Again",
        cancelButtonText: "Home"
      }).then(result => {
        if (result.value) this.$emit("reset");
        else this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss">
.board {
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  grid-template-rows: repeat(25, 1fr);
  border: 20px solid #578a37;
  border-top: none;
  margin: 0 auto;
}

.cell {
  width: 20px;
  height: 20px;
}

.head-up {
  z-index: 2;
  background-image: url(../assets/snake-up.png);
  background-size: cover;
}
.head-down {
  z-index: 2;
  background-image: url(../assets/snake-down.png);
  background-size: cover;
}
.head-left {
  z-index: 2;
  background-image: url(../assets/snake-left.png);
  background-size: cover;
}
.head-right {
  z-index: 2;
  background-image: url(../assets/snake-right.png);
  background-size: cover;
}

.body {
  background-image: url(../assets/body.png);
  background-size: cover;
}
.tail {
  background-image: url(../assets/tail.png);
  background-size: cover;
}
.food {
  z-index: 1;
  background-image: url(../assets/apple.png);
  background-size: cover;
  
}
.score-container {
  background-color: #578a37;
  width: 540px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.header {
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70px;
  margin-left: 12px;
}
.record {
  color: white;
  border: 1px solid black;
}

</style>