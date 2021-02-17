<template>
  <div class="q-start">
    <CountryDropdown />

    <button @click="this.startQuiz">Başla</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CountryDropdown from "./CountryDropdown";
export default {
  name: "StartView",
  components: {
    CountryDropdown
  },
  data() {
    return {
      languages: ['ar', 'bs', 'de', 'es', 'fr', 'id', 'ja', 'ko', 'nl'  , 'pt', 'ru', 'th', 'tr', 'ua', 'vi', 'zh']
    };
  },
  methods: {
    ...mapActions(['setStage', 'randomizeQuestion', 'setQuizResult']),
     startQuiz() {
       this.randomizeQuestion()
       this.setStage('started')
       this.setQuizResult({
         rights: 0,
         wrongs: 0
       })
     }
  },
}
</script>

<style>
.q-start{
  margin-top: 60px
}
</style>