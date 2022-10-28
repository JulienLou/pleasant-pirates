<template>
  <div class="bloc-modale" v-show="reveleModaleHome">
    <div class="overlay" @click="toggleModaleHome"></div>
    <div class="modale card" id="modale-home">
      <div class="sitting-man"></div>
      <div class="modale-head">
        <h2>Bienvenue</h2>
        <!-- <div class="btn-modale btn btn-outline-info py-0" @click="toggleModaleHome">x</div> -->
        <!-- <a class="btn-close-modale p-2 bold fs-5" @click="toggleModaleHome"
          ><i class="fa-regular fa-circle-xmark"></i
        ></a> -->
      </div>
      <div class="modale-body text-secondary">
        <p>
          Pleasant Pirates vous propose des mini-jeux gratuits et nous ne servons
          <span class="bold">aucun cookie</span> ni
          <span class="bold">aucune publicité</span>.
        </p>
        <p>
          Vos scores sont enregistrés dans votre navigateur, de ce fait lorsque
          vous fermerez ce dernier, vos scores seront automatiquement
          réinitialisés.
        </p>

        <div class="sound-container">
					<p>
						Souhaitez-vous jouer avec les effets sonores ? Vous pourrez à
						tout moment changer les réglages dans le menu "options" des jeux.
					</p>
					<div class="sound-option">
						<div v-if="valueVolumeFx > 0" @click="valueVolumeFx = 0" class="data-volume">
							<i class="fa-solid fa-volume-high"></i>
							<div class="active">Activé</div>
						</div>
						<div v-else @click="valueVolumeFx = 10" class="data-volume">
							<i class="fa-solid fa-volume-xmark"></i>
							<div class="unactive">Désactivé</div>
						</div>
						<!-- <i class="fa-solid fa-volume-high" @click="valueVolumeFx = 0"></i>
						<i class="fa-solid fa-volume-xmark" @click="valueVolumeFx = 10"></i> -->
						<!-- <input type="range" min="0" max="10" step="1" v-model="valueVolumeFx"> -->
						<!-- <span class="data-volume">{{ valueVolumeFx > 0 ? "" : "" }}</span> -->
					</div>
				</div>

        <button class="btn-custom btn-solid-green" @click="toggleModaleHome(), freeMoney()">Continuer</button>
        <!-- <div>
          <button class="btn-custom btn-solid-red" @click="playerIsOK()">Communiquer</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModaleHome",
  props: ["reveleModaleHome", "toggleModaleHome"],

  data() {
    return {
      valueVolumeFx: 10,
      valueVolumeMusic: 5,
      totalCoins: 0
    };
  },

  mounted() {
    if (localStorage.getItem("volumeEffects")) {
      this.valueVolumeFx = Number(localStorage.getItem("volumeEffects"));
    }

    // User Total Coins
    if (localStorage.getItem("userTotalCoins")) {
      this.totalCoins = Number(localStorage.getItem("userTotalCoins"));
    }
  },

  watch: {
    valueVolumeFx() {
      this.$store.dispatch("setVolumeEffects", this.valueVolumeFx);
    },
  },

  methods : {

    freeMoney(){
      if(this.totalCoins == 0 && !localStorage.getItem("userTotalCoins")){
        this.$store.dispatch('setUserTotalCoins', 25);
        this.totalCoins = 25;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #modale-home{
    overflow: initial;
    background-color: var(--white);
    color: var(--grey65);
  }

  .modale {
    position: relative;
    max-width: 500px;
    margin: 5px;
		
    .sitting-man{
      position: absolute;
      z-index: 1;
      content: '';
      top: -47px;
      right: 10px;
      width: 100px;
      height: 120px;
      background: url('../assets/img/wallpaper/penguin1.png') no-repeat !important;
      background-size: contain !important;
    }
    
    .modale-head {
      position: relative;
      padding: 12px 60px;
      //background-color: var(--bluemedium1) !important;
      background: linear-gradient(var(--bluemedium1), var(--bluedark2) 80%);

      h2 {
        font-family: 'Play', sans-serif;
        font-weight: bold;
        font-size: 2em;
      }

      .btn-modale {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }

    .modale-body {
      position: relative;
      padding: 12px;
      overflow: hidden;
			p {
				text-align: start;
				margin: 1em 0;
				line-height: 1.2em;
			}

			.sound-container{
				display: flex;
				justify-content: flex-start;
				align-items: center;

				p {
					text-align: start;
					margin: 1em 0;
					line-height: 1.2em;
					width: 70%;
				}
	
				.sound-option {
					margin: 0 auto;
					i {
						font-size: 2.2em;
						width: 38px;
					}
	
					.data-volume {
						cursor: pointer;
	
						.active, .unactive{
							font-weight: bold;
							font-size: 1.1em;
							margin-top: .5em;
						}
						.active {
							color: green;
						}
						.unactive {
							color: red;
						}
					}
				}
			}

      button {
        margin: 3.5em 0 2em 0;
      }
    }

    .modale-body::before{
      position: absolute;
      z-index: -1;
      content: '';
      opacity: .1;
      top: 10px;
      left: 40px;
      //transform: translateX(-50%);
      width: 100%;
      height: 100%;
      background: url('../assets/img/wallpaper/boatshadow1.png') no-repeat !important;
      background-size: 60% !important;
    }
  }
  
}
</style>