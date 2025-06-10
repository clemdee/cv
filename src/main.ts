import './assets/base.scss';
import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '~/App.vue';
import i18n from '~/i18n';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(VueTippy);

app.mount('#app');
