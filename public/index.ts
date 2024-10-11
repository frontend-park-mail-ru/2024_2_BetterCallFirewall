import App from './app.ts';
import config from './config.ts';

const app: App = new App(config);
app.goToPage(window.location.pathname);
