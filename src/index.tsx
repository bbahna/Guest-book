import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Sub from './pages/sub';
import Popup from './pages/popup';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sub" element={<Sub />} />
      <Route path="/popup" element={<Popup />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
