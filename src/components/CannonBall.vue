<template>
  <div class="cannonball-show">
    <div class="sprite"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.cannonball-show{
    position: absolute;
    z-index: 160;
    top: 50%;
    left: 42%;
    transform: translate(-50%, -50%);

    .sprite.active-fire{
        width: 240px;
        height: 240px;
        background: url('../assets/img/xplod/xplod.png') no-repeat;
        background-position-x: 240px;
        background-position-y: -1200px;
        animation: spriteAnim .8s steps(8);
        -o-animation: spriteAnim .8s steps(8);
        -webkit-animation: spriteAnim .8s steps(8);
        -moz-animation: spriteAnim .8s steps(8);
    }
}

@keyframes spriteAnim {
    0%{ 
        background-position-x: 0px;
        background-position-y: 0px;
    }
    16.59%{
        background-position-x: -1920px;
        background-position-y: 0px;
    }
    16.6%{
        background-position-x: 0px;
        background-position-y: -240px;
    }
    33.29%{
        background-position-x: -1920px;
        background-position-y: -240px;
    }
    33.3%{
        background-position-x: 0px;
        background-position-y: -480px;
    }
    49.99%{
        background-position-x: -1920px;
        background-position-y: -480px;
    }
    50%{
        background-position-x: 0px;
        background-position-y: -720px;
    }
    66.59%{
        background-position-x: -1920px;
        background-position-y: -720px;
    }
    66.6%{
        background-position-x: 0px;
        background-position-y: -960px;
    }
    83.29%{
        background-position-x: -1920px;
        background-position-y: -960px;
    }
    83.3%{
        background-position-x: 0px;
        background-position-y: -1200px;
    }
    100%{ 
        scale: 3;
        background-position-x: -1920px;
        background-position-y: -1200px;
    }
}
</style>