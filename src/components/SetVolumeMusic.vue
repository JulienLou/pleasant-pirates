<template>
  <div class="range-container">
    <i v-if="valueVolumeMusic > 0" class="fa-solid fa-volume-high" @click="valueVolumeMusic = 0"></i>
    <i v-else class="fa-solid fa-volume-xmark" @click="valueVolumeMusic = 10"></i>
    <input type="range" min="0" max="10" step="1" v-model="valueVolumeMusic" />
    <span class="data-volume bold">{{ valueVolumeMusic }}</span>
  </div>
</template>

<script>
export default {
// props: ['valueVolumeMusic'],

  data() {
    return {
      valueVolumeMusic: 5,
      soundKeyboard: require("../assets/sounds/global/beep2.mp3"),
    };
  },

  mounted() {
    if (localStorage.getItem("volumeMusic")) {
      this.valueVolumeMusic = Number(localStorage.getItem("volumeMusic"));
    }
  },

  watch: {
    valueVolumeMusic() {
      this.$store.dispatch("setVolumeMusic", this.valueVolumeMusic);
      this.$emit('valueVolMusic', this.valueVolumeMusic);
    },
  },

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