import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App),
  router,

}).$mount('#app')
