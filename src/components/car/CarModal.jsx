import { carInput, moniteurInput } from '@/app/formSource';
import { supabase } from '@/utils/client';
import { createCar } from '@/utils/supabase';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const CarModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [file, setfile] = useState([]);

    // const router = useRouter()
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const [CarData, setCarData] = useState();
    const handleFileSelected = (e) => {
        setfile(e.target.files[0]);
    };
    const handleChange = (e) => {
        setCarData({ ...CarData, [e.target.name]: e.target.value });
    };
    const handleCarSubmit = async (e) => {
        e.preventDefault();
        try {
            const filename = `${uuidv4()}`;
            const { data, error } = await supabase.storage.from('machmech').upload(filename, file)
            const response = await createCar(CarData,filename);
            console.log("Car created successfully", response);
            // router.refresh()
            toggleModal();
            if(error){
                console.log (error)
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div >
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Ajouter une voiture
            </button>

            {modalVisible && (
                <div
                    id="Car-modal"
                    aria-hidden="true"
                    className="fixed overflow-auto top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="Car-modal"
                                onClick={toggleModal}
                            >
                                close
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                    Ajouter un Car
                                </h3>
                                <form onSubmit={handleCarSubmit} className="space-y-2">
                                    <div>
                                        <div className="items-center w-full ">
                                            {carInput.map((input) => (
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
                                            Car
                                        </h3>
                                        <input type="file" name="image" onChange={handleFileSelected} />
                                        {/* <button type="submit">Upload image</button> */}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Ajouter Car
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

export default CarModal;
