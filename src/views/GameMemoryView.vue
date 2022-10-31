<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div :class="templateColorChoice">
    <div id="memory-game">
      
      <div class="btn-options-container">
        <button class="btn-option-set unselectable btn-custom btn-solid-white btn-small" @click="this.deleteOptionsVisible = false; toggleModale();"><i class="fa-solid fa-gear rotating"></i> Options</button>
      </div>
      <NavbarSide/>
      
      <div class="navbar-margin m100vh" :class="templateColorChoice">
        <video autoplay="autoplay" muted="" loop src="../assets/img/wallpaper/shipbeach-animated1.mp4"></video>
        <div class="selector">
          <div class="d-flex justify-content-start flex-wrap">
            <div>
              <label>Niveau</label>
              <div class="select">
                <select class="form-select form-select-sm" v-model="level" style="font-family: 'Rubik', sans-serif">
                  <option value="6" selected>Moussaillon</option>
                  <option value="9">Marin</option>
                  <option value="12">Boucanier</option>
                  <option value="16">Flibustier</option>
                  <option value="20">Capitaine</option>
                  <option value="24">Démon</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p class="d-flex align-items-center"><i class="fa-solid fa-coins mx-1"></i>{{ this.totalCoins }}</p>
          </div>
        </div>
        
        <div class="container game-container">
          <div class="config">
            <div class="element-config-container">
              <span class="cell-score" v-if="this.maxPairesSelect == 6">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL6 >=0 ? commify(this.bestScoreL6) : 0 }}</span> pts.</span>
              <span class="cell-score" v-else-if="this.maxPairesSelect == 9">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL9 >=0 ? commify(this.bestScoreL9) : 0 }}</span> pts.</span>
              <span class="cell-score" v-else-if="this.maxPairesSelect == 12">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL12 >=0 ? commify(this.bestScoreL12) : 0 }}</span> pts.</span>
              <span class="cell-score" v-else-if="this.maxPairesSelect == 16">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL16 >=0 ? commify(this.bestScoreL16) : 0 }}</span> pts.</span>
              <span class="cell-score" v-else-if="this.maxPairesSelect == 20">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL20 >=0 ? commify(this.bestScoreL20) : 0 }}</span> pts.</span>
              <span class="cell-score" v-else-if="this.maxPairesSelect == 24">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL24 >=0 ? commify(this.bestScoreL24) : 0 }}</span> pts.</span>
              <span class="cell-score">Paires trouvées : {{ pairesTrouvee }}</span>
              <span class="cell-score">Tentatives : {{ nbTentatives }}</span>
              <span class="cell-score">Temps : {{ timestamp }}</span>
            </div>
            <div>
              <button
                disabled
                class="btn-custom btn-solid-grey btn-small"
                id="restartGame"
                @click="restartGame"
              >
                Rejouer
              </button>
            </div>
          </div>
          <div class="cards">
            <!-- Fireworks -->
            <div class="fireworks animate__animated animate__zoomInUp" style="display: none">
              <div class="bravo-container text-shadow">
                <div class="bravo">
                  <div v-if="points > 0">
                    <p>Félicitations !</p>
                    <div class="fliping-coins-container">
                      <FlipingCoins :lgc="this.lastGameCoins"/>
                    </div>
                    <p v-if="newRecord" class="animate__animated animate__pulse animate__infinite infinite">NOUVEAU RECORD !</p>
                    <div class="d-flex justify-content-center align-items-center">
                      <span class="b-score">Score :</span>
                      <span class="b-point">{{ commify(points) }} pts.</span>
                    </div>
                  </div>
                  <div v-else>
                    <p>Arf, désolé...</p>
                    <p>Vous n'avez gagné aucun points.</p>
                  </div>

                  <button
                    type="button"
                    class="btn-custom btn-solid-green"
                    @click="userWin"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </div>

            <transition
              enter-active-class="animate__animated animate__bounceInUp"
              leave-active-class="animate__animated animate__bounceOutUp"
              id="animation-bonus-prime"
            >
              <div v-if="anime">
                <div class="textanime">+{{ bonusPrime }}</div>
              </div>
            </transition>

            <!-- rotate -->
            <div
              class="card"
              v-for="(el, i) in pairesImages"
              :key="i"
              :data-id="el.id"
              :data-type="el.datas.type"
              @click.self="rotate"
              
            >
              <div class="card__front">
                <div class="card-body">
                  <div class="img-container">
                    <img
                      :src="require(`@/${el.datas.imgPath}`)"
                      :width="this.imgCardWidth" 
                      alt="image memory"
                      :class="el.id"
                    />
                    <div v-if="activeSuperherosName" class="superhero-name">
                      {{ el.datas.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="bloc-modale" v-show="this.revele">
            <div class="overlay" @click="toggleModale"></div>
            <div class="modale">

              <div class="modale-head">
                <h2><i class="fa-solid fa-gear rotating"></i> Options</h2>
                <a class="btn-close-modale bold mx-1" @click="toggleModale"><i class="fa-regular fa-circle-xmark"></i></a>
              </div>
              
              <div class="modale-body text-secondary">
                <section class="set-options">
                  
                  <div class="options-settings">
                    <div class="d-flex align-items-center justify-content-center">
                      <input
                          class="p-checkbox"
                          type="checkbox"
                          id="active-name"
                          v-model="activeSuperherosName"
                        />
                        <label class="form-check-label" for="active-name">
                          Afficher les noms
                        </label>
                    </div>
                  </div>

                  <div class="options-settings">
                    <div>
                      <label class="form-check-label" for="active-name">
                        Volume des effets sonores
                      </label>
                      <SetVolumeFx @valueVolFx="updateVolumeFx" />
                    </div>
                  </div>

                  <div class="options-settings"  :class="{optionssettingsactivated : optionsVisible}">
                    <div class="form-check mx-4">
                      <div class="d-flex justify-content-center align-items-center">
                        <label class="form-check-label pe-2">Images {{ imgCardWidth }} px</label>
                        <button class="btn-round-resize-img bold" id="btnImgWidthMore" @click="setImgWidth(5)"><i class="fa-solid fa-circle-plus"></i></button>
                        <button class="btn-round-resize-img bold" id="btnImgWidthLess" @click="setImgWidth(-5)"><i class="fa-solid fa-circle-minus"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="options-settings">
                    <label class="mb-1">Couleurs</label>
                    <div class="select m-auto" style="font-family: 'Rubik', sans-serif">
                      <select class="form-select" v-model="templateColorChoice">
                        <option value="template-blue">Bleu</option>
                        <option value="template-dark">Orange Dark</option>
                      </select>
                    </div>
                  </div>

                  <div class="options-settings">
                    <label class="mb-1 mx-2">Effacer tous vos meilleurs scores du Memory Game</label>
                    <div class="m-1">
                      <div v-if="this.deleteOptionsVisible == false">
                        <button class="btn-custom btn-solid-white btn-small" @click="this.deleteOptionsVisible = !this.deleteOptionsVisible">Effacer</button>
                      </div>
                      <div v-else>
                        <span class="text08 pe-2">Vous êtes sur le point d'effacer vos records, continuer ?</span>
                        <button class="btn-custom btn-solid-white btn-small mx-1" @click="deleteBestsScoresMemory(); this.deleteOptionsVisible = !this.deleteOptionsVisible">Oui, j'efface</button>
                        <button class="btn-custom btn-solid-white btn-small mx-1" @click="this.deleteOptionsVisible = !this.deleteOptionsVisible">Retour</button>
                      </div>
                    </div>
                  </div>

                </section>
              </div>

            </div>
          </div>
          
        </div><!-- /game-container -->
      </div>
      <FooterMain/>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import NavbarSide from "@/components/NavbarSide.vue";
import json from '@/json/piratesitems.json';
import FlipingCoins from '@/components/FlipingCoins.vue';
import SetVolumeFx from '@/components/SetVolumeFx.vue';
import FooterMain from "@/components/FooterMain.vue";

export default {
  name: "GameMemoryView",
  components: {
    SpinnerLoader,
    NavbarSide,
    FlipingCoins,
    SetVolumeFx,
    FooterMain
  },

  data() {
    return {
      isLoaded: false,
      revele: false,
      array: json,
      templateColorChoice: "template-blue",
      optionsVisible: false,
      deleteOptionsVisible: false,
      rotaCardWidth: 15,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      imgCardWidth: '',
      pairesImages: [],
      paires: [],
      nbTentatives: 0,
      pairesTrouvee: 0,
      timestamp: 0,
      timer: null,
      startTimer: false,
      timerPoints: 0,
      maxPairesSelect: 6,
      points: 0,
      totalCoins: 0,
      lastGameCoins: 0,
      level: 6,
      activeSuperherosName: true,
      anime: false,
      bonusPrime: 1,
      newRecord: false,
      nbPlayedGame: 0,
      bestsScores: {},
      bestScoreL6: 0,
      bestScoreL9: 0,
      bestScoreL12: 0,
      bestScoreL16: 0,
      bestScoreL20: 0,
      bestScoreL24: 0,
      valueVolumeFx: 10,
      soundCard: require("../assets/sounds/memory/card1.mp3"),
      soundCardPair: require("../assets/sounds/memory/cardpair.mp3"),
      soundWin: require("../assets/sounds/global/userwin1.mp3"),
      soundReset: require("../assets/sounds/global/resetgame.mp3"),
      soundBonusPrime: require("../assets/sounds/memory/bonusprime.mp3"),
      
    };
  },

  watch: {
    startTimer() {
      if (this.startTimer) {
        let minutes = 0;
        let secondes = 0;
        this.timer = setInterval(() => {
          secondes++;
          this.timerPoints++;
          if (secondes < 10) {
            secondes = "0" + secondes;
          }
          if (secondes >= 60) {
            secondes = 0;
            minutes++;
          }
          this.timestamp = minutes + "min" + " " + (secondes == 0 ? '00' : secondes) + "s.";
        }, 1000);
      }
    },

    level() {
      if (this.level == 9) { 
        this.maxPairesSelect = 9;
        if(this.windowWidth <= 360){
          this.imgCardWidth = 136;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/2.5).toFixed(0);
        }else if(this.windowWidth >= 1920){
          this.imgCardWidth = 170;
        }else{
          this.imgCardWidth = 170;
        }
        this.userWin();

      } else if (this.level == 12) { 
        this.maxPairesSelect = 12;
        if(this.windowWidth <= 360){
          this.imgCardWidth = 136;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/2.5).toFixed(0);
        }else if(this.windowWidth >= 1920){
          this.imgCardWidth = 170;
        }else{
          this.imgCardWidth = 140;
        }
        this.userWin();

      } else if (this.level == 16) { 
        this.maxPairesSelect = 16;
        if(this.windowWidth <= 360){
          this.imgCardWidth = 84;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/3.7).toFixed(0);
        }else if(this.windowWidth >= 1920){
          this.imgCardWidth = 142;
        }else{
          this.imgCardWidth = 140;
        }
        this.userWin();

      } else if (this.level == 20) { 
        this.maxPairesSelect = 20;
         if(this.windowWidth <= 360){
          this.imgCardWidth = 84;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/3.7).toFixed(0);
        }else if(this.windowWidth >= 1920){
          this.imgCardWidth = 142;
        }else{
          this.imgCardWidth = 140;
        }
        this.userWin();

      } else if (this.level == 24) { 
        this.maxPairesSelect = 24;
         if(this.windowWidth <= 360){
          this.imgCardWidth = 84;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/3.7).toFixed(0);
        }else{
          this.imgCardWidth = 127;
        }
        this.userWin();

      } else {
        this.maxPairesSelect = 6; 
        if(this.windowWidth <= 360){
          this.imgCardWidth = 136;
        }else if(this.windowWidth <= 412 && this.windowWidth > 360){
          this.imgCardWidth = Math.floor(this.windowWidth/2.5).toFixed(0);
        }else if(this.windowWidth >= 1220 && this.windowHeight >= 920){
          this.imgCardWidth = 245;
        }else{
          this.imgCardWidth = 170;
        }
        this.userWin();
      }
    },

    templateColorChoice() {
      this.$store.dispatch('setUserThemeColor', this.templateColorChoice );
    },
  },

  methods: {

    updateVolumeFx(valueFromSetVolumeFxComponent){
      this.valueVolumeFx = valueFromSetVolumeFxComponent;
    },

    toggleModale(){
      this.revele = !this.revele;
    },

    setImgWidth(theWidth) {
      const btnMore = document.querySelector("#btnImgWidthMore");
      const btnLess = document.querySelector("#btnImgWidthLess");
      if (this.imgCardWidth >= 280) {
        btnMore.setAttribute("disabled", "");
      } else if (this.imgCardWidth <= 70) {
        btnLess.setAttribute("disabled", "");
      } else {
        btnMore.removeAttribute("disabled");
        btnLess.removeAttribute("disabled");
      }
      this.imgCardWidth += theWidth;
    },

    animeBonus() {
      this.anime = !this.anime;
      setTimeout(() => {
        this.anime = !this.anime;
      }, 900);
    },

    arrayRandomize(a) {
      let j = 0;
      let valI = "";
      let valJ = valI;
      let l = a.length - 1;
      while (l > -1) {
        j = Math.floor(Math.random() * l);
        valI = a[l];
        valJ = a[j];
        a[l] = valJ;
        a[j] = valI;
        l = l - 1;
      }
      return a;
    },

    createsPairsAndRandomize() {
      this.arrayRandomize(this.array.allItems);
      let createPaires = [];
      for (let i = 0; i < this.maxPairesSelect; i++) {
        createPaires.push(
          { id: i, datas: this.array.allItems[i] },
          { id: i, datas: this.array.allItems[i] }
        );
      }
      this.pairesImages = createPaires.sort(() => 0.5 - Math.random());
      this.arrayRandomize(this.pairesImages);
    },

    playSound(soundFx){
      const myAudio = new Audio(soundFx);
      myAudio.volume = this.valueVolumeFx/10;
      myAudio.play();
    },

    rotate(e) {
      this.startTimer = true;
      document.querySelector("#restartGame").removeAttribute("disabled");
      this.playSound(this.soundCard);

      if (this.paires.length < 2) {
        e.target.classList.toggle("rotate");
        this.paires.push(e.target);
        
        if (this.paires.length === 2) {
          this.nbTentatives++;
          if (this.paires[0].dataset.id === this.paires[1].dataset.id) {
            this.playSound(this.soundCardPair);

            // Points
            if (this.paires[0].dataset.type == "infinitystone") {
              this.bonusPrime = 1000;
              this.points += this.bonusPrime;
              this.animeBonus();
              this.playSound(this.soundBonusPrime);
            }
            if (this.paires[0].dataset.type == "artefact") {
              this.bonusPrime = 500;
              this.points += this.bonusPrime;
              this.animeBonus();
              this.playSound(this.soundBonusPrime);
            }
            this.pairesTrouvee++;
            this.paires = [];
            
            if(this.timerPoints>0){
              let bonusTime = (this.level*100) - (this.timerPoints*-1)*-5;
              if(bonusTime > 0){
                this.points += bonusTime;
              }
            }

            let bonusTentatives = (this.level*100) - (this.nbTentatives*-1)*-5;
            if(bonusTentatives>0){
              this.points += bonusTentatives;
            }

          } else {
            setTimeout(() => {
              this.paires[0].classList.remove("rotate");
              this.paires[1].classList.remove("rotate");
              this.paires = [];
            }, 1000);
          }
        }

        if (this.pairesTrouvee === this.maxPairesSelect) {
          this.playSound(this.soundWin);
          clearInterval(this.timer);
          this.saveBestScore(this.maxPairesSelect); // Save in localStorage
          if(this.points >= 1000){
            const nbCoins = Math.floor(this.points/1000).toFixed(0);
            this.lastGameCoins = Number(nbCoins); 
            this.totalCoins += Number(nbCoins);
            this.nbPlayedGame++;
            this.$store.dispatch('setUserTotalCoins', this.totalCoins);
            this.$store.dispatch('setUserNbPlayedMemory', this.nbPlayedGame);
          }
          this.fireworks();
        }
      }
    },

    saveBestScore(level){
      let allScoresObject = {L6 : this.bestScoreL6, L9 : this.bestScoreL9, L12 : this.bestScoreL12, L16 : this.bestScoreL16, L20 : this.bestScoreL20, L24 : this.bestScoreL24};
      switch (level){
        case 6 : 
          if(this.points > this.bestScoreL6){
            this.bestScoreL6 = allScoresObject.L6 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 9 : 
          if(this.points > this.bestScoreL9){
            this.bestScoreL9 = allScoresObject.L9 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 12 : 
          if(this.points > this.bestScoreL12){
            this.bestScoreL12 = allScoresObject.L12 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 16 : 
          if(this.points > this.bestScoreL16){
            this.bestScoreL16 = allScoresObject.L16 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 20 : 
          if(this.points > this.bestScoreL20){
            this.bestScoreL20 = allScoresObject.L20 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 24 : 
          if(this.points > this.bestScoreL24){
            this.bestScoreL24 = allScoresObject.L24 =  this.points;
            this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        default: 
          console.log('Error : Level unknown');
      }
      
    },

    deleteBestsScoresMemory(){
      this.bestScoreL6 = this.bestScoreL9 = this.bestScoreL12 = this.bestScoreL16 = this.bestScoreL20 = this.bestScoreL24 = 0;
      let allScoresObject = {L6 : 0, L9 : 0, L12 : 0, L16 : 0, L20 : 0, L24 : 0};
      this.$store.dispatch('userBestsScoresMemory', JSON.stringify(allScoresObject) );
    },

    restartGame(e) {
      
      document.querySelector(".fireworks").style.display = "none";
      this.nbTentatives = 0;
      this.pairesTrouvee = 0;
      this.timestamp = 0;
      this.timerPoints = 0;
      this.newRecord = false;
      e.target.setAttribute("disabled", "");
      clearInterval(this.timer);
      this.startTimer = false;
      this.points = 0;
      this.paires = [];
      this.reset();
      this.createsPairsAndRandomize();
    },

    reset() {
      this.playSound(this.soundReset);
      Array.from(document.querySelectorAll(".card")).forEach((card) => {
        card.classList.remove("rotate");
      });
    },

    fireworks() {
      setTimeout(()=> {
        document.querySelector(".fireworks").style.display = "block";
      },1000);
    },

    userWin() {
      document.querySelector(".fireworks").style.display = "none";
      document.querySelector("#restartGame").setAttribute("disabled", "");
      this.nbTentatives = 0;
      this.pairesTrouvee = 0;
      this.timestamp = 0;
      this.timerPoints = 0;
      this.newRecord = false;
      clearInterval(this.timer);
      this.startTimer = false;
      this.points = 0;
      this.lastGameCoins = 0,
      this.reset();
      this.createsPairsAndRandomize();
    },

    commify(n) { // get points 1000 to 1.000
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return (
        numberPart.replace(thousands, ".") +
        (decimalPart ? "," + decimalPart : "")
      );
    },
  },

  created() {
    if(localStorage.getItem("memoryBestsScores")){
      this.bestsScores = JSON.parse(localStorage.getItem("memoryBestsScores"));
      this.bestScoreL6 = this.bestsScores.L6;
      this.bestScoreL9 = this.bestsScores.L9;
      this.bestScoreL12 = this.bestsScores.L12;
      this.bestScoreL16 = this.bestsScores.L16;
      this.bestScoreL20 = this.bestsScores.L20;
      this.bestScoreL24 = this.bestsScores.L24;
    }

    

    // Images Cards width
    if(this.windowWidth <= 360){
      this.imgCardWidth = 136;
    }else if(this.windowWidth <= 412 && this.windowWidth > 360){
      this.imgCardWidth = Math.floor(this.windowWidth/2.5).toFixed(0);
    }else if(this.windowWidth >= 1220 && this.windowHeight >= 920){
      this.imgCardWidth = 244;
    }else{
      this.imgCardWidth = 170;
    }
  },
  

  updated(){
    // Btn resize Img
    const btnMore = document.querySelector("#btnImgWidthMore");
    const btnLess = document.querySelector("#btnImgWidthLess");
    if (this.imgCardWidth >= 280) {
      btnMore.setAttribute("disabled", "");
    } else if (this.imgCardWidth <= 70) {
      btnLess.setAttribute("disabled", "");
    } else {
      btnMore.removeAttribute("disabled");
      btnLess.removeAttribute("disabled");
    }
  },


  mounted() {
    this.createsPairsAndRandomize();
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }
    if(localStorage.getItem("memoryBestsScores")){
      this.bestsScores = JSON.parse(localStorage.getItem("memoryBestsScores"));
    }
    // User Total Coins
    if (localStorage.getItem("userTotalCoins")) {
      this.totalCoins = Number(localStorage.getItem("userTotalCoins"));
    }
    // User's number of memory game played
    if(localStorage.getItem("nbPlayedMemory")){
      this.nbPlayedGame = Number(localStorage.getItem("nbPlayedMemory"));
    }
    // Volume FX
    if (localStorage.getItem("volumeEffects")) {
      this.valueVolumeFx = Number(localStorage.getItem("volumeEffects"));
    }

    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 100);
  },
};
</script>

<style lang="scss">
#memory-game {
  position: relative;
  min-height: 100vh;
  background: transparent;
  z-index: 1;

  video{
    position: fixed;
    top: 0;
    right: 0;
    z-index: -99;
    overflow: hidden;
  }
  

  .game-container {
    border-radius: 5px;
    animation: .2s linear slidein;
    margin-top: .7rem;

    .config{
      display: flex;
      flex-wrap: nowrap;
      width: calc(100% - 28px);
      margin: 0 auto;
      justify-content: space-between;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 2px solid var(--grey99);
      background-color: var(--black31);
      color: var(--white);
      padding: 3px;
      

      .element-config-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        font-size: 1em;
        font-family: 'Cinzel', serif;
        line-height: 1.4em;
        
        .cell-score{
          margin: 0 15px;

          .best-score-level{
            font-size: 1.2em;
          }
        }
      }
    }

    .cards {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: fit-content;
      overflow: hidden;
      margin-bottom: 46px;
      perspective: 1000px;

      #animation-bonus-prime {
        position: absolute;
        width: fit-content;
        margin: 0 auto;
        text-align: center;
        z-index: 1;
        overflow: hidden;

        .textanime {
          width: 100%;
          font-weight: bold;
          color: yellow;
          text-shadow: 0 8px 4px black;
          font-size: 4rem;
        }
      }

      .rotate {
        transform: rotateY(180deg);
        pointer-events: none;
      }

      .card { 
        margin: 2px;
        border-radius: 8px;
        box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.5);
        transform-style: preserve-3d;
        transition: 0.3s all ease-in-out;
        cursor: pointer;
        

        .card__front {
          backface-visibility: hidden;
          width: 100%;
          height: 100%;
          cursor: default;
          transform: rotateY(180deg);

          .card-body {
            padding: 4px;

            .img-container {
              position: relative;
              img {
                border-radius: 5px;
              }

              img::selection {
                background-color: transparent;
              }

              .superhero-name {
                position: absolute;
                background-color: #0000008e;
                color: white;
                bottom: 1px;
                left: 0;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                padding: 3px 6px;
                line-height: 14px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                width: calc(100% - 12px);
                font-size: .7rem;
                font-weight: bold;
                text-align: center;
              }

            }
          }
        }
      }
    }
    
    
  }

  // Colors 
  .template-blue {
    .game-container {
      .card {
        background: linear-gradient(115deg, #123a6f9c, #78cbff9f, #123b6f9c);
        border: 2px solid #61c0ff;
      }
    }
  }

  .template-dark {
    .game-container {
      .card {
        background: linear-gradient(115deg, #45454583, #ffffffa4, #45454583);
        background-position: center;
        border: 2px solid #c78442;
      }
    }
  }

}

// Breakpoints --------------------------------------------------------------------------------
// 576 768 992 1200 1400px
@media screen and (max-width: 992px) {
  #memory-game .card-body{
    padding: 0 !important;
  }
}

@media screen and (max-width: 768px) {
  #memory-game{
    .btn-options-container{
      position: fixed;
      width: fit-content;
      height: fit-content;
      top: 5px;
      left: 98px;
    }
    .superhero-name{
      font-size: .6rem;
    }
  }

  #memory-game .game-container .fireworks .bravo{
    font-size: 2rem;
    text-align: center;
  }
}
</style>