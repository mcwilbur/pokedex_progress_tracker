import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-css-only/css/bootstrap.min.css' 

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
