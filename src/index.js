import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './i18n';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();
