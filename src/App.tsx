import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/indes';
import Sidebar from 'layouts/Sidebar';
import Dashboard from 'screens/Dashboaord';
import HomeScreen from 'screens/HomeScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import PasswordReset from 'screens/PasswordResetScreen';
import RegisterUserScreen from 'screens/RegisterUser';
import RequestPasswordReset from 'screens/RequestPasswordResetScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import PrivateRoute from 'components/PrivateRoutes';
import UpdateProfile from 'screens/UpdateProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route path='/dashboards' element={<Dashboard children={undefined} />} />
          <Route path='/reset-password/:token' element={<PasswordReset />} />
          <Route path='/request-reset-password' element={<RequestPasswordReset />} />
          <Route path='/register-user' element={<RegisterUserScreen />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='*' element={<NotFoundScreen />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute redirectPath='/login'>
                <Sidebar page={undefined} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
