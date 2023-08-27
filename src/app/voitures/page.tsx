'use client'
import React, { useEffect, useState } from "react";
import CarCard from "@/components/car/CarCard";
import { HomeProps } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CarModal from "@/components/car/CarModal";

export default function Voitures({ searchParams }: HomeProps) {
    const [allCars, setAllCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchCars() {
            const { data, error }: { data: any; error: any } = await supabase.from("voitures").select("*");
            if (error) {
                console.error("Error fetching cars:", error);
            } else {
                setAllCars(data);
            }

            setIsLoading(false);
        }

        fetchCars();
    }, [allCars,searchParams]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="p-6">
            <h1 className="text-3xl font-bold mb-4">Voiture</h1>
            <CarModal />
            {allCars.length > 0 ? (
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 pt-14">
                    {allCars.map((car, index) => (
                        <CarCard key={index} car={car} />
                    ))}
                </div>
            ) : (
                <div className="container mt-6">
                    <h2 className="text-black text-xl font-bold mb-2">Oops, no results</h2>
                    <p>No cars match the search criteria.</p>
                </div>
            )}
        </section>
    );
}
