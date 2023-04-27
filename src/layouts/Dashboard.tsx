import Navbar from 'components/Navbar';

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 flex-col'>{children}</main>
    </div>
  );
};

export default Dashboard;
