import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './index.css'
import { createVuetify } from 'vuetify'
import "vuetify/styles";
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    
});

const app = createApp(App);
app.use(router)
app.use(store);
app.use(vuetify)
app.mount('#app')

