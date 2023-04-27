import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/indes';
import HomeScreen from 'screens/HomeScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';

import Sidebar from 'layouts/Sidebar';
import Dashboard from 'screens/Dashboaord';
import RegisterUserScreen from 'screens/RegisterUser';
import UpdateProfile from 'screens/UpdateProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/sign-up' element={<SignUpScreen />} />
          <Route path='/login' element={<SignInScreen />} />
          <Route path='/dashboard' element={<Dashboard children={undefined} />} />
          <Route path='/register-user' element={<RegisterUserScreen />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='*' element={<NotFoundScreen />} />
          <Route path='/dashboard' element={<Sidebar />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
