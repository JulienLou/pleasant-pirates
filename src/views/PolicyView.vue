<template>
  <div :class="templateColorChoice">
    <NavbarSide/>
    <section class="policy navbar-margin">
      <h2>Mentions Légales</h2>

      <div class="container">
        <p>Merci de lire avec attention les différentes modalités d’utilisation du présent site/sous-domaine avant d’y parcourir ses pages. En vous connectant sur ce site/sous-domaine, vous acceptez, sans réserves, les présentes modalités. Aussi, conformément à l’article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l’économie numérique, les responsables du présent site internet Pleasant Pirates www.pleasantpirates.julienlouvet.com sont :</p>
      
        <h3>Éditeur du Site et développement : </h3>
        <p>Julien Louvet</p>
        <p>Site web : <a class="cursor-pointer color-yellow underline" href="https://julienlouvet.com/" target="_blank">www.julienlouvet.com</a></p>

        <h3>Conditions d’utilisation : </h3>
        <p>Ce site/sous-domaine (www.pleasantpirates.julienlouvet.com) est proposé en différents langages web (VueJS3, HTML5, Javascript, CSS, etc…) pour un meilleur confort d’utilisation et un graphisme plus agréable.</p>
        <p>Nous vous recommandons de recourir à des navigateurs modernes comme Firefox, Google Chrome, Edge, Safari etc…</p>

        <h3>Cookies :</h3>
        <p>Le site/sous-domaine www.pleasantpirates.julienlouvet.com peut-être amené à vous demander l’acceptation des cookies pour des besoins de statistiques et d’affichage. Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez. Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et enregistrer des informations . Certaines parties de ce site/sous-domaine ne peuvent être fonctionnelles sans l’acceptation de cookies.</p>

        <h3>Liens hypertextes :</h3>
        <p>Les sites internet de peuvent offrir des liens vers d’autres sites internet ou d’autres ressources disponibles sur Internet. Pleasant Pirates ne dispose d’aucun moyen pour contrôler les sites en connexion avec ses sites internet.</p>
        <p>Pleasant Pirates ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes, et notamment des informations, produits ou services qu’ils proposent, ou de tout usage qui peut être fait de ces éléments. Les risques liés à cette utilisation incombent pleinement à l’internaute, qui doit se conformer à leurs conditions d’utilisation.</p>

        <h3>Limitation contractuelles sur les données : </h3>
        <p>Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l’année, mais peut toutefois contenir des inexactitudes ou des omissions.</p>
        <p>Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler dans la rubrique contact www.julienlouvet.com, en décrivant le problème de la manière la plus précise possible (page posant problème, type d’ordinateur et de navigateur utilisé, …).</p>
        <p>Tout contenu téléchargé se fait aux risques et périls de l’utilisateur et sous sa seule responsabilité. En conséquence, ne saurait être tenu responsable d’un quelconque dommage subi par l’ordinateur de l’utilisateur ou d’une quelconque perte de données consécutives au téléchargement.</p>
        <p>De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour.</p>
        <p>Les liens hypertextes mis en place dans le cadre du présent site internet en direction d’autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de Pleasant Pirates et de son auteur.</p>
        <p>Jeux: Les crédits ou argent gagnés dans les jeux pleasant-pirates sont fictifs.</p>

        <h3>Propriété intellectuelle :</h3>
        <p>Tout le contenu du présent site www.pleasantpirates.julienlouvet.com, incluant, de façon non limitative, les graphismes, textes, animations, logos ainsi que leur mise en forme sont la propriété exclusive de son auteur à l’exception des images, vidéos, sons, gifs et icônes ou contenus appartenant à d’autres sociétés partenaires ou auteurs.</p>

        <h3>Données personnelles :</h3>
        <p>De manière générale, vous n’êtes pas tenu de nous communiquer vos données personnelles lorsque vous visitez notre site/sous-domaine internet www.pleasantpirates.julienlouvet.com.</p>
        <p>Cependant, ce principe comporte certaines exceptions. En effet, pour certains services proposés par notre site/sous-domaine, vous pouvez être amenés à nous communiquer certaines données telles que : votre nom, votre fonction, le nom de votre société, votre adresse électronique, et votre numéro de téléphone. Tel est le cas lorsque vous remplissez le formulaire qui vous est proposé en ligne, dans la rubrique « contact » sur www.julienlouvet.com</p>
        <p>Dans tous les cas, vous pouvez refuser de fournir vos données personnelles. Dans ce cas, vous ne pourrez pas utiliser tout les services du site, notamment celui de solliciter des renseignements, ou de recevoir les lettres d’information.</p>
        <p>Enfin, nous pouvons collecter de manière automatique certaines informations vous concernant lors d’une simple navigation sur notre site internet, notamment : des informations concernant l’utilisation de notre site, comme les zones que vous visitez et les services auxquels vous accédez, votre adresse IP, le type de votre navigateur, vos temps d’accès.</p>
        <p>De telles informations sont utilisées exclusivement à des fins de statistiques internes, de manière à améliorer la qualité des services qui vous sont proposés. Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>
        
      </div>
      
    </section>
    <FooterMain/>
  </div>
</template>

<script>
import NavbarSide from '@/components/NavbarSide.vue'
import FooterMain from "@/components/FooterMain.vue";

export default {
  components:{
    NavbarSide,
    FooterMain
  },
  data(){
    return{
      templateColorChoice: "template-blue",
    }
  },
  mounted(){
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }

  },
}
</script>

<style lang="scss" scoped>
.policy{
  min-height: 100vh;
  text-align: start;
  background: var(--black31);
  padding-bottom: 7rem;
  padding-top: 1.7rem;
  h2{
    color: rgb(237, 221, 148);
    font-size: 2.2em;
    padding: 2rem;
    text-align: center;
  }
  h3{
    color: rgb(148, 208, 237);
    margin-top: 1.7rem;
    font-size: 1.4em;
    padding: .7rem 0;
  }

  p{
    line-height: 1.2em;
    margin: .7em 0;
  }
}
</style>