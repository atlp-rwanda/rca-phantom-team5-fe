import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthLayout from 'layouts/AuthLayout';

export const data = [
  {
    id: 1,
    name: 'Jeremy Guillon',
    email: 'Admin@safebear.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'Admin@safebear.com',
    role: 'Editeur',
  },
  {
    id: 3,
    name: 'Jacob Marcus',
    email: 'Admin@safebear.com',
    role: 'Admin',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'Admin@safebear.com',
    role: 'Modérateur',
  },
  {
    id: 5,
    name: 'Marius sol',
    email: 'Admin@safebear.com',
    role: 'Editeur',
  },
  {
    id: 6,
    name: 'Jeremy Guillon',
    email: 'Admin@safebear.com',
    role: 'Modérateur',
  },
];
export interface IAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Buses() {
  const pageSize = 7;
  const linkCount = 3;
  const users = data;
  const search = '';
  const pageData: IAdmin[] = [];
  const currentPage = 1;
  const currentLinkPage = 1;
  let selected: number[] = [];
  const { user: authUser } = useSelector((state: any) => state.auth);

  function selectAll() {
    if (selected.length === pageData.length) {
      selected = [];
      return;
    }
    selected = users.map((user) => user.id);
  }
  function addToSelected(id: number) {
    if (selected.includes(id)) {
      selected = selected.filter((item) => item !== id);
    } else {
      selected = [...selected, id];
    }
  }

  return (
    <AuthLayout>
      <div className='flex h-screen flex-col items-start justify-start gap-10 overflow-y-auto bg-white px-8 py-16'>
        <div className='flex w-full gap-10'>
          <div className='rounded bg-primary-100 py-6 px-20'>
            <h1 className='text-2xl font-bold'>Hello, {authUser?.fname || 'Yassin'}</h1>
            <p className='border-gray-300 py-1 text-base text-[#5C5C5C]'>Welcome to the list of buses </p>
          </div>
          <div className='flex w-max gap-6 rounded bg-white py-6 px-10 shadow-buses'>
            <img className='h-16 w-16' src='/buses.svg' alt='' />
            <div className='flex flex-col gap-0 '>
              <span className='text-lg'>27</span>
              <span className='text-sm'>Buses Available</span>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <h4 className='text-xl font-semibold'>Buses</h4>
          <div className=' rounded-[3px] bg-white px-0.5'>
            <div className='flex border-b border-[#F2F2F2] px-0.5 py-5'>
              <div className='flex w-full gap-3 px-4'>
                <div
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className={`${
                    selected.length === users.length && users.length !== 0
                      ? 'border-primary bg-primary'
                      : 'border-silver-300'
                  }flex h-5 w-5 cursor-pointer items-center justify-center rounded-[7px] border`}
                  onClick={selectAll}
                >
                  {selected.length === users.length && <img src='/util/tick.svg' alt='' />}
                </div>
                <h4 className='font-lato self-center font-semibold'>Nom</h4>
              </div>
              <div className='relative flex w-full gap-3 px-4'>
                <h4 className='font-lato self-center font-semibold'>Email</h4>
              </div>
              <div className='flex w-full gap-3 px-4'>
                <h4 className='font-lato self-center font-semibold'>Role</h4>
              </div>
              <div className='flex w-full gap-3 px-4' />
              <div className='flex w-full gap-3 px-4' />
            </div>
            {users.map((user, index) => (
              <div key={user.id} className='flex border-b border-[#F2F2F2] px-0.5 py-5'>
                <div className='flex w-full gap-3 self-center px-4'>
                  <div
                    className={`${
                      selected.includes(user.id) ? 'border-primary bg-primary' : 'border-silver-300'
                    }flex h-5 w-5 cursor-pointer items-center justify-center rounded-[7px] border`}
                    onClick={() => {
                      addToSelected(user.id);
                    }}
                  >
                    {selected.includes(user.id) && <img src='util/tick.svg' alt='' />}
                  </div>
                  <h4 className='cursor-pointer self-center font-medium text-primary underline'>{user.name}</h4>
                </div>
                <div className='flex w-full gap-3 self-center px-4'>
                  <h4 className='self-center text-black opacity-[65%]'>{user.email}</h4>
                </div>
                <div className='flex w-full gap-3 self-center px-4'>
                  <h4 className='self-center text-black opacity-[65%]'>{user.role}</h4>
                </div>

                <div className='flex w-full gap-3 self-start px-4' />
                <div className='flex w-full gap-3 self-start px-4' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
