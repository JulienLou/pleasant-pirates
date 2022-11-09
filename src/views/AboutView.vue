<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div :class="templateColorChoice">
    <NavbarSide/>
    <div class="navbar-margin">
      <section class="about">

        <article class="container">
          <div class="about-article">

            <h2>À propos du site</h2>
            <div class="author">
              <img src="../assets/img/wallpaper/author.jpg" alt="photo de l'auteur">
              <p>Bonjour amis pirates et flibustiers ! Je suis Julien Louvet, développeur web. J'ai créé Pleasant Pirates comme site de démonstration en tant que développeur. Mon code est open source et visible sur Github.</p>
              <div class="d-flex justify-content-center"><a class="cursor-pointer" href="https://julienlouvet.com/" target="_blank">Visite : www.julienlouvet.com</a></div>
            </div>
            <div class="myarticles">
              <article>
                <h3>Dans quel but ?</h3>
                <p>Ce site a été développé dans un but experimental et démonstratif, en effet cette application et ses mini-jeux ont été realisés après une formation sur le framework JavaScript "VueJS3".</p>
                <h3>Comment ?</h3>
                <p>L'application complète et les jeux ont été codés "from scratch", c'est à dire à partir de zéro. Dans un soucis de simplicité, aucune connexion en base de donnée n'est    requise et par ce fait, c'est le localhost (stockage du navigateur) qui se charge d'enregistrer vos scores durant la session.</p>
              </article>
              <article>
                <h3>Pourquoi VueJS3 ?</h3>
                <p>Les raisons principales pour lesquelles j'ai choisi VueJS3 sont pour sa performance, sa reactivité et sa facilité de prise en main, il faut cependant connaître les bases d’HTML, CSS et JavaScript pour développer avec VueJS3.</p>
                <h3>Des nouveautés prévues ?</h3>
                <p>Ce projet est maintenu à jour régulièrement. De nouvelles fonctionnalités et jeux sont en cours de développement.</p>
              </article>
            </div>
          </div>

          
        </article>
      </section>
    </div>
    <FooterMain/>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import NavbarSide from '@/components/NavbarSide.vue'
import FooterMain from "@/components/FooterMain.vue";

export default {
  name: "AboutView",
  components:{
    SpinnerLoader,
    NavbarSide,
    FooterMain
  },
  data(){
    return{
      isLoaded: false,
      templateColorChoice: "template-blue",
    }
  },
  mounted(){
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }

    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 50);

  },
}
</script>

<style lang="scss" scoped>
.about{
  background: url('../assets/img/wallpaper/ppw3.jpg') no-repeat center fixed;
  background-size: cover;
  min-height: 100vh;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  text-align: start;


  .about-article{
    background: rgba(255, 255, 255, 0.7);
    color: rgb(87, 87, 87);
    padding: 2rem;
    border-radius: 15px;
    margin: 5rem 0;

    h2{
      color: rgb(40, 84, 132);
      font-size: 2em;
      font-weight: bold;
      padding: 2rem;
      text-align: center;
    }

    .author{
      position: relative;
      background: linear-gradient(rgb(55, 118, 165), rgb(24, 64, 99));
      color: white;
      padding: 2rem 4rem;
      margin: 1rem auto;
      border-radius: 12px;
      max-width: 700px;

      img{
        position: absolute;
        top: -20px;
        left: -25px;
        width: 72px;
        border-radius: 50%;
        border: 6px solid rgb(112, 157, 192);
      }

      p{
        line-height: 1.2em;
        margin: .7em 0;
      }
    }

    .myarticles{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      article{
        background: linear-gradient(rgb(255, 255, 255), rgb(193, 201, 213));
        border-radius: 12px;
        padding: 2rem;
        margin: 1rem;
        max-width: 450px;

        h3{
          font-size: 1.1em;
          font-weight: bold;
          padding-top: .7rem;
          color: rgb(84, 122, 166);
        }
        p{
          line-height: 1.2em;
          margin: .7em 0;
        }
      }
    }
  
  }

}

@media screen and (max-width: 768px) {
  .about{
    .about-article{
      padding: .5rem;

      .author{
      padding: 2rem 1.5rem;

      img{
        top: -38px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
      }
    }
    }
  }
}
</style>
