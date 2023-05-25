import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '../src/components/App';

import './index.css';
import reportWebVitals from './reportWebVitals';
import {DevSupport} from '@react-buddy/ide-toolbox';
import {ComponentPreviews, useInitial} from './dev';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
      <App/>
    </DevSupport>
  </React.StrictMode>
);

reportWebVitals();
