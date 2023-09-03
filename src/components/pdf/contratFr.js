import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const contratFr = async (id, formData) => {
  const supabase = createClientComponentClient();
  const doc = new jsPDF({
    orientation: 'portrait',
  });

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
  let yPos = 30;  // Start position for text
  const lineHeight = 10;
  const leftMargin = 10;
  doc.setFontSize(15);
  doc.text(`Contrat de formation entre le candidat et l'auto école`, 40, 10);
  doc.text(`Permis de conduire de la catégorie ''${data.category}''`, 50, 20);
  doc.setFontSize(fontSize);
  const formattedDate = format(new Date(data.naissance), 'dd-MM-yyyy', { locale: fr });
  const formattedDate2 = format(new Date(data.inscrit), 'dd-MM-yyyy', { locale: fr });

  yPos += 4;
  doc.text(`Numero: ${data.id}                            date : ${formattedDate2}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Les deux parties au contrat

Ce contrat est conclu entre :`, leftMargin, yPos);
  yPos += lineHeight + 7;
  
  doc.text(`L'auto Ecole: ${formData.nom}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Numéro d'inscription au registre national des établissements d'enseignement de la conduite : `, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`l'adresse : ${formData.adresse}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Numéro d'inscription au registre des impôts professionnels : ${formData.patente}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Numéro d'immatriculation au registre du commerce :     ${formData.rc}                Ville : ${formData.ville}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Téléphone :     ${formData.telephone}                                      Télécopieur : ${formData.fax}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Email:          ${formData.email}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`appelée         ${formData.nom} `, leftMargin+70, yPos);
  yPos += lineHeight;
  doc.text(`N° CIN :        ${data.CIN}                                                  en date du : ${formattedDate}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Résident en :   ${data.Adresse}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Numéro d'inscription du candidat accordé par l'administration (référence web) : .............`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Nom(s) : ${data.nom} ${data.prenom}`, leftMargin+70, yPos);
  yPos += lineHeight;
  const contractContent = `

Les parties conviennent de ce qui suit.

Article 1 : Objet du contrat
Ce contrat vise à former le candidat et à lui permettre d'acquérir les connaissances et les compétences nécessaires pour conduire un véhicule nécessitant un permis de conduire de la catégorie ''${data.category} '', conformément aux programmes établis par l'administration. Il définit également les droits et devoirs des deux parties, tout en respectant les lois et les réglementations en vigueur dans ce domaine.

Article 2 : Durée du contrat
Ce contrat a une durée de six mois à compter de sa date de signature. Il peut être prolongé, en cas d'accord entre les parties, pour une durée n'excédant pas trois mois.

Article 3 : Engagements de l'établissement
L'établissement s'engage à former le candidat conformément au programme national d'enseignement de la conduite. Les cours théoriques et pratiques sont dispensés sous la supervision du directeur de l'établissement par des formateurs agréés, employés par l'établissement à cet effet, et utilisant des véhicules d'enseignement appartenant à l'établissement. L'établissement s'engage à mettre à disposition le véhicule nécessaire pour passer l'examen pratique. La formation théorique ne peut commencer qu'après que le candidat a obtenu le numéro d'enregistrement délivré par l'administration.

Article 4 : Engagements du candidat
Si le candidat interrompt sa formation, que ce soit temporairement ou définitivement, quelle qu'en soit la raison, il s'engage à en informer l'établissement par écrit. En cas d'interruption de plus de trois (3) mois consécutifs, l'établissement a le droit de demander au candidat le paiement des prestations restantes, non encore exécutées. Si le candidat abandonne la formation pour des raisons qui lui sont imputables, il devra payer l'intégralité des frais de formation. En cas d'échec à l'examen, le candidat s'engage à payer les frais de sa reformation conformément au même tarif.

Article 5 : Durée de la formation
Les parties conviennent du nombre d'heures de formation suivantes : 20 heures pour la formation théorique et 20 heures pour la formation pratique. Ce nombre ne peut être inférieur au minimum fixé par l'article 32 du carnet de formation des établissements d'enseignement de la conduite.

Article 6 : Frais de formation
Le montant total de la formation est calculé sur la base du tarif horaire de la formation théorique et pratique défini à l'article 1 de l'arrêté fixant le tarif horaire de la formation théorique et pratique.

Article 7 : Modalités de paiement
Le candidat reçoit une facture indiquant les montants payés à l'établissement. Cette facture est datée et signée par le responsable de l'établissement et porte le cachet de l'établissement, conformément à la législation en vigueur. En cas d'accord entre les parties, le paiement de la formation peut s'effectuer par versements échelonnés.

Contrat rédigé en trois exemplaires originaux,
                                    à ................................................................., le .............................
      Signature du représentant légal de l'établissement                 Signature du candidat ou de son tuteur légal
`;

  // Split the content into lines, taking into account the line length

  // Split the content into lines, taking into account the line length
  const lines = doc.splitTextToSize(contractContent, 190);

  // Set the initial y position for printing
  let yPosition = 160;

  // Define the function to add content to a page
  const addContentToPage = () => {
    // Loop through each line and add it to the current page
    for (let i = 0; i < lines.length; i++) {
      if (yPosition + 10 > 290) {
        // If the content doesn't fit on the current page, create a new page
        doc.addPage();
        yPosition = 10; // Reset the y position for the new page
      }
      doc.text(lines[i], 10, yPosition);
      yPosition += 10; // Adjust the vertical position for the next line
    }
  };

  // Call the function to add content to pages
  addContentToPage();





  return Promise.resolve(doc.output('arraybuffer'));

};

export default contratFr;
