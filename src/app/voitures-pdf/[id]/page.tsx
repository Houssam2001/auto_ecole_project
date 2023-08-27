'use client'
import generateVoituresPDF from '@/components/pdf/pdfGenerator';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useEffect, useState } from 'react';



export default function VoituresPDFPage({ params }: {
    params: {
        id: string;
    };
}) {
    const [pdfUrl, setPdfUrl] = useState(null || '');

    useEffect(() => {
        generateVoituresPDF(params.id).then(pdfBytes => {
          if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
          } else {
            // Handle the error scenario
          }
        });
      }, [params.id]);

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