import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import WelcomePage from './components/welcomePage/WelcomePage';
import LoginPage from './components/loginPage/LoginPage'
import MainPage from './components/mainPage/MainPage';
import ExplorePage from './components/mainPage/explorePage/ExplorePage';
import ProfilePage from './components/mainPage/yourProfilePage/ProfilePage'
import EditPage from './components/mainPage/yourProfilePage/EditPage';
import MatchesPage from './components/mainPage/matchesPage/MatchesPage';
import SettingsPage from './components/mainPage/yourProfilePage/SettingsPage';

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
        <Route path='/home' element={<MainPage/>}>
          <Route path='explore' element={<ExplorePage/>}/>
          <Route path='profile' element={<ProfilePage/>}/>
          <Route path='profile/edit' element={<EditPage/>}/>
          <Route path='profile/settings' element={<SettingsPage/>}/>
          <Route path='matches' element={<MatchesPage/>}/>
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
