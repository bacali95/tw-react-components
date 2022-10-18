import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { Spinner } from 'tw-react-components';

import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Suspense fallback={<Spinner fullScreen />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </StrictMode>
);
