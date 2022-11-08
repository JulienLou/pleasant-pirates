<template>
  <SpinnerLoader :isLoaded="isLoaded" />
  <div :class="templateColorChoice">
    <NavbarSide />
    <section class="scores">
      <div class="container py-1">
        <div class="title-scores">
          <h2 class="text-shadow">Mes meilleurs scores</h2>
        </div>

        <div class="game-scores-container">
          <div class="game-scores border-theme">
            <h3>Memory Game</h3>
            <table>
              <thead>
                <tr>
                  <th>Niveau</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moussaillon</td>
                  <td>
                    {{
                      bestsScoresMemory.L6 >= 0
                        ? commify(bestsScoresMemory.L6)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Marin</td>
                  <td>
                    {{
                      bestsScoresMemory.L9 >= 0
                        ? commify(bestsScoresMemory.L9)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Boucanier</td>
                  <td>
                    {{
                      bestsScoresMemory.L12 >= 0
                        ? commify(bestsScoresMemory.L12)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Flibustier</td>
                  <td>
                    {{
                      bestsScoresMemory.L16 >= 0
                        ? commify(bestsScoresMemory.L16)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Capitaine</td>
                  <td>
                    {{
                      bestsScoresMemory.L20 >= 0
                        ? commify(bestsScoresMemory.L20)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Démon</td>
                  <td>
                    {{
                      bestsScoresMemory.L24 >= 0
                        ? commify(bestsScoresMemory.L24)
                        : 0
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="game-scores border-theme">
            <h3>Slide Game</h3>
            <table>
              <thead>
                <tr>
                  <th>Niveau</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moussaillon</td>
                  <td>
                    {{
                      bestsScoresSlide.L3 >= 0
                        ? commify(bestsScoresSlide.L3)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Boucanier</td>
                  <td>
                    {{
                      bestsScoresSlide.L4 >= 0
                        ? commify(bestsScoresSlide.L4)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Flibustier</td>
                  <td>
                    {{
                      bestsScoresSlide.L5 >= 0
                        ? commify(bestsScoresSlide.L5)
                        : 0
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- jackpot -->
          <div class="game-scores border-theme">
            <h3>Jackpot</h3>
            <table>
              <tbody>
                <tr>
                  <td>Meilleur Gain</td>
                  <td>
                    {{
                      bestsScoresJackpot.bestGain >= 0
                        ? commify(bestsScoresJackpot.bestGain)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Argent gagné</td>
                  <!-- {{bestsScoresJackpot.coinsWins ? (bestsScoresJackpot.coinsWins >= 0 ? 'gagné' : 'perdu') : 'gagné'}} -->
                  <td>
                    {{
                      bestsScoresJackpot.coinsWins 
                      ? commify(bestsScoresJackpot.coinsWins)
                      : '0'
                    }}
                    <!-- {{
                      bestsScoresJackpot.coinsWins + bestsScoresJackpot.specialWantedGains >= 0
                        ? commify(bestsScoresJackpot.coinsWins + bestsScoresJackpot.specialWantedGains)
                        : 0
                    }} -->
                  </td>
                </tr>
                <tr>
                  <td>Spins joués</td>
                  <td>
                    {{
                      bestsScoresJackpot.spinsWins + bestsScoresJackpot.spinsLoses >= 0
                        ? commify(bestsScoresJackpot.spinsWins + bestsScoresJackpot.spinsLoses)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Spins gagnés</td>
                  <td>
                    {{
                      bestsScoresJackpot.spinsWins >= 0
                        ? commify(bestsScoresJackpot.spinsWins)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Spins perdus</td>
                  <td>
                    {{
                      bestsScoresJackpot.spinsLoses - bestsScoresJackpot.specialWantedWin >= 0
                        ? commify(bestsScoresJackpot.spinsLoses - bestsScoresJackpot.specialWantedWin)
                        : 0
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Spécial wanted</td>
                  <td>
                    {{
                      bestsScoresJackpot.specialWanted >= 0
                        ? commify(bestsScoresJackpot.specialWanted)
                        : 0
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /jackpot -->

          <div class="game-scores border-theme">
            <h3>Stats</h3>
            <table>
              <tbody>
                <tr>
                  <td>Pièces d'or</td>
                  <td>{{ totalCoins >= 0 ? commify(totalCoins) : 0 }}</td>
                </tr>
                <tr>
                  <td>Parties jouées au Memory</td>
                  <td>
                    {{ nbPlayedMemory >= 0 ? commify(nbPlayedMemory) : 0 }}
                  </td>
                </tr>
                <tr>
                  <td>Parties jouées au Slide</td>
                  <td>{{ nbPlayedSlide >= 0 ? commify(nbPlayedSlide) : 0 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- /game-scores-container -->
      </div>
    </section>
    <FooterMain/>
  </div>
</template>

<script>
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import NavbarSide from "@/components/NavbarSide.vue";
import FooterMain from "@/components/FooterMain.vue";

export default {
  name: "ScoresPage",
  components: {
    SpinnerLoader,
    NavbarSide,
    FooterMain
  },

  data() {
    return {
      isLoaded: false,
      templateColorChoice: "template-blue",
      bestsScoresMemory: {},
      bestsScoresSlide: {},
      bestsScoresJackpot: {},
      totalCoins: 0,
      nbPlayedMemory: 0,
      nbPlayedSlide: 0,
    };
  },

  mounted() {
    // Theme Color
    if (localStorage.getItem("userThemeColor")) {
      this.templateColorChoice = localStorage.getItem("userThemeColor");
    }
    // Memory Bests Scores
    if (localStorage.getItem("memoryBestsScores")) {
      this.bestsScoresMemory = JSON.parse(
        localStorage.getItem("memoryBestsScores")
      );
    }
    // User's number of memory game played
    if (localStorage.getItem("nbPlayedMemory")) {
      this.nbPlayedMemory = Number(localStorage.getItem("nbPlayedMemory"));
    }
    // Slide Bests Scores
    if (localStorage.getItem("slideBestsScores")) {
      this.bestsScoresSlide = JSON.parse(
        localStorage.getItem("slideBestsScores")
      );
    }
    // User's number of slide game played
    if (localStorage.getItem("nbPlayedSlide")) {
      this.nbPlayedSlide = Number(localStorage.getItem("nbPlayedSlide"));
    }
    // Slide Bests Scores
    if (localStorage.getItem("jackpotBestsScores")) {
      this.bestsScoresJackpot = JSON.parse(
        localStorage.getItem("jackpotBestsScores")
      );
    }
    // User Total Coins
    if (localStorage.getItem("userTotalCoins")) {
      this.totalCoins = Number(localStorage.getItem("userTotalCoins"));
    }
    // Loader Page
    const self = this;
    setTimeout(()=>{
        self.isLoaded = true;
    }, 50);
  },

  methods: {
    commify(n) {
      // get points 1000 to 1.000
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return (
        numberPart.replace(thousands, ".") +
        (decimalPart ? "," + decimalPart : "")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.scores {
  background: url("../assets/img/wallpaper/scorespage.jpg") no-repeat center fixed;
  min-height: 100vh;
  background-size: cover;
  margin-top: 0;

  .title-scores {
    display: flex;
    justify-content: center;
    width: 100%;

    h2 {
      padding: 1.2rem 0.2rem;
      font-family: "Play", sans-serif;
      color: var(--whitegrey);
      font-weight: bold;
      font-size: 3rem;
      width: 100%;
    }
  }

  .game-scores-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .game-scores {
      margin: 10px;
      padding: 1rem 0.7rem;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--black31);
      font-weight: bold;
      border-radius: 8px;
      width: 280px;

      h2 {
        font-size: 20px;
        font-weight: bold;
      }

      h3 {
        font-style: italic;
        font-size: 1.1rem;
        padding: 0.4rem;
      }

      table {
        margin-top: 0.4rem;
        border-collapse: collapse;
        //font-family: 'Play', sans-serif;
        font-weight: 600;
      }

      table tr {
        text-align: start;
      }

      table th {
        background-color: var(--grey90);
        color: var(--white);
      }

      table td,
      table th {
        padding: 0.2rem 0.4rem;
        border: 1px solid var(--grey90);
        width: 100%;
      }
    }
  }
}

// Media Queries
// 576 768 992 1200 1400px
@media only screen and (max-width: 768px) {
  .scores {
    margin-top: 42px;

    .title-scores h2 {
      font-size: 2rem;
    }
  }
}
</style>