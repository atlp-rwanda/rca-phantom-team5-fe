import Navbar from 'components/Navbar';
import { userProfile } from '../redux/api/authApi';
import { UserDetails } from 'utils/types';
import { useSelector } from 'react-redux';
import Sidebar from 'layouts/Sidebar';

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Sidebar page={children} />
      {/* <main className='flex flex-1 flex-col'>{children}</main> */}
    </div>
  );
};

export default Dashboard;
