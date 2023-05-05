/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <section className='flex flex-1 flex-col gap-10 bg-primary'>
      <nav className='flex flex-row justify-between border-gray-200 bg-primary dark:bg-gray-900'>
        <a href='/' className='flex items-center'>
          <img src='/second_logo.png' className='ml-10' alt='Logo' />
          <span className='self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white'>
            Phantom
          </span>
        </a>
        <div className='mx-10 flex max-w-screen-xl flex-wrap items-center justify-between'>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
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
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0  md:p-0 md:dark:bg-gray-900'>
              <li>
                <a
                  href='#'
                  className='mt-2 block rounded bg-blue-700 py-2 pl-3 pr-6 text-white dark:text-white md:bg-transparent md:p-0 md:text-white md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='mt-2 block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='mt-2 block rounded py-2 pl-3 pr-4 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Services
                </a>
              </li>
              <li>
                <button
                  type='button'
                  className='rounded-lg bg-white px-4 py-2 text-center text-orange outline-none hover:bg-orange hover:text-white focus:outline-none focus:ring-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0'
                >
                  <Link to={'/login'}>Login</Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='flex flex-col justify-between md:flex-row'>
        <img className='h-[60vh] w-full object-fill md:h-[70vh] md:w-[60vw]' src='/townbuses.png' alt='' />

        <div className='mr-40 flex flex-col'>
          {/* <h1 className='text-[60px] font-semibold text-white'>Welcome to Phantom</h1> */}
          <div className='mt-9 '>
            <h1 className='text-[40px] font-semibold text-white'>Gain visibility into your feet with Phantom</h1>
            <div className='w-2/5 border-4 border-white'></div>
          </div>
          <p className='mt-16 max-w-lg text-xl text-white'>
            Phantom takes the stress out of navigating public transportation in a new city or finding a new route by
            providing up-to-date information on bus schedules, routes, and stops.
          </p>
          <button
            onClick={() => navigate('/view-buses')}
            className='mt-20 w-[40vh] rounded bg-orange px-8 py-2 text-2xl font-bold text-white'
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
      <div className='w-full justify-end pl-20'>
        <div className=' w-full md:w-1/2'>
          <h1 className='my-10 text-[60px] font-semibold text-white '>Mobile version</h1>
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
