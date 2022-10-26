import { createStore } from 'vuex'

export default createStore({
  state: {
    userThemeColor: '',
    memoryBestScore: {},
    slideBestScore: {},
    totalCoins: 0,
    nbPlayedMemory: 0,
    nbPlayedSlide: 0,
    showModaleHome: true,
    volumeFx: 10,
    volumeMusic: 10
  },
  mutations: {
    setUserThemeColor(state, userColorChosen){
      state.userThemeColor = userColorChosen;
      localStorage.setItem('userThemeColor', state.userThemeColor);
    },

    setUserBestsScoresMemory(state, allScoresObject){
      state.memoryBestScore = allScoresObject;
      localStorage.setItem('memoryBestsScores', state.memoryBestScore);
    },
    setUserBestsScoresSlide(state, allScoresObject){
      state.slideBestScore = allScoresObject;
      localStorage.setItem('slideBestsScores', state.slideBestScore);
    },

    setTheUserTotalCoins(state, totalCoins){
      state.totalCoins = totalCoins;
      localStorage.setItem('userTotalCoins', state.totalCoins);
    },
    
    setTheUserNbPlayedMemory(state, nbPlayedMemory){
      state.nbPlayedMemory = nbPlayedMemory;
      localStorage.setItem('nbPlayedMemory', state.nbPlayedMemory);
    },
    setTheUserNbPlayedSlide(state, nbPlayedSlide){
      state.nbPlayedSlide = nbPlayedSlide;
      localStorage.setItem('nbPlayedSlide', state.nbPlayedSlide);
    },

    setTheModaleHome(state, smhValue){
      state.showModaleHome = smhValue;
      localStorage.setItem('showModaleHome', state.showModaleHome);
    },

    setTheVolumeEffects(state, volFx){
      state.volumeFx = volFx;
      localStorage.setItem('volumeEffects', volFx);
    },
    setTheVolumeMusic(state, volMusic){
      state.volumeMusic = volMusic;
      localStorage.setItem('volumeMusic', volMusic);
    }
  },
  actions: {
    setUserThemeColor({ commit }, userColorChosen){
      commit('setUserThemeColor', userColorChosen);
    },

    userBestsScoresMemory({ commit }, allScoresObject){
      commit('setUserBestsScoresMemory', allScoresObject);
    },
    userBestsScoresSlide({ commit }, allScoresObject){
      commit('setUserBestsScoresSlide', allScoresObject);
    },

    setUserTotalCoins({ commit }, totalCoins){
      commit('setTheUserTotalCoins', totalCoins);
    },

    setUserNbPlayedMemory({ commit }, nbPlayedMemory){
      commit('setTheUserNbPlayedMemory', nbPlayedMemory);
    },
    setUserNbPlayedSlide({ commit }, nbPlayedSlide){
      commit('setTheUserNbPlayedSlide', nbPlayedSlide);
    },

    setShowModaleHome({commit}, smhValue){
      commit('setTheModaleHome', smhValue);
    },

    setVolumeEffects({commit}, volFx){
      commit('setTheVolumeEffects', volFx);
    },
    setVolumeMusic({commit}, volMusic){
      commit('setTheVolumeMusic', volMusic);
    }
  },
  getters: {

  },
  modules: {
    
  }
})
