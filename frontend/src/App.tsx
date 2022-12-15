import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import WelcomePage from './components/welcomePage/WelcomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<WelcomePage/>}
        />
      </Routes>
  </Router>
  );
}

export default App;
