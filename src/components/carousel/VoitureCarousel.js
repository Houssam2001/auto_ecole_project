import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const VoitureCarousel = ({ voitures }) => {
    return (
        <Carousel
            className="w-48"
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            emulateTouch={true}
            dynamicHeight={false}
            showStatus={false}
            showIndicators={false}
            stopOnHover={true}
            swipeable={true}
            //   className="my-carousel" // Add your custom class here
            style={{ background: 'lightgray' }} // Add your inline styles here
        >
            {voitures.map((voiture) => (
                <div key={voiture.id}>
                    <Image width={500} height={400} className="object-cover object-center mx-auto rounded-lg shadow-xl" alt="hero" src={`https://bkvsahkfjyxfeibvwrpm.supabase.co/storage/v1/object/public/machmech/${voiture.image}`} />
                    <p >{`${voiture.marque} ${voiture.model}`}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default VoitureCarousel;
