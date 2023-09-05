import { moniteurInput } from '@/app/formSource';
import { createMoniteur } from '@/utils/supabase';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const MoniteurModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    // const router = useRouter()
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const [moniteurData, setMoniteurData] = useState({
        theorique: false,
        pratique: false,
    });
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setMoniteurData((prevData) => ({
            ...prevData,
            [id]: checked,
        }));
    };
    const handleChange = (e) => {
        setMoniteurData({ ...moniteurData, [e.target.name]: e.target.value });
    };
    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createMoniteur(moniteurData);
            console.log("moniteur created successfully", response);
            // router.refresh()
            toggleModal();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className=''>
            
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Ajouter un moniteur
            </button>

            {modalVisible && (
                <div
                    id="moniteur-modal"
                    aria-hidden="true"
                    className="fixed overflow-auto top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="moniteur-modal"
                                onClick={toggleModal}
                            >
                                X
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                    Ajouter un Moniteur
                                </h3>
                                <form onSubmit={handleTransactionSubmit} className="space-y-2">
                                    <div>
                                        <div className="items-center w-full ">
                                            {moniteurInput.map((input) => (
                                                <div key={input.id}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        {input.title}
                                                    </label>
                                                    <input
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                        name={input.label}
                                                        type={input.type}
                                                        placeholder={input.placeholder}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                            Moniteur
                                        </h3>
                                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center pl-3">
                                                    <input
                                                        id="theorique"
                                                        type="checkbox"
                                                        checked={moniteurData.theorique}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label
                                                        htmlFor="theorique"
                                                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Theorique
                                                    </label>
                                                </div>
                                            </li>
                                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center pl-3">
                                                    <input
                                                        id="pratique"
                                                        type="checkbox"
                                                        checked={moniteurData.pratique}
                                                        onChange={handleCheckboxChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label
                                                        htmlFor="pratique"
                                                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Pratique
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Ajouter Moniteur
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoniteurModal;
