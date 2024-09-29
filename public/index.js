import App from './app.js';
import config from './config.js';

const root = document.getElementById('root');

const app = new App(config, root);
app.goToPage(window.location.pathname);
