<template>
    
    <!-- <div v-show="!isLoaded" class="spinner-container">
        <div class="lds-dual-ring"></div>
    </div> -->
    <div :class="{loadedPage : isLoaded}" class="spinner-container">
        <div class="lds-dual-ring"></div>
    </div>
    <!-- <div class="spinner-menu">
        <div>
            <h2 class="py-2">SpinnerLoader : {{isloaded}}</h2>
            <button class="btn-custom btn-solid-green my-2" @click="isloaded = !isloaded">Toogle SpinnerLoader</button>
        </div>
    </div> -->
</template>

<script>
export default {
    props: ['isLoaded'],
}
</script>

<style scoped>
.spinner-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--black);
  z-index: 10000;
  transition-property: opacity, height;
  transition-duration: .3s, 0s;
  transition-delay: 0s, .3s;
}

.loadedPage{
  opacity: 0;
  height: 0;
}

/* .spinner-menu{
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    padding-bottom: 15%;
} */

.lds-dual-ring { /*https://loading.io/css/*/
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(255, 245, 46);
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>