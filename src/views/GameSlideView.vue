<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div :class="templateColorChoice">
    <NavbarSide/>
    <div id="slide-game">
      <div class="navbar-margin m100vh" :class="templateColorChoice">

        <div class="btn-options-container">
          <button class="btn-option-set unselectable btn-custom btn-solid-white btn-small" @click="this.deleteOptionsVisible = false; toggleModale();"><i class="fa-solid fa-gear rotating"></i> Options</button>
        </div>

        <div class="selector">
          <div class="d-flex justify-content-start flex-wrap">
            <div class="mx-1 visibleAt576">
              <label>Niveau</label>
              <div class="select">
                <select class="form-select" v-model="level" style="font-family: 'Rubik', sans-serif">
                  <option value="3">Moussaillon</option>
                  <option value="4">Boucanier</option>
                  <option value="5">Flibustier</option>
                </select>
              </div>
            </div>
            <div class="mx-1">
              <label>Image</label>
              <div class="select" style="font-family: 'Rubik', sans-serif">
                <select class="form-select" v-model="this.imageChosenByUser">
                  <option v-for="(sh, index) in sortedSuperherosNames" :key="index" :value="index">{{ sh[0] }}</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p class="d-flex align-items-center"><i class="fa-solid fa-coins mx-1"></i>{{ this.totalCoins }}</p>
          </div>
        </div>

        <div class="container game-container">
          
          <section class="game-stand">
            <div class="config">
              <span v-if="this.level == 3" class="element-config">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL3 >=0 ? commify(this.bestScoreL3) : 0 }}</span> pts.</span>
              <span v-else-if="this.level == 4" class="element-config">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL4 >=0 ? commify(this.bestScoreL4) : 0 }}</span> pts.</span>
              <span v-else-if="this.level == 5" class="element-config">Meilleur score : <span class="bold best-score-level">{{ this.bestScoreL5 >=0 ? commify(this.bestScoreL5) : 0 }}</span> pts.</span>
              <span class="element-config">Coups : {{ nbTentatives }}</span>
              <span class="element-config">Temps : {{ timestamp }}</span>
            </div>

            <div class="img-square d-flex justify-content-center">
              <!-- Fireworks -->
              <div class="fireworks animate__animated animate__zoomInUp" style="display: none">
                <div class="bravo-container text-shadow">
                  <div class="bravo">
                    
                    <p class="fs-2">Félicitations !</p>
                    <div class="fliping-coins-container d-flex justify-content-center">
                      <FlipingCoins :lgc="this.lastGameCoins"/>
                    </div>
                    <p v-if="newRecord" class="animate__animated animate__pulse animate__infinite infinite">NOUVEAU RECORD !</p>
                    <div class="d-flex justify-content-center align-items-center">
                      <span class="b-score">Score :</span>
                      <span class="b-point">{{ commify(points) }} pts.</span>
                    </div>
                    
                    <button type="button" class="btn-custom btn-solid-green" @click="restartGame()">Continuer</button>
                  </div>
                </div>
              </div>
              
              
              <div class="puzzle-wintess-container d-flex justify-content-center align-items-center flex-wrap">
                <div class="puzzle-table">
                  <table @click="startGameFromTable()">
                    <tbody>
                      <tr v-for="(i, row) in board" :key="i">
                        <td v-for="(j, col ) in i" :key="j" @click="swapBoard(row, col)">
                          <div class="td-frame" :id="'tile'+j">
                            <div v-if="numTileHelper" class="tile-number text-shadow">{{ j == '' ? '-' : j }}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="witness-container">
                  <div class="image-container">
                    <div id="witnessImage"></div>
                  </div>
                  <p class="superhero-name">{{ superheroNameOnLoad }}</p>
                </div>
              </div>
            </div>
            <div class="dashboard" v-if="startTimer == false">
              <button class="btn-custom btn-solid-white" @click="this.imageChosenByUser = null, this.playSound(this.soundChangeHero)">Choix aléatoire</button>
              <button class="btn-custom btn-solid-green" @click="startGame()">Commencer</button>
            </div>
            <div class="dashboard" v-else>
              <button class="btn-custom btn-solid-white" @click="restartGame()">Recommencer</button>
            </div>
          </section>
          <!-- <button @click="toggleModale" class="btn btn-large btn-light px-5">modale</button> -->
          <!-- <div class="btn-settings-container">
            <a type="button" class="btn-settings-options unselectable" @click="this.deleteOptionsVisible = false; toggleModale();"><i class="fa-solid fa-gear rotating"></i> Options</a>
          </div> -->
          
        </div><!-- /game-container-->

        <!-- Modal -->
        <div class="bloc-modale" v-show="this.revele">
          <div class="overlay" @click="toggleModale"></div>
          <div class="modale">
          <!-- <SpidermanShow/> -->

            <div class="modale-head">
              <h2 class="text-start"><i class="fa-solid fa-gear rotating"></i> Options</h2>
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
                      v-model="numTileHelper"
                    />
                    <label for="active-name">
                      Afficher les numeros de case
                    </label>
                  </div>
                </div>

                <div class="options-settings">
                  <div>
                    <label for="active-name">
                      Volume des effets sonores
                    </label>
                    <SetVolumeFx @valueVolFx="updateVolumeFx" />
                  </div>
                </div>

                

                <div class="options-settings">
                  <label>Couleurs</label>
                  <div class="select m-auto" style="font-family: 'Rubik', sans-serif">
                    <select class="form-select" v-model="templateColorChoice">
                      <option value="template-blue">Bleu</option>
                      <option value="template-dark">Orange Dark</option>
                    </select>
                  </div>
                </div>

                <div class="options-settings">
                  <label>Effacer tous vos meilleurs scores du Slide Puzzle Game</label>
                  <div class="m-1">
                    <div v-if="this.deleteOptionsVisible == false">
                      <button class="btn-custom btn-solid-white btn-small" @click="this.deleteOptionsVisible = !this.deleteOptionsVisible">Effacer</button>
                    </div>
                    <div v-else>
                      <span>Vous êtes sur le point d'effacer vos records, continuer ?</span>
                      <button class="btn-custom btn-solid-white btn-small mx-1" @click="deleteBestsScoresSlide(); this.deleteOptionsVisible = !this.deleteOptionsVisible">Oui, j'efface</button>
                      <button class="btn-custom btn-solid-white btn-small mx-1" @click="this.deleteOptionsVisible = !this.deleteOptionsVisible">Retour</button>
                    </div>
                  </div>
                </div>

              </section>
            </div>

          </div>
        </div>
        <!-- /Modal -->
      </div>
    </div>
    <FooterMain/>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import NavbarSide from '@/components/NavbarSide.vue';
