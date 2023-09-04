import "./widget.scss";

import { useEffect, useState } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import TransactionChart from "../charts/TransactionChart";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import MoniteursCarousel from "../moniteurCarousel/Carousel";
import ClientCategoryChart from "../charts/ClientCategoryChart";
import ClientMonthlyChart from "../charts/ClientCategoryChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import VoitureCarousel from "../carousel/VoitureCarousel";
import Link from "next/link";
import Image from "next/image";

const Widget = () => {
    const supabase = createClientComponentClient()
    const [voitures, setVoitures] = useState([]);

    const [data, setData] = useState([]);
    const [clients, setClients] = useState([]);
    const [user, setUser] = useState([]);
    const [depenses, setDepenses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [totalValueInYear, setTotalValueInYear] = useState(0); // Initialize with 0
    const currentYear = new Date().getFullYear(); // Get the current year

    const fetchDepensesAndTransactions = async () => {
        try {
            // Fetch transaction data
            const { data: transactionData, error: transactionError } = await supabase
                .from('transactions')
                .select('*');
            if (transactionError) {
                throw new Error('Error fetching transactions.');
            }
            setTransactions(transactionData);


            // Fetch depenses data
            const { data: depensesData, error: depensesError } = await supabase
                .from('depenses')
                .select('*');
            if (depensesError) {
                throw new Error('Error fetching depenses.');
            }
            setDepenses(depensesData);
            const totalValue =
                calculateTotalValueInYear(transactionData, currentYear) -
                calculateTotalValueInYear(depensesData, currentYear);
            setTotalValueInYear(totalValue);
        } catch (error) {
            console.error(error);
        }
    };
    const calculateTotalValueInYear = (data, year) => {
        return data
            .filter((item) => {
                const itemYear = new Date(item.created_at).getFullYear();
                return itemYear === year;
            })
            .reduce((total, item) => total + (item.value || 0), 0);
    };

    const fetchDepenses = async () => {
        try {
            const { data: transactions, error } = await supabase.from('transactions').select('*');
            if (error) {
                throw new Error('Error fetching transactions.');
            }
            setData(transactions);

            const clientIds = transactions.map((transaction) => transaction.client_id);
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select('*')
                .in('id', clientIds).limit(10);

            if (clientError) {
                throw new Error('Error fetching clients.');
            }
            setClients(clientData);
            const { data: depensesData, error: depensesError } = await supabase
                .from('depenses')
                .select('*');
            if (depensesError) {
                throw new Error('Error fetching depenses.');
            }
            setDepenses(depensesData);
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*').single();
            console.log(userData)
            if (userError) {
                throw new Error('Error fetching user.');
            }
            const { data: voitureData, error: voitureError } = await supabase.from('voitures').select('*');

            if (voitureError) {
                throw new Error('Error fetching voiture data.');
            }

            setVoitures(voitureData);
            setUser(userData);

            // Store the grouped data in a state variable
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchDepensesAndTransactions();

        fetchDepenses();
    }, []);

    return (
        <div className="h-full ">
            <div className="grid grid-cols-12 gap-0">
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 xxl:col-span-8 px-6 py-6">
                    <Container maxWidth="lg">
                        <Typography variant="h6">Transaction Statistics</Typography>
                        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                            <Typography variant="h6">Les Paiements</Typography>

                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="gray" strokeDasharray="3 3" className="chartGrid" />
                                    {/* Adjust the XAxis dataKey based on the selected groupBy */}
                                    <XAxis
                                        dataKey="date"
                                    // dataKey={groupBy === 'months' ? 'month' : 'day'} 
                                    />
                                    <YAxis dataKey="value"
                                    />
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Area type="monotone" stroke="#8884d8" dataKey="value" name="Value" fill="#8884d8" />

                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>
                        <MoniteursCarousel />
                        <ClientMonthlyChart props={user.user_id} />
                    </Container>
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">

                        </div>

                    </div>


                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
                    <div className="bg-white rounded-xl p-4 shadow-xl">
                        <div className="flex flex-col justify-center items-center">
                            <div className="w-32 h-32 rounded-full bg-gray-300 border-2 border-white mt-2">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                                    className="rounded-full w-auto"
                                />
                            </div>
                            <p className="font-semibold text-xl mt-1">{user.nom}</p>
                            {/* <p className="font-semibold text-base text-gray-400">No Future</p> */}

                            <div className="relative  p-4 rounded-lg shadow-xl w-full bg-cover bg-center h-32 mt-4"
                            // style="background-image: url('https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');"
                            >
                                <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
                                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                                    <div>
                                        <h3 className="text-center text-white text-lg">
                                            Valeur totale en {currentYear}
                                        </h3>
                                        <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                            {totalValueInYear.toFixed(2)} DHs
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-3 h-1/5 rounded-xl shadow-xl flex items-center justify-between mt-4">
                        <div className="flex space-x-6 items-center">
                            {/* <img src="https://    i.pinimg.com/originals/25/0c/a0/250ca0295215879bd0d53e3a58fa1289.png" width={500} height={500} className="w-auto h-24 rounded-lg" />
                            <div>
                                <p className="font-semibold text-base">Connect Device</p>
                                <p className="font-semibold text-sm text-gray-400">Autorize device for transfer</p>
                            </div> */}
                            {/* <Typography variant="h6" gutterBottom>
                                Voiture Carousel
                            </Typography> */}
                            {/* <Paper elevation={3} className="w-14" style={{ padding: '20px', marginTop: '20px' }}> */}
                                {/* Display the VoitureCarousel component */}
                            {/* </Paper> */}
                                <VoitureCarousel voitures={voitures} />
                        </div>

                        
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-xl mt-4">
                        <div className="flex flex-col justify-center items-center">
                            <Image height={160} width={160} src="https://cdn3d.iconscout.com/3d/premium/thumb/upload-social-media-post-4291893-3569926.png"  />
                            <p className="font-semibold text-xl mt-1">Ajouter un condidat</p>
                            {/* <p className="font-semibold text-sm text-gray-400 text-center">Ajouter avec <br /> and drag here</p> */}
                            <Link href={'/new'} className=" mt-4 bg-indigo-600 hover:bg-indigo-700 shadow-xl text-white font-bold py-2 px-4 rounded" >
                                Ajouter
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Widget
