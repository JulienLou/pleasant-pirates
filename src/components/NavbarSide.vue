<template>
  <div class="navbar-side">
    <div class="arrow-burger">
      <a type="button" class="button-burger" :class="{buttonRotate : buttonBurgerActive}" @click="buttonBurgerActive= !buttonBurgerActive">
        <i class="fa-solid fa-bars"></i>
      </a>
    </div>
    
    <ul class="navbar-nav" :class="{mobilemenu : buttonBurgerActive}">
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/">
          <div class="icon-container">
            <i class="fa-solid fa-house"></i>
          </div>
          <div class="link-text">Accueil</div>
        </router-link>
      </li>
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/MemoryGame">
          <div class="icon-container">
            <i class="fa-regular fa-chess-queen"></i>
          </div>
          <div class="link-text">Memory</div>
        </router-link>
      </li>
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/SlideGame">
          <div class="icon-container">
            <i class="fa-regular fa-chess-rook"></i>
          </div>
          <div class="link-text">Slide</div>
        </router-link>
      </li>
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/JackpotGame">
          <div class="icon-container">
            <i class="fa-regular fa-chess-knight"></i>
          </div>
          <div class="link-text">Jackpot</div>
        </router-link>
      </li>
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/Scores">
          <div class="icon-container">
            <i class="fa-solid fa-medal"></i>
          </div>
          <div class="link-text">Scores</div>
        </router-link>
      </li>
      <li class="nav-item unselectable cursor-pointer">
        <router-link class="nav-link" to="/About">
          <div class="icon-container">
            <i class="fa-solid fa-id-card-clip"></i>
          </div>
          <div class="link-text">À propos</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NabvarSide",
  data(){
    return{
      buttonBurgerActive: false,
      templateColorChoice: "template-blue",
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-side {
  width: 5rem;
  height: 100vh;
  position: fixed;
  transition: .3s ease-in-out;
  overflow: hidden;
  z-index: 101;

  .arrow-burger{
    display: none;
    margin-right: 1rem;
  }

  .navbar-nav {
    display: flex;
    flex-direction: column;
    height: 100%;

    .nav-item {

      .router-link-exact-active {
        color: var(--yellowpirates) !important;
      }

      .nav-link {
        display: flex;
        transition: .2s ease-in-out;

        .icon-container{
          width: 3rem;
          
          i {
            font-size: 2rem;
            margin: 0 1rem;
            padding: .8rem 0;
            width: 100%;
          }
        }

        .link-text{
          display: none;
          margin: auto 1.5rem;
          white-space: nowrap;
        }
      }

      .nav-link:hover{
        background: rgba(0, 0, 0, 0.5);
        .link-text, i, a{
          color: var(--white);
        }
      }
    }

    .nav-item:nth-child(5) {
      margin-top: auto;
    }
  }
}

.navbar-side:hover{
  width: 16rem;

  .navbar-nav .nav-item .nav-link .link-text{
    display: block;
  }
}

@media only screen and (max-width: 768px) {
  .navbar-side {
    top: 0;
    width: 100vw;
    height: fit-content;
    
    transition: .3s;

    .arrow-burger{
      display: flex;
      justify-content: flex-end;

      .button-burger{
        rotate: 0deg;
        transition: .3s;
      }
      .button-burger.buttonRotate{
        rotate: 180deg;
      }
      a{
        margin: 5px 20px;
        i{
          font-size: 2rem;
        }
      }
    }

    .navbar-nav .nav-item{
      display: none;
    }

    .navbar-nav.mobilemenu .nav-item{
      display: block;
    }

    .navbar-nav .nav-item .nav-link .link-text{
      display: block;
    }

  }

  .navbar-side:hover{
    width: 100vw;
  }

}
</style>