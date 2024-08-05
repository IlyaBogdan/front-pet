import { createApp } from 'vue';
import App from './App.vue';
import UI from './components/UI';
import Common from './components/common';
import { router } from './router';
import store from './store/index';
import '../styles.scss';

const app = createApp(App);

UI.concat(Common)
    .forEach((component) => {
        app.component(component.name, component);
    });

app
    .use(router)
    .use(store)
    .mount('#app');
