<template>
  <div class="range-container">
    <i v-if="valueVolumeFx > 0" class="fa-solid fa-volume-high" @click="valueVolumeFx = 0"></i>
    <i v-else class="fa-solid fa-volume-xmark" @click="valueVolumeFx = 10"></i>
    <input type="range" min="0" max="10" step="1" v-model="valueVolumeFx" />
    <span class="data-volume bold">{{ valueVolumeFx }}</span>
  </div>
</template>

<script>
export default {

  data() {
    return {
      valueVolumeFx: 10,
      soundKeyboard: require("../assets/sounds/global/beep2.mp3"),
    };
  },

  mounted() {
    if (localStorage.getItem("volumeEffects")) {
      this.valueVolumeFx = Number(localStorage.getItem("volumeEffects"));
    }
  },

  watch: {
    valueVolumeFx() {
      this.$store.dispatch("setVolumeEffects", this.valueVolumeFx);
      this.$emit('valueVolFx', this.valueVolumeFx);
      this.playSound(this.soundKeyboard);
    },
  },

  methods: {
    playSound(soundFx){
      if(this.valueVolumeFx>0){
        const myAudio = new Audio(soundFx);
        myAudio.volume = this.valueVolumeFx/10;
        myAudio.play();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.range-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  i {
    font-size: 1.5em;
    margin-right: 0.2em;
    width: 38px;
  }

  .data-volume {
    width: 28px;
  }
}
</style>