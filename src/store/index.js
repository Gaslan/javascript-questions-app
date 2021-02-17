import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    stage: 'start',
    selectedLanguage: {},
    questions: [],
    activeQuestion: {},
    quizResult: {}
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
    },
    setQuizResult(state, result) {
      state.quizResult = result
    },
    increaseQuizResultWrongs(state) {
      state.quizResult.wrongs++
    },
    increaseQuizResultRights(state) {
      state.quizResult.rights++
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
    setQuizResult({commit}, result) {
      commit('setQuizResult', result)
    },
    increaseQuizResultWrongs({commit}) {
      commit('increaseQuizResultWrongs')
    },
    increaseQuizResultRights({commit}) {
      commit('increaseQuizResultRights')
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
