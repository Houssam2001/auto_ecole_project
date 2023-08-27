import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const generateVoituresPDF = async (id) => {
  const supabase = createClientComponentClient();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;

  // Fetch voitures data from Supabase
  const { data, error: fetchError } = await supabase
    .from('voitures')
    .select('*')
    .eq('id', id)
    .single(); // You can specify the columns you need here

  if (fetchError) {
    console.error('Error fetching voitures:', fetchError);
    return null;
  }
    // Loop through voituresData and add text to PDF
    let yPosition = height - 50;
    page.drawText(`Voiture ID: ${data.id}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0),
    });
    yPosition -= 20; // Move to the next line
    // Add more data as needed


    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
export default generateVoituresPDF;
