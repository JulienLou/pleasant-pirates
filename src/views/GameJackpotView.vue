<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div :class="templateColorChoice">
    <section class="jackpot">
      <NavbarSide/>
      <div class="btn-options-container">
        <button class="btn-option-set unselectable btn-custom btn-solid-white btn-small" @click="this.deleteOptionsVisible = false; toggleModale();"><i class="fa-solid fa-gear rotating"></i> Options</button>
      </div>
      <div class="navbar-margin m100vh">
        <video autoplay="autoplay" muted="" loop src="../assets/img/wallpaper/shipnight-animated1.mp4"></video>

        <div class="selector">
          <h2>Pleasant Pirates Jackpot</h2>
          <div>
            <p class="d-flex align-items-center"><i class="fa-solid fa-coins mx-1"></i>{{ this.totalCoins }}</p>
          </div>
        </div>


        <div class="container jackpot-game">
          <div class="message-nomoney" v-show="(this.totalCoins <= 0 && this.playerIsPlaying == false)">
            <p class="animate__animated animate__pulse animate__infinite infinite">Pour jouer au jackpot, vous devez gagnez des crédits en jouant aux autres jeux...</p>
          </div>
          <div class="game-container">
            
            <div class="wanted-and-jackpot">
              <div class="special-wanted-container">
                <div class="most-wanted">
                  <h3>Special Wanted</h3>
                  <div class="img-text-container">
                    <div class="border-img">
                      <div id="most-wanted-img"></div>
                    </div>
                    <div class="cannonball-fire"><CannonBall/></div>
                    <div class="win-text">
                      <div class="multiplier">
                        <div class="letter-x">x</div>
                        <div class="items-found">{{ itemsFoundForSpecialWanted }}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="wanted-name">{{ mostWantedItem.name }}</p>
                    <p class="wanted-value">Valeur unitaire : {{ 1 * playerBet }} cr.</p> 
                    <p class="wanted-condition">Valable au premier spin</p>
                  </div>
                </div>
              </div>

              <div class="frame-background">

                <div class="frame">

                  <div class="frame-celebrations active">
                    <div class="all-frame-cases">
                      <div class="frame-case fc1"></div>
                      <div class="frame-case fc2"></div>
                      <div class="frame-case fc3"></div>
                      <div class="frame-case fc4"></div>
                      <div class="frame-case fc5"></div>
                      <div class="frame-case fc6"></div>
                      <div class="frame-case fc7"></div>
                      <div class="frame-case fc8"></div>
                      <div class="frame-case fc9"></div>
                    </div>
                  </div>
                  
                  <div class="rollers">
                    <div class="roller-border">
                      <div class="roller roller-1" :class="rollersColor">
                        <div class="isRolling"></div>
                        <div class="roll-case roll-case-top"><div class="img-square s1"></div></div>
                        <div class="roll-case roll-case-middle"><div class="img-square s4"></div></div>
                        <div class="roll-case roll-case-bottom"><div class="img-square s7"></div></div>
                      </div>
                    </div>
                    <div class="roller-border">
                      <div class="roller roller-2" :class="rollersColor">
                        <div class="isRolling"></div>
                        <div class="roll-case roll-case-top"><div class="img-square s2"></div></div>
                        <div class="roll-case roll-case-middle"><div class="img-square s5"></div></div>
                        <div class="roll-case roll-case-bottom"><div class="img-square s8"></div></div>
                      </div>
                    </div>
                    <div class="roller-border">
                      <div class="roller roller-3" :class="rollersColor">
                        <div class="isRolling"></div>
                        <div class="roll-case roll-case-top"><div class="img-square s3"></div></div>
                        <div class="roll-case roll-case-middle"><div class="img-square s6"></div></div>
                        <div class="roll-case roll-case-bottom"><div class="img-square s9"></div></div>
                      </div>
                    </div>
                  </div>
                  <div class="gains-container">
                    <div class="gains-box">
                      <p><span class="gains-span">+1</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="infos-player">
              <div class="player-counter-coins-container">
                <h3>Crédits : </h3>
                <p class="player-counter-coins"></p>
              </div>
              <div class="last-gains text-shadow">
                <p>Dernier gain : {{ lastGains }} cr.</p>
              </div>
            </div>

          </div>

          <div class="dashboard">
            <div class="dashboard-bet">
              <h3>Mise/Bet</h3>
              <div class="btn-blue-groupby2">
                <button class="btn-custom btn-solid-blue btn-small" :disabled="this.totalCoins < 1 || this.playerIsPlaying == true" :class="{btnBlueSelected: this.playerBet == 1}" @click="this.playerBet = 1">1 Crédit</button>
                <button class="btn-custom btn-solid-blue btn-small" :disabled="this.totalCoins < 5 || this.playerIsPlaying == true" :class="{btnBlueSelected: this.playerBet == 5}" @click="this.playerBet = 5">5 Crédits</button>
              </div>
              <div class="btn-blue-groupby2">
                <button class="btn-custom btn-solid-blue btn-small" :disabled="this.totalCoins < 10 || this.playerIsPlaying == true" :class="{btnBlueSelected: this.playerBet == 10}" @click="this.playerBet = 10">10 Crédits</button>
                <button class="btn-custom btn-solid-blue btn-small" :disabled="this.totalCoins < 25 || this.playerIsPlaying == true" :class="{btnBlueSelected: this.playerBet == 25}" @click="this.playerBet = 25">25 Crédits</button>
              </div>
            </div>
            <div class="dashboard-action">
              <h3>Action</h3>
              <div class="buttons-actions-group">
                <div class="spin-line-btn">
                  <button class="btn-custom btn-solid-grey" id="btn-shuffle-roller-1" @click="shuffleRollerSlider1('tryAgain'), animRollerStart('.roller-1')">Spin 1</button>
                  <button class="btn-custom btn-solid-grey" id="btn-shuffle-roller-2" @click="shuffleRollerSlider2('tryAgain'), animRollerStart('.roller-2')">Spin 2</button>
                  <button class="btn-custom btn-solid-grey" id="btn-shuffle-roller-3" @click="shuffleRollerSlider3('tryAgain'), animRollerStart('.roller-3')">Spin 3</button>
                </div>
                <div class="spin-all-btn">
                  <button class="btn-custom btn-solid-red btn-large" id="btn-shuffle-all-rollers" @click="shuffleAllRollers()">Spin Jackpot</button>
                </div>
              </div>
            </div>
          </div>

          
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
                    <div>
                      <label class="form-check-label" for="active-name">
                        Volume des effets sonores
                      </label>
                      <SetVolumeFx @valueVolFx="updateVolumeFx" />
                    </div>
                  </div>

                  <div class="options-settings">
                    <label>Couleurs</label>
                    <div class="select m-auto" style="font-family: 'Rubik', sans-serif">
                      <select v-model="templateColorChoice">
                        <option value="template-blue">Bleu</option>
                        <option value="template-dark">Orange Dark</option>
                      </select>
                    </div>
                  </div>

                  <div class="options-settings">
                    <label>Couleurs des rouleaux du jackpot</label>
                    <div class="select m-auto" style="font-family: 'Rubik', sans-serif">
                      <select v-model="rollersColor">
                        <option value="white">Blanc</option>
                        <option value="grey">Gris</option>
                        <option value="none">Transparent</option>
                      </select>
                    </div>
                  </div>

                </section>
              </div>
            </div>
          </div>

        </div>
      </div>
      <FooterMain/>
    </section>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import NavbarSide from '@/components/NavbarSide.vue';
