import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

async function createInvoicePDF(transactionId) {
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

  // Set position for the client section
  const clientSectionX = 10;
  const clientSectionY = 10;

  // Invoice for the Client
  doc.text('Auto École XYZ', clientSectionX, clientSectionY);
  doc.text('123 Avenue des Élèves', clientSectionX, clientSectionY + 10);
  doc.text('75001 Paris', clientSectionX, clientSectionY + 20);

  doc.text('FACTURE CLIENT', clientSectionX, clientSectionY + 40);
  doc.text(`Candidat\n${candidateData.nom} ${candidateData.prenom}\n${candidateData.Adresse}\n${candidateData.city}\nTél: ${candidateData.phone}\nDate de facture ${formattedDate}`, clientSectionX, clientSectionY + 50);

  const tableDataClient = [
    ['DESCRIPTION', 'QUANTITÉ', 'PRIX UNITÉ', 'MONTANT'],
    [transactionData.service, 1, `${transactionData.unit_price}€`, `${transactionData.total_amount}€`],
    ['TOTAL À PAYER', '', '', `${transactionData.total_amount}€`],
  ];
 
  doc.autoTable({
    head: [tableDataClient[0]],
    body: tableDataClient.slice(1),
    startY: 90,
    theme: 'plain',
    styles: {
      fontSize: 10,
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
    },
  });

  // Invoice for the Director
  // doc.text('Auto École XYZ', 220, 10);
  // doc.text('123 Avenue des Élèves', 220, 20);
  // doc.text('75001 Paris', 220, 30);

  // doc.text('FACTURE DIRECTEUR', 220, 50);
  // doc.text('Auto École XYZ\nDirecteur: M. Jean Dupont', 220, 60);

  const tableDataDirector = [
    ['DESCRIPTION', 'QUANTITÉ', 'PRIX UNITÉ', 'MONTANT'],
    [transactionData.service, 1, `${transactionData.unit_price}€`, `${transactionData.total_amount}€`],
    ['TOTAL À PAYER', '', '', `${transactionData.total_amount}€`],
  ];

//   doc.autoTable({
    
//     head: [tableDataDirector[0]],
//     body: tableDataDirector.slice(1),
//     startY: 120,
//     // startX: 180, // Adjust the startX position
//     theme: 'plain',

//     styles: {
//       fontSize: 10,
//       textColor: [0, 0, 0],
//     },
//     columnStyles: {
//       0: { cellWidth: 40 },
//       1: { cellWidth: 40 },
//       2: { cellWidth: 40 },
//       3: { cellWidth: 40 },
//     },
//   });
const clientSignatureBoxX = 10;
const clientSignatureBoxY = doc.autoTable.previous.finalY + 10; // Adjust Y position as needed
const signatureBoxWidth = 100;
const signatureBoxHeight = 40;

doc.rect(clientSignatureBoxX, clientSignatureBoxY, signatureBoxWidth, signatureBoxHeight);
doc.text('Signature Client', clientSignatureBoxX + 10, clientSignatureBoxY + 20);

const directorSignatureBoxX = 170;
const directorSignatureBoxY = doc.autoTable.previous.finalY + 10; // Adjust Y position as needed

doc.rect(directorSignatureBoxX, directorSignatureBoxY, signatureBoxWidth, signatureBoxHeight);
doc.text('Signature Directeur', directorSignatureBoxX + 10, directorSignatureBoxY + 20);

  // Save the PDF to a buffer
  return new Promise(resolve => {
    resolve(doc.output('arraybuffer'));
  });
}

export default createInvoicePDF;
