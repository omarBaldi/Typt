const state = {
  completeData: null,
  sentence: null,
  maxTime: 0,
  scores: null
};
const getters = {
  scoresBoard(state) {
    return state.scores
  },
};
const mutations = {
  setInitialValues(state, payload) {
    state.completeData = payload;
    state.sentence = payload.sentence;
    state.maxTime = payload.maxTime;
    state.scores = new Array()
  },
  pushStar(state, payload) {
    state.scores.push({
      timeLimit: Math.floor(state.maxTime / payload),
      ratingStarNumber: payload
    })
  }
};
const actions = {
  initializeGame({ commit, dispatch }, data) {
    commit('setInitialValues', data);
    dispatch('removeCurrentPhrase');
    dispatch('createScoreBoard')
    dispatch('createLettersDOM');
    dispatch('createTimerDOM');
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
};


export default {
  state,
  getters,
  mutations,
  actions
}