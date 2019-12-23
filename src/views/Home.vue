<template>
  <div class="hero-container">
    <p class="title">Snake game</p>
    <div class="hero"></div>
     <div class="button">
    <router-link class="btn btn-white" to="/snake">Play</router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style lang="scss">

.hero {
  background-color: beige;
  background-image: url(../assets/snake-hero.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 40%;
  height: 50vh;
  margin-left:8%;
   animation: moveInLeft 1s ease-out 
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title{
  color: #10817E;
  text-transform: uppercase;
  font-size: 114px;
   animation: moveInRight 1s ease-out 
}



.btn:link,
.btn:visited {
  margin-top: 10px;
 text-transform: uppercase;
 text-decoration: none;
 padding: 15px 40px;
 display: inline-block;
 border-radius: 100px;
 transition: all .2s
}
.btn:hover{
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2)
}

.btn:active{
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2)
}

.btn-white{
    background-color: #10817E;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

@keyframes moveInLeft{
    0%{
        opacity: 0;
        transform: translateX(-100px)
    }
    80%{
        transform: translateX(10px)
        
    }
    100%{
        opacity: 1;
        transform: translate(0)

    }
}
@keyframes moveInRight{
    0%{
        opacity: 0;
        transform: translateX(100px)
    }
    80%{
        transform: translateX(-10px)
        
    }
    100%{
        opacity: 1;
        transform: translate(0)

    }
}

</style>


