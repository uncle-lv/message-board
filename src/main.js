import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI);

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
