import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';
import './i18n';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
