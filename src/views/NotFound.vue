<template>
  <section class="not-found">
    <div class="message-container">
      <img src="@/assets/img/wallpaper/sir404.png" alt="Captain 404">
      <h2 class="text-shadow">404</h2>
      <p>Oups ! vous vous êtes perdu dans la jungle ?</p>
      <p>Il semblerait que cette page n'existe pas...</p>
      <p class="error">Erreur 404</p>
      <router-link to="/"><div class="btn-custom btn-solid-green cursor-pointer">Retour vers Plesant Pirates</div></router-link>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.not-found{
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/wallpaper/notfound.jpg") no-repeat center fixed;
  min-height: 100vh;
  background-size: cover;
  margin-top: 0;

  .message-container{
    position: relative;
    background: rgb(255, 255, 255);
    border-radius: 15px;
    width: fit-content;
    padding: 1rem 2rem;
    color: var(--grey65);

    img{
      position: absolute;
      left: -42px;
      top: 60px;
      width: 80px;
    }

    h2{
      font-size: 3.4rem;
      padding: .3rem;
      font-family: 'Pirata One', serif;
      color: rgb(255, 236, 138);
      
    }

    p{
      padding: .7rem;
    }

    .error{
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: .7rem;
      padding: 0;
      color: var(--grey90)
    }

    div{
      margin-top: 1rem;
      margin-bottom: .5rem;
    }
    
  }

  @media only screen and (max-width: 460px) {
  .message-container{
    width: 240px;
    img {
      display: none;
    }
    div{
      font-size: .8rem !important;
    }
  }
}
}
</style>