import { ThemeProvider } from 'styled-components';
import './App.css';
import Header from './components/Header/Header';
import { theme } from './default/theme';
import { RecoilRoot} from 'recoil';
import { Suspense } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ItemList from './components/ItemList/ItemList'

function App() {
  return (
    <RecoilRoot>
    <ThemeProvider theme={theme}>
      <div className="App" >
      <Header/>
      <Suspense fallback={<div>loading</div>}>
      <Outlet />
        </Suspense>
    </div>
    </ThemeProvider>
    </RecoilRoot>

  );
}

export default App;
