import { green, red } from '@mui/material/colors';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

const MoniteursCarousel = () => {
    const [moniteursData, setMoniteursData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const supabase = createClientComponentClient()

    const fetchMoniteurs = async () => {
        try {
            const { data: moniteursData, error: moniteursError } = await supabase
                .from('moniteurs')
                .select('*');
            if (moniteursError) {
                throw new Error('Error fetching moniteurs.');
            }
            setMoniteursData(moniteursData);
        } catch (error) {
            console.error(error);
        }
    };

    const goToPrevItem = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? moniteursData.length - 1 : prevIndex - 1
        );
    };

    const goToNextItem = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === moniteursData.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        fetchMoniteurs();
    }, []);

    return (
        <div className=" p-3 relative">
            <div className="mx-auto" style={{ scrollSnapType: 'x mandatory' }}>
                {moniteursData.map((moniteur, index) => (
                    <div
                        key={moniteur.id}
                        className={`${
                            index === currentIndex ? '' : 'hidden'
                        } transition-opacity duration-300`}
                    >
                        <input
                            className="sr-only peer"
                            type="radio"
                            name="carousel"
                            id={`carousel-${index + 1}`}
                            checked={index === currentIndex}
                        />
                        {/* content */}
                        <div className="py-4 px-8">
                            <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                                {moniteur.nom} {moniteur.prenom}
                            </h1>
                            <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                                {moniteur.cin}
                            </p>
                        </div>
                        {/* controls */}
                        <div className="absolute mb-10 w-full flex justify-between z-20">
                            <label
                                htmlFor={`carousel-${index === 0 ? moniteursData.length : index
                                    }`}
                                className="inline-block  -translate-x-5  active:translate-y-0.5"
                                onClick={goToPrevItem}
                            >
                                {/* Your navigation arrow or icon */}
                                <label for="carousel-3" className="inline-block text-red-600 cursor-pointer bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </label>
                            <label
                                htmlFor={`carousel-${index === moniteursData.length - 1 ? 1 : index + 2
                                    }`}
                                className="inline-block  translate-x-5  active:translate-y-0.5"
                                onClick={goToNextItem}
                            >
                                {/* Your navigation arrow or icon */}
                                <label for="carousel-2" className="inline-block text-red-600 cursor-pointer bg-white rounded-full shadow-md ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </label>
                        </div>
                        <div className='justify-center ml-8'>
                            {moniteur.cin}
                            <br/>
                           Pratique : {moniteur.pratique === true ? (
                                <BsFillCheckCircleFill style={{ color: green[700] }} />
                            ) : (
                                <BsFillXCircleFill style={{ color: red[700] }} />
                            )}
                           theorique : {moniteur.theorique === true ? (
                                <BsFillCheckCircleFill style={{ color: green[700] }} />
                            ) : (
                                <BsFillXCircleFill style={{ color: red[700] }} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoniteursCarousel;