import jsonjackpot from '@/json/jackpot.json';
import CannonBall from '@/components/CannonBall.vue';
import SetVolumeFx from '@/components/SetVolumeFx.vue';
import FooterMain from "@/components/FooterMain.vue";

export default {

  name: 'GameJackpotView',
  components: {
    SpinnerLoader,
    NavbarSide,
    CannonBall,
    SetVolumeFx,
    FooterMain
  },

  data(){
    return{
      isLoaded: false,
      revele: false,
      deleteOptionsVisible: false,

      arrayAllItems: jsonjackpot,
      templateColorChoice: "template-blue",
      rollersColor: "white",
      mostWantedItem: '',
      itemsFoundForSpecialWanted: 0,
      rollersInMove: false,
      rollerModel: [],
      roller1: '',
      roller2: '',
      roller3: '',
      lineTopDiag: [],
      lineMid: [],
      lineBotDiag: [],
      lineTopStraight: [],
      lineBotStraight: [],

      playerIsPlaying: false,
      totalCoinsAncient: 0,
      totalCoins: 0,
      playerBet: 1,
      playerCoinsGains : 0,
      playerCoinsLoses : 0,
      playerStrokesWins: 0,
      playerStrokesLoses: 0,
      lastGains: 0,
      maxChances: 2, // game setter (retry on 1 roller)
      playerTries: 0,
      gameIsPlayingAnimation : false, // a break moment to lauch winning animations

      valueVolumeFx: 10,
      soundStartRollers: require("../assets/sounds/jackpot/machine/startrollers3.mp3"),
      soundStopRoller: require("../assets/sounds/jackpot/machine/stoproller.mp3"),
      soundStartRollersSingle: require("../assets/sounds/jackpot/machine/startrollersingle2.mp3"),
      soundSword1: require("../assets/sounds/jackpot/alerts/sword1.mp3"),
      soundSword2: require("../assets/sounds/jackpot/alerts/sword2.mp3"),
      soundSwing: require("../assets/sounds/jackpot/alerts/swing.mp3"),
      soundBlic: require("../assets/sounds/jackpot/alerts/blic.mp3"),
      soundBlic2: require("../assets/sounds/jackpot/alerts/blic2.mp3"),
      soundCannonBall: require("../assets/sounds/jackpot/alerts/cannonball1.mp3"),
      soundBigwin: require("../assets/sounds/jackpot/wins/bigwin.mp3"),
      soundMiddlewin: require("../assets/sounds/jackpot/wins/middlewin.mp3"),
      soundGoodwin: require("../assets/sounds/jackpot/wins/goodwin.mp3"),
    }
  },

  mounted(){

    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }
    // User Total Coins
    if (localStorage.getItem("userTotalCoins")) {
      this.totalCoins = Number(localStorage.getItem("userTotalCoins"));
    }

    // Volume FX
    if (localStorage.getItem("volumeEffects")) {
      this.valueVolumeFx = Number(localStorage.getItem("volumeEffects"));
    }

    // Present Roller at welcome
    this.rollerModel = this.defineNbItemsRandomInRoller(14);
    this.roller1 = this.arrayRandomize(this.rollerModel.slice());
    this.roller2 = this.arrayRandomize(this.rollerModel.slice());
    this.roller3 = this.arrayRandomize(this.rollerModel.slice());
    this.presentRollersAtWelcome('roller-1', this.roller1);
    this.presentRollersAtWelcome('roller-2', this.roller2);
    this.presentRollersAtWelcome('roller-3', this.roller3);

    // Most wanted item
    this.defineMostWantedItem();

    // Ready to start game
    this.disabledAllRollerSingleBtn();
    this.focusBtnShuffleAllRollers();
    this.checkIfPlayerCanPlay();
    this.totalCoinsAncient = this.totalCoins;

    // Infos player totalcoins
    const counterDom = document.querySelector('.player-counter-coins');
    counterDom.innerHTML = this.totalCoins;

    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 100);
  },

  watch: {

    templateColorChoice() {
      this.$store.dispatch('setUserThemeColor', this.templateColorChoice );
    },

    totalCoins(){
      if(this.totalCoinsAncient < this.totalCoins){
        this.counterUp(this.totalCoinsAncient, this.totalCoins);
      }
      else{
        const counterDom = document.querySelector('.player-counter-coins');
        counterDom.innerHTML = this.totalCoins; 
      }
    },

    playerBet(){
      this.checkIfPlayerCanPlay();
    },

    rollersInMove(){
      if(this.rollersInMove == true){
        const btnShuffle = document.querySelector('#btn-shuffle-all-rollers');
        btnShuffle.setAttribute("disabled", "");
        this.disabledAllRollerSingleBtn();
      }
      else{
        this.checkIfPlayerCanPlay();
      }
    }
  },

  methods:{

    updateVolumeFx(valueFromSetVolumeFxComponent){
      this.valueVolumeFx = valueFromSetVolumeFxComponent;
    },

    toggleModale(){
      this.revele = !this.revele;
    },

    defineNbItemsRandomInRoller(NbItems){
      const missJane = this.arrayAllItems.jackpot[0];
      const captainB = this.arrayAllItems.jackpot[1];
      let arrayModel = this.arrayAllItems.jackpot.slice();
      arrayModel.splice(0, 2);
      let rollerToCut = this.arrayRandomize(arrayModel);
      const nbItemsToRemove = rollerToCut.length - NbItems + 2;
      rollerToCut.splice(rollerToCut.length - nbItemsToRemove, nbItemsToRemove);
      rollerToCut.push(missJane, captainB);
      return rollerToCut;
    },

    defineMostWantedItem(){
      let randomItem = this.getRandomInt(0, this.roller1.length-1);
      const imgMwi = document.querySelector('#most-wanted-img');
      if(this.mostWantedItem == ''){
        this.mostWantedItem = this.roller1[randomItem];
      }
      else{
        do{randomItem = this.getRandomInt(0, this.roller1.length-1);}
        while(this.roller1[randomItem].id == this.mostWantedItem.id);
        this.mostWantedItem = this.roller1[randomItem];
      }

      imgMwi.style.backgroundImage = `url(${require('@/'+ this.roller1[randomItem].imgPath)})`; 
      imgMwi.style.backgroundSize = '70%';
      imgMwi.style.backgroundRepeat = 'no-repeat';
      imgMwi.style.backgroundPosition = 'center';
    },

    shuffleAllRollers(){
      this.totalCoinsAncient = this.totalCoins;
      this.playerIsPlaying = true;
      this.randomChanceNewSpecialWanted();
      this.removeSquareFrameLighter();
      this.shuffleRollerSlider1('firstTry');
      this.shuffleRollerSlider2('firstTry');
      this.shuffleRollerSlider3('firstTry');
      this.animRollerStart('.roller-1');
      this.animRollerStart('.roller-2');
      this.animRollerStart('.roller-3');
      this.playerTries = 1;
      this.totalCoins -= this.playerBet;
      this.playSound(this.soundStartRollers);
      this.playSound(this.soundStartRollersSingle);
    },

    shuffleRollerSlider1(tries){
      this.rollersInMove = true;
      const animRoller = document.querySelector('.roller-1');
      animRoller.classList.remove("stopper");
      const rollCaseTop = document.querySelector('.roller-1 .roll-case-top .img-square');
      const rollCaseMid = document.querySelector('.roller-1 .roll-case-middle .img-square');
      const rollCaseBot = document.querySelector('.roller-1 .roll-case-bottom .img-square');
      const self = this;  // no access to 'this' in a setInterval function.  
      let as = this.roller1;
      let count = 0;
      let maxStep = this.getRandomInt(25, 38);
      if(tries != 'firstTry'){
        maxStep = this.getRandomInt(25, 40);
        this.playSound(this.soundStartRollersSingle);
        this.disabledAllRollerSingleBtn();
      }

      let myTimeout = setTimeout(function(){
        let myInterval = setInterval(function () {
          as.unshift(as.at(-1));
          as.pop();
          rollCaseTop.style.backgroundImage = `url(${require('@/' + as[as.length-1].imgPath)})`;
          rollCaseMid.style.backgroundImage = `url(${require('@/' + as[0].imgPath)})`;
          rollCaseBot.style.backgroundImage = `url(${require('@/' + as[1].imgPath)})`;
          count++;
          if(count >= maxStep){
            clearInterval(myInterval);
            self.roller1 = as;
            self.lineTopDiag.splice(0, 1, (as[as.length-1]));
            self.lineMid.splice(0, 1, (as[0]));
            self.lineBotDiag.splice(0, 1, (as[1]));
            self.lineTopStraight.splice(0, 1, (as[as.length-1]));
            self.lineBotStraight.splice(0, 1, (as[1]));

            //animation starter/stopper
            animRoller.classList.remove("starter");
            animRoller.classList.add("stopper");

            if(tries != 'firstTry'){
              self.rollersInMove = false;
              self.playerTries++;
              self.checkLinesWin(self.lineTopDiag, self.lineMid, self.lineBotDiag, self.lineTopStraight, self.lineBotStraight, self.playerTries);
            }
            self.playSound(self.soundStopRoller);
          }
        }, 25);//interval

      clearTimeout(myTimeout);
      }, 250);//timeout

    },

    shuffleRollerSlider2(tries){
      this.rollersInMove = true;
      const animRoller = document.querySelector('.roller-2');
      animRoller.classList.remove("stopper");
      const rollCaseTop = document.querySelector('.roller-2 .roll-case-top .img-square');
      const rollCaseMid = document.querySelector('.roller-2 .roll-case-middle .img-square');
      const rollCaseBot = document.querySelector('.roller-2 .roll-case-bottom .img-square');
      const self = this;
      let as = this.roller2;
      let count = 0;
      let maxStep = this.getRandomInt(39, 55);
      if(tries != 'firstTry'){
        maxStep = this.getRandomInt(25, 40);
        this.playSound(this.soundStartRollersSingle);
        this.disabledAllRollerSingleBtn();
      }

      let myTimeout = setTimeout(function(){
        let myInterval = setInterval(function () {
          as.unshift(as.at(-1));
          as.pop();
          rollCaseTop.style.backgroundImage = `url(${require('@/' + as[as.length-1].imgPath)})`;
          rollCaseMid.style.backgroundImage = `url(${require('@/' + as[0].imgPath)})`;
          rollCaseBot.style.backgroundImage = `url(${require('@/' + as[1].imgPath)})`;
          count++;
          if(count >= maxStep){
            clearInterval(myInterval);
            self.roller2 = as;
            self.lineTopDiag.splice(1, 1, (as[0]));
            self.lineMid.splice(1, 1, (as[0]));
            self.lineBotDiag.splice(1, 1, (as[0]));
            self.lineTopStraight.splice(1, 1, (as[as.length-1]));
            self.lineBotStraight.splice(1, 1, (as[1]));

            //animation starter/stopper
            animRoller.classList.remove("starter");
            animRoller.classList.add("stopper");

            if(tries != 'firstTry'){
              self.rollersInMove = false;
              self.playerTries++;
              self.checkLinesWin(self.lineTopDiag, self.lineMid, self.lineBotDiag, self.lineTopStraight, self.lineBotStraight, self.playerTries);
              self.focusBtnShuffleAllRollers();
            }
            self.playSound(self.soundStopRoller);
          }
        }, 25);//interval

        clearTimeout(myTimeout);
      }, 265);//timeout

    },
    
    shuffleRollerSlider3(tries){
      this.rollersInMove = true;
      const animRoller = document.querySelector('.roller-3');
      animRoller.classList.remove("stopper");
      const rollCaseTop = document.querySelector('.roller-3 .roll-case-top .img-square');
      const rollCaseMid = document.querySelector('.roller-3 .roll-case-middle .img-square');
      const rollCaseBot = document.querySelector('.roller-3 .roll-case-bottom .img-square');
      const self = this;
      let as = this.roller3;
      let count = 0;
      let maxStep = this.getRandomInt(56, 72);
      if(tries != 'firstTry'){
        maxStep = this.getRandomInt(25, 40);
        this.playSound(this.soundStartRollersSingle);
        this.disabledAllRollerSingleBtn();
      }

      let myTimeout = setTimeout(function(){
        let myInterval = setInterval(function(){
          as.unshift(as.at(-1));
          as.pop();
          rollCaseTop.style.backgroundImage = `url(${require('@/' + as[as.length-1].imgPath)})`;
          rollCaseMid.style.backgroundImage = `url(${require('@/' + as[0].imgPath)})`;
          rollCaseBot.style.backgroundImage = `url(${require('@/' + as[1].imgPath)})`;
          count++;
          if(count >= maxStep){
            clearInterval(myInterval);
            self.roller3 = as;
            self.lineTopDiag.splice(2, 1, (as[1]));
            self.lineMid.splice(2, 1, (as[0]));
            self.lineBotDiag.splice(2, 1, (as[as.length-1]));
            self.lineTopStraight.splice(2, 1, (as[as.length-1]));
            self.lineBotStraight.splice(2, 1, (as[1]));

            //animation starter/stopper
            animRoller.classList.remove("starter");
            animRoller.classList.add("stopper");

            // function here at the end of shuffle (all rollers / roller3)
            if(tries != 'firstTry'){
              self.playerTries++;
            }else{
              self.checkMostWantedWin();
            }
            self.rollersInMove = false;
            self.checkLinesWin(self.lineTopDiag, self.lineMid, self.lineBotDiag, self.lineTopStraight, self.lineBotStraight, self.playerTries);
            self.playSound(self.soundStopRoller);
          }
        }, 25);//interval
        
        clearTimeout(myTimeout);
      }, 280);//timeout
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

    checkLinesWin(t, m, b, ts, bs, playTries){
      // Check if all lines win
      if((m[0].id == m[1].id) && (m[0].id == m[2].id)){ // win by mid line
        this.playAnimation(4000);
        this.playSound(this.soundBigwin);
        this.launchFrameCaseWin('byMid');
        this.payThePlayer(m[0].value, this.playerBet, 10);
      }
      else if((t[0].id == t[1].id) && (t[0].id == t[2].id)){ // win by top line
        this.playAnimation(3000);
        this.playSound(this.soundGoodwin);
        this.launchFrameCaseWin('byTopDiag');
        this.payThePlayer(t[0].value, this.playerBet, 5);
      }
      else if((b[0].id == b[1].id) && (b[0].id == b[2].id)){ // win by bot line
        this.playAnimation(3000);
        this.playSound(this.soundGoodwin);
        this.launchFrameCaseWin('byBotDiag');
        this.payThePlayer(b[0].value, this.playerBet, 5);
      }
      else if((bs[0].id == bs[1].id) && (bs[0].id == bs[2].id)){ // win by bot staright line
        this.playAnimation(2000);
        this.playSound(this.soundMiddlewin);
        this.launchFrameCaseWin('byBotStraight');
        this.payThePlayer(b[0].value, this.playerBet, 1);
      }
      else if((ts[0].id == ts[1].id) && (ts[0].id == ts[2].id)){ // win by top straight line
        this.playAnimation(2000);
        this.playSound(this.soundMiddlewin);
        this.launchFrameCaseWin('byTopStraight');
        this.payThePlayer(ts[0].value, this.playerBet, 1);
      }

      //check if 2 lines win
      else if(((m[0].id == m[1].id) || (m[0].id == m[2].id) || (m[1].id == m[2].id)) && (playTries < this.maxChances)){
        this.launchFrameIndicatorMid();
        if(m[0].id == m[1].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-3");
        }
        else if(m[0].id == m[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-2");
        }
        else if(m[1].id == m[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-1");
        }
      }
      else if(((t[0].id == t[1].id) || (t[0].id == t[2].id) || (t[1].id == t[2].id)) && (playTries < this.maxChances)){
        this.launchFrameIndicatorTop();
        if(t[0].id == t[1].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-3");
        }
        else if(t[0].id == t[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-2");
        }
        else if(t[1].id == t[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-1");
        }
      }
      else if(((b[0].id == b[1].id) || (b[0].id == b[2].id) || (b[1].id == b[2].id)) && (playTries < this.maxChances)){
        this.launchFrameIndicatorBot();
        if(b[0].id == b[1].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-3");
        }
        else if(b[0].id == b[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-2");
        }
        else if(b[1].id == b[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-1");
        }
      }
      else if(((ts[0].id == ts[1].id) || (ts[0].id == ts[2].id) || (ts[1].id == ts[2].id)) && (playTries < this.maxChances)){
        this.launchFrameIndicatorTopStraight();
        if(ts[0].id == ts[1].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-3");
        }
        else if(ts[0].id == ts[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-2");
        }
        else if(ts[1].id == ts[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-1");
        }
      }
      else if(((bs[0].id == bs[1].id) || (bs[0].id == bs[2].id) || (bs[1].id == bs[2].id)) && (playTries < this.maxChances)){
        this.launchFrameIndicatorBotStraight();
        if(bs[0].id == bs[1].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-3");
        }
        else if(bs[0].id == bs[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-2");
        }
        else if(bs[1].id == bs[2].id){
          this.undisabledRollerSingleBtn("#btn-shuffle-roller-1");
        }
      }
      else{ // Player Lose
        this.playerIsPlaying = false;
        this.removeSquareFrameLighter();
        //console.log("Perdu à Perdido... Red is dead !");
        this.playerStrokesLoses++;
        this.playerCoinsLoses += this.playerBet;
        this.$store.dispatch('setUserTotalCoins', this.totalCoins);
        this.checkIfPlayerCanPlay();
        this.focusBtnShuffleAllRollers();
      }
      
    },

    checkMostWantedWin(){
      const wanted = this.mostWantedItem.id;
      const wantedValue = 1; //this.mostWantedItem.value;
      const ms = this.lineMid;
      const bs = this.lineBotStraight;
      const ts = this.lineTopStraight;
      let winArray = [];
      for(let i=0; i<3; i++){
        if(ms[i].id == wanted){
          winArray.push('s' + (4+i)); // push cases's number
        }
      }
      for(let i=0; i<3; i++){
        if(bs[i].id == wanted){
          winArray.push('s' + (7+i)); // push cases's number
        }
      }
      for(let i=0; i<3; i++){
        if(ts[i].id == wanted){
          winArray.push('s' + (i+1)); // push cases's number
        }
      }
      if(winArray.length > 0){
        const itemsFound = winArray.length;
        this.payThePlayerForSpecialWanted(wantedValue, this.playerBet, itemsFound);
        // No animation duration needed
      }
    },

    presentRollersAtWelcome(roller, as){
      const rollCaseTop = document.querySelector(`.${roller} .roll-case-top .img-square`);
      const rollCaseMid = document.querySelector(`.${roller} .roll-case-middle .img-square`);
      const rollCaseBot = document.querySelector(`.${roller} .roll-case-bottom .img-square`);
      rollCaseTop.style.backgroundImage = `url(${require('@/' + as[as.length-1].imgPath)})`;
      rollCaseMid.style.backgroundImage = `url(${require('@/' + as[0].imgPath)})`;
      rollCaseBot.style.backgroundImage = `url(${require('@/' + as[1].imgPath)})`;
    },

    animRollerStart(roller){
      const animRoller = document.querySelector(roller);
      animRoller.classList.add("starter");
    },

    undisabledRollerSingleBtn(btnActive){
      const btnToActive = document.querySelector(btnActive);
      btnToActive.removeAttribute("disabled");
      btnToActive.focus();
    },

    focusBtnShuffleAllRollers(){
      const btnToActive = document.querySelector('#btn-shuffle-all-rollers');
      btnToActive.focus();
    },

    disabledAllRollerSingleBtn(){
      document.querySelector("#btn-shuffle-roller-1").setAttribute("disabled", "");
      document.querySelector("#btn-shuffle-roller-2").setAttribute("disabled", "");
      document.querySelector("#btn-shuffle-roller-3").setAttribute("disabled", "");
    },

    removeSquareFrameLighter(){
      const imgSquare = document.querySelectorAll(".img-square");
      imgSquare.forEach(function(remClass){
        remClass.classList.remove('lightersquare');
      });
    },
    
    launchFrameIndicatorTop(){
      this.playSound(this.soundBlic);
      const s1 = document.querySelector(".s1");
      const s5 = document.querySelector(".s5");
      const s9 = document.querySelector(".s9");
      s1.classList.add('lightersquare');
      s5.classList.add('lightersquare');
      s9.classList.add('lightersquare');
    },

    launchFrameIndicatorMid(){
      this.playSound(this.soundSword1);
      const s4 = document.querySelector(".s4");
      const s5 = document.querySelector(".s5");
      const s6 = document.querySelector(".s6");
      s4.classList.add('lightersquare');
      s5.classList.add('lightersquare');
      s6.classList.add('lightersquare');
    },

    launchFrameIndicatorBot(){
      this.playSound(this.soundBlic);
      const s3 = document.querySelector(".s3");
      const s5 = document.querySelector(".s5");
      const s7 = document.querySelector(".s7");
      s3.classList.add('lightersquare');
      s5.classList.add('lightersquare');
      s7.classList.add('lightersquare');
    },

    launchFrameIndicatorTopStraight(){
      this.playSound(this.soundBlic2);
      const s1 = document.querySelector(".s1");
      const s2 = document.querySelector(".s2");
      const s3 = document.querySelector(".s3");
      s1.classList.add('lightersquare');
      s2.classList.add('lightersquare');
      s3.classList.add('lightersquare');
    },

    launchFrameIndicatorBotStraight(){
      this.playSound(this.soundBlic2);
      const s7 = document.querySelector(".s7");
      const s8 = document.querySelector(".s8");
      const s9 = document.querySelector(".s9");
      s7.classList.add('lightersquare');
      s8.classList.add('lightersquare');
      s9.classList.add('lightersquare');
    },

    launchFrameCaseWin(winDirection){
      const fc1   = document.querySelector(".fc1");
      const fc2   = document.querySelector(".fc2");
      const fc3   = document.querySelector(".fc3");
      const fc4   = document.querySelector(".fc4");
      const fc5   = document.querySelector(".fc5");
      const fc6   = document.querySelector(".fc6");
      const fc7   = document.querySelector(".fc7");
      const fc8   = document.querySelector(".fc8");
      const fc9   = document.querySelector(".fc9");
      const s1    = document.querySelector(".s1");
      const s2    = document.querySelector(".s2");
      const s3    = document.querySelector(".s3");
      const s4    = document.querySelector(".s4");
      const s5    = document.querySelector(".s5");
      const s6    = document.querySelector(".s6");
      const s7    = document.querySelector(".s7");
      const s8    = document.querySelector(".s8");
      const s9    = document.querySelector(".s9");

      if(winDirection == 'byTopDiag'){
        fc1.classList.add('active');
        fc2.classList.add('greyed');
        fc3.classList.add('greyed');
        fc4.classList.add('greyed');
        fc5.classList.add('active');
        fc6.classList.add('greyed');
        fc7.classList.add('greyed');
        fc8.classList.add('greyed');
        fc9.classList.add('active');
        s1.classList.add('activeSizeWin');
        s5.classList.add('activeSizeWin');
        s9.classList.add('activeSizeWin');

      }
      else if(winDirection == 'byMid'){
        fc1.classList.add('greyed');
        fc2.classList.add('greyed');
        fc3.classList.add('greyed');
        fc4.classList.add('active');
        fc5.classList.add('active');
        fc6.classList.add('active');
        fc7.classList.add('greyed');
        fc8.classList.add('greyed');
        fc9.classList.add('greyed');
        s4.classList.add('activeSizeWin');
        s5.classList.add('activeSizeWin');
        s6.classList.add('activeSizeWin');
      }
      else if(winDirection == 'byBotDiag'){
        fc1.classList.add('greyed');
        fc2.classList.add('greyed');
        fc3.classList.add('active');
        fc4.classList.add('greyed');
        fc5.classList.add('active');
        fc6.classList.add('greyed');
        fc7.classList.add('active');
        fc8.classList.add('greyed');
        fc9.classList.add('greyed');
        s3.classList.add('activeSizeWin');
        s5.classList.add('activeSizeWin');
        s7.classList.add('activeSizeWin');
      }
      else if(winDirection == 'byBotStraight'){
        fc1.classList.add('greyed');
        fc2.classList.add('greyed');
        fc3.classList.add('greyed');
        fc4.classList.add('greyed');
        fc5.classList.add('greyed');
        fc6.classList.add('greyed');
        fc7.classList.add('active');
        fc8.classList.add('active');
        fc9.classList.add('active');
        s7.classList.add('activeSizeWin');
        s8.classList.add('activeSizeWin');
        s9.classList.add('activeSizeWin');
      }
      else if(winDirection == 'byTopStraight'){
        fc1.classList.add('active');
        fc2.classList.add('active');
        fc3.classList.add('active');
        fc4.classList.add('greyed');
        fc5.classList.add('greyed');
        fc6.classList.add('greyed');
        fc7.classList.add('greyed');
        fc8.classList.add('greyed');
        fc9.classList.add('greyed');
        s1.classList.add('activeSizeWin');
        s2.classList.add('activeSizeWin');
        s3.classList.add('activeSizeWin');
      }
    },

    removeAllFrameCaseWin(){
      const fc1   = document.querySelector(".fc1");
      const fc2   = document.querySelector(".fc2");
      const fc3   = document.querySelector(".fc3");
      const fc4   = document.querySelector(".fc4");
      const fc5   = document.querySelector(".fc5");
      const fc6   = document.querySelector(".fc6");
      const fc7   = document.querySelector(".fc7");
      const fc8   = document.querySelector(".fc8");
      const fc9   = document.querySelector(".fc9");
      const s1    = document.querySelector(".s1");
      const s2    = document.querySelector(".s2");
      const s3    = document.querySelector(".s3");
      const s4    = document.querySelector(".s4");
      const s5    = document.querySelector(".s5");
      const s6    = document.querySelector(".s6");
      const s7    = document.querySelector(".s7");
      const s8    = document.querySelector(".s8");
      const s9    = document.querySelector(".s9");

      fc1.classList.remove('greyed', 'active');
      fc2.classList.remove('greyed', 'active');
      fc3.classList.remove('greyed', 'active');
      fc4.classList.remove('greyed', 'active');
      fc5.classList.remove('greyed', 'active');
      fc6.classList.remove('greyed', 'active');
      fc7.classList.remove('greyed', 'active');
      fc8.classList.remove('greyed', 'active');
      fc9.classList.remove('greyed', 'active');

      s1.classList.remove('activeSizeWin');
      s2.classList.remove('activeSizeWin');
      s3.classList.remove('activeSizeWin');
      s4.classList.remove('activeSizeWin');
      s5.classList.remove('activeSizeWin');
      s6.classList.remove('activeSizeWin');
      s7.classList.remove('activeSizeWin');
      s8.classList.remove('activeSizeWin');
      s9.classList.remove('activeSizeWin');
    },

    payThePlayer(value, playerBet, multiplier){
      this.playerIsPlaying = false;
      this.totalCoinsAncient = this.totalCoins;
      this.playerStrokesWins++;
      this.removeSquareFrameLighter();
      const gains = (playerBet * value * multiplier) // + playerBet; // + playerBet || 0;
      this.lastGains = gains;
      this.playerCoinsGains += gains - playerBet;
      this.totalCoins += gains;
      const realProfitGains = gains; //= gains - playerBet; // if + playerBet || 0;
      this.launchAnimationGains(realProfitGains);
      this.$store.dispatch('setUserTotalCoins', this.totalCoins);
    },
    
    launchAnimationGains(gains){
      const gainsSpan = document.querySelector('.gains-span');
      gainsSpan.innerHTML = "+" + gains;
      const gainsContainer = document.querySelector('.gains-container');
      gainsContainer.classList.add("active");
    },

    payThePlayerForSpecialWanted(wantedValue, playerBet, itemsFound){
      this.totalCoinsAncient = this.totalCoins;
      this.itemsFoundForSpecialWanted = itemsFound;
      const gains = (playerBet * wantedValue * itemsFound);
      this.lastGains = gains;
      this.playerCoinsGains += gains - playerBet;
      this.totalCoins += gains;
      this.$store.dispatch('setUserTotalCoins', this.totalCoins);
      this.launchAnimationSpecialWanted();
    },

    launchAnimationSpecialWanted(){
      const activeDiv = document.querySelector('.special-wanted-container');
      activeDiv.classList.add('active-win-anim');
      let myTimeout = setTimeout(function(){
        activeDiv.classList.remove('active-win-anim');
        clearTimeout(myTimeout);
      }, 2500);//timeout
    },


    removeAnimationActiveGains(){
      const gainsContainer = document.querySelector('.gains-container');
      gainsContainer.classList.remove("active");
    },

    playAnimation(duration){
      this.gameIsPlayingAnimation = true;
      const btnShuffle = document.querySelector('#btn-shuffle-all-rollers');
      btnShuffle.setAttribute("disabled", "");
      const self = this;
      let myTimeout = setTimeout(function(){
        self.gameIsPlayingAnimation = false;
        self.checkIfPlayerCanPlay();
        self.removeAllFrameCaseWin();
        self.removeAnimationActiveGains();
        self.focusBtnShuffleAllRollers();
        clearTimeout(myTimeout);
      }, duration);//timeout
      
    },

    checkIfPlayerCanPlay(){
      const btnShuffle = document.querySelector('#btn-shuffle-all-rollers');
      if(this.totalCoins < this.playerBet){
        btnShuffle.setAttribute("disabled", "");
        if(this.totalCoins < 5){
          this.playerBet = 1;
        }
        else if(this.totalCoins >= 5 && this.totalCoins < 10){
          this.playerBet = 5;
        }
        else if(this.totalCoins >= 10 && this.totalCoins < 25){
          this.playerBet = 10;
        }
      }else if((this.totalCoins >= this.playerBet) && (this.gameIsPlayingAnimation == false) && (this.rollersInMove == false)){
        btnShuffle.removeAttribute("disabled", "");
      }
    },


    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return (Math.floor(Math.random() * (max - min + 1)) + min);
    },

    playSound(soundFx){
      if(this.valueVolumeFx>0){
        const myAudio = new Audio(soundFx);
        myAudio.volume = this.valueVolumeFx/10;
        myAudio.play();
      }
    },

    randomChanceNewSpecialWanted(){
      const randomNumber = this.getRandomInt(1, 10);
      if(randomNumber == 1){
        this.defineMostWantedItem();
        this.playCannonBallAnimation();
      }
    },

    playCannonBallAnimation(){
      const fireDom = document.querySelector('.cannonball-fire .sprite');
      fireDom.classList.add('active-fire');
      let myTimeout = setTimeout(function(){
        fireDom.classList.remove('active-fire');
        clearTimeout(myTimeout);
      }, 1500);//timeout
      this.playSound(this.soundCannonBall);
    },

    counterUp(totalCoinsAncient, totalCoins){
      const counterDom = document.querySelector('.player-counter-coins');
      let startValue = totalCoinsAncient;
      let endValue = totalCoins;
      let duration = 100;
      let step = 1;
      let interval = (endValue - startValue);
      if(interval >= 1000){
        duration = 1;
        step = 12;
      }else if(interval >= 100 && interval < 1000){
        duration = 1;
        step = 4;
      }else if(interval < 100 && interval >= 20){
        duration = 40;
      }

      let counter = setInterval(function(){
        startValue += step;
        counterDom.innerHTML = startValue;
        if(step > 1){
          if(startValue >= (endValue - step)){
            counterDom.innerHTML = endValue;
            clearInterval(counter);
          }
        }else if(startValue >= (endValue)){
          counterDom.innerHTML = endValue;
          clearInterval(counter);
        }
      }, duration);
    }

  }
}
</script>

<style lang="scss">
.jackpot{
  z-index: 1;
  position: relative;
  height: 100vh;

  video{
    position: fixed;
    top: -22px;
    right: 0;
    z-index: -99;
    overflow: hidden;
    min-height: 100%;
  }

  .jackpot-game{
    margin-top: 1rem;

    .message-nomoney{
      position: relative;
      p{
        position: absolute;
        z-index: 100;
        width: 100%;
        top: 10px;
        left: -8px;
        scale: 0.9;
        background-color: rgb(162, 46, 46);
        color: var(--yellow);
        font-family: 'Cinzel', serif;
        font-size: 1.6em;
        padding: .4em;
      }
    }

    .game-container{
      background-color: rgba(255, 255, 255, 0.2);
      margin-bottom: .7rem;
      border-radius: 8px;
      backdrop-filter: blur(3px);
      padding: 1em;
      overflow: hidden;

      .wanted-and-jackpot{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        
        .special-wanted-container{
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          padding: 1em;
          width: 200px;
  
          h3{
            font-family: 'Pirata one', serif;
            font-size: 1.5em;
            min-height: 25px;
          }
  
          .img-text-container{
            position: relative;
  
            .border-img{
              display: inline-block;
              border: 2px solid rgb(180, 147, 84);
              border-radius: 10px;
              margin: .7em auto;
              width: fit-content;
  
              #most-wanted-img{
                width: 90px;
                height: 90px;
                background-repeat: no-repeat;
              }
            }
            .win-text{
              position: absolute;
              top: 60%;
              left: 70%;
              transform: translate(-50%, -50%);
              text-shadow: 2px 2px 2px var(--black);
              color: var(--white);
  
              .multiplier{
                opacity: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                rotate: -12deg;
                font-size: 2em;
                font-weight: bold;
                color: var(--white);
                margin-left: .2em;
                .items-found{
                  font-weight: bold;
                  font-size: 3rem;
                  font-family: 'Luckiest Guy', cursive;
                }
              }
            }
          }
  
          .wanted-name{
            color: orange;
            font-weight: bold;
          }
  
          .wanted-value{
            font-family: 'Cinzel', sans-serif;
          }
  
          .wanted-condition{
            font-size: .8em;
            width: fit-content;
            padding: .2em .8em;
            background: rgb(163, 163, 163);
            color: var(--black44);
            margin: .4em auto;
            border-radius: 10px;
          }
        }
        .special-wanted-container.active-win-anim{
          h3{
            animation: winSpecialWantedTextH3 2.2s ease-in-out;
          }
          .multiplier{
            opacity: 1;
            animation: winSpecialWantedTextMultiplier 2.5s linear;
          }
          #most-wanted-img{
            animation: winSpecialWantedImg .8s ease-in-out;
          }
          
        }
        
        .frame-background{
          position: relative;
          margin: 1.5rem;
  
          .frame{
            position: relative;
            width: fit-content;
            outline: 14px solid rgb(39, 38, 35);
    
    
            .most-wanted-container.active-win-anim{
              h3{
                animation: winSpecialWantedTextH3 2.2s ease-in-out;
              }
              .multiplier{
                opacity: 1;
                animation: winSpecialWantedTextMultiplier 2.5s linear;
              }
              #most-wanted-img{
                animation: winSpecialWantedImg .8s ease-in-out;
              }
              
            }
    
            .frame-celebrations{
              position: absolute;
              content: '';
              z-index: 2;
              top: 0;
              left: 4px;
              width: 100%;
              height: 100%;
    
              .all-frame-cases{
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-top: 1px;
      
                .frame-case{
                  color: var(--black44);
                  width: 96px;
                  height: 96px;
                }
                .fc2, .fc5, .fc8{
                  margin: 0 6px;
                }
    
                .frame-case.active{
                  z-index: 8;
                  box-shadow: inset 0 0 2px var(--yellow), inset 0 0 6px var(--yellow), inset 0 0 12px var(--yellow);
                }
                .fc1.active, .fc4.active, .fc7.active{
                  animation: winFrameCases 2s ease-out;
                  animation-delay: .1s;
                }
                .fc2.active, .fc5.active, .fc8.active{
                  animation: winFrameCases 2s ease-out;
                  animation-delay: .2s;
                }
                .fc3.active, .fc6.active, .fc9.active{
                  animation: winFrameCases 2s ease-out;
                  animation-delay: .3s;
                }
    
                .frame-case.greyed{
                  background-color: rgba(0, 0, 0, 0.7);
                }
              }
            }
    
            .rollers{
              position: relative;
              display: flex;
              justify-content: center;
              border: 1px solid var(--black);
              overflow: hidden;
    
              .roller-border{
                border-right: 3px solid var(--black);
                border-left: 3px solid var(--black);
    
                .roller{
                  width: 96px;
                  height: 100%;
                  transform: translateY(0px);
                  padding: 0;
                  margin: 0;
                  
                  .roll-case{
                    position: relative;
                    width: 100%;                
                    
                    .img-square{
                      width: 96px;
                      height: 96px;
                      background: transparent;
                      background-size: 86%;
                      background-position: center;
                      background-repeat: no-repeat;
                      z-index: 100;
                    }
                    .img-square.lightersquare::after{
                      position: absolute;
                      content: '';
                      border-radius: 12px;
                      border: 2px solid var(--yellowpirates);
                      box-shadow: inset 0 0 2px rgb(255, 221, 141), inset 0 0 6px rgb(255, 221, 141), inset 0 0 12px rgb(255, 221, 141);
                      top: 1px;
                      left: 1px;
                      width: 90px; 
                      height: 90px;
                      animation: squaredance 1.5s infinite ease-in-out;
                    }
                    .s1.activeSizeWin, .s3.activeSizeWin, .s4.activeSizeWin, .s5.activeSizeWin, .s6.activeSizeWin, .s7.activeSizeWin, .s9.activeSizeWin{
                      border-radius: 15px;
                      transform-style: preserve-3d;
                      perspective: 1000px;
                      animation: squareSizeWin 2s linear;
                      animation-delay: .1s;
                      
                    }
                    .s5.activeSizeWin{
                      animation-delay: .2s;
                    }
                    .s3.activeSizeWin, .s6.activeSizeWin, .s9.activeSizeWin{
                      animation-delay: .3s;
                    }
                  }
                }
                .roller::before, .roller::after{
                  position: absolute;
                  content: '';
                  left: 0;
                  height: 30px;
                  width: 96px;
                }
                .roller::before{
                  top: -30px;
                }
                .roller::after{
                  bottom: -30px; 
                }
                .roller.white{
                  background: var(--white);
                }
                .roller.white::before, .roller.white::after{
                  background: var(--white);
                }
                .roller.grey{
                  background: #50606c;
                }
                .roller.grey::before, .roller.grey::after{
                  background: #50606c;
                }
    
                .roller-1.starter{
                  animation: rollerToStart .26s ease-in;
                }
                .roller-2.starter{
                  animation: rollerToStart .3s ease-in;
                }
                .roller-3.starter{
                  animation: rollerToStart .34s ease-in;
                }
                .roller-1.stopper, .roller-2.stopper, .roller-3.stopper{
                  animation: rollerToStop .3s ease-out;
                }
                
                .starter .isRolling{
                  position: absolute;
                  content: '';
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 300%;
                  z-index: 1;
                  background: url('../assets/img/wallpaper/stripes-rolling102.png');
                  opacity: 0;
                  animation: rollerIsRolling .12s infinite linear; //.38
                }
                .roller-1.starter .isRolling{
                  animation-delay: .26s;
                }
                .roller-2.starter .isRolling{
                  animation-delay: .3s;
                }
                .roller-3.starter .isRolling{
                  animation-delay: .34s;
                }
              }
            }
            .rollers::before{
              position: absolute;
              content: '';
              z-index: 1;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(rgba(0, 0, 0, 0.25) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.25) 100%);
            }
    
            .gains-container{
              position: relative;
    
              .gains-box{
                position: absolute;
                opacity: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                z-index: 10;
                
                .gains-span{
                  display: block;
                  font-family: 'Luckiest Guy', cursive;
                  text-shadow: 0 0 2px var(--black), 0 0 4px var(--black), 0 0 10px var(--black);
                  color: var(--yellow);
                  font-size: 4em;
                }
              }
            }
            .gains-container.active .gains-box{
              animation: gainsBoxAnim 1.5s ease-in-out;
    
              .gains-span{
                animation: gainsSpanAnim 1.5s ease-in-out;
              }
            }
            
          }
        }
      }
      
      
      .infos-player{
        .player-counter-coins-container{
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('../assets/img/wallpaper/money-banner2.png') no-repeat;
          background-size: 200px;
          background-position: center;
          width: 200px;
          height: 60px;
          font-family: 'Cinzel', serif;
          font-weight: bold;
          color: var(--black44);

          .player-counter-coins{
            font-size: 1.7em;
            margin-left: .5em;
          }
        }
        .last-gains{
          position: relative;
          padding: 0 1em;
          margin: 0 auto;
          color: rgb(244, 205, 133);
          width: fit-content;
          font-family: 'Cinzel', serif;
          font-weight: 600;
        }
      } 
    }

    .dashboard{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      backdrop-filter: blur(3px);
      padding: 1em;
      margin-bottom: 2.5rem;
      overflow: hidden;
      

      .dashboard-bet, .dashboard-action{
        padding: .6rem 1rem;
        border: 2px solid var(--grey99);
        border-radius: 12px;
        color: white;
        h3{
          margin-bottom: .7em;
          font-size: 1.2em;
        }
        
        button{
          margin: .3em;
          height: fit-content;
          width: 120px !important;
        }
      }

      .dashboard-bet{
        grid-column: 1 / 1;
      } 
      .dashboard-action{
        grid-column: 2 / 4;
      }

      .dashboard-action{
        .buttons-actions-group{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          
          .spin-line-btn{
            grid-column: 1 / 3;
          }

          .spin-all-btn{
            grid-column: 3 / 3;
            
          }
        }
      } 
    }

    .work-in-progress{
      button{
        margin: .5em;
      }
    }
  }
}

@keyframes squaredance {
  0% { transform: scale(.9,.9); }
  50%   { transform: scale(1,1); }
  100% { transform: scale(.9,.9); }
}

@keyframes winSpecialWantedTextMultiplier {
  0%  { scale:0; opacity: 1; transform: translate(-90px, -30px); color: var(--white)}
  30% { scale:1.1; transform: translate(0, 0);}
  50% { scale:1; }
  80% { scale:1.1; opacity: 1; transform: translate(0, 0);}
  90% { scale:1; }
  100%{ scale:.8; opacity: 0; color: orange;}
}

@keyframes winSpecialWantedTextH3 {
  0%  { scale:1; }
  20% { color: white; text-shadow: 0 0 2px var(--white), 0 0 10px var(--white);}
  50% { scale:1.2; }
  80% { scale:1.2; color: white; text-shadow: 0 0 2px var(--white), 0 0 10px var(--white);}
  100%{ scale:1;}
}

@keyframes winSpecialWantedImg {
  0%{ scale: 1; }
  25%{ transform: scale(1.8, 1.2); rotate: -5deg; }
  32%{ transform: scale(0.7, 1.4); }
  50%{ transform: scale(1.5, 1.2); }
  70%{ transform: scale(0.9, 1.3); }
  85%{ transform: scale(1.1, 1); }
  100%{ transform: scale(1, 1); rotate: 0; }

}

@keyframes rollerToStart {
  0% { transform: translateY(0px); }
  90%   { transform: translateY(-30px); }
  100%   { transform: translateY(0px); }
}

@keyframes rollerIsRolling {
  from { top: -1824px; opacity: .3;}
  to   { top: 0px; opacity: .3;}
}

@keyframes rollerToStop {
  0% { transform: translateY(0px); }
  30%   { transform: translateY(30px); }
  100%   { transform: translateY(0px); }
}

@keyframes winFrameCases {
  0%  { 
    transform: scale(0,0); 
    box-shadow: 0 0 2px var(--yellow), 
    0 0 4px var(--yellow), 
    0 0 8px var(--yellow), 
    0 0 16px var(--yellow), 
    0 0 32px var(--yellow),
    inset 0 0 2px var(--yellow), 
    inset 0 0 4px var(--yellow), 
    inset 0 0 8px var(--yellow),
    inset 0 0 16px var(--yellow);
    background: var(--yellow);
  }
  10% { transform: scale(1.3, 1.3);}
  20% { transform: scale(1,1); }
  30% { transform: scale(1.2, 1.2);
  background: inherit;
  }
  40% { transform: scale(1,1); opacity: 1;}
  50% { transform: scale(1.2, 1.2);}
  65% { transform: scale(1,1); }
  80% { 
    transform: scale(1.1, 1.1);
    box-shadow: 0 0 2px var(--yellow), 
    0 0 4px var(--yellow), 
    0 0 8px var(--yellow), 
    0 0 16px var(--yellow), 
    0 0 32px var(--yellow),
    inset 0 0 2px var(--yellow), 
    inset 0 0 4px var(--yellow), 
    inset 0 0 8px var(--yellow),
    inset 0 0 16px var(--yellow);
  }
  100%{ transform: scale(1,1); opacity: 0;}
}

@keyframes squareSizeWin {
  0%  { scale: 1; transform: rotateY(0deg);}
  10%{ transform: rotateY(360deg);}
  25% { scale: .9; transform: rotateY(0deg);}
  50% { scale: 1; transform: rotateY(0deg);}
  75% { scale: 1.1; transform: rotateY(0deg);}
  100%{ scale: 1; transform: rotateY(0deg);}
}

@keyframes gainsBoxAnim {
  0%  { 
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  75% { 
    opacity: 1;
    bottom: 100px;
  }
  100%{ 
    opacity: 0;
    bottom: 100px;
  }
}

@keyframes gainsSpanAnim {
  75% { 
    transform: scale(1,1);
    color: var(--yellow);
  }
  100%{ 
    transform: scale(2,2);
    color: var(--white);
  }
}

@media only screen and (max-width: 1200px) {
  .jackpot{
    .jackpot-game{
      .dashboard-action{
        .buttons-actions-group{
          .spin-line-btn{
            grid-column: 1 / 2 !important;
          }

          .spin-all-btn{
            grid-column: 2 / 4 !important;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  .jackpot{
    .jackpot-game{
      .dashboard-action{
        .buttons-actions-group{
          display: flex !important;
          justify-content: center;
          flex-wrap: wrap-reverse;
          .spin-all-btn{
            width: 200px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .jackpot .btn-options-container{
    position: fixed;
    width: fit-content;
    height: fit-content;
    top: 5px;
    left: 98px;
  }
}
@media only screen and (max-width: 576px) {
  .jackpot{
    .jackpot-game{
      margin-top: .3rem;
      font-size: .7em;

      .game-container{
        .wanted-and-jackpot{
          .special-wanted-container{
            background-color: rgba(20, 53, 74, 0.764);
            width: 100%;
            font-size: .7rem;
            padding: 0.3rem;
            .most-wanted{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: nowrap;
              
              .img-text-container{
                .border-img{
                  margin: 0 1.5em;
      
                  #most-wanted-img{
                    width: 50px;
                    height: 50px;
                  }
                }
              }
            }
          }
          .frame-background{
            margin: 1rem;
            .frame{
              overflow: hidden;
              .frame-celebrations{
                .all-frame-cases{
                  .frame-case{
                    width: 76px;
                    height: 76px;
                  }
                }
              }
              .rollers{
                .roller-border{
                  .roller{
                    width: 76px;
                    .roll-case{
                      .img-square{
                        width: 76px;
                        height: 76px;
                      }
                      .img-square.lightersquare::after{
                        width: 72px; 
                        height: 72px;
                      }
                    }
                  }
                  .roller::before, .roller::after{
                    width: 76px;
                  }
                }
              }
            }
          }
        }

        .infos-player{
          font-size: .7rem;
          .player-counter-coins-container{
            margin: .2rem auto;
            width: 162px;
            height: 30px;
          }
        }
      }

      .dashboard{
        display: flex !important;
        justify-content: center;
        flex-wrap: wrap-reverse;

        // -----------------------------------------------------------------------------
        .dashboard-bet, .dashboard-action{
          padding: .3rem;
          border: 2px solid var(--grey99);
          border-radius: 6px;
          color: white;
          h3{
            margin-bottom: .4em;
            font-size: .7rem;
            font-weight: bold;
          }
          
          button{
            margin: .3em;
            height: fit-content;
            width: 120px !important;
            font-size: .9rem !important;
          }
        }
        .dashboard-action .buttons-actions-group .spin-line-btn{
          display: flex;
          justify-content: flex-start;
          .btn-custom.btn-solid-grey{
            width: fit-content !important;
            padding: 8px 20px !important;
          }
        }
        // -----------------------------------------------------------------------------
      }

    }
  }
}


</style>