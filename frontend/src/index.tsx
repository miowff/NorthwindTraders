import { GetAllDto } from '@backend/models/response/getAllResponse';
import { GetOneDto } from '@backend/models/response/response';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import store, { addLogData } from '@/redux';

import App from './App';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 20px;
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    line-height: 1.5;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onSuccess: (data) => {
        if (!(data as GetAllDto<any> | GetOneDto<any>)?.responseDetails) {
          return;
        }
        store.dispatch(addLogData((data as GetAllDto<any> | GetOneDto<any>).responseDetails));
      },
    },
  },
});

const root = createRoot(document.getElementById('root')!);
root.render((
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Normalize />
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
));
