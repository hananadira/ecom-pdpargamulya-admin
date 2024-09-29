import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './redux/store'
import { ThemeProvider } from '@material-tailwind/react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ReduxProvider store={store}>
        {/* <PersistGate persistor={persistor}> */}
            <App />
        {/* </PersistGate> */}
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
)