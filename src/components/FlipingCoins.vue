<template>
  <section class="fliping-coins">
    <!-- <div class="coin copper"></div>
    <div class="coin flip silver"></div> -->
    <div class="coin rotating-coins" :class="ironman ? 'ironman' : 'blackpanther'"></div>
    <div class="fliping-coins-rewards">
      <span class="fs-5">+</span><span class="fs-2 mx-1">{{ lgc }}</span>
    </div>
  </section>
</template>

<script>
export default {
    props: ['lgc'],
    data(){
      return{
        ironman: Math.random()>0.5? true : false,
      }
    }
};
</script>

<style>
:root {
  --face: #be9d66;
  --lowlight: #111;
  --side: #b1872b;
  --side-dark: #120e08;
  --coin-size: 7rem;
  /* --coin-face: url("https://sdbullion.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/2/0/2019-roaring-lion-silver-coin-obverse-sd-bullion.jpg"); */
  --coin-face-blackpanther: url("../assets/img/wallpaper/coin2.png");
  --coin-face-ironman: url("../assets/img/wallpaper/coin1.png");
}

.fliping-coins {
  position: relative;
  height: 100%;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fliping-coins-rewards {
  position: absolute;
  display: flex;
  align-items: center;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: yellow;
}

body {
  height: 100%;
}

.coin {
  height: var(--coin-size);
  width: var(--coin-size);
  margin: 0.7rem -4.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.coin::before {
  content: "";
  display: block;
  position: relative;
  height: var(--coin-size);
  width: var(--coin-size);
  border-radius: 50%;
  background-color: var(--face);
  animation: spin 1.4s linear infinite;
  /*background-image: var(--coin-face);*/
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: overlay;
}

.ironman.coin::before{
  background-image: var(--coin-face-ironman);
}

.blackpanther.coin::before{
  background-image: var(--coin-face-blackpanther);
}

.coin.flip::before {
  animation-name: flip;
}

/* .coin.copper::before {
  filter: hue-rotate(-40deg) brightness(0.75) contrast(115%);
  animation-delay: -0.25s;
}

.coin.silver::before {
  filter: saturate(0);
  animation-delay: -0.5s;
} */

/* animation definitions */

@keyframes spin {
  0% {
    width: var(--coin-size);
    box-shadow: 0 0 0 var(--side-dark);
    animation-timing-function: ease-in;
  }

  49.999% {
    width: 0.1rem;
    box-shadow: 0.05rem 0 0 var(--side), 0.1rem 0 0 var(--side),
      0.15rem 0 0 var(--side), 0.2rem 0 0 var(--side), 0.25rem 0 0 var(--side),
      0.3rem 0 0 var(--side), 0.35rem 0 0 var(--side), 0.4rem 0 0 var(--side),
      0.45rem 0 0 var(--side), 0.5rem 0 0 var(--side), 0.55rem 0 0 var(--side),
      0.6rem 0 0 var(--side), 0.65rem 0 0 var(--side), 0.7rem 0 0 var(--side),
      0.75rem 0 0 var(--side);
    transform: translateX(-0.375rem);
    background-color: var(--lowlight);
    animation-timing-function: linear;
  }

  50.001% {
    width: 0.1rem;
    box-shadow: -0.05rem 0 0 var(--side), -0.1rem 0 0 var(--side),
      -0.15rem 0 0 var(--side), -0.2rem 0 0 var(--side),
      -0.25rem 0 0 var(--side), -0.3rem 0 0 var(--side),
      -0.35rem 0 0 var(--side), -0.4rem 0 0 var(--side),
      -0.45rem 0 0 var(--side), -0.5rem 0 0 var(--side),
      -0.55rem 0 0 var(--side), -0.6rem 0 0 var(--side),
      -0.65rem 0 0 var(--side), -0.7rem 0 0 var(--side),
      -0.75rem 0 0 var(--side);
    transform: translateX(0.375rem);
    background-color: var(--lowlight);
    animation-timing-function: ease-out;
  }

  100% {
    width: var(--coin-size);
    box-shadow: 0 0 0 var(--side-dark);
  }
}

@keyframes flip {
  0% {
    height: var(--coin-size);
    box-shadow: 0 0 0 var(--side-dark);
    animation-timing-function: ease-in;
  }

  49.999% {
    height: 0.1rem;
    box-shadow: 0 0.05rem 0 var(--side), 0 0.1rem 0 var(--side),
      0 0.15rem 0 var(--side), 0 0.2rem 0 var(--side), 0 0.25rem 0 var(--side),
      0 0.3rem 0 var(--side), 0 0.35rem 0 var(--side), 0 0.4rem 0 var(--side),
      0 0.45rem 0 var(--side), 0 0.5rem 0 var(--side), 0 0.55rem 0 var(--side),
      0 0.6rem 0 var(--side), 0 0.65rem 0 var(--side), 0 0.7rem 0 var(--side),
      0 0.75rem 0 var(--side);
    transform: translateY(-0.375rem);
    background-color: var(--lowlight);
    animation-timing-function: linear;
  }

  50.001% {
    height: 0.1rem;
    box-shadow: 0 -0.05rem 0 var(--side), 0 -0.1rem 0 var(--side),
      0 -0.15rem 0 var(--side), 0 -0.2rem 0 var(--side),
      0 -0.25rem 0 var(--side), 0 -0.3rem 0 var(--side),
      0 -0.35rem 0 var(--side), 0 -0.4rem 0 var(--side),
      0 -0.45rem 0 var(--side), 0 -0.5rem 0 var(--side),
      0 -0.55rem 0 var(--side), 0 -0.6rem 0 var(--side),
      0 -0.65rem 0 var(--side), 0 -0.7rem 0 var(--side),
      0 -0.75rem 0 var(--side);
    transform: translateY(0.375rem);
    background-color: var(--lowlight);
    animation-timing-function: ease-out;
  }

  100% {
    height: var(--coin-size);
    box-shadow: 0 0 0 var(--side-dark);
  }
}
</style>