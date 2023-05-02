import { useSelector } from 'react-redux';
import AuthLayout from 'layouts/AuthLayout';

function Dashboard() {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <AuthLayout>
      <div className='flex h-screen flex-col items-center justify-center bg-white '>
        <div className='rounded bg-primary p-16'>
          <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
          <p className='border-gray-300 py-1 text-base text-white'>You have been Logged in successfully</p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Dashboard;
