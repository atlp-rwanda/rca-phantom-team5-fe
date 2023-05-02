import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  console.log(user.isAuthenticated);

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary '>
      <div className='rounded bg-white px-16 py-16 '>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='border-gray-300 py-1 text-base'>You have been Logged in successfully</p>
      </div>
    </div>
  );
};

export default Dashboard;
