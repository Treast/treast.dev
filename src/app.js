import App from './utils/App';
import Scene from './utils/Scene';
import './app.scss';

const app = new App();

app.isReady().then(() => {
  Scene.init();
  Scene.render();
});
