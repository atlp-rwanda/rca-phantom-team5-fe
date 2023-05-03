import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocations } from '../redux/api/locationApi';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { GetBuses } from '../redux/api/viewBusesApi';
import { AppDispatch } from 'redux/store';
export interface LocationType {
    createdAt?: Date;
    updatedAt?: Date;
    location_name?: string;
    latitude?: string;
    longitude?: string;
    id?: number;
}
export interface BusType {
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    model?: string;
    plate_number?: string;
    available_sits?: number;
}

export default function ViewBusesScreen() {
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
    const [selected, setSelected] = useState<LocationType>({
        createdAt: new Date(),
        updatedAt: new Date(),
        location_name: '',
        latitude: '',
        longitude: '',
        id: 0,
    });
    const [selected1, setSelected1] = useState<LocationType>({
        createdAt: new Date(),
        updatedAt: new Date(),
        location_name: '',
        latitude: '',
        longitude: '',
        id: 0,
    });

    const getInput = (e: { target: { value: React.SetStateAction<number> } }) => {
        const locationId = parseInt(e.target.value);
        const location = locations.find((location: LocationType) => location.id === locationId);
        setSelected(location);
    };

    const getInput1 = (e: { target: { value: React.SetStateAction<number> } }) => {
        const locationId = parseInt(e.target.value);
        const location = locations.find((location: LocationType) => location.id === locationId);
        setSelected1(location);
    };

    useEffect(() => {
        console.log(selected.id);
    }, [selected]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [errortext, setErrortext] = useState<string>('');
    const buses = useSelector((state: any) => state.buses.buses);
    const busStatus = useSelector((state: any) => state.buses.status);
    const locations = useSelector((state: any) => state.locations.locations);
    const locationStatus = useSelector((state: any) => state.locations.status);
    const [totalBuses, setTotalBuses] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);


    useEffect(() => {
        if (locationStatus === 'idle') {
            dispatch(GetLocations());
        }
    }, [locationStatus, dispatch]);
    if (busStatus === 'success') {
        console.log(buses);
    }

    useEffect(() => {
        const busesLength = buses.length;
        const seatsTotal = buses.reduce((acc: number, bus: { available_sits: string; }) => acc + parseInt(bus.available_sits), 0);
        setTotalBuses(busesLength);
        setTotalSeats(seatsTotal);
    }, [buses]);

    const onSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            setLoading(true);
            console.log(selected.id, selected1.id);
            const resultAction = await dispatch<AppDispatch>(GetBuses({
                from: selected.id,
                to: selected1.id,
            }));
            if (GetBuses.fulfilled.match(resultAction)) {
                setErrortext('');
            } else {
                setErrortext(resultAction.payload.message);
            }
        } catch (error) {
            setErrortext(error.message);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }


    return (
        <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
            {locationStatus !== 'success' && loading ? (
                <div className='flex h-screen items-center justify-center'>
                    <div className='h-14 w-14 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
                </div>
            ) : (
                <>
                    <div className='flex flex-col items-center justify-center border-b px-4 py-4 md:flex-row md:justify-between md:px-8'>
                        <h1 className='mb-4 text-3xl text-orange md:mb-0'>Phatom-logo</h1>
                        <div className='flex items-center gap-6'>
                            {links.map((link) => (
                                <h3 key={link.path} onClick={() => navigate(link.path)} className='cursor-pointer text-lg text-black'>
                                    {link.name}
                                </h3>
                            ))}
                        </div>
                        <button onClick={() => navigate('/login')} className='rounded bg-orange px-6 py-2 text-lg text-white'>
                            Login
                        </button>
                    </div>
                    <div className='-mt-8  flex justify-between'>
                        <div className='border-1 box1 mx-auto mr-48 ml-48 box-border h-24 w-80 bg-lightBlue'>
                            <h1 className='text-dark mt-8 ml-12 text-lg md:mb-0'>Welcome to phantom</h1>
                        </div>

                        <div className='box mr-48 flex flex-row'>
                            <div className='border-1 float-right mr-6 box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                                    <h1 className='border-color-gray ml-4 rounded-full border bg-green px-5 py-4 text-white'>{totalBuses}</h1>
                                <p className='ml-4 text-sm text-gray-500'>Buses available</p>
                            </div>

                            <div className='border-1 box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                                    <h1 className='border-color-gray ml-4 rounded-full border bg-red px-5 py-4 text-white'>{totalSeats}</h1>
                                <p className='ml-4 text-sm text-gray-500'>Total Availabe Seats</p>
                            </div>
                        </div>
                    </div>
                    <div className='relative mx-auto mr-48  ml-48 shadow-md shadow-indigo-400/20'>
                        <div>
                            {errortext ? (
                                <h1 className='-mt-3 mb-3 text-red'>No Bus found on this route</h1>
                            ) : (
                                <h1 className='-mt-3 mb-3'>Buses on track</h1>
                            )}
                        </div>

                        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='p-4'>
                                        <div className='flex items-center'>
                                            <input
                                                id='checkbox-all'
                                                type='checkbox'
                                                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                                            />
                                            <label htmlFor='checkbox-all' className='sr-only'>
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Model
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Plate number
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                       Availabe Seats
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {buses.map((bus: BusType)=>(
                                    <tr className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
                                        <td className='w-4 p-4'>
                                            <div className='flex items-center'>
                                                <input
                                                    id='checkbox-table-1'
                                                    type='checkbox'
                                                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                                                />
                                                <label htmlFor='checkbox-table-1' className='sr-only'>
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                            {bus.name}
                                        </th>
                                        <td className='px-6 py-4'>{bus.model}</td>
                                        <td className='px-6 py-4'>{bus.plate_number}</td>
                                        <td className='px-6 py-4'>{bus.available_sits}</td>
                                    </tr>                    
                                ))}
                                
                             
                            </tbody>
                        </table>
                    </div>
                    <div className='border-1 mx-auto mr-48 ml-48 box-border flex h-20 items-center justify-between bg-white shadow-md shadow-indigo-400/20 sm:rounded-lg'>
                        <Formik
                            initialValues={{ from: selected.id, to: selected1.id }}
                            validationSchema={Yup.object({
                                from: Yup.number().required('Required'),
                                to: Yup.number().required('Required'),
                            })}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <label htmlFor='from' className='mb-2 mt-6 ml-4 inline-block'>
                                    From:
                                </label>
                                <Field
                                    as='select'
                                    onChange={getInput}
                                    name='from'
                                    value={selected.id}
                                    className='focus:shadow-outline  -py-2 ml-4  mt-6 h-8 w-32 rounded border-b border-gray-300 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                                    placeholder='From: '
                                >
                                    <option value={selected.id}>{selected.location_name}</option>
                                    {locations.map(
                                        (location: {
                                            id: React.Key | undefined | string | number | readonly string[];
                                            location_name:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                            | React.ReactFragment
                                            | React.ReactPortal
                                            | null
                                            | undefined
                                            | React.Key;
                                        }) => (
                                            <option value={location.id}>{location.location_name}</option>
                                        ),
                                    )}
                                </Field>

                                <label htmlFor='to' className='mb-2 mt-6 ml-52 inline-block'>
                                    To:
                                </label>
                                <Field
                                    as='select'
                                    onChange={getInput1}
                                    name='to'
                                    value={selected1.id}
                                    className='focus:shadow-outline  -py-2 ml-4  mt-6 h-8 w-32 rounded border-b border-gray-300 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                                    placeholder='From: '
                                >
                                    <option value={selected1.id}>{selected1.location_name}</option>
                                    {locations.map(
                                        (location: {
                                            id: React.Key | undefined | string | number | readonly string[];
                                            location_name:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                            | React.ReactFragment
                                            | React.ReactPortal
                                            | null
                                            | undefined
                                            | React.Key;
                                        }) => (
                                            <option value={location.id}>{location.location_name}</option>
                                        ),
                                    )}
                                </Field>

                                <button type='submit' className='ml-48 mb-2 mt-5 rounded bg-orange px-4 py-2 text-sm text-white'>
                                    Search bus
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </>
            )}
        </section>
    );
}