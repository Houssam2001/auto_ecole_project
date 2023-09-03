'use client'
import generateCandidatePDF from '@/components/pdf/generateCandidatePDF';
import generateVoituresPDF from '@/components/pdf/pdfGenerator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useEffect, useState } from 'react';
import { supabase } from "@/utils/client";
import contratAr from '@/components/pdf/contratAr';
import contratFr from '@/components/pdf/contratFr';



export default function VoituresPDFPage({ params }: {
    params: {
        id: string;
    };
}) {
    const [pdfUrl, setPdfUrl] = useState(null || '');
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
        arabic_ecole: '',
        arabic_ville: ''

    });
        const delay = (ms:any) => new Promise(res => setTimeout(res, ms));

    const fetchAuto = async () => {
        try {
            const { data: users, error } = await supabase.from('users').select('*').limit(1);
            if (error) {
                throw new Error("Error fetching users.");
            }
            if (users ) {
                console.log(users)
                setFormData(users[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAuto();
    }, [])

    useEffect( () => {
        
        generateCandidatePDF(params.id, formData).then(async pdfBytes => {
            if (pdfBytes) {
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } else {

            }
        });
    }, [params.id,formData]);

    return (
        <div>
            {pdfUrl && (
                <div>
                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                    {/* <a href={pdfUrl} download="voitures.pdf">
                        <button>Download Voitures PDF</button>
                    </a> */}
                </div>
            )}

        </div>
    );
}