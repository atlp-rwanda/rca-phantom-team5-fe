import { Link } from 'react-router-dom';

export default function NotFoundScreen() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center overflow-auto bg-primary p-4'>
      <div className='max-w-lg   text-center'>
        <h1 className='text-4xl font-bold text-white'>Oops!</h1>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <p className='b-4 mb-5 mt-4  text-lg font-medium text-white'>
          We re sorry. The page you requested could not be found. Please go back to the homepage or contact us
        </p>
        <Link to='/' className='mt-4 rounded-md bg-orange px-4 py-2 text-white shadow-md'>
          Go back
        </Link>
      </div>
    </div>
  );
}
