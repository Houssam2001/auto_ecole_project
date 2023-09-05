'use client'
import { generatePDFTable } from "@/components/pdf/generatePDFTable";
import { MenuItem, Select, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
interface ClientData {
    id: string;
    nom: string;
    email: string;
    phone: string | null;
    amount: number | null;
    CIN: string | null;
    Adresse: string | null;
    inscrit: Date | null;
    // Add other fields as needed
  }
export default function Registre() {
    const supabase = createClientComponentClient()
    const [data, setData] = useState<ClientData[]>([]);
    const [pdfUrl, setPdfUrl] = useState(null || '');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()||''); // Initialize with the current year

    useEffect(() => {


        const fetchClients = async () => {
            try {
              const { data: clientsData, error } = await supabase.from('clients').select('*');
              if (error) {
                throw new Error('Error fetching clients.');
              }
          console.log(clientsData)
              // Use the ClientData[] type annotation here
              setData(clientsData as ClientData[]);
          
              // Call the function to generate the PDF table
              generatePDFTable(clientsData as ClientData[]);
            } catch (error) {
              console.error(error);
            }
          };
          

        fetchClients();
    }, []);
    useEffect(() => {
        generatePDFTable(data,selectedYear).then(async pdfBytes => {
            if (pdfBytes) {
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } else {

            }
        });
    }, [data,selectedYear])
    return (
        <>
         <div>
                <Typography variant="h6">Selectionner une annee:</Typography>
                <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ marginBottom: '20px' }}
                >
                    {/* Add the years you want to show in the dropdown */}
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    {/* Add more years as needed */}
                </Select>
            </div>
            {pdfUrl && (
                <div>

                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                    {/* <a href={pdfUrl} download="voitures.pdf">
                        <button>Download Voitures PDF</button>
                    </a> */}
                </div>
            )}
        </>
    )
}