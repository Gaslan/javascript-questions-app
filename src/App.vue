<template>
  <div id="app">
    <Navbar />
    <StartView v-if="this.stage == 'start'" />
    <div v-if="this.stage == 'started'" class="main-content container">
      <div class="row">
        <div class="col-12">
          <Question 
            :data="this.activeQuestion" 
            :key="this.activeQuestion.number" 
            :showAnswerDescription="this.showAnswerDescription"
            v-on:answered="handleAnswered" />
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer-left">
        <div class="results wrong">
          <b-icon icon="x-circle-fill"></b-icon>
          <span v-text="this.quizResult.wrongs"></span>
        </div>
        <div class="results right">
          <b-icon icon="check-circle-fill"></b-icon>
          <span v-text="this.quizResult.rights"></span>
        </div>
      </div>
      <div class="footer-right">
        <button class="definition" v-if="this.answered" @click="handleClickShowAnswerDescription()">Açıklama</button> 
        <button v-if="!this.answered" @click="handleRandomizeQuestion()">Atla</button> 
        <button v-if="this.answered" @click="handleRandomizeQuestion()">Devam Et <b-icon icon="arrow-right-short"></b-icon></button> 
      </div> 
    </footer>
    <div class="modal fade" id="answerDescription" tabindex="-1" aria-labelledby="answerDescriptionLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">kemal</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Question from "./components/Question";
import Navbar from "./components/Navbar";
import StartView from "./components/StartView";
// const cheerio = require('cheerio');
// const marked = require("marked");

export default {
  name: 'App',
  components: {
    Question,
    Navbar,
    StartView
  },
  data() {
    return {
      answered: false,
      showAnswerDescription: false
    }
  },
  computed: {
    ...mapState(['stage', 'questions', 'activeQuestion', 'quizResult'])
  },
  created() {
    this.getQuestions();
  },
  methods: {
    ...mapActions(['setQuestions', 'randomizeQuestion']),
    handleAnswered() {
      this.answered = true
    },
    handleRandomizeQuestion() {
      this.randomizeQuestion()
      this.answered = false
      this.showAnswerDescription = false
      window.scrollTo({
        top: 0
      })
    },
    async getQuestions() {
      let mdText
      await fetch('https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/tr-TR/README-tr_TR.md')
      .then(response => response.text())
      .then(data => {
        mdText = data
      });

      const qArr = mdText.split('---')
      // const aArr = qArr[1].split(/(\r\n|\n|\r)/gm)

      const questions = qArr
        .filter((_, i) => i > 0)
        .map(x => this.parseQuestion(x))
      
      this.setQuestions(questions)
    },
    parseQuestion(s) {
      const titleStartIndex = s.indexOf('######')
      const titleEndIndex = s.indexOf('\n', titleStartIndex)

      const questionStartIndex = titleEndIndex + 1
      const questionEndIndex = s.indexOf('- A', questionStartIndex)

      const optionsStartIndex = questionEndIndex
      const optionsEndIndex = s.indexOf('<details>', optionsStartIndex)
      
      const answerStartIndex = s.indexOf('####', optionsEndIndex)
      const answerEndIndex = s.indexOf('\n', answerStartIndex)

      const answerDescriptionStartIndex = answerEndIndex + 1
      const answerDescriptionEndIndex = s.indexOf('</p>', answerDescriptionStartIndex)




      const titleText = s.substring(titleStartIndex + 6, titleEndIndex)
      const titleTextArr = titleText.split('. ')
      const number = titleTextArr[0].trim()
      const title = titleTextArr[1].trim()
      const question = s.substring(questionStartIndex, questionEndIndex)
      const optionsText = s.substring(optionsStartIndex, optionsEndIndex)
      const options = optionsText.trim().split('\n').map(x => this.parseOption(x))
      const answerText = s.substring(answerStartIndex, answerEndIndex)
      const answer = answerText.substring(answerText.indexOf(':') + 1).trim()
      const answerDescription = s.substring(answerDescriptionStartIndex, answerDescriptionEndIndex)

      return {number, title, question, options, answer, answerDescription}
    },
    parseOption(option) {
      const idx1 = option.indexOf('-')
      const idx2 = option.indexOf(':')
      const optionLetter = option.substring(idx1 + 1, idx2).trim()
      const backtickRexExp = /`(.*?)`/g
      const optionBody = option
        .substring(idx2 + 1)
        .trim()
        .replace(backtickRexExp, x => `<code class="code-inner">${x.replace(/`/g, '')}</code>`)
      return {optionLetter, optionBody}
    },
    handleClickShowAnswerDescription() {
      this.showAnswerDescription = true
    }
  }
}
</script>

<style lang="scss">
@import './app.scss';

.main-content{
  margin-top: 60px;
  margin-bottom: 50px;
  padding-top: 32px;
}

code.code-inner{
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  background: #f8f8f8;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  color: #212529;
}

.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  background: #44578e;
  display: flex;
  align-items: center;
  border-top: 1px solid #2a3a68;
  padding: 0 16px;
  // box-shadow: 0 -1px 6px 2px #d3d5da;
}

.footer .footer-left, .footer .footer-right{
  display: flex;
  align-items: center;
  width: 50%;
}

.footer .footer-right{
  justify-content: flex-end;
}

.footer button{
  border: 1px solid transparent;
  background: #8f9abb;
  border-radius: 4px;
  padding: 4px 12px;
  color: #2f4175;
  white-space: nowrap;
  font-weight: 500;
}

.footer button.definition{
  border-width: 0;
  background: transparent;
  color: #1c2950;
  font-weight: 500;
}

.footer .results{
  display: flex;
  align-items: center;
  padding: 2px 8px;
  // background: #8f9abb;
  margin-right: 8px;
  border-radius: 4px;
}

.footer .results svg{
  width: 20px;
  height: 20px;
  fill: #eee;
}

.footer .results span{
  color: #eee;
  margin-left: 8px;
}

.footer .results.right svg{
  fill: #4caf50;
}

.footer .results.wrong svg{
  fill: #f44336;
}
</style>
