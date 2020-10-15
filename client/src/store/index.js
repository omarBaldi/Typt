import Vue from 'vue'
import Vuex from 'vuex'
import typeGame from './modules/typeGame'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    typeGame  
  }
})
