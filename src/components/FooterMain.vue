<template>
  <footer>
    <div class="highfooter">
      <router-link class="nav-link" to="/">
        <img src="../assets/img/wallpaper/logoP2.png" alt="Logo de Pleasant Pirates">
      </router-link>
    </div>
    <div class="lowfooter">
      <p>Pleasant Pirates © Copyright {{ yearCopyright }} - <router-link to="/Policy" class="cursor-pointer">Mentions Légales</router-link></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterMain",

  data(){
    return{
      templateColorChoice: "template-blue",
      yearCopyright: 2022,
    }
  },

  mounted(){
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }

    this.getTheActualYear();
  },

  methods : {
    getTheActualYear(){
      let date = new Date;
      this.yearCopyright = date.getFullYear();
    }
  }
}
</script>

<style lang="scss">
.template-blue footer{
  background: linear-gradient(rgb(19, 55, 100), rgb(3, 9, 15));
}

.template-dark footer{
  background: linear-gradient(rgb(64, 64, 64), rgb(22, 22, 22));
}

footer{
  margin-top: 0 !important;

  .highfooter{
    padding: .1em .5em;
    border-top: 1px solid var(--grey99);
    img{
      width: 70px;
      cursor: pointer;
    }

  }
  .lowfooter{
    font-size: .8em;
    padding: .5em;
    background: rgba(0, 0, 0, .6);
  }

}
</style>