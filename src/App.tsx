import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/indes';
import Sidebar from 'layouts/Sidebar';
import Dashboard from 'screens/Dashboaord';
import HomeScreen from 'screens/HomeScreen';
import MapScreen from 'screens/MapScreen';
import MapViewScreen from 'screens/MapViewScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import RegisterUserScreen from 'screens/RegisterUser';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route path='/register-user' element={<RegisterUserScreen />} />
          <Route path='*' element={<NotFoundScreen />} />
          <Route path='/dashboard' element={<Sidebar />} />
          <Route path='/map' element={<MapScreen />} />
          <Route path='/map-view' element={<MapViewScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
