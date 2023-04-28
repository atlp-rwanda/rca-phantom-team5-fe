import { useNavigate } from 'react-router';

export default function ViewBusesScreen () {
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
       <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
           <div className='flex flex-col items-center justify-center border-b md:flex-row md:justify-between px-4 md:px-8 py-4'>
               <h1 className='text-3xl text-orange mb-4 md:mb-0'>Phatom-logo</h1>
               <div className='flex items-center gap-6'>
                   {links.map((link) => (
                       <h3
                           key={link.path}
                           onClick={() => navigate(link.path)}
                           className='cursor-pointer text-lg text-black'
                       >
                           {link.name}
                       </h3>
                   ))}
               </div>
               <button
                   onClick={() => navigate('/login')}
                   className='rounded bg-orange px-6 py-2 text-lg text-white'
               >
                   Login
               </button>
           </div>
          <div>
            
          </div>
           <div className='flex justify-between '>
               <div className='box-border mr-48 ml-48 mx-auto h-28 w-80 border-1 bg-lightBlue box1'>
                   <h1 className='text-lg text-dark mt-4 ml-12 md:mb-0 '>Welcome to phantom</h1>
                   <p className='text-md text-gray-500 ml-8 mt-4 md:mb-0'>Journey from Kicukiro to Remera</p>
               </div>
               <div className='flex flex-row box mr-48'>
                   <div className='box-border  mr-6 float:right h-28 w-52 border-1 bg-white shadow-lg'>
                       <h1 className='text-md text-gray-500 mt-10 ml-20 md:mb-0 '>5</h1>
                       <p className='text-sm text-gray-500 ml-20 md:mb-0'>Buses available</p>
                   </div>
                   <div className='box-border h-28 w-52 border-1 bg-white shadow-lg'>
                       <h1 className='text-md text-gray-500 mt-10 ml-24 md:mb-0 '>30</h1>
                       <p className='text-sm text-gray-500 ml-24 md:mb-0'>Seats</p>
                   </div>
               </div>
           </div>

           

           <div className="relative shadow-md sm:rounded-lg mr-48 ml-48 mx-auto">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                       <tr>
                           <th scope="col" className="p-4">
                               <div className="flex items-center">
                                   <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                       <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                               </div>
                           </th>
                           <th scope="col" className="px-6 py-3">
                               Name
                           </th>
                           <th scope="col" className="px-6 py-3">
                               Model
                           </th>
                           <th scope="col" className="px-6 py-3">
                               Stop
                           </th>
                           <th scope="col" className="px-6 py-3">
                               Plate number
                           </th>
                           <th scope="col" className="px-6 py-3">
                               Seats
                           </th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <td className="w-4 p-4">
                               <div className="flex items-center">
                                   <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                       <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                               </div>
                           </td>
                           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Volcano
                           </th>
                           <td className="px-6 py-4">
                               Benz
                           </td>
                           <td className="px-6 py-4">
                               Kimihurura
                           </td>
                           <td className="px-6 py-4">
                               12
                           </td>
                           <td className="px-6 py-4">
                            45
                            </td>
                       </tr>
                       <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <td className="w-4 p-4">
                               <div className="flex items-center">
                                   <input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                       <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
                               </div>
                           </td>
                           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Volcano
                           </th>
                           <td className="px-6 py-4">
                               Benz
                           </td>
                           <td className="px-6 py-4">
                               Kimihurura
                           </td>
                           <td className="px-6 py-4">
                               12
                           </td>
                           <td className="px-6 py-4">
                            45
                           </td>
                       </tr>
                       <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <td className="w-4 p-4">
                               <div className="flex items-center">
                                   <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                       <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                               </div>
                           </td>
                           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               Volcano
                           </th>
                           <td className="px-6 py-4">
                               Benz
                           </td>
                           <td className="px-6 py-4">
                               Kimihurura
                           </td>
                           <td className="px-6 py-4">
                               12
                           </td>
                           <td className="px-6 py-4">
                              45
                           </td>
                       </tr>
                   </tbody>
               </table>
               <nav className="flex items-center justify-center pt-4" aria-label="Table navigation">
                   <ul className="inline-flex items-center gap-4 mb-4">
                       <li>
                           <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white  rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                               <span className="sr-only">Previous</span>
                               <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                           </a>
                       </li>
                       <li>
                           <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white rounded-full border border-color-gray hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                       </li>
                       <li>
                           <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white rounded-full border border-color-gray hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                       </li>
                       <li>
                           <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white rounded-full border border-color-gray hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                       </li>
            
                       <li>
                           <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                               <span className="sr-only">Next</span>
                               <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                           </a>
                       </li>
                   </ul>
               </nav>
           </div>

       </section>

   )

}