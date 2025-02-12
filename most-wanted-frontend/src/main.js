import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './assets/tailwind.css'
import VueToastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import './assets/main.css';


const app = createApp(App);
app.use(createPinia()); // Pinia store
app.use(router); // Vue Router
app.use(createPinia()) // Use Pinia store

app.use(VueToastify)
app.mount('#app');
