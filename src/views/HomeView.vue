<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div class="home">
    <video autoplay="autoplay" muted="" loop src="../assets/img/wallpaper/shipday-animated1.mp4"></video>

    <div class="black-filter">

      <!-- <button class="btn btn-success px-5" @click="toggleModaleHome">toggleModaleHome</button> -->
      <ModaleHome :reveleModaleHome="reveleModaleHome" :toggleModaleHome="toggleModaleHome" />

      <div>
        <img src="../assets/img/wallpaper/logoP2.png" alt="logo pirates" class="avengers-logo">
        <div class="banner">
          <div class="banner-text text-shadow">
            <div class="box b1">Pleasant Pirates</div>
            <div class="box b2">Jeux de logique</div>
            <div class="box b3">Jeux de mémoire</div>
          </div>
        </div>
        
        
        <div class="game-cards-container">

          <Tilt :options="optionsTilt" class="tiltMeMore"><!-- parallax="true" -->
          <div class="game-card card1">
            <div class="icon-card">
              <i class="fa-regular fa-chess-queen"></i>
            </div>
            <div class="card-content">
              <h2>01</h2>
              <h3>Memory</h3>
              <p>Formez des paires de cartes en utilisant votre mémoire</p>
              <router-link to="/MemoryGame" class="routerlink">
                <button class="btn-flat">Jouer</button>
              </router-link>
            </div>
          </div>
          </Tilt>

          <Tilt :options="optionsTilt" class="tiltMeMore">
          <div class="game-card card2">
            <div class="icon-card">
              <i class="fa-regular fa-chess-rook"></i>
            </div>
            <div class="card-content">
              <h2>02</h2>
              <h3>Slide</h3>
              <p>Glissez et placez les pièces de l'image dans le bon ordre</p>
              <router-link to="/SlideGame" class="routerlink">
                <button class="btn-flat">Jouer</button>
              </router-link>
            </div>
          </div>
          </Tilt>

          <Tilt :options="optionsTilt" class="tiltMeMore">
          <div class="game-card card3">
            <div class="icon-card">
              <i class="fa-regular fa-chess-knight"></i>
            </div>
            <div class="card-content">
              <h2>03</h2>
              <h3>Jackpot</h3>
              <p>Tentez votre chance sur cette machine à sous en jouant vos pièces d'or</p>
              <router-link to="/JackpotGame" class="routerlink">
                <button class="btn-flat">Jouer</button>
              </router-link>
            </div>
          </div>
          </Tilt>

          <Tilt :options="optionsTilt" class="tiltMeMore">
          <div class="game-card card4">
            <div class="icon-card">
              <i class="fa-solid fa-medal"></i>
            </div>
            <div class="card-content">
              <h2>04</h2>
              <h3>Scores</h3>
              <p>La page des scores et des statistiques de jeu</p>
              <router-link to="/Scores" class="routerlink">
                <button class="btn-flat">Aller</button>
              </router-link>
            </div>
          </div>
          </Tilt>

        </div><!--/game-cards-container-->

      </div>

    </div>
    <div :class="templateColorChoice">
      <FooterMain/>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import ModaleHome from "@/components/ModaleHome.vue";
import FooterMain from "@/components/FooterMain.vue";
import VanillaTiltVue from "vanilla-tilt-vue";

