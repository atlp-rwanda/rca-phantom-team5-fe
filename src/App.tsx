import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/indes';
import HomeScreen from 'screens/HomeScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import Sidebar from 'layouts/Sidebar';
import RegisterUserScreen from 'screens/RegisterUser';
import { userProfile } from '../src/redux/api/authApi';

function App() {
  const user = userProfile();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route
            path='/register-user'
            element={
              user.data.role === 'admin' || user.data.role === 'super_admin' ? (
                <RegisterUserScreen />
              ) : (
                <NotFoundScreen />
              )
            }
          />
          <Route path='*' element={<NotFoundScreen />} />
          <Route path='/dashboard' element={<Sidebar />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
