<template>
  <div class="question">
    <h4 v-html="title" class="mb-4"></h4>
    <div v-if="question.trim().length > 0" class="question-wrapper mb-4">
      <highlightjs language='javascript' :code="question" />
    </div>
    <hr class="my-5">
    <div class="options mb-4">
      <ul class="row">
        <li v-for="option in options" :key="option.optionLetter" :data-option-value="option.optionLetter" class="col-sm-12 col-md-6">
          <label @click.self="handleOptionClick(option.optionLetter, $event)" :for="`option${option.optionLetter}`">
            <!-- <input type="text" :name="`option${option.optionLetter}`" :id="`option${option.optionLetter}`"> -->
            <div class="option-wrapper">
              <div class="option">
                <div class="option-letter">
                  {{option.optionLetter}}
                </div>
                <div class="option-body" v-html="option.optionBody"></div>
              </div>
            </div>
          </label>
        </li>
      </ul>
    </div>
    <p v-text="answer" class="d-none"></p>
    <p v-if="this.answered" v-text="answerDescription"></p>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {
      answered: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleOptionClick(optionLetter, event) {
      if (this.answered) {
        return
      }
      this.answered = true
      this.$emit('answered')
      if (this.data.answer == optionLetter) {
        event.target.classList.add('answer-right')
      } else {
        event.target.classList.add('answer-wrong')
        document.querySelector(`[data-option-value="${this.data.answer}"] label`).classList.add('answer-right')
      }
    }
  },
  watch: {
    activeQuestion() {
      console.log('Soru değişti...')
      this.$forceUpdate()
    }
  },
  computed: {
    title() {
      // const index = this.data.title.indexOf(". ")
      // const str = this.data.title.substring(index + 2);
      const backtickRexExp = /`(.*?)`/g
      return this.data.title.replace(backtickRexExp, x => `<code class="code-inner">${x.replace(/`/g, '')}</code>`)
    },
    question() {
      const backtickRexExp = /`(.*?)/g
      return this.data.question.replace(backtickRexExp, '').replace('javascript', '').trim()
    },
    options() {
      return this.data.options
    },
    answer() {
      return this.data.answer
    },
    answerDescription() {
      return this.data.answerDescription
    }
  }
}
</script>

<style>
.question-wrapper{
  border: 1px solid #888;
  border-radius: 4px;
  /* background: #fff; */
  /* background: #2b2b2b; */
  /* padding: 4px; */
}

.question-wrapper .hljs{
  padding: 12px;
  border-radius: 4px;
}

.question-wrapper pre{
  margin-bottom: 0;
}

.options ul{
  list-style: none;
  /* margin: 0 -16px; */
  padding: 0;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
}

.options ul li{
  display: flex;
  flex-direction: column;
  /* flex: 1 1; */
  padding: 0 16px;
}

.options ul li label{
  display: flex;
  flex: 1 1;
  width: 100%;
  position: relative;
  align-items: stretch;
  margin-bottom: 30px;
  cursor: pointer;
}

.options ul li label input{
  display: none;
  user-select: none;
  visibility: hidden;
  width: 0;
  height: 0;
  opacity: 0;
}

.options .option-wrapper{
  width: 100%;
  pointer-events: none;
  background: #fff;
  border: 1px solid #c9ccd9;
  border-radius: 8px;
  transition: box-shadow .3s ease,background-color .3s ease,border-color .3s ease;
}

.options .answer-right .option-wrapper{
  border-color: #6cad4e;
  background: linear-gradient(to right, rgb(86, 171, 47), rgb(168, 224, 99));
}

.options .answer-wrong .option-wrapper{
  border-color: #f00;
  background: linear-gradient(to right, rgb(255, 81, 47), rgb(221, 36, 118));
}

.options .option-wrapper:hover{
  box-shadow: 0 4px 32px #e4e6ec;
}

.options .option-wrapper .option{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 24px;
}

.options .option-letter{
  font-size: 24px;
  font-weight: 700;
}
</style>