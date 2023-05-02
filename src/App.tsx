import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from 'layouts/AuthLayout';
import Layout from 'layouts/index';
import Buses from 'screens/BusesScreen';
import Dashboard from 'screens/Dashboard';
import HomeScreen from 'screens/Home';
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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/buses' element={<Buses />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
