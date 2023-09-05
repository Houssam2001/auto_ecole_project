const clientData = {
    id: 'UUID',
    nom: 'John Doe',
    created_at:'',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    CIN: 'XYZ123',
    Adresse: '123 Main St',
    inscrit: '2023-08-27',
    prenom: 'John',
    type: 'Type1',
    naissance: '1990-01-01',
    sexe: 'Male',
    category: 'Category1',
    examen_pratique: '123',
    examen_theorique: '456'
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set font and size
    doc.setFont('Helvetica');
    doc.setFontSize(12);
  
    // Add contract content
    doc.text('عقد التكوين بين المرشح ومؤسسة تعليم السياقة', 20, 20);
    doc.text(`رقم: ${clientData.id}`, 20, 40);
    doc.text(`الاسم: ${clientData.nom}`, 20, 60);
    doc.text(`البريد الإلكتروني: ${clientData.email}`, 20, 80);
    doc.text(`رقم الهاتف: ${clientData.phone}`, 20, 100);
    doc.text(`رقم ب.و.ت.إ : ${clientData.CIN}`, 20, 120);
    doc.text(`العنوان: ${clientData.Adresse}`, 20, 140);
    // ... Continue to add other fields
  
    // Save the PDF
    doc.save('Contract.pdf');
  };