<template>
  <div class="music-options">
    <button class="button-music-options btn-custom btn-solid-white btn-small" @click="this.musicPlayerVisible = !this.musicPlayerVisible, toggleThePlayer()">
      <i class="fa-solid fa-music"></i> Musique
    </button>
  </div>
  <div class="track-player">
    <section class="player">
      <h3>Lecteur du pirate</h3>
      <div class="btn-close-container">
        <button class="btn-close-modale bold" @click="this.musicPlayerVisible = !this.musicPlayerVisible, toggleThePlayer()"><i class="fa-regular fa-circle-xmark"></i></button>
      </div>
      <audio id="audio" :src="trackToPlay" loop></audio>
      <div class="controls">
        <button class="prev btn-custom btn-solid-white btn-small" @click="prev">Prev</button>
        <button class="play btn-custom btn-solid-white" v-if="!isPlaying" @click="play">Play</button>
        <button class="pause btn-custom btn-solid-white" v-else @click="pause">Stop</button>
        <button class="next btn-custom btn-solid-white btn-small" @click="next">Next</button>
      </div>
      <div class="options-settings">
        <SetVolumeMusic @valueVolMusic="updateVolumeMusic" />
      </div>
    </section>
    <section class="playlist">
      <h3>Playlist</h3>
      <button :class="{selsong: index == 1}" @click="jumpToTrackAt(1, 1)">Pirate's Moon - Alexander Nakarada</button>
      <button :class="{selsong: index == 2}" @click="jumpToTrackAt(146, 2)">The Pirate King - Untold Journey</button>
      <button :class="{selsong: index == 3}" @click="jumpToTrackAt(309, 3)">Jolly Roger - Kraken & Friends</button>
      <button :class="{selsong: index == 4}" @click="jumpToTrackAt(483, 4)">Pirates out for Blood - Miguel Johnson</button>
      <button :class="{selsong: index == 5}" @click="jumpToTrackAt(780, 5)">Skye Cuillin - Kevin MacLeod</button>
      <button :class="{selsong: index == 6}" @click="jumpToTrackAt(970, 6)">Silverman Studious - The Buccaneer's Haul</button>
      <button :class="{selsong: index == 7}" @click="jumpToTrackAt(1130, 7)">Traveler Intro - Alexander Nakarada</button>
      <button :class="{selsong: index == 8}" @click="jumpToTrackAt(1251, 8)">Traveler Theme - Alexander Nakarada</button>
      <button :class="{selsong: index == 9}" @click="jumpToTrackAt(1375, 9)">Far Away - Alexander Nakarada</button>
      <button :class="{selsong: index == 10}" @click="jumpToTrackAt(1564, 10)">Pirate Crew - Ross Bugden</button>
    </section>
  </div>
</template>

