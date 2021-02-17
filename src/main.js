import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCountryCode from "vue-country-code";
import hljs from 'highlight.js';

// import './app.scss'
// import 'highlight.js/styles/github.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCountryCode);
Vue.use(hljs.vuePlugin);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
