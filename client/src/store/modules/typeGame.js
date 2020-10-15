const state = {
  completeData: null,
  sentence: null,
  maxTime: 0,
  scores: null,
  index: 0,
  status: null,
  userWon: null,
  isGameStarted: false,
  validKeycodes: null
};
const getters = {
  scoresBoard(state) {
    return state.scores
  },
  isUserWon(state) {
    return state.userWon
  },
  showTimeLeft(state) {
    return state.maxTime
  },
  challengeInfo(state) {
    return state.completeData
  }
};
const mutations = {
  setInitialValues(state, payload) {
    state.completeData = payload;
    state.sentence = payload.sentence;
    state.maxTime = payload.maxTime;
    state.scores = new Array();
    state.index = 0;
    state.status = null;
    state.userWon = null;
    state.isGameStarted = false;
  },
  pushStar(state, payload) {
    state.scores.push({
      timeLimit: Math.floor(state.maxTime / payload),
      ratingStarNumber: payload
    })
  },
  setValidArrayKeycodes(state, payload) {
    state.validKeycodes = payload;
  },
  setGameStarted(state) {
    state.isGameStarted = true;
  },
  decreaseTime(state) {
    state.maxTime -= 1;
  },
  decreaseIndex(state) {
    state.index -= 1
  },
  updateStatus(state, payload) {
    state.status = payload;
  },
  EndGame(state) {
    state.userWon = true;
  }
};
const actions = {
  initializeGame({ commit, dispatch }, data) {
    commit('setInitialValues', data);
    dispatch('generateArrayKeycodes');
    dispatch('removeCurrentPhrase');
    dispatch('createScoreBoard')
    dispatch('createLettersDOM');
    dispatch('createTimerDOM');
  },
  startPlaying({state, commit, dispatch}, e) {
    if (!state.isGameStarted) { 
      dispatch('startTimer');
      commit('setGameStarted');
    }

    if (e.key === 'Backspace' && state.index > 0) dispatch('goBack');
    if (state.validKeycodes.includes(e.keyCode) && state.index < state.sentence.length) dispatch('goForward', e);
    if (state.maxTime > 0 && state.index === state.sentence.length && state.status !== 'wrong') commit('EndGame');

  },
  goBack({state, commit}) {
    commit('decreaseIndex')
    document.querySelectorAll('.letter')[state.index].style.color = '';
    commit('updateStatus', 'correct');
  },
  goForward({state, commit}, e) {
    const currentLetterElement = document.querySelectorAll('.letter')[state.index];
    let currentLetter = e.key.toUpperCase();

    if (currentLetter === ' ') currentLetter = '&nbsp;'.toUpperCase();

    if (currentLetter === currentLetterElement.innerHTML.toUpperCase() && state.status !== 'wrong'){
        currentLetterElement.style.color = '#4cd137';
        commit('updateStatus', 'correct');
    } else {
        currentLetterElement.style.color = '#e84118';
        commit('updateStatus', 'wrong');
    }

    state.index += 1
  },
  generateArrayKeycodes({commit}) {
    const keyCodeBackspace = 32;
    let arrayKeys = [keyCodeBackspace];
    let currentNumber = 65;
    let finalNumber = 91;
    while (currentNumber < finalNumber) {
        arrayKeys.push(currentNumber);
        currentNumber += 1
    }
    commit('setValidArrayKeycodes', arrayKeys);
  },
  removeCurrentPhrase() {
    document.querySelectorAll('.letter').forEach(letterDOM => letterDOM.remove());
  },
  createScoreBoard({ commit }) {
    for (let i = 1; i < 4; i++) commit('pushStar', i);
  },
  createLettersDOM({ state }) {
    state.sentence.split('').forEach(letter => {
      const divLetter = document.createElement('span');
      divLetter.classList.add('letter');
      letter === ' ' ? divLetter.innerHTML = '&nbsp;' : divLetter.innerHTML = letter
      document.querySelector('.containerTextBlackboard').appendChild(divLetter);
    });
  },
  createTimerDOM({ state }) {
    document.getElementById('timer').innerHTML = state.maxTime
  },
  startTimer({state, commit, dispatch}) {
    const countDown = setInterval(() => {
      commit('decreaseTime');
      dispatch('createTimerDOM');
      if (state.maxTime <= 0 || state.userWon) clearInterval(countDown);
    }, 900)
  },
};


export default {
  state,
  getters,
  mutations,
  actions
}