    import { useNavigate } from 'react-router';
    import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocations } from '../redux/api/locationApi';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { selectAllLocations } from '../redux/slice/locationSlice';
import { GetBuses } from '../redux/api/viewBusesApi';
import { AppDispatch } from 'redux/store';

export interface LocationType {
    createdAt?: Date;
    updatedAt?: Date;
    location_name?: string;
    latitude?: string;
    longitude?: string;
}

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
    const [selected, setSelected] = useState<number>(0);
    const [selected1, setSelected1] = useState<number>(0);

    const getInput = (e: { target: { value: React.SetStateAction<number> } }) => {
            setSelected(e.target.value);
        console.log(e.target.value)
        };
        const getInput1 = (e: { target: { value: React.SetStateAction<number> } }) => {
            setSelected1(e.target.value);
            console.log(e.target.value)
        };
        
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [loading, setLoading] = useState<boolean>(false);
        const [errortext, setErrortext] = useState<string>('');
        const buses = useSelector((state: any) => state.buses.buses)
        const busStatus = useSelector((state: any) => state.buses.status)
        const locations = useSelector((state: any) => state.locations.locations)
        const locationStatus = useSelector((state: any) => state.locations.status)


        useEffect(() => {
            if (locationStatus === 'idle') {
                dispatch(GetLocations())
            }
        }, [locationStatus, dispatch]);
        if (busStatus==="success") {
            console.log(buses);
        }

    return (
        
        <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
            {locationStatus !== "success" && loading ? (
                <div className='flex h-screen items-center justify-center'>
                    <div className='h-14 w-14 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
                </div>
            ) : (
                <>
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
            <div className='flex  justify-between -mt-8'>
                <div className="box-border mx-auto w-80 h-24 mr-48 ml-48 border-1 bg-lightBlue box1">
                    <h1 className="text-lg text-dark mt-8 ml-12 md:mb-0">Welcome to phantom</h1>
              
                </div>

                <div className="flex flex-row box mr-48">
                    <div className="box-border float-right h-28 w-52 mr-6 border-1 bg-white shadow-lg shadow-indigo-400/20 flex items-center">
                        <h1 className="ml-4 px-5 py-4 rounded-full border border-color-gray bg-green text-white">8</h1>
                        <p className="text-sm text-gray-500 ml-4">Buses available</p>
                    </div>

                    <div className="box-border h-28 w-52 border-1 bg-white shadow-lg shadow-indigo-400/20 flex items-center">
                        <h1 className="ml-4 px-5 py-4 rounded-full border border-color-gray text-white bg-red">30</h1>
                        <p className="text-sm text-gray-500 ml-4">Seats</p>
                    </div>
                </div>
                </div>
                <div className="relative shadow-md shadow-indigo-400/20  mr-48 ml-48 mx-auto">
                <div>{errortext ? <h1 className='-mt-3 mb-3 text-red'>No Bus found on this route</h1> : <h1 className='-mt-3 mb-3'>Buses on track</h1>}</div>
                
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
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white rounded-full border border-color-gray hover:bg-gray-100 hover:text-gray-700">1</a>
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
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='flex justify-between items-center box-border shadow-md shadow-indigo-400/20 sm:rounded-lg mr-48 ml-48 mx-auto border-1 bg-white h-20'>
                          
                            <Formik
                                initialValues={{ from:selected , to: selected1}}
                                validationSchema={Yup.object({
                                    from: Yup.number().required('Required'),
                                    to: Yup.number().required('Required'),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(async () => {
                                        setLoading(true);
                                        const resultAction = await dispatch<AppDispatch>(
                                            GetBuses({
                                                from: values.from,
                                                to: values.to
                                            }),
                                        );
                                        if (GetBuses.fulfilled.match(resultAction)) {
                                            setErrortext('');
                                            setLoading(false);
                                            setSubmitting(false);
                                        } else {
                                            if (resultAction.payload) {
                                                setErrortext(resultAction.payload.message);
                                             
                                            }
                                            setErrortext(resultAction.payload.message);
                                        }
                                        setLoading(false);
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                            <Form>
                                    <label htmlFor='from' className='mb-2 mt-6 ml-4 inline-block'>
                                        From:
                                    </label>
                            <Field
                                as='select'
                                onChange={getInput}
                                name='from'
                                value={selected}
                                className='focus:shadow-outline  w-32 h-8  rounded ml-4 mt-6 border-b border-gray-300 -py-2 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                                placeholder='From: '
                            >
                                        <option value={selected}>{selected}</option>
                                        {locations.map((location: { id: React.Key | undefined | string | number | readonly string[]; location_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined| React.Key; }) => (
                                                <option value={location.id}>{location.location_name}</option>
                                            ))}
                               
                            </Field>

                                    <label htmlFor='to' className='mb-2 mt-6 ml-52 inline-block'>
                                        To:
                                    </label>
                                    <Field
                                        as='select'
                                        onChange={getInput1}
                                        name='to'
                                        value={selected1}
                                        className='focus:shadow-outline  w-32 h-8  rounded ml-4 mt-6 border-b border-gray-300 -py-2 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                                        placeholder='From: '
                                    >
                                        <option value={selected1}>{selected1}</option>
                                        {locations.map((location: { id: React.Key | undefined | string | number | readonly string[]; location_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined | React.Key; }) => (
                                            
                                            <option value={location.id}>{location.location_name}</option>
                                        ))}

                                       
                                    </Field>

                            
                           
                                    <button type='submit' className='rounded bg-orange ml-48 mb-2 px-4 py-2 text-sm text-white mt-5'>
                    Search bus
                </button>
                                </Form>
                            </Formik>
               
            </div>
                    </> )}
        </section>

    )

    }