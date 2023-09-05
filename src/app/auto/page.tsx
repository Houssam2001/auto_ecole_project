'use client'
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Auto() {
    const supabase = createClientComponentClient()

    const [formData, setFormData] = useState({
        id: '',
        created_at: '',
        nom: '',
        gerant: '',
        user_id: '',
        telephone: '',
        fax: '',
        adresse: '',
        patente: '',
        date_rc: '',
        ville: '',
        rc: '',
        email: '',
        المدير: '',
        arabic_ecole:'',
        arabic_ville:'',
        arabic_gerant:'',

    });
    const InputGroup = ({ label, value }: { label: any, value: any }) => (
        <div className='p-2 border-black my-3 rounded-md border font-medium bg-primary-700 text-black'>
            <h1 className='text-2xl mb-1'>{label}</h1>
            <input
                className='h-8 w-16 text-center text-black rounded-md'
                type='number'
                value={value}
            />
        </div>
    );
    const labelsAndValues = [
        { label: 'AM', value: 840 },
        { label: 'A1', value: 2100 },
        { label: 'A', value: 2100 },
        { label: 'B', value: 2250 },
        { label: 'C', value: 4150 },
        { label: 'D', value: 4150 },
        { label: 'EB', value: 2250 },
        { label: 'EC', value: 4550 },
        { label: 'ED', value: 4550 },
    ];

    const fetchAuto = async () => {
        try {
            const { data: users, error } = await supabase.from('users').select('*');
            if (error) {
                throw new Error("Error fetching users.");
            }
            if (users && users.length > 0) {
                setFormData(users[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAuto();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Auto Ecole Profile
                </h2>
                <form action="#" className="space-y-8">
                    <div className='flex space-x-2'>
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Nom d&apos;ecole
                        </label>
                        <input
                            type="text"
                            value={formData.nom || ''}
                            readOnly
                            className="w-2/4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                        <div className="flex justify-end w-full ">
                            <input
                                type="text"
                                value={formData.arabic_ecole || ''}
                                readOnly
                                className="w-2/4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            />
                            <label className="mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                اسم المدرسة
                            </label>
                        </div>
                    </div>

                    {/* Gerant Field */}
                    <div className='flex space-x-2'>
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Gerant
                        </label>
                        <input
                            type="text"
                            value={formData.gerant || ''}
                            readOnly
                            className="w-2/4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                        <div className="flex justify-end w-full">
                            <input
                                type="text"
                                value={formData.arabic_gerant || ''}
                                readOnly
                                className="w-2/4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            />
                            <label className="mb-2 ml-8 text-sm font-medium text-gray-900 dark:text-gray-300">
                                المدير
                            </label>

                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>

                    {/* Telephone Portable Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Telephone
                        </label>
                        <input
                            type="text"
                            value={formData.telephone || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>

                    {/* Fax Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Fax
                        </label>
                        <input
                            type="text"
                            value={formData.fax || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>

                    {/* Adresse Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Adresse
                        </label>
                        <textarea
                            value={formData.adresse || ''}
                            readOnly
                            rows={6}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />

                    </div>
                    <div className='flex space-x-2'>
                        <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Ville
                        </label>
                        <input
                            type="text"
                            value={formData.ville || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                        <div className="flex justify-end w-full">
                            <input
                                type="text"
                                value={formData.arabic_ville || ''}
                                readOnly
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            />
                            <label className=" ml-6 text-sm font-medium text-gray-900 dark:text-gray-300">
                                المدينة
                            </label>

                        </div>
                    </div>
                    {/* Patente Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Patente
                        </label>
                        <input
                            type="text"
                            value={formData.patente || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>
                    {/* RC Field */}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            RC
                        </label>
                        <input
                            type="text"
                            value={formData.rc || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>
                    {/* Date RC Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Date RC
                        </label>
                        <input
                            type="date"
                            value={formData.date_rc || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>

                    {/* Ville Field */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            A
                        </label>
                        <input
                            type="text"
                            value={formData.ville || ''}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        />
                    </div>
                    {/* <button type="submit" className="content-center py-3 px-5 bg-black text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Update Profile
                    </button> */}
                </form>
                <div>
                    <div className='font-bold text-2xl text-center py-6'>Tarifs</div>
                    <div className="flex items-center space-x-2   justify-center">
                        <div className='flex  flex-wrap space-x-2 py-2  '>
                            {labelsAndValues.map(({ label, value }, index) => (
                                <InputGroup key={index} label={label} value={value} />
                            ))}
                        </div>
                    </div>

                </div>
            </div >
        </section >
    );
}
