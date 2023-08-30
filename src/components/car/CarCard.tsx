import { useState } from "react";
import Image from "next/image";

import type { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const { categorie, assurance, matricule, model, marque, user_id, vidange, visite,image } = car;

    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(assurance, visite);

    return (
        <div className="car-card group flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl">
            <div className="car-card__content w-full flex justify-between items-start gap-2">
                <h2 className="car-card__content-title text-[22px] leading-[26px] font-bold capitalize">
                    {matricule} {model}
                </h2>
            </div>

            <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
                {carRent}
                <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
            </p>

            <div className="relative w-full h-40 my-3 object-contain group">
                <Image width={200} height={200} src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${image}`} alt="image d'auto"   className="object-contain"  />
                <div className="absolute  inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                        href="#_"
                        onClick={() => setIsOpen(true)}
                        className="relative w-3/4 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group "
                    >
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">View More</span>
                    </a>
                    {/* <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold transition-transform transform hover:scale-105"
                >
                    View More
                </button> */}
                </div>
            </div>
            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-grey">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
                        <p className="text-[14px] leading-[17px]">
                            {categorie === "a" ? "Automatic" : "Manual"}
                        </p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/tire.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">{marque.toUpperCase()}</p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/gas.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">{vidange} MPG</p>
                    </div>
                </div>

            </div>
            <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
        </div>
    );
};

export default CarCard;
