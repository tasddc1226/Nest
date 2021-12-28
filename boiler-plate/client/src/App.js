import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import SignUpPage from './components/views/SignUpPage/SignUpPage'


function App() {
  return (
    <BrowserRouter>
      <div>
        

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
