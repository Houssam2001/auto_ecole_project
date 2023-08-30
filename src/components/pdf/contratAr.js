import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AmiriRegular from '../../../public/fonts/Amiri-Regular.ttf'; // Adjust the path accordingly
import path from 'path'; // Import the path module

const fetchPDFJSFont = async (string) =>
  new Promise((resolve, reject) => {
    if (!string) return resolve(undefined);
    fetch(string)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          const name = path.basename(string);
          resolve({
            family: name,
            src: result.substr(result.indexOf('base64,') + 7),
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
  });

export default async function generatePDF(id, formData) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }

  const doc = new jsPDF({
    
  });

  const fontInfo = await fetchPDFJSFont(
    'http://themes.googleusercontent.com/static/fonts/droidarabickufi/v3/8W45GN15zj1qR-20QwKIxqPi4JPRJMb6v4DHFDoSX-k.ttf'
  );

  doc.addFileToVFS(fontInfo.family, fontInfo.src);
  doc.addFont(fontInfo.family, fontInfo.family, 'normal');
  doc.setFont(fontInfo.family);
  doc.setFontSize(10)
  doc.text(`عقدالتكوين بين المرشح ومؤسسة تعليم السياقة
   ''...........''رخصة السياقة من صنف`, 60, 20);
  doc.text(`الرقم:`, 190, 40);

  doc.text(`طرفي العقد `, 180, 50);
  doc.text(`هذا العقد مبرم بين`, 170, 60);
  doc.text(`مؤسسة تعليم السياقة`, 165, 70);
  doc.text(`رقم القيد في السجل الوطني الخاص بمؤسسات تعليم السياقة رقم الرخصة)`, 87, 80);
  doc.text(`العنوان `, 190, 90);
  doc.text(`رقم القيد في سجل الضريبةاملهنية `, 147, 100);
  doc.text(`رقم القيد في السجل التجاري `, 157, 110);
  doc.text(`المدينة`, 90, 110);
  doc.text(`الهاتف`, 190, 120);
  doc.text(`الفاكس`, 90, 120);
  doc.text(`البريدالإلكتروني`, 179, 130);
  doc.text(`المسماة`, 80, 140);
  doc.text(`والسيدة`, 190, 150);
  doc.text(`رقم ب و ت إ`, 184, 160);
  doc.text(`المزداد ب`, 130, 160);
  doc.text(`بتاريخ `, 84, 160);
  doc.text(`القاطن ب `, 189, 170);
  doc.text(`رقم تسجيل المرشح الممنوح من طرف الإدارة`, 136, 180);
  doc.text(`المسمى`, 90, 185);
  doc.text(`اتفـــــــق الطرفـــــــان علـــــى ما يلــــــي`, 80, 195);
// ... (Previous code)

const lineHeight = 10;
const leftMargin = 10;
let yPos = 200; // Start position for text

// Article 1: Subject of the Contract
doc.text('املادة األولــى : موضوع العقد', leftMargin+170, yPos);
yPos += lineHeight;
doc.text('يهدف هذا العقد إلى تكوين املرشح و تمكينه من اكتساب املعارف واملهارات الضرورية الالزمة التي تمكنه من سياقة مركبة تتطلب', leftMargin, yPos);
yPos += lineHeight;
doc.text('قيادتها رخصةالسياقةمنصنف \'\'....... ... \'\'، طبقا للبرامج املحددةمن طرفاإلدارة.', leftMargin, yPos);
yPos += lineHeight;
doc.text('كما يحدد حقوق وواجباتكال الطرفين مع مراعاة القوانين واألنظمةالجاري بها العمل في هذا الشأن.', leftMargin, yPos);
yPos += lineHeight;

// Article 2: Contract Duration
doc.text('املادة 2 مدة العقد', leftMargin+170, yPos);
yPos += lineHeight;
doc.text('يمتد هذا العقد ملدة ستة أشهر ابتداءمن تاريخ توقيعه. و يمكن تمديده، في حالة االتفاق بين الطرفين، ملدة ال تتعدى ثالثة أشهر.', leftMargin, yPos);
yPos += lineHeight;

// Article 3: Institute's Commitments
doc.text('املادة 3  التزامات املؤسسة', leftMargin+150, yPos);
yPos += lineHeight;
doc.text('تلتزم املؤسسةبتكوين املرشح طبقا للبرنامج الوطني لتعليم السياقة.', leftMargin, yPos);
yPos += lineHeight;
doc.text('تلقن الدروس النظرية و التطبيقية، تحت إشراف مدير املؤسسة، من طرف مدرب أو مدربي تعليم السياقة مرخص لهم، تشغلهم', leftMargin, yPos);
yPos += lineHeight;
doc.text('املؤسسة لهذا الغرض وبواسطة مركبات لتعليم السياقة في ملكيتها.', leftMargin, yPos);
yPos += lineHeight;
doc.text('تلتزم املؤسسة بتوفير املركبة التي يتم بواسطتها إجراء االختبار التطبيقي.', leftMargin, yPos);
yPos += lineHeight;
doc.text('ال يمكن الشروع فيالتكوين النظري إال بعد حصول املرشح علىرقم التسجيل املمنوح لهمن طرفاإلدارة.', leftMargin, yPos);

// ... (Remaining code)
  

  doc.setFont('Arial')
  doc.text(` ${data.id}`, 110, 40);
  doc.setFont(fontInfo.family);
  



  const footerLine = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';
  const footerX2 = 0;
  const footerY2 = doc.internal.pageSize.getHeight() - 20;
  doc.text(footerLine, footerX2, footerY2);
  const footerText = `Auto-École ${formData.nom} ${formData.adresse} ${formData.ville} Tél: ${formData.telephone}  Email: ${formData.email} `;
  const footerX = 30;
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.text(footerText, footerX, footerY);

  return doc.output('arraybuffer');
}
