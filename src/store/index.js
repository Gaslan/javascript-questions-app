import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    stage: 'start',
    selectedLanguage: {},
    questions: [],
    activeQuestion: {}
  }),
  mutations: {
    setStage(state, stage) {
      state.stage = stage
    },
    setSelectedLanguage(state, language) {
        state.selectedLanguage = language
    },
    setQuestions(state, questions) {
        state.questions = questions
    },
    setActiveQuestion(state, question) {
        state.activeQuestion = question
    }
  },
  actions: {
    setStage({commit}, stage) {
      commit('setStage', stage)
    },
    setSelectedLanguage({commit}, language) {
      commit('setSelectedLanguage', language)
    },
    setQuestions({commit}, questions) {
      commit('setQuestions', questions)
    },
    setActiveQuestion({commit}, question) {
      commit('setActiveQuestion', question)
    },
    randomizeQuestion({commit}) {
      const max = this.state.questions.length;
      if (max == 0) {
        return
      }
      const index = Math.floor(Math.random() * max);
      const question = this.state.questions[index]
      commit('setActiveQuestion', question)
    }
  }
})

export default store