import json from '@/json/piratesitems.json';
import FlipingCoins from '@/components/FlipingCoins.vue';
import SetVolumeFx from '@/components/SetVolumeFx.vue';
import FooterMain from "@/components/FooterMain.vue";

export default {
  name: 'GameSlideView',
  components: {
    SpinnerLoader,
    NavbarSide,
    FlipingCoins,
    SetVolumeFx,
    FooterMain
  },

  data(){
    return {
      isLoaded: false,
      revele: false,
      arrayAllItems: json,
      templateColorChoice: "template-blue",
      deleteOptionsVisible: false,
      sortedSuperherosNames: [],
      imageChosenByUser: null,
      superheroNameOnLoad: '',
      imgWitnessWidth: 200, // 280 ideal
      numTileHelper: true,
      level: 3,
      board : [],
      timestamp: 0,
      timerPoints: 0,
      nbTentatives: 0,
      timer: null,
      startTimer: false,
      newRecord: false,
      points: 0,
      totalCoins: 0,
      lastGameCoins: 0,
      nbPlayedGame: 0,
      bestScoreL3: 0,
      bestScoreL4: 0,
      bestScoreL5: 0,
      valueVolumeFx: 10,
      soundTile: require("../assets/sounds/slide/tilemove.mp3"),
      soundChangeHero: require("../assets/sounds/slide/changehero.mp3"),
      soundWin: require("../assets/sounds/global/userwin1.mp3"),
      soundReset: require("../assets/sounds/global/resetgame.mp3"),
    }
  },

  watch : {
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

    templateColorChoice() {
      this.$store.dispatch('setUserThemeColor', this.templateColorChoice ); //<-------------------------->
    },

    level(){
      this.resetGame();
      this.openNewGame(this.level);
    },

    imageChosenByUser(){
      this.restartGame();
      this.getSelectedImageInWitness(this.imageChosenByUser);
    }



  },

  mounted() {
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }

    this.arraySuperherosSort();
    this.getSelectedImageInWitness(null);
    

    // Best Scores
    if(localStorage.getItem("slideBestsScores")){
      this.bestsScores = JSON.parse(localStorage.getItem("slideBestsScores"));
      this.bestScoreL3 = this.bestsScores.L3;
      this.bestScoreL4 = this.bestsScores.L4;
      this.bestScoreL5 = this.bestsScores.L5;
    }

    // User Total Coins
    if (localStorage.getItem("userTotalCoins")) {
      this.totalCoins = Number(localStorage.getItem("userTotalCoins"));
    }

    // User's number of slide game played
    if(localStorage.getItem("nbPlayedSlide")){
      this.nbPlayedGame = Number(localStorage.getItem("nbPlayedSlide"));
    }

    // Volume FX
    if (localStorage.getItem("volumeEffects")) {
      this.valueVolumeFx = Number(localStorage.getItem("volumeEffects"));
    }

    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 50);
  },
    

  created() {
    this.openNewGame(this.level);
  },

  updated(){
    this.insertSpriteImage();
  },

  unmounted(){
    this.imageChosenByUser = false;
    this.imageRand = null;
  },

  methods : {

    updateVolumeFx(valueFromSetVolumeFxComponent){
      this.valueVolumeFx = valueFromSetVolumeFxComponent;
    },

    toggleModale(){
      this.revele = !this.revele;
    },

    openNewGame(size){
      if(size != 3 && size != 4 && size != 5){
        size == 3;
      }
      this.board = this.createBoard(size);
    },

    createBoard(size) {
      const board = [];
      for (let i = 0; i < size; i++) {
        const childBoard = [];
        for (let j = 0; j < size; j++) {
          childBoard.push(i * size + j + 1);
        }
        board.push(childBoard);
      }
      board[size - 1][size - 1] = "";
      
      return board;
    },

    arraySuperherosSort(){ // <----------------------------------------------------------------------------------------- New
      let newArray = [];
      for(let i=0; i<this.arrayAllItems.allItems.length; i++){
        // if(this.arrayAllItems.allItems[i].type == 'superhero'){
          newArray.push([this.arrayAllItems.allItems[i].name, this.arrayAllItems.allItems[i].imgPath, i]);
        // }
      }
      newArray.sort();
      this.sortedSuperherosNames = newArray;
    },

    getSelectedImageInWitness(indexImgChosenByUser){ // <----------------------------------------------------------------- New
      const superherosArray = this.sortedSuperherosNames;
      const witnessImage = document.querySelector('#witnessImage');
      if(indexImgChosenByUser == null){
        indexImgChosenByUser = Math.round(Math.random() * (superherosArray.length),0)-1;
          if(indexImgChosenByUser > superherosArray.length || indexImgChosenByUser < 0){
            indexImgChosenByUser = 0;
          }
          this.imageChosenByUser = indexImgChosenByUser;
      }
      witnessImage.style.backgroundImage = `url(${require('@/' + superherosArray[indexImgChosenByUser][1])})`;
      const bgImg = witnessImage.style.backgroundImage;
      this.imageRand = bgImg;
      this.insertSpriteImage();
      this.superheroNameOnLoad = superherosArray[indexImgChosenByUser][0]; // Get the superhero's name in the witness frame
    },

    insertSpriteImage(){
      if(this.level == 3){
        const tile1 = document.querySelector('#tile1');
        tile1.style.backgroundImage = this.imageRand;
        tile1.style.backgroundPosition = '0px 0px';
        tile1.style.backgroundSize = '300px';

        const tile2 = document.querySelector('#tile2');
        tile2.style.backgroundImage = this.imageRand;
        tile2.style.backgroundPosition = '-100px 0px';
        tile2.style.backgroundSize = '300px';

        const tile3 = document.querySelector('#tile3');
        tile3.style.backgroundImage = this.imageRand;
        tile3.style.backgroundPosition = '-200px 0px';
        tile3.style.backgroundSize = '300px';

        const tile4 = document.querySelector('#tile4');
        tile4.style.backgroundImage = this.imageRand;
        tile4.style.backgroundPosition = '0px -100px';
        tile4.style.backgroundSize = '300px';

        const tile5 = document.querySelector('#tile5');
        tile5.style.backgroundImage = this.imageRand;
        tile5.style.backgroundPosition = '-100px -100px';
        tile5.style.backgroundSize = '300px';

        const tile6 = document.querySelector('#tile6');
        tile6.style.backgroundImage = this.imageRand;
        tile6.style.backgroundPosition = '-200px -100px';
        tile6.style.backgroundSize = '300px';

        const tile7 = document.querySelector('#tile7');
        tile7.style.backgroundImage = this.imageRand;
        tile7.style.backgroundPosition = '0px -200px';
        tile7.style.backgroundSize = '300px';

        const tile8 = document.querySelector('#tile8');
        tile8.style.backgroundImage = this.imageRand;
        tile8.style.backgroundPosition = '-100px -200px';
        tile8.style.backgroundSize = '300px';
      }
      else if(this.level == 4){
        const tile1 = document.querySelector('#tile1');
        tile1.style.backgroundImage = this.imageRand;
        tile1.style.backgroundPosition = '0px 0px';
        tile1.style.backgroundSize = '400px';

        const tile2 = document.querySelector('#tile2');
        tile2.style.backgroundImage = this.imageRand;
        tile2.style.backgroundPosition = '-100px 0px';
        tile2.style.backgroundSize = '400px';

        const tile3 = document.querySelector('#tile3');
        tile3.style.backgroundImage = this.imageRand;
        tile3.style.backgroundPosition = '-200px 0px';
        tile3.style.backgroundSize = '400px';

        const tile4 = document.querySelector('#tile4');
        tile4.style.backgroundImage = this.imageRand;
        tile4.style.backgroundPosition = '-300px 0px';
        tile4.style.backgroundSize = '400px';

        const tile5 = document.querySelector('#tile5');
        tile5.style.backgroundImage = this.imageRand;
        tile5.style.backgroundPosition = '0px -100px';
        tile5.style.backgroundSize = '400px';

        const tile6 = document.querySelector('#tile6');
        tile6.style.backgroundImage = this.imageRand;
        tile6.style.backgroundPosition = '-100px -100px';
        tile6.style.backgroundSize = '400px';

        const tile7 = document.querySelector('#tile7');
        tile7.style.backgroundImage = this.imageRand;
        tile7.style.backgroundPosition = '-200px -100px';
        tile7.style.backgroundSize = '400px';

        const tile8 = document.querySelector('#tile8');
        tile8.style.backgroundImage = this.imageRand;
        tile8.style.backgroundPosition = '-300px -100px';
        tile8.style.backgroundSize = '400px';

        const tile9 = document.querySelector('#tile9');
        tile9.style.backgroundImage = this.imageRand;
        tile9.style.backgroundPosition = '0px -200px';
        tile9.style.backgroundSize = '400px';

        const tile10 = document.querySelector('#tile10');
        tile10.style.backgroundImage = this.imageRand;
        tile10.style.backgroundPosition = '-100px -200px';
        tile10.style.backgroundSize = '400px';

        const tile11 = document.querySelector('#tile11');
        tile11.style.backgroundImage = this.imageRand;
        tile11.style.backgroundPosition = '-200px -200px';
        tile11.style.backgroundSize = '400px';

        const tile12 = document.querySelector('#tile12');
        tile12.style.backgroundImage = this.imageRand;
        tile12.style.backgroundPosition = '-300px -200px';
        tile12.style.backgroundSize = '400px';

        const tile13 = document.querySelector('#tile13');
        tile13.style.backgroundImage = this.imageRand;
        tile13.style.backgroundPosition = '0px -300px';
        tile13.style.backgroundSize = '400px';

        const tile14 = document.querySelector('#tile14');
        tile14.style.backgroundImage = this.imageRand;
        tile14.style.backgroundPosition = '-100px -300px';
        tile14.style.backgroundSize = '400px';

        const tile15 = document.querySelector('#tile15');
        tile15.style.backgroundImage = this.imageRand;
        tile15.style.backgroundPosition = '-200px -300px';
        tile15.style.backgroundSize = '400px';

      }
      else if(this.level == 5){
        const tile1 = document.querySelector('#tile1');
        tile1.style.backgroundImage = this.imageRand;
        tile1.style.backgroundPosition = '0px 0px';
        tile1.style.backgroundSize = '500px';

        const tile2 = document.querySelector('#tile2');
        tile2.style.backgroundImage = this.imageRand;
        tile2.style.backgroundPosition = '-100px 0px';
        tile2.style.backgroundSize = '500px';

        const tile3 = document.querySelector('#tile3');
        tile3.style.backgroundImage = this.imageRand;
        tile3.style.backgroundPosition = '-200px 0px';
        tile3.style.backgroundSize = '500px';

        const tile4 = document.querySelector('#tile4');
        tile4.style.backgroundImage = this.imageRand;
        tile4.style.backgroundPosition = '-300px 0px';
        tile4.style.backgroundSize = '500px';

        const tile5 = document.querySelector('#tile5');
        tile5.style.backgroundImage = this.imageRand;
        tile5.style.backgroundPosition = '-400px 0px';
        tile5.style.backgroundSize = '500px';

        const tile6 = document.querySelector('#tile6');
        tile6.style.backgroundImage = this.imageRand;
        tile6.style.backgroundPosition = '0px -100px';
        tile6.style.backgroundSize = '500px';

        const tile7 = document.querySelector('#tile7');
        tile7.style.backgroundImage = this.imageRand;
        tile7.style.backgroundPosition = '-100px -100px';
        tile7.style.backgroundSize = '500px';

        const tile8 = document.querySelector('#tile8');
        tile8.style.backgroundImage = this.imageRand;
        tile8.style.backgroundPosition = '-200px -100px';
        tile8.style.backgroundSize = '500px';

        const tile9 = document.querySelector('#tile9');
        tile9.style.backgroundImage = this.imageRand;
        tile9.style.backgroundPosition = '-300px -100px';
        tile9.style.backgroundSize = '500px';

        const tile10 = document.querySelector('#tile10');
        tile10.style.backgroundImage = this.imageRand;
        tile10.style.backgroundPosition = '-400px -100px';
        tile10.style.backgroundSize = '500px';

        const tile11 = document.querySelector('#tile11');
        tile11.style.backgroundImage = this.imageRand;
        tile11.style.backgroundPosition = '0px -200px';
        tile11.style.backgroundSize = '500px';

        const tile12 = document.querySelector('#tile12');
        tile12.style.backgroundImage = this.imageRand;
        tile12.style.backgroundPosition = '-100px -200px';
        tile12.style.backgroundSize = '500px';

        const tile13 = document.querySelector('#tile13');
        tile13.style.backgroundImage = this.imageRand;
        tile13.style.backgroundPosition = '-200px -200px';
        tile13.style.backgroundSize = '500px';

        const tile14 = document.querySelector('#tile14');
        tile14.style.backgroundImage = this.imageRand;
        tile14.style.backgroundPosition = '-300px -200px';
        tile14.style.backgroundSize = '500px';

        const tile15 = document.querySelector('#tile15');
        tile15.style.backgroundImage = this.imageRand;
        tile15.style.backgroundPosition = '-400px -200px';
        tile15.style.backgroundSize = '500px';

        const tile16 = document.querySelector('#tile16');
        tile16.style.backgroundImage = this.imageRand;
        tile16.style.backgroundPosition = '0px -300px';
        tile16.style.backgroundSize = '500px';

        const tile17 = document.querySelector('#tile17');
        tile17.style.backgroundImage = this.imageRand;
        tile17.style.backgroundPosition = '-100px -300px';
        tile17.style.backgroundSize = '500px';

        const tile18 = document.querySelector('#tile18');
        tile18.style.backgroundImage = this.imageRand;
        tile18.style.backgroundPosition = '-200px -300px';
        tile18.style.backgroundSize = '500px';

        const tile19 = document.querySelector('#tile19');
        tile19.style.backgroundImage = this.imageRand;
        tile19.style.backgroundPosition = '-300px -300px';
        tile19.style.backgroundSize = '500px';

        const tile20 = document.querySelector('#tile20');
        tile20.style.backgroundImage = this.imageRand;
        tile20.style.backgroundPosition = '-400px -300px';
        tile20.style.backgroundSize = '500px';

        const tile21 = document.querySelector('#tile21');
        tile21.style.backgroundImage = this.imageRand;
        tile21.style.backgroundPosition = '0px -400px';
        tile21.style.backgroundSize = '500px';

        const tile22 = document.querySelector('#tile22');
        tile22.style.backgroundImage = this.imageRand;
        tile22.style.backgroundPosition = '-100px -400px';
        tile22.style.backgroundSize = '500px';

        const tile23 = document.querySelector('#tile23');
        tile23.style.backgroundImage = this.imageRand;
        tile23.style.backgroundPosition = '-200px -400px';
        tile23.style.backgroundSize = '500px';

        const tile24 = document.querySelector('#tile24');
        tile24.style.backgroundImage = this.imageRand;
        tile24.style.backgroundPosition = '-300px -400px';
        tile24.style.backgroundSize = '500px';

      }
    },

    mixBoard(board, times) {
      const size = board.length;
      let newBoard = [];
      for (let i = 0; i < size; i++) {
        newBoard[i] = [...board[i]];
      }
      for (let i = 0; i < times; i++) {
        const spaceInd = this.getSpaceIndex(newBoard);
        const randInd = this.getRandomIndex(newBoard, spaceInd);
        newBoard = this.swap(newBoard, spaceInd, randInd);
      }
      this.board = newBoard;
    },

    swap(board, index1, index2) {
      const size = board.length;
      const newBoard = [];

      for (let i = 0; i < size; i++) {
        newBoard[i] = [...board[i]];
      }

      const tmp = newBoard[index1[0]][index1[1]];
      newBoard[index1[0]][index1[1]] = newBoard[index2[0]][index2[1]];
      newBoard[index2[0]][index2[1]] = tmp;
      return newBoard;
    },

    getSpaceIndex(board) {
      const size = board.length;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] === "") return [i, j];
        }
      }
    },

    getRandomIndex(board, index) {
      const directions = ["u", "d", "l", "r"];
      let randInd;
      do {
        const directIndex = Math.floor(Math.random() * 4);
        let direct = directions[directIndex];
        if (direct === "u"){
          randInd = [index[0] - 1, index[1]];
        } 
        if (direct === "d") { 
          randInd = [index[0] + 1, index[1]];
          }
        if (direct === "l") {
          randInd = [index[0], index[1] - 1];
        } 
        if (direct === "r") {
          randInd = [index[0], index[1] + 1];
        } 
      } while (!this.isValidIndex(board, randInd));
      
      return randInd;
    },

    isValidIndex(board, index) {
      const size = board.length;
      return index[0] >= 0 && index[0] < size && index[1] >= 0 && index[1] < size;
    },

    playSound(soundFx){
      if(this.valueVolumeFx>0){
        const myAudio = new Audio(soundFx);
        myAudio.volume = this.valueVolumeFx/10;
        myAudio.play();
      }
    },


    swapBoard(i , j){
      if(this.startTimer){
        if (this.isSwappable(this.board, [i, j])) {
          this.playSound(this.soundTile);
          const indexes = this.getSwappableIndexes(this.board, [i, j]);
          this.board = this.swap(this.board, indexes[0], indexes[1]);
          this.nbTentatives++;
        }
        if (this.isCorrectBoard(this.board)) {
          this.playSound(this.soundWin);
          clearInterval(this.timer);
          const t = this.timerPoints;
          let ratioLevel = 1;
          if(this.level == 3){
            ratioLevel = 3;
          }else if(this.level == 4){
            ratioLevel = 2;
          }
          this.points = Math.ceil( (((((this.level**2)*500) - (this.nbTentatives*ratioLevel*6) - (t*ratioLevel*6) )) *8) ) ; // <-- WIN
          if(this.points < 1000){
            this.points = 1000;
          }

          this.saveBestScore(this.level);

          let nbCoins = 1;
          if(this.points >= 1000){
            nbCoins = Math.floor(this.points/1000).toFixed(0);
          }
          this.lastGameCoins = Number(nbCoins); 
          this.totalCoins += Number(nbCoins);// +1000;
          this.nbPlayedGame++;
          this.$store.dispatch('setUserTotalCoins', this.totalCoins);
          this.$store.dispatch('setUserNbPlayedSlide', this.nbPlayedGame);
          

          this.fireworks();
        }
      }
    },

    isSwappable(board, index) {
      const size = board.length;
      if (index[0] - 1 >= 0 && board[index[0] - 1][index[1]] === ""){
        // this.tileAbleToMoveTo = 'white-ghost-move-to-top'
        return true;
      }
      if (index[0] + 1 < size && board[index[0] + 1][index[1]] === ""){
        // this.tileAbleToMoveTo = 'white-ghost-move-to-bottom'
        return true;
      }
      if (index[1] - 1 >= 0 && board[index[0]][index[1] - 1] === ""){
        // this.tileAbleToMoveTo = 'white-ghost-move-to-left'
        return true;
      }
      if (index[1] + 1 < size && board[index[0]][index[1] + 1] === ""){
        // this.tileAbleToMoveTo = 'white-ghost-move-to-right'
        return true;
      }
      return false;
    },

    isCorrectBoard(board) {
      const size = board.length;
      const corrBoard = this.createBoard(size);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] !== corrBoard[i][j]) return false;
        }
      }
      return true;
    },

    getSwappableIndexes(board, index) {
      const size = board.length;
      if (index[0] - 1 >= 0 && board[index[0] - 1][index[1]] === "")
        return [index, [index[0] - 1, index[1]]];
      if (index[0] + 1 < size && board[index[0] + 1][index[1]] === "")
        return [index, [index[0] + 1, index[1]]];
      if (index[1] - 1 >= 0 && board[index[0]][index[1] - 1] === "")
        return [index, [index[0], index[1] - 1]];
      if (index[1] + 1 < size && board[index[0]][index[1] + 1] === "")
        return [index, [index[0], index[1] + 1]];
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

    saveBestScore(level){
      level = Number(level);
      let allScoresObject = {L3 : this.bestScoreL3, L4 : this.bestScoreL4, L5 : this.bestScoreL5};
      switch (level){
        case 3 : 
          if(this.points > this.bestScoreL3){
            this.bestScoreL3 = allScoresObject.L3 =  this.points;
            this.$store.dispatch('userBestsScoresSlide', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 4 : 
          if(this.points > this.bestScoreL4){
            this.bestScoreL4 = allScoresObject.L4 =  this.points;
            this.$store.dispatch('userBestsScoresSlide', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        case 5 : 
          if(this.points > this.bestScoreL5){
            this.bestScoreL5 = allScoresObject.L5=  this.points;
            this.$store.dispatch('userBestsScoresSlide', JSON.stringify(allScoresObject) );
            this.newRecord = true;
          }
          break;
        default: 
          console.log('Error : Level unknown');
      }
      //this.bestsScores = allScoresObject;
    },

    deleteBestsScoresSlide(){
      this.bestScoreL3 = this.bestScoreL4 = this.bestScoreL5 = 0;
      let allScoresObject = {L3 : 0, L4 : 0, L5 : 0};
      this.$store.dispatch('userBestsScoresSlide', JSON.stringify(allScoresObject) );
    },

    startGame(){
      this.playSound(this.soundReset);
      this.mixBoard(this.board, this.level**4); // <-- Start game mixboard movements
      //this.mixBoard(this.board, 1); // <-- Start game mixboard movements
      this.startTimer = true;
    },

    startGameFromTable(){
      if(this.startTimer == false){
        this.startGame();
      }
    },

    resetGame(){
      this.points = 0;
      this.timestamp = 0;
      this.nbTentatives = 0;
      this.timerPoints = 0;
      clearInterval(this.timer);
      this.startTimer = false;
      this.newRecord = false;
      this.lastGameCoins = 0;
    },

    restartGame(){
      document.querySelector(".fireworks").style.display = "none";
      this.resetGame();
      this.openNewGame(this.level);
    },

    fireworks(){
      setTimeout(()=> {
        document.querySelector(".fireworks").style.display = "block";
      }, 300);
    }
    
  }

}
</script>

<style lang="scss" scoped>
#slide-game{
  background: url('../assets/img/wallpaper/mg1.jpg') no-repeat center fixed;
  min-height: 100vh;
  background-size: cover;
  font-size: 1em;
  padding-bottom: 30px;

  .game-container{
    margin-top: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    position: relative;
    border-radius: 18px;
    width: fit-content;
    animation: .2s linear slidein;

    .game-stand{
      padding: 20px 80px;

      .config {
        text-align: center;
        font-family: 'Cinzel', serif;
        margin-bottom: 20px;
        padding: 10px 25px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        line-height: 1.4em;
        border-radius: 5px;
        border: 2px solid var(--grey99);
        background-color: var(--black31);
        color: var(--white);

        .element-config{
          padding: 0 10px;

          .best-score-level{
            font-size: 1.2em;
          }
        }
      }

      .puzzle-wintess-container{
        .puzzle-table{
          
          table{
            background: url('../assets/img/wallpaper/dark4.jpg');
            background-position: center;
            border: 1px solid var(--black);

            td {
              position: relative;
              width: 100px;
              height: 100px;
              text-align: center;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              animation: flashionable .2s linear;
                
              .td-frame{
                position: relative;
                border: 1px solid black;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
              }

              .td-frame::after{
                position: absolute;
                top: 0;
                left: 0;
                content: '';
                width: 100%;
                height: 100%;
                transition: .1s;
              }

              .td-frame:active {
                z-index: 1;
                border: 1px solid var(--white);
                box-shadow: 0 0 2px var(--white), 0 0 2px var(--white), 0 0 4px var(--white), 0 0 6px var(--white), 0 0 10px var(--white), 0 0 14px var(--white), 0 0 18px var(--white), 0 0 24px var(--white);
                overflow: visible;
                transition: .1s;
              }

              .td-frame:active::after{
                background-color: rgba(255, 255, 255, 0.77);
                overflow: visible;
              }

              .tile-number{
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--white);
              }            
              

              #tile{
                background-color: transparent;
                cursor: default;
                box-shadow: none;
                .tile-number{
                  color: transparent;
                  text-shadow: none;
                }
              }

              #tile.td-frame:active::after{
                background-color: transparent;
                box-shadow: none;
                overflow: hidden;
              }
            }

            td:hover {
              cursor: pointer;
            }
          }
        }
    
        .witness-container{
          margin: 8px;

          .image-container{

            #witnessImage{
              width: 225px;
              height: 225px;
              background: no-repeat;
              background-size: 225px;
              border: 2px solid var(--black);
            }
          }

          .superhero-name{
            padding: 6px;
            font-weight: bold;
            border: 2px solid var(--black);
            border-top: none;
          }
        }

      }

      .dashboard{
        margin: 2em 0;
        button{
          margin: .4rem;
          min-width: 175px;
        }
      }
    }

    
    
  }

  // Colors ---------------------------------------------------------------------------------
  .template-blue{
    .game-container{
      background-color: #00204559;
      border: 1px solid var(--bluelight1);

      .puzzle-table{
        border: 10px solid var(--bluemedium1);
      }

      .witness-container{
        border: 4px solid var(--bluemedium1);
        .superhero-name{
          color: var(--white);
          background-color: var(--bluemedium1);
        }
      }
    } 
  }

  .template-dark {
    .game-container{
      border: 1px solid var(--ordalight1);

      .puzzle-table{
        border: 10px solid var(--ordalight1);
      }

      .witness-container{
        border: 4px solid var(--ordalight1);

        .superhero-name{
          color: var(--whitegrey);
          background-color: var(--black44);
        }
      }
    }
  }
  // /Colors --------------------------------------------------------------------------------

  @keyframes flashionable {
    from {
      background-color: #ffffff40;
    }
    to {
      background-color: #00000000;
    }
  }  

}

// Breakpoints --------------------------------------------------------------------------------
// 576 768 992 1200 1400px
@media screen and (max-width: 768px) {
  #slide-game{
    .btn-options-container{
      position: fixed;
      width: fit-content;
      height: fit-content;
      top: 5px;
      left: 98px;
      z-index: 101;
    }
    
    .game-container{
      padding: 0 0 10px 0;
      
      .game-stand{
        padding: 20px 0;
        margin: 0;
  
        .fireworks .bravo{
          font-size: 2rem;
        }
  
        .puzzle-wintess-container{
          padding: 2px;
  
          .witness-container{
            margin: 10px 20px;
  
            .image-container #witnessImage{
              width: 200px;
              height: 200px;
              background-size: 200px;
            }
          }
          
          .puzzle-table{
            border: 4px solid var(--grey90);
            margin: 0;
          } 
          
        }
        .dashboard{
          padding-bottom: 70px;
        }
      }
    } 
  }

}
</style>