export default {
  name: 'HomeView',
  components: {
    SpinnerLoader,
    ModaleHome,
    FooterMain,
    Tilt : VanillaTiltVue
  },
  data(){
    return{
      isLoaded: false,
      reveleModaleHome: true,
      templateColorChoice: "template-blue",
      optionsTilt : {glare : true, "max-glare" : 1}
    }
  },
  mounted(){
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }

    // Modal Home Welcome
    if (localStorage.getItem("showModaleHome")) {
      this.reveleModaleHome = JSON.parse(localStorage.getItem("showModaleHome"));
    }

    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 50);

  },
  methods: {
    toggleModaleHome(){
      this.reveleModaleHome = !this.reveleModaleHome;
      this.$store.dispatch('setShowModaleHome', false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 1;
    overflow: hidden;

    video{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 100%;
      min-height: 100%;
      z-index: -99;
    }

    .black-filter{
      min-height: 100vh;
      background: radial-gradient(transparent 40%, rgba(0, 0, 0, .7) 90%);

      .div-title{
        text-shadow: 0 0 1px black,
        0 0 2px black,
        0 0 5px black,
        0 0 7px black,
        0 0 10px black,
        0 0 15px black,
        0 0 20px black,
        0 0 40px black;
        color: white;
      }

      .avengers-logo{
        margin-top: 60px;
        width: 35%;
        z-index: 200;
      }

      .banner{
        font-family: 'Cinzel', sans-serif;
        color: var(--white);
        
        .banner-text{
          position: relative;
          width: 300px;
          height: 60px;
          margin: 0 auto;
          padding: .5rem;

          .box{
            position: absolute;
            opacity: 0;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            font-size: 2em;
            font-weight: bold;
          }
          .b1{
            animation: 12s anibanner1 infinite;
          }
          .b2{
            animation: 12s anibanner2 infinite;
          }
          .b3{
            animation: 12s anibanner3 infinite;
          }
        }
      }

      .game-cards-container{
        margin-top: 3em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 20px;

       .tiltMeMore{
        border-radius: 15px;
        margin: 20px;
        overflow: hidden;
       } 

        .game-card{
          position: relative;
          font-family: 'Cinzel', sans-serif;
          font-weight: bold;
          max-width: 210px;
          height: 260px;
          box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.95);
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.5);
          border-left: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(2px);
          overflow: hidden;
          z-index: 1;
          
          .icon-card{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: .5s;
            i{
              font-size: 6em;
              transition: .5s;
            }
          }

          .card-content{
            padding: 15px;
            transition: .5s;
            transform: translateY(100px);
            opacity: 0;


            h2{
              position: absolute;
              top: -70px;
              right: 2px;
              font-family: Tahoma, sans-serif;
              font-size: 9em;
              text-transform: uppercase;
              font-weight: 900;
              color: rgba(255, 255, 255, 0.3);
              pointer-events: none;
            }

            h3{
              font-size: 1.8em;
              color: var(--white);
              text-shadow: 0 0 2px var(--black);
            }

            p{
              font-size: .9em;
              color: var(--white);
              font-family: 'Rubik', serif;
              font-weight: 600;
              margin: 20px 0;
              text-shadow: 0 0 2px var(--black);
              line-height: .9rem;
            }

            button{
              margin-top: 15px;
              font-weight: bold;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              border-radius: 50px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
              color: var(--white);
              padding: 5px 30px;
              border: 1px solid rgba(255, 255, 255, 0.3);
              background-color: transparent;
              font-size: 1rem;
            }
            button:hover{
              background-color: rgba(255, 255, 255, 0.566);
              border: 1px solid var(--white);
              color: var(--grey65);
            }
          }

          
        }

        .card1{
          background: rgba(95, 177, 221, 0.5);
        }

        .card2{
          background: rgba(216, 87, 124, 0.5);
        }

        .card3{
          background: rgba(203, 181, 79, 0.5);
        }

        .card4{
          background: rgba(197, 197, 197, 0.5);
        }

        .game-card:hover{
          .icon-card{
            top: 70%;
            i{
              font-size: 11em;
              color: rgba(255, 255, 255, 0.3);
              transition: .5s;
            }
          }
          .card-content{
            transform: translateY(0px);
            opacity: 1;
          }
        } 
      }
    }
  }

@keyframes anibanner1{
  0%{opacity: 0;}
  8%{opacity: 1;}
  25%{opacity: 1;}
  33%{opacity: 0;}
}
@keyframes anibanner2{
  33%{opacity: 0;}
  41%{opacity: 1;}
  58%{opacity: 1;}
  66%{opacity: 0;}
}
@keyframes anibanner3{
  66%{opacity: 0;}
  74%{opacity: 1;}
  92%{opacity: 1;}
  100%{opacity: 0;}
}

@media only screen and (max-width: 992px) {
  .home .black-filter .game-cards-container{
    .game-card{
      max-width: 200px;
      height: 250px;

      .icon-card{
        top: 70%;
        i{
          font-size: 9em;
          color: rgba(255, 255, 255, 0.1);
        }
      }
      .card-content{
        transform: translateY(0px);
        opacity: 1;

        h2{
          font-size: 8em;
        }
      }
    }
  }  
}
</style>
