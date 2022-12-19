import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import WelcomePage from './components/welcomePage/WelcomePage';
import LoginPage from './components/loginPage/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<WelcomePage/>}
        />
        <Route 
          path='/login' 
          element={<LoginPage/>} 
        />
      </Routes>
  </Router>
  );
}

export default App;
