import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoutes';
import Layout from 'layouts/indes';
import Sidebar from 'layouts/Sidebar';
import HomeScreen from 'screens/HomeScreen';
import MapScreen from 'screens/MapScreen';
import MapViewScreen from 'screens/MapViewScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import PasswordReset from 'screens/PasswordResetScreen';
import RegisterUserScreen from 'screens/RegisterUser';
import RequestPasswordReset from 'screens/RequestPasswordResetScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import UpdateProfile from 'screens/UpdateProfile';
import ViewBusesScreen from 'screens/ViewBusesScreen';

import { userProfile } from './redux/api/authApi';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route path='/reset-password/:token' element={<PasswordReset />} />
          <Route path='/request-reset-password' element={<RequestPasswordReset />} />
          <Route
            path='/register-user'
            element={
              <PrivateRoute redirectPath='/login'>
                <RegisterUserScreen />
              </PrivateRoute>
            }
          />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='*' element={<NotFoundScreen />} />
          <Route path='/view-buses' element={<ViewBusesScreen />} />
          <Route
            path='/map'
            element={
              <PrivateRoute redirectPath='/login'>
                <MapScreen />{' '}
              </PrivateRoute>
            }
          />
          <Route path='/map-view' element={<MapViewScreen />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute redirectPath='/login'>
                <Sidebar children={undefined} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
