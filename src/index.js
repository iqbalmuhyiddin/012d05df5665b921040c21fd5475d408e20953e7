import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css'
import 'react-tagsinput/react-tagsinput.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
