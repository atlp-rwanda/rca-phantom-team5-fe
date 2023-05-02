/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router';


export default function HomeScreen() {

  const links = [
    {
      name: 'About us',
      path: '/about',
    },
    {
      name: 'Our Clients',
      path: '/our-clients',
    },
    {
      name: 'Why us',
      path: '/why-us',
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
        <h1 className='text-[50px] text-orange'>Phatom-logo</h1>
        <div className='flex gap-4 self-center'>
          {links.map((link) => (
            <h3 key={link.path} onClick={() => navigate(link.path)} className='cursor-pointer text-[23px] text-white'>
              {link.name}
            </h3>
          ))}
        </div>
      </div>
      <div className='flex w-full justify-end pr-20'>
        <img className='absolute left-3 bottom-10 h-[60vh] w-[60vw] object-fill' src='/townbuses.png' alt='' />
        <div className='py- z-10 flex flex-col gap-20 py-20 px-8'>
          <h1 className='text-[60px] font-semibold text-white'>Welcome to Phantom</h1>
          <p className='max-w-lg text-center text-xl text-white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adi
          </p>
          <button
            onClick={() => navigate('/login')}
            className='self-center rounded bg-orange px-8 py-2 text-2xl text-white'
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
