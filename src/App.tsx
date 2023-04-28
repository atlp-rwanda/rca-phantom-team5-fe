import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/indes';
import Dashboard from 'screens/Dashboaord';
import HomeScreen from 'screens/HomeScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import PasswordReset from 'screens/PasswordResetScreen';
import RegisterUserScreen from 'screens/RegisterUser';
import RequestPasswordReset from 'screens/RequestPasswordResetScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import Sidebar from 'layouts/Sidebar';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route path='/dashboards' element={<Dashboard />} />
          <Route path='/reset-password' element={<PasswordReset />} />
          <Route path='/request-password-reset' element={<RequestPasswordReset />} />
          <Route path='/register-user' element={<RegisterUserScreen />} />
          <Route path='*' element={<NotFoundScreen />} />
          <Route path='/dashboard' element={<Sidebar/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
