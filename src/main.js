import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import {jwtInterceptor} from "@/utils/jwt.interceptor";

Vue.config.productionTip = false
Vue.use(axios);
jwtInterceptor();
new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')

