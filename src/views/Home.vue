<template>
<div class="banner">
  <img src="/src/assets/Rectangle 1072.png" alt="">
  <div class="info">
     <h1>STAR WARS</h1>
  <p>Star Wars é uma fantasia que combina romance, drama, <br> humor e a tradicional batalha entre bem e mal. No centro <br>da história está um conflito político: de um lado, um império <br>tirano que domina a galáxia; do outro, um grupo rebelde<br>que luta pela liberdade e pela queda desse regime opressor.</p>
  </div>
</div>
<div class="emalta">
<h2>Em alta</h2>
<img src="/src/assets/image 5.png" alt="">
</div>
<div class="recomendados"></div>
 
</template>
<style scoped>
.banner {
  background: url(/src/assets/force_feat\ 1.png);
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.info {
  margin-top: 15vw;
  margin-left: 3vw;
  color: white;
}
.info h1 {
  color: white;
  font-size: 3vw;
}
.banner {
  display: flex;
}

.banner img {
  height: 28vw;
  margin-left: 9vw;
  margin-top: 14vw;
}
.emalta {
  background-color: black;
  display: flex;
}
.emalta h2{
  font-size: 2.8vw;
  color: white;
  margin-left: 9vw;
}
.emalta img {
  width: 7vw;
}
</style>