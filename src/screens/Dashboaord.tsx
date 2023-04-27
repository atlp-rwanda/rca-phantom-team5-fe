import Navbar from 'components/Navbar';
import { userProfile } from '../redux/api/authApi';
import { UserDetails } from 'utils/types';
import { useSelector } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  const user: UserDetails = useSelector((state: any) => state.auth.userInfo);
  console.log(user);
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 flex-col'>{children}</main>
    </div>
  );
};

export default Dashboard;
