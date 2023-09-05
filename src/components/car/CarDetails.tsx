import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";
import Link from "next/link";

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='absolute top-20 z-50' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='transition-opacity ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition-opacity ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed top-14 inset-0 overflow-y-auto'>
                    <div className='flex min-h-screen items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition-transform ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='transition-transform ease-out duration-300'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                                <button
                                    type='button'
                                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                    onClick={closeModal}
                                >
                                    <Image
                                        src='/close.svg'
                                        alt='close'
                                        width={20}
                                        height={20}
                                        className='object-contain'
                                    />
                                </button>

                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                                        <Image src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${car.image}`} alt='car model' fill priority className='object-contain' />
                                    </div>

                                    {/* <div className='flex gap-3'>
                                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            <Image src={generateCarImageUrl(car, "29")} alt='car model' fill priority className='object-contain' />
                                        </div>
                                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            <Image src={generateCarImageUrl(car, "33")} alt='car model' fill priority className='object-contain' />
                                        </div>
                                        <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            <Image src={generateCarImageUrl(car, "13")} alt='car model' fill priority className='object-contain' />
                                        </div>
                                    </div> */}
                                </div>

                                <div className='flex-1 flex flex-col gap-2'>
                                    <h2 className='font-semibold text-xl capitalize'>
                                        {car.categorie} {car.model}
                                    </h2>

                                    <div className='mt-3 flex flex-wrap gap-4'>
                                        {Object.entries(car).map(([key, value]) => (
                                            <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                <h4 className='text-gray-500 capitalize'>
                                                    {key.split("_").join(" ")}
                                                </h4>
                                                <p className='text-black-100 font-semibold'>
                                                    {value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-4 mx-40'> {/* Adjust margin for different screen sizes */}
                                        <Link
                                            href={`/voitures/${car.id}`}
                                            >
                                        
                                        <div className="relative px-10 py-3 font-medium text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease">
                                            <span className="absolute bottom-0 left-0 h-full -ml-2">
                                                <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                                            </span>
                                            <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                                                <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
                                            </span>
                                            <span className="relative">More</span>
                                        </div>
                                        </Link>
                                    </div>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
);

export default CarDetails;