
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function createInvoicePDF(transactionId,formData) {
  const supabase = createClientComponentClient();

  // Fetch transaction data from Supabase
  const { data: transactionData, error: fetchTransactionError } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', transactionId)
    .single();

  if (fetchTransactionError) {
    console.error('Error fetching transaction:', fetchTransactionError);
    return null;
  }

  // Fetch candidate data from Supabase using candidate_id from the transaction
  const { data: candidateData, error: fetchCandidateError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', transactionData.client_id)
    .single();

  if (fetchCandidateError) {
    console.error('Error fetching candidate:', fetchCandidateError);
    return null;
  }

  const formattedDate = format(new Date(transactionData.date), 'dd-MM-yyyy', { locale: fr });

  const doc = new jsPDF({
    orientation: 'landscape',
  });
  doc.setFontSize(12);

  // Client Section
  const clientSectionX = 10;
  const clientSectionY = 10;
  doc.text(`Candidat
${candidateData.nom} ${candidateData.prenom}
${candidateData.Adresse}
${candidateData.city}
Tél: ${candidateData.phone}
Date de facture: ${formattedDate}`, clientSectionX, clientSectionY + 20);

const tableDataClient = [
  ['Date', 'Montant', 'Montant Global'],
  [formattedDate,  `${transactionData.value} DHs`, `${candidateData.amount} DHs`]
];

const pageWidth = doc.internal.pageSize.getWidth();
const tableWidth = pageWidth / 2.5; // half of the page

doc.autoTable({
  columns: [{ header: 'Date' }, { header: 'Montant' }, { header: 'Montant Global' }],
  body: tableDataClient.slice(1),
  startY: 80,
  tableWidth: tableWidth-10, // use the calculated table width
  theme: 'grid',
  styles: {
      fontSize: 10,
      textColor: [0, 0, 0],
  },
  didDrawPage: function (data) {
      doc.setFontSize(20);
      doc.setTextColor(40);
  }
});


  // Client Signature in Client Section
  const clientSignatureBoxX = clientSectionX;
  const clientSignatureBoxY = doc.autoTable.previous.finalY + 10;
  const signatureBoxWidth = 80;
  const signatureBoxHeight = 40;

  // doc.rect(clientSignatureBoxX, clientSignatureBoxY, signatureBoxWidth, signatureBoxHeight);
  doc.text('Signature Client', clientSignatureBoxX , clientSignatureBoxY + signatureBoxHeight - 5);

  // Director Signature in Client Section
  const directorSignatureBoxXClientSide = clientSignatureBoxX + 90;  // Positioned next to Client's signature
  const directorSignatureBoxYClientSide = doc.autoTable.previous.finalY + 10;

  // doc.rect(directorSignatureBoxXClientSide, directorSignatureBoxYClientSide, signatureBoxWidth, signatureBoxHeight);
  doc.text('Signature Directeur', directorSignatureBoxXClientSide , directorSignatureBoxYClientSide + signatureBoxHeight - 5);

  // Director Section
  const directorSectionX = 170;
  doc.text(`Candidat
${candidateData.nom} ${candidateData.prenom}
${candidateData.Adresse}
${candidateData.city}
Tél: ${candidateData.phone}`, directorSectionX, clientSectionY + 20);

  doc.autoTable({
    columns: [{ header: 'Date' }, { header: 'Montant' }, { header: 'Montant Global' }],
    body: tableDataClient.slice(1),
    startY: 80,
    innerWidth:20,
    theme: 'grid',
  tableWidth: tableWidth-10, // use the calculated table width

    styles: {
      fontSize: 10,
      textColor: [0, 0, 0],
    },
    margin: {left: 170}, 
    // startX: ,
    didDrawPage: function (data) {
      doc.setFontSize(20);
      doc.setTextColor(40);
    }

  });

  // Client Signature in Director Section
  const directorClientSignatureBoxX = directorSectionX;
  const directorClientSignatureBoxY = doc.autoTable.previous.finalY + 10;

  // doc.rect(directorClientSignatureBoxX, directorClientSignatureBoxY, tableWidth-30, signatureBoxHeight);
  doc.text('Signature Client', directorClientSignatureBoxX , directorClientSignatureBoxY + signatureBoxHeight - 5);

  // Director Signature in Director Section
  const directorSignatureBoxX = directorSectionX + 90;  // Positioned next to Client's signature
  const directorSignatureBoxY = doc.autoTable.previous.finalY + 10;

  // doc.rect(directorSignatureBoxX, directorSignatureBoxY, tableWidth, signatureBoxHeight);
  doc.text('Signature Directeur', directorSignatureBoxX , directorSignatureBoxY + signatureBoxHeight - 5);

  const footerText = `Auto-École ${formData.nom}\n ${formData.adresse} ${formData.ville}\n Tél: ${formData.telephone}\n  Email: ${formData.email}\n`;
  const footerX = 10;
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.text(footerText, footerX, footerY);

  const footerText2 = `Auto-École ${formData.nom}\n ${formData.adresse} ${formData.ville}\n Tél: ${formData.telephone}\n  Email: ${formData.email}\n`;
  const footerX2 = 170;
  const footerY2 = doc.internal.pageSize.getHeight() - 20;
  doc.text(footerText2, footerX2, footerY2);
  doc.setFont('Arial','bold')
  doc.setFontSize(20)
  doc.text('REÇU DIRECTEUR', directorSectionX, clientSectionY);
  doc.text('REÇU CLIENT', clientSectionX, clientSectionY);

  // Save the PDF to a buffer
  return new Promise(resolve => {
    resolve(doc.output('arraybuffer'));
  });
}

export default createInvoicePDF;
