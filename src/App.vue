<template>
 <!-- <SpinnerLoader /> -->
  <MusicPlayer/>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script>
//import SpinnerLoader from '@/components/SpinnerLoader.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';

export default {
  components: {
    //SpinnerLoader,
    MusicPlayer,
  },
  
}
</script>

<style lang="scss">
// Root
:root{ 
  --black: #000;
  --black18: #181818;
  --black31: #313131;
  --black44: #444;
  --grey99: #999;
  --grey65: #656565;
  --white: #FFF;
  --yellow: yellow;
  --yellowpirates: #ffdc2e;
  --whitegrey: #f0f0f0;
  --grey90: #909090;

  --bluelight1: #7dabca;
  --bluemedium1: #6099df; 
  --bluedark1: #0a253c; 
  --bluedark2: #27425a;

  --ordalight1: #cc751e;
  --ordamedium1: #e48322;
  --ordadark1: #545454;
  --ordadark2: #393939;

}

// Reset CSS
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* / Reset CSS */

body::-webkit-scrollbar{
  width: .25rem !important;
}

body::-webkit-scrollbar-track{
  background: var(--black31);
}

body::-webkit-scrollbar-thumb{
  background: var(--ordamedium1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active{
  transition: opacity .2s ease-out;
}
  
#app {
  // font-family: 'Cinzel', serif;
  // font-family: 'Rubik', sans-serif;
  // font-family: 'Luckiest Guy', cursive;
  // font-family: 'Pirata One', cursive;
  background-color: var(--black);
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dbdbdb;
  min-height: 100vh;
  font-size: .9rem;
  position: relative;

  .navbar-margin{
    margin-left: 5rem;
  }

  .m100vh{
    min-height: 100vh;
  }

  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 1070px;
  }
  @media (max-width: 1200px) {
    .container {
      width: 750px;
    }
  }
  @media (max-width: 992px) {
    .container {
      width: 650px;
    }
  }
  @media (max-width: 768px) {
    .container {
      width: 90%;
    }
  }

  .d-flex{
    display: flex;
  }

  .justify-content-center{
    justify-content: center;
  }

  .align-items-center{
    align-items: center;
  }

  .flex-wrap{
    flex-wrap: wrap;
  }

  .color-yellow{
    color: var(--yellowpirates)
  }

  // .track-player-container{
  //   position: relative;
  //   width: 100vh;
  //   height: 100vh;
  //   overflow: hidden;
  // }

  .btn-options-container{
    position: fixed;
    bottom: 25px;
    right: 125px;
    z-index: 1;

    .btn-option-set:hover{
      cursor: pointer;
    }
  }

  h1{
    font-size: 2rem;
    padding: 18px;
  }

  a{
    text-decoration: none;
    color: inherit;
    cursor: inherit;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .unselectable {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .bold{
    font-weight: bold;
  }

  .mx-1{
    margin-left: .5rem;
    margin-right: .5rem;
  }

  .m-1{
    margin: .5rem;
  }

  .m-auto{
    margin: auto;
  }

  .text-shadow{
    text-shadow: 0 0 1px var(--black),
        0 0 2px var(--black),
        0 0 5px var(--black),
        0 0 7px var(--black),
        0 0 10px var(--black);
  }

  label{
    font-size: .8rem;
    font-weight: bold;
  }

  .p-checkbox{
    margin: 0 7px;
  }

  .selector {
    min-height : 60px;
    color: var(--white);
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 7%;

    i{
      font-size: 1.2rem;
    }
  }

  .fireworks {
    position: absolute;
    z-index: 99999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba($color: #010101, $alpha: 0.8);
    overflow: hidden;
    border-radius: 18px;

    .bravo-container {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .bravo {
      position: absolute;
      top: 50px;
      color: var(--white);
      font-weight: bold;
      font-size: 2.5em;
      margin: 5px 0;
      background: url('@/assets/img/wallpaper/laurier.png') no-repeat;
      background-position: bottom;
      background-size: contain;

      .b-score{
        font-size: 1rem;
        margin-right: .3rem;
      }
      .b-points{
        font-size: 2.5em;
      }

      button{
        margin-top: 1rem;
      }
    }
  }

  .select {
      position: relative;
      //display: block;
      margin-top: 4px;
      width: 10rem;
      height: 28px;
      //line-height: 2;
      overflow: hidden;
      border-radius: .35em;

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        background: rgb(54, 54, 54);
        background-image: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0 0 0 .5em;
        color: var(--white);
        cursor: pointer;
        // border: none;
        border: 2px solid rgba(0, 0, 0, 0.2);
        font-size: .7rem;
        font-weight: bold;
      }
    }
     
    .select::after {
        content: '\25BC';
        color: rgb(94, 94, 94);
        line-height: 1.9;
        position: absolute;
        top: 1px;
        right: 0;
        bottom: 0;
        padding: 0 1em;
        background: #202020;
        pointer-events: none;
        font-size: .9rem;
    }
     
    .select:hover::after {
        color: var(--white) !important;
    }

    .btn-round-resize-img{
      background: none;
      border: none;

      i{
        font-size: 1.6rem;
        margin: 0 .3rem;
      }
      
    }

    .btn-round-resize-img:disabled{
      background-color: rgb(199, 199, 199);
      border: 1px solid rgb(199, 199, 199);
    }

    // Colors ---------------------------------------------------------------------------------
  .template-blue{
    .selector {
      background-color: var(--bluemedium1);
      border-top: 1px solid var(--bluelight1);
      border-bottom: 1px solid var(--bluelight1);
    }
    select{
      background: var(--bluedark2);
    }
    .select::after{
      color: var(--bluelight1);
      background: var(--bluedark1);
    }
    .modale{
      background: var(--bluemedium1);
    }
    .navbar-side{
      background-color: var(--bluedark1);
    }
  }

  .template-dark {
    .selector {
      background-color: var(--black18);
      border-top: 1px solid var(--ordalight1);
      border-bottom: 1px solid var(--ordalight1);
    }
    select{
      background: var(--ordadark2);
    }
    .select::after{
      color: var(--ordalight1);
      background: var(--ordadark1);
    }
    .modale{
      background: var(--ordadark1);
    }
    .navbar-side{
      background-color: var(--ordadark2);
    }
  }
  
  // /Colors --------------------------------------------------------------------------------

  // Buttons --------------------------------------------------------------------------------
  .btn-custom {
  min-width: fit-content;
  color: var(--white);
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Pirata One', sans-serif;
  font-size: 19px;
  letter-spacing: 1px;
  text-shadow: 0px -1px 0px rgba(0,0,0,0.4);
  background: transparent;
  white-space: nowrap;
  position: relative;
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.697),0px 1px 3px rgba(0,0,0,0.3);
  border: 1px solid var(--black);
  outline: none;
}

.btn-custom.btn-small{
  padding: 8px 10px;
  font-size: 1em;
  //font-weight: 900;
}

.btn-custom.btn-large{
  padding: 12px 30px;
  font-size: 22px;
  font-weight: 900;
}

.btn-custom:active{
  -webkit-transform: translateY(1px);
  transform: translateY(1px);
}
.btn-glass-white{
  border-color: #3d3d3d;
  border-bottom-color: #5d5d5d;
  background: -webkit-linear-gradient(top, #d5d5d599, #3d3d3d99);
}
.btn-glass-white:active{
  background: -webkit-linear-gradient(top, #d5d5d599 15% , #3d3d3d99 90%);
  border-bottom-color: #4b4b4b;
}
.btn-glass-white:disabled{
  background: -webkit-linear-gradient(top, #d5d5d599 15% , #3d3d3d99 90%);
  border-bottom-color: #4b4b4b;
  color: grey
}

.btn-solid-white{
  border-color: #3d3d3d;
  border-bottom-color: #5d5d5d;
  background: -webkit-linear-gradient(top, #e2e2e2, #979797);
  color: var(--black31);
}
.btn-solid-white:hover{
  background: -webkit-linear-gradient(top, #ffffff 15% , #d1d1d1 90%);
  border-bottom-color: #4b4b4b;
  color: var(--black18);
}

.btn-glass-green{
  border-color: #2d3a32;
  border-bottom-color: #485c4d;
  background: -webkit-linear-gradient(top, #90ffac99, #0d5a2d99);
}
.btn-glass-green:active{
  background: -webkit-linear-gradient(top, #90ffac99 15% , #0d5a2d99 90%);
  border-bottom-color: #4b4b4b;
}

.btn-solid-green{
  border-color: #2d3a32;
  border-bottom-color: #485c4d;
  background: -webkit-linear-gradient(top, #90ffac, #0c5a2d);
}
.btn-solid-green:hover{
  background: -webkit-linear-gradient(top, #a9ffbf, #11753b);
}
.btn-solid-green:active{
  background: -webkit-linear-gradient(top, #90ffac 15% , #0c5a2d 90%);
  border-bottom-color: #4b4b4b;
}

// btn-red
.btn-solid-red{
  background: -webkit-linear-gradient(top, #ad5454, #401b1b);
  color: var(--white);
}

.btn-solid-red:focus{
  background: -webkit-linear-gradient(top, #d66868, #642b2b);
}

.btn-solid-red:disabled{
  color: rgb(129, 78, 78);
}

.btn-solid-red:disabled:focus{
  background: -webkit-linear-gradient(top, #ad5454, #401b1b);
  color: rgb(129, 78, 78);
}

// btn-grey
.btn-solid-grey{
  background: -webkit-linear-gradient(top, #bebebe, #505050);
  color: var(--white);
}

.btn-solid-grey:focus{
  background: -webkit-linear-gradient(top, #bebebe, #505050);
}

.btn-solid-grey:disabled{
  color: #383838;
  background: -webkit-linear-gradient(top, #616161, #282828);
}

.btn-solid-grey:disabled:focus{
  background: -webkit-linear-gradient(top, #616161, #282828);
  color: #383838;
}

.btn-solid-red:focus::after, .btn-solid-grey:focus::after{
  position: absolute;
  content: '';
  top: 1px;
  left: 1px;
  border: 2px solid var(--black);
  border-radius: 4px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  animation: btnCustomFocusMove .7s infinite linear;
}

.btn-solid-red:focus:disabled::after, .btn-solid-grey:focus:disabled::after{
  border: none;
}

// btn-blue
.btn-solid-blue{
  background: -webkit-linear-gradient(top, #3769b9, #203049);
  color: rgb(165, 165, 165);
  width: 110px;
}

.btnBlueSelected{
  background: -webkit-linear-gradient(top, #9dc2ff, #2c5c8f);
  color: rgb(255, 255, 255);
}




// modal button call ---------------------------------------------------------------------
.btn-settings-container{
  position: relative;

  .btn-settings-options{
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 5px;
    right: 5px;
    animation: .2s linear slideLeft;
    i{
      font-size: 1.4rem;
      margin-right: .3rem;
    }
  }

  .btn-settings-options:hover{
    cursor: pointer;
  }
}

// Modals --------------------------------------------------------------------------------
.bloc-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;

    .overlay{
        position: fixed;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(2px);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modale{
        position: fixed;
        top: 30%;
        // font-size: .5rem;
        border: 3px solid var(--white);
        border-radius: 8px;
        animation: modalAnim .3s linear;
        overflow: hidden;

        .modale-head{
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.619);
          padding: 5px 0;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;

          .btn-close-modale{
            font-size: 1.2rem;
          }

          h2{
            margin-left: 20px;
            padding: .6rem 0;
            color: var(--white);
            display: flex;
            align-items: center;
            i{
              font-size: 1.7rem;
              margin-right: .3rem;
            }
          }
        }

        .modale-body{
            padding: 20px 12px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            background: rgba(255, 255, 255, 0.42);
            overflow: hidden;
            
            .options-settings{
              background-color: #ffffff77;
              padding: 15px 10px;
              margin: 10px 0;
              color: var(--black31);

              .select{
                border: 1px solid rgba(255, 255, 255, 0.453);
                border-radius: 6px;
              }
            }
        }

    }

}

.btn-close-modale{
  background: none;
  border: none;
  cursor: pointer;
  i{
    font-size: 2em;
    color: var(--whitegrey);
    border-radius: 50%;
    padding: -2px;
    transition: .5s;
  }
  i:hover{
    color: var(--white);
    background: var(--black44);
  }
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 15s linear infinite;
  -moz-animation: rotating 15s linear infinite;
  -ms-animation: rotating 15s linear infinite;
  -o-animation: rotating 15s linear infinite;
  animation: rotating 15s linear infinite;
}

@-webkit-keyframes rotating-coins /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating-coins {
  0% {
    -ms-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  50% {
    -ms-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  100% {
    -ms-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
}

.rotating-coins {
  -webkit-animation: rotating-coins 14s linear infinite;
  -moz-animation: rotating-coins 14s linear infinite;
  -ms-animation: rotating-coins 14s linear infinite;
  -o-animation: rotating-coins 14s linear infinite;
  animation: rotating-coins 14s linear infinite;
}


@keyframes modalAnim {
  0% { 
    height: 60px;
    top: 0%;
  }
  50%{
    height: 60px;
    top: 50%
  }
  100%   { 
    height: 347px; 
  }
}

@keyframes btnCustomFocusMove {
  0%{border-color: #00000077;}
  50%{border-color: orange;}
  100%{border-color: #00000077;}
}

}

// Media Queries
// 576 768 992 1200 1400px
@media only screen and (max-width: 768px) {
  // 
  #app{
    font-size: .7rem;
    
    .navbar-margin{
      margin-left: 0;
      margin-top: 42px;
    }

    .bloc-modale .modale{
      top: 15%;
    }
  }
}

@media only screen and (max-width: 576px) {
  #app{
    .visibleAt576{
      display: none;
    }
    .navbar-margin{
      margin-left: 0;
      margin-top: 42px;
    }
  }
}

</style>