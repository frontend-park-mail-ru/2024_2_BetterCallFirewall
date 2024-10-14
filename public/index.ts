import App from './app';
import config from './config';

const app: App = new App(config);
app.goToPage(window.location.pathname);
