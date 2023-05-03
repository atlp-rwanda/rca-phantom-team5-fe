/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const links = [
    {
      name: 'About us',
      path: '/about',
    },
    {
      name: 'Our Services',
      path: '/our-clients',
    },
    {
      name: 'Contact us',
      path: '/contact-us',
    },
  ];
  const navigate = useNavigate();
  return (
    <section className='flex flex-1 flex-col gap-10 bg-primary py-2'>
      <div className='flex justify-between px-8'>
        <img className='mt-0 object-fill' src='/logo.png' alt='' />
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='h-6 w-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex w-full justify-end gap-4 self-center '>
          {links.map((link) => (
            <h3
              key={link.path}
              onClick={() => navigate(link.path)}
              className='cursor-pointer px-6 py-2 text-[19px] text-white'
            >
              {link.name}
            </h3>
          ))}
          <Link to={'/login'} className='rounded-lg bg-white px-6 py-2 font-bold text-orange'>
            Login
          </Link>
          {/* </div> */}
        </div>
      </div>
      <div className='flex flex-col justify-between md:flex-row'>
        <img className='h-[60vh] w-full object-fill md:h-[80vh] md:w-[60vw]' src='/townbuses.png' alt='' />

        <div className='mr-40 flex flex-col'>
          {/* <h1 className='text-[60px] font-semibold text-white'>Welcome to Phantom</h1> */}
          <p className='mt-40 max-w-lg text-xl text-white'>
            Phantom takes the stress out of navigating public transportation in a new city or finding a new route by
            providing up-to-date information on bus schedules, routes, and stops.
          </p>
          <button
            onClick={() => navigate('/view-buses')}
            className='mt-20 self-center rounded bg-orange px-8 py-2 text-2xl font-bold text-white'
          >
            Find your Bus
          </button>
        </div>
      </div>
      <div>
        <div className='my-10 ml-20 '>
          <h1 className='text-[60px] font-semibold text-white'>What We Do</h1>
          <div className='w-1/5 border-4 border-white'></div>
        </div>

        <div className='flex flex-col justify-around md:flex-row'>
          <div className='mt-4 flex max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
            <a href='#'>
              <img className='rounded-t-lg' src='/seats.png' alt='' />
            </a>
            <div className='p-5'>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                No more standing around waiting for a bus with no seats - with Phantom, you can check available seats on
                your desired bus in real-time. We'll show you which buses have space so you can plan your journey
                accordingly.
              </p>
            </div>
          </div>

          <div className='mt-4 flex max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
            <a href='#'>
              <img className='self-center' src='/location.png' alt='' />
            </a>
            <div className='p-5'>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                Get real-time location information of your bus with Phantom. You'll know exactly when to leave your
                location to catch the bus, and you can even track its progress as it approaches your stop.
              </p>
            </div>
          </div>

          <div className='mt-4 flex max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
            <a href='#'>
              <img className='self-center' src='/time.png' alt='' />
            </a>
            <div className='p-5'>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                Find out how fast your bus is moving with Phantom. We provide you with the bus speed, so you'll have an
                idea of when you'll arrive at your destination. No more guessing or stressing about delays - Phantom has
                you covered with all the information you need for a smooth journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=' my-10 w-full justify-end pl-20'>
        <div className='w-1/2'>
          <h1 className='text-[60px] font-semibold text-white'>Mobile version</h1>
          <div className='w-2/5 border-4 border-white'></div>
          <div className='flex flex-col md:flex-row'>
            <div className='p-5'>
              <p className='mb-3 font-normal text-white dark:text-gray-400'>
                Our application is designed to be responsive and adaptable to different devices, including mobile
                phones. We understand that many of our users rely on their smartphones to navigate public
                transportation, and we want to make sure that they can access our service wherever they are.
              </p>
              <button
                onClick={() => navigate('/view-buses')}
                className='mt-20 self-center rounded bg-orange px-8 py-2 text-2xl font-bold text-white'
              >
                Get Started
              </button>
            </div>
            <img className='rounded-t-lg' src='/phone.png' alt='' />
          </div>
        </div>
      </div>
    </section>
  );
}
