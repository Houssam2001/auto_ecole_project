'use client'
import createInvoicePDF from '@/components/pdf/invoice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';



export default function TransactionPdf({ params }: {
    params: {
        id: string;
    };
}) {
    const supabase = createClientComponentClient()

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
    useEffect(() => {
        createInvoicePDF(params.id,formData).then(pdfBytes => {
          if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
          } else {
            // Handle the error scenario
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