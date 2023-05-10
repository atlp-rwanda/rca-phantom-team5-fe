import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoutes';
import Layout from 'layouts/indes';
import Sidebar from 'layouts/Sidebar';
import CreateRouteScreen from 'screens/CreateRouteScreen';
// import Dashboard from 'screens/Dashboaord';
import HomeScreen from 'screens/HomeScreen';
import MapScreen from 'screens/MapScreen';
import MapViewScreen from 'screens/MapViewScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import OverviewScreen from 'screens/OverviewScreen';
import PasswordReset from 'screens/PasswordResetScreen';
import RegisterUserScreen from 'screens/RegisterUser';
import RequestPasswordReset from 'screens/RequestPasswordResetScreen';
import RouteDetailsScreen from 'screens/RouteDetailsScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import UpdateProfile from 'screens/UpdateProfile';
import UpdateRouteScreen from 'screens/UpdateRouteScreen';
import ViewBusesScreen from 'screens/ViewBusesScreen';
import ViewRoutesScreen from 'screens/ViewRoutesScreen';

import { userProfile } from './redux/api/authApi';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          {/* <Route path='/dashboards' element={<Dashboard />} /> */}
          <Route path='/reset-password/:token' element={<PasswordReset />} />
          <Route path='/request-reset-password' element={<RequestPasswordReset />} />
          <Route path='/register-user' element={<RegisterUserScreen />} />
          <Route path='/create-route' element={<CreateRouteScreen />} />
          <Route path='/update-route/:id' element={<UpdateRouteScreen />} />
          <Route path='/route-details/:id' element={<RouteDetailsScreen />} />
          <Route path='/routes' element={<ViewRoutesScreen />} />
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
          {/* <Route path='/overview' element={<OverviewScreen />} /> */}
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
            path='/overview'
            element={
              <PrivateRoute redirectPath='/login'>
                <OverviewScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
