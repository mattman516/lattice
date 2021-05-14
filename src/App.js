import React from 'react';
import { ContextProvider } from './context';
import Page from './Page';

const App = () => { 
  return (
    <div style={{ margin: 30 }}>
      <ContextProvider>
        <Page />
      </ContextProvider>
    </div>
  );
}

export default App;
