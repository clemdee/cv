import { createApp } from 'vue';
import VueTippy from 'vue-tippy';
import App from '~/App.vue';
import { i18n } from '~/i18n';
import './assets/base.scss';
import './assets/main.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'leaflet/dist/leaflet.css';
import './leafletFix';

const app = createApp(App);

app.use(i18n);
app.use(VueTippy);

app.mount('#app');
