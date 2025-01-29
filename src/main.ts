import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ClickOutside from './directives/ClickOutside';

const app = createApp(App)
  .use(ClickOutside);
  
app.mount('#app');