<script>
import SetVolumeMusic from '@/components/SetVolumeMusic.vue';
export default {

  components : {
    SetVolumeMusic
  },

  data() {
    return {
      trackToPlay: require("../assets/sounds/music/complete-tracks.mp3"),

      // current: {},
      index: 1,
      isPlaying: false,
      valueVolumeMusic: 2,
      musicPlayerVisible: false,
      curentTimeTrack: '?',
      //songs: jsonTracks.tracks,
      // songs: [
      //   // {
      //   //   title: "A",
      //   //   artist: "Souchon",
      //   //   source: require("../assets/sounds/music/01.mp3"),
      //   // },{
      //   //   title: "B",
      //   //   artist: "Nougaro",
      //   //   source: require("../assets/sounds/music/02.mp3"),
      //   // },
      //   {
      //     title: "Pirate's Moon",
      //     artist: "Alexander Nakarada",
      //     source: require("../assets/sounds/music/1.mp3"),
      //   },
      //   {
      //     title: "Jolly Roger",
      //     artist: "Kraken & Friends",
      //     source: require("../assets/sounds/music/3.mp3"),
      //   },
      //   {
      //     title: "Silverman Studious",
      //     artist: "The Buccaneer's Haul",
      //     source: require("../assets/sounds/music/6.mp3"),
      //   },
      //   {
      //     title: "Far away",
      //     artist: "Alexander Nakarada",
      //     source: require("../assets/sounds/music/8.mp3"),
      //   },
      //   {
      //     title: "Pirates out for Blood",
      //     artist: "Miguel Johnson",
      //     source: require("../assets/sounds/music/4.mp3"),
      //   },
      //   {
      //     title: "Skye Cuillin",
      //     artist: "Kevin MacLeod",
      //     source: require("../assets/sounds/music/5.mp3"),
      //   },
      //   {
      //     title: "Traveler",
      //     artist: "Alexander Nakarada",
      //     source: require("../assets/sounds/music/7.mp3"),
      //   },
      //   {
      //     title: "The Pirate King",
      //     artist: "Untold Journey",
      //     source: require("../assets/sounds/music/2.mp3"),
      //   },
      //   {
      //     title: "Pirate Crew",
      //     artist: "Ross Bugden",
      //     source: require("../assets/sounds/music/10.mp3"),
      //   },
      // ],

      //player: new Audio(),
    };
  },

  watch: {
    curentTimeTrack(){
      let t = this.curentTimeTrack
      if(t == 146){this.index = 2;}
      else if(t == 309){this.index = 3;}
      else if(t == 483){this.index = 4;}
      else if(t == 780){this.index = 5;}
      else if(t == 970){this.index = 6;}
      else if(t == 1130){this.index = 7;}
      else if(t == 1251){this.index = 8;}
      else if(t == 1375){this.index = 9;}
      else if(t == 1564){this.index = 10;}
      else if(t == 0){this.index = 1;}
    }
  },

  mounted(){
    const audio = document.querySelector('#audio');
    const self = this;
    setInterval(function(){
      self.curentTimeTrack = audio.currentTime.toFixed(0);
    }, 1000);//interval 1s
  },


  methods: {

    play(){
      const audio = document.querySelector('#audio');
      audio.play();
      this.curentTimeTrack = audio.currentTime.toFixed(0);
      this.isPlaying = true;
    },

    pause(){
      const audio = document.querySelector('#audio');
      audio.pause();
      this.isPlaying = false;
      this.curentTimeTrack = audio.currentTime.toFixed(0);
    },

    jumpToTrackAt(time, indexTrack){
      const audio = document.querySelector('#audio');
      audio.currentTime = time;
      audio.play();
      this.curentTimeTrack = audio.currentTime.toFixed(0);
      this.index = indexTrack;
      this.isPlaying = true;
    },

    next(){
      switch(this.index){
        case 1 :
          this.jumpToTrackAt(146, 2);
          break;
        case 2 :
          this.jumpToTrackAt(309, 3);
          break;
        case 3 :
          this.jumpToTrackAt(483, 4);
          break;
        case 4 :
          this.jumpToTrackAt(780, 5);
          break;
        case 5 :
          this.jumpToTrackAt(970, 6);
          break;
        case 6 :
          this.jumpToTrackAt(1130, 7);
          break;
        case 7 :
          this.jumpToTrackAt(1251, 8);
          break;
        case 8 :
          this.jumpToTrackAt(1375, 9);
          break;
        case 9 :
          this.jumpToTrackAt(1564, 10);
          break;
        case 10 :
          this.jumpToTrackAt(1, 1);
          break;
        default:
          console.log('Sorry, this track doesn\'t exist.');
      }
    },

    prev(){
      switch(this.index){
        case 1 :
          this.jumpToTrackAt(1564, 10);
          break;
        case 2 :
          this.jumpToTrackAt(1, 1);
          break;
        case 3 :
          this.jumpToTrackAt(146, 2);
          break;
        case 4 :
          this.jumpToTrackAt(309, 3);
          break;
        case 5 :
          this.jumpToTrackAt(483, 4);
          break;
        case 6 :
          this.jumpToTrackAt(780, 5);
          break;
        case 7 :
          this.jumpToTrackAt(970, 6);
          break;
        case 8 :
          this.jumpToTrackAt(1130, 7);
          break;
        case 9 :
          this.jumpToTrackAt(1251, 8);
          break;
        case 10 :
          this.jumpToTrackAt(1375, 9);
          break;
        default:
          console.log('Sorry, this track doesn\'t exist.');
      }
    },

    updateVolumeMusic(valueFromSetVolumeMusicComponent){
      const audio = document.querySelector('#audio');
      this.valueVolumeMusic = valueFromSetVolumeMusicComponent;
      audio.volume = this.valueVolumeMusic/10;
    },

    toggleThePlayer(){
      const player = document.querySelector('.track-player');
      if(this.musicPlayerVisible == true){
        player.style.display = 'none';
      }else{
        player.style.display = 'block';
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.music-options{
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 10;
}

.track-player {
  display: none;
  position: fixed;
  z-index: 250;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(35, 35, 35);
  font-family: 'Cinzel', sans-serif;
  font-size: .7rem;
  border: 3px solid var(--white);
  border-radius: 8px;
  padding-bottom: 15px;

  .player {
    width: 100%;
    max-width: 275px;
    margin: 0 auto;
    padding: 20px;

    h3{
      font-size: 1.1rem;
    }

    .btn-close-container{
      position: absolute;
      top: 5px;
      right: 0;
      .btn-close-modale{
        font-size: 1.2rem;
      }
    }

    .song-title {
      color: var(--grey99);
      font-size: 1.2em;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      font-family: 'Rubic', sans-serif;

      .artist {
        font-weight: 400;
        font-style: italic;
      }
    }

    
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px 5px;

      .play, .pause {
        width: 95px !important;
        margin: 0px 20px;
      }

      .next, .prev {
        font-size: 16px !important;
      }
    }

  }

  .playlist {
    padding: 0px 20px;

    button{
      display: block;
      width: 100%;
      margin: 3px 0;
      padding: 6px 4px;
      background: linear-gradient(to right, #314a5d, #587483);
      border-radius: 4px;
      font-family: 'Rubik', serif;
      color: var(--white);
      text-align: center;
      appearance: none;
      border: none;
      outline: none;
      cursor: pointer;
    }


    button.selsong{
      background: linear-gradient(to right, #2e6895, #58abd1);
    }

    h3 {
      color: var(--grey99);
      font-size: 1.4em;
      font-weight: 400;
      margin: 8px 0;
      text-align: center;
    }

    .song {
      display: block;
      font-family: 'Rubic', sans-serif;
      width: 100%;
      padding: 5px 10px;
      font-size: 1em;
      cursor: pointer;
      color: #c8c8c8;
    }

    .song:hover {
      color: var(--white);
    }

    // .song.playing {
    //   color: var(--white);
    //   background-image: linear-gradient(to right, #2e6895, #58abd1);
    // }
  }

}
  
@media screen and (max-width: 768px) {
  .music-options{
    text-align: start;
    width: fit-content;
    height: fit-content;
    top: 5px;
    left: 10px;
    z-index: 201;
  }

  .track-player{
    width: 90%;
    .player{
      padding: 0;
      h3{
        margin-top: 1rem;
      }
    }  
  } 
    
}


</style>