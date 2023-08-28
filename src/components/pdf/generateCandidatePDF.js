import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateCandidatePDF = async (id) => {
  // Initialize Supabase client
  const supabase = createClientComponentClient();


  const doc = new jsPDF({
    orientation: 'landscape',
  });

  // Fetch client data from Supabase
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }

  const fontSize = 10;  // Reduced font size
  let yPosition = 30;  // Start position for text

  doc.setFontSize(20);
  doc.text("Fiche d'enseingenemnt",30, 10);
  doc.setFontSize(fontSize);

  // Add client details
  
  doc.text(`ID: ${data.id}`, yPosition, yPosition-10);
  doc.text(`Nom: ${data.nom}`, yPosition+50, yPosition);
  yPosition ;
  doc.text(`Prenom: ${data.prenom}`, 10, yPosition);
  yPosition += 10;
  doc.text(`Telephone: ${data.phone}`, 10, yPosition);
  doc.text(`CIN: ${data.cin}`, yPosition+40, yPosition);
  yPosition += 10;
  doc.text(`Email: ${data.email}`, 10, yPosition);
  yPosition += 10;
  doc.text(`Date d'inscription: ${data.inscrit}`, 10, yPosition);
  yPosition += 10;
  doc.text(`Categorie: ${data.category}`, 10, yPosition);
  yPosition += 10;
  // ... Add all other fields

  const progressData = Array.from({ length: 20 }, (_, index) => ({
    course: `Heure ${index + 1}`,
    grade: `signature ${index + 1}`,
    date: `Date ${index + 1}`,
  }));

  const tableHeaders = ['Heures', 'Signatures', 'Date'];

const halfLength = Math.ceil(progressData.length / 2);
const firstHalfData = progressData.slice(0, halfLength);
const secondHalfData = progressData.slice(halfLength);

const tableData1 = firstHalfData.map(progress => [progress.course, '       ', '           /            /  ']);
const tableData2 = secondHalfData.map(progress => [ progress.course  , '       ', '       /           /  ']);
// Function to draw vertical lines between columns
const drawVerticalLines = (data) => {
  if (data.column.index === data.table.columns.length - 1) {
    return;
  }
  const x = data.cell.x + data.cell.width;
  const y = data.cell.y;
  const height = data.cell.height;
  doc.setLineWidth(0.5); // Set line width
  doc.line(x, y, x, y + height); // Draw vertical line
};

// Draw the first table on the left side
doc.autoTable({
  columns: tableHeaders.map(header => ({ header })),
  body: tableData1,
  startY: yPosition + 10,
  margin: { left: 10 },
  tableWidth: 120,
  didDrawCell: data=>drawVerticalLines(data),

  styles: {
    fontSize: 8,
    textColor: [0, 0, 0],
  },
});

// Draw the second table on the right side
doc.autoTable({
  columns: tableHeaders.map(header => ({ header })),
  body: tableData2,
  startY:  10,
  didDrawCell: data=>drawVerticalLines(data),

  margin: { left: 140 },  // Adjust this value to fit the second table correctly
  tableWidth: 130,
  styles: {
    fontSize: 8,
    textColor: [0, 0, 0],
  },
});
const footerLine = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';
const footerX2 = 0;
const footerY2 = doc.internal.pageSize.getHeight() - 20;
doc.text(footerLine, footerX2, footerY2);
const footerText = 'Auto-École XYZ 123 Avenue des Élèves 75001 Paris Tél: 01 XX XX XX XX  Email: contact@autoecole.xyz Site web: www.autoecole.xyz';
const footerX = 35;
const footerY = doc.internal.pageSize.getHeight() - 10;
doc.text(footerText, footerX, footerY);
// ... (rest of the code remains the same)

return Promise.resolve(doc.output('arraybuffer'));

};

export default generateCandidatePDF;
