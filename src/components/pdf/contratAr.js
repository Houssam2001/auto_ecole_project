import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import path from 'path'; // Import the path module
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

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
  console.log(formData)
  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }

  const doc = new jsPDF({

  });
  const formattedDate = format(new Date(data.naissance), 'dd-MM-yyyy', { locale: fr });

  const fontInfo = await fetchPDFJSFont(
    'https://themes.googleusercontent.com/static/fonts/droidarabickufi/v3/8W45GN15zj1qR-20QwKIxqPi4JPRJMb6v4DHFDoSX-k.ttf'
  );
  let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  let distanceFromRight = 10
  doc.addFileToVFS(fontInfo.family, fontInfo.src);
  doc.addFont(fontInfo.family, fontInfo.family, 'normal',);
  doc.addFont(fontInfo.family, fontInfo.family, 'bold');
  doc.setFont(fontInfo.family);
  doc.setFontSize(10)
  doc.text(`عقدالتكوين بين المرشح ومؤسسة تعليم السياقة`, 60, 20);
  doc.text(`رخصةالسياقة من صنف`, 90, 30);
  doc.text(`الرقم:`, 190, 40);
  doc.setFont('Arial')
  // doc.text(` ${data.id}`, 110, 40);
  doc.text(` ${data.category}`, 80, 30);
  doc.text(` ${data.category}`, 80, 30);
  doc.text(` ${data.category}`, 80, 30);
  doc.text(` ${data.CIN}`, 160, 160);
  doc.text(` ${data.CIN}`, 160, 160);
  doc.text(` ${data.CIN}`, 160, 160);
  doc.text(` ${formattedDate}`, 60, 160);
  doc.text(` ${formattedDate}`, 60, 160);
  doc.text(` ${formattedDate}`, 60, 160);
  doc.text(` ${formData.rc}`, 120, 110);
  doc.text(` ${formData.rc}`, 120, 110);
  doc.text(` ${formData.rc}`, 120, 110);
  doc.text(` ${formData.telephone}`, 160, 120);
  doc.text(` ${formData.telephone}`, 160, 120);
  doc.text(` ${formData.telephone}`, 160, 120);
  doc.text(` ${formData.fax}`, 60, 120);
  doc.text(` ${formData.fax}`, 60, 120);
  doc.text(` ${formData.fax}`, 60, 120);
  doc.text(` ${formData.license}`, 70, 80);
  doc.text(` ${formData.license}`, 70, 80);
  doc.text(` ${formData.license}`, 70, 80);
  doc.text(` ${formData.email}`, 120, 130);
  doc.text(` ${formData.email}`, 120, 130);
  doc.text(` ${formData.email}`, 120, 130);
  doc.text(` ${data.category}`, pageWidth - distanceFromRight - 54, 221);
  doc.text(` ${data.category}`, pageWidth - distanceFromRight - 54, 221);
  doc.text(` ${data.category}`, pageWidth - distanceFromRight - 54, 221);
  doc.text(` ${formData.patente}`, pageWidth - distanceFromRight - 104, 100);
  doc.text(` ${formData.patente}`, pageWidth - distanceFromRight - 104, 100);
  doc.text(` ${formData.patente}`, pageWidth - distanceFromRight - 104, 100);
  doc.text('________________________________________________________________________________________________________________________________________________________________________________',1, 144)
  doc.text('________________________________________________________________________________________________________________________________________________________________________________',1, 189)


  doc.setFont(fontInfo.family);
  doc.text(` ${data.arabic_nom}  ${data.arabic_prenom}`, 165, 150);
  doc.text(` ${data.arabic_nom}  ${data.arabic_prenom}`, 165, 150);
  doc.text(` ${data.arabic_nom}  ${data.arabic_prenom}`, 165, 150);
  doc.text(` ${data.arabic_adresse}  `, 170, 170);
  doc.text(` ${data.arabic_adresse}  `, 170, 170);
  doc.text(` ${data.arabic_adresse}  `, 170, 170);
  doc.text(` ${data.arabic_ville}  `, 120, 160);
  doc.text(` ${data.arabic_ville}  `, 120, 160);
  doc.text(` ${data.arabic_ville}  `, 120, 160);
  doc.text(` ${formData.arabic_ecole}  `, 150, 70);
  doc.text(` ${formData.arabic_ecole}  `, 150, 70);
  doc.text(` ${formData.arabic_ecole}  `, 150, 70);
  doc.text(` ${formData.arabic_ville}  `, 60, 110);
  doc.text(` ${formData.arabic_ville}  `, 60, 110);
  doc.text(` ${formData.arabic_ville}  `, 60, 110);
  // doc.text(` ${formData.arabic_ecole}  `, 40, 140);
  // Define font families

  const arabicFontFamily = fontInfo.family;

  // ... (previous code)

  const arabicAdresse2 = formData.arabic_adresse;
  const regex2 = /(\d+,\d+)|(\d+)|([\p{Script=Arabic}\s,]+)/gu;
  const matches2 = arabicAdresse2.matchAll(regex2);

  // Set the font for the Arabic text
  doc.setFont(arabicFontFamily);

  let xPosition2 = 175; // Initial X position
  const yPosition2 = 90; // Y position for both text and numbers

  // Loop through text parts and place numbers back in their original positions
  for (const match of matches2) {
    const part = match[0];
    if (/^\d+(,\d+)?$/.test(part)) {
      // Number part
      doc.setFont('Arial'); // Use Arial font for numbers
      doc.text(part, xPosition2, yPosition2);
      xPosition2 -= doc.getStringUnitWidth(part) * part.length+18;
    } else {
      // Text part
      doc.setFont(fontInfo.family); // Use Arabic font for text
      doc.text(part, xPosition2, yPosition2);
      xPosition2 += doc.getStringUnitWidth(part) -5;
    }
  }
  for (const match of matches2) {
    const part = match[0];
    if (/^\d+(,\d+)?$/.test(part)) {
      // Number part
      doc.setFont('Arial'); // Use Arial font for numbers
      doc.text(part, xPosition2, yPosition2);
      xPosition2 -= doc.getStringUnitWidth(part) * part.length+18;
    } else {
      // Text part
      doc.setFont(fontInfo.family); // Use Arabic font for text
      doc.text(part, xPosition2, yPosition2);
      xPosition2 += doc.getStringUnitWidth(part) -5;
    }
  }

  const arabicAdresse = data.arabic_adresse;
  const regex = /(\d+,\d+)|(\d+)|([\p{Script=Arabic}\s,]+)/gu;
  const matches = arabicAdresse.matchAll(regex);

  // Set the font for the Arabic text
  doc.setFont(arabicFontFamily);

  let xPosition = 175; // Initial X position
  const yPosition = 170; // Y position for both text and numbers

  // Loop through text parts and place numbers back in their original positions
  for (const match of matches) {
    const part = match[0];
    if (/^\d+(,\d+)?$/.test(part)) {
      // Number part
      doc.setFont('Arial'); // Use Arial font for numbers
      doc.text(part, xPosition, yPosition);
      xPosition -= doc.getStringUnitWidth(part) * part.length+15;
    } else {
      // Text part
      doc.setFont(fontInfo.family); // Use Arabic font for text
      doc.text(part, xPosition, yPosition);
      xPosition += doc.getStringUnitWidth(part) -15;
    }
  }
  doc.setFont(fontInfo.family);

  doc.text(`طرفي العقد `, 180, 50);
  doc.text(`هذا العقد مبرم بين`, 170, 60);
  doc.text(`مؤسسة تعليم السياقة`, 165, 70);
  doc.text(`رقم القيد في السجل الوطني الخاص بمؤسسات تعليم السياقة رقم الرخصة`, 87, 80);
  doc.text(`العنوان `, 190, 90);
  doc.text(`رقم القيد في سجل الضريبةالمهنية `, 147, 100);
  doc.text(`رقم القيد في السجل التجاري `, 157, 110);
  doc.text(`المدينة`, 90, 110);
  doc.text(`الهاتف`, 190, 120);
  doc.text(`الفاكس`, 90, 120);
  doc.text(`البريدالإلكتروني`, 179, 130);
  doc.text(`المسماة المؤسسة `, 50, 140);
  data.sexe==='homme'?doc.text(`والسيد`, 190, 150):doc.text(`والسيدة`, 190, 150)
  doc.text(`رقم ب و ت إ`, 184, 160);
  doc.text(`المزداد ب`, 130, 160);
  doc.text(`بتاريخ `, 84, 160);
  doc.text(`القاطن ب `, 189, 170);
  doc.text(`رقم تسجيل المرشح الممنوح من طرف الإدارة`, 136, 180);
  data.sexe==='homme'?doc.text(`المسمى المرشح`, 50, 185):data.sexe==='femme'?doc.text(`المسمى المرشحة`, 50, 185):doc.text(`المسمى المرشح`, 50, 185)
  doc.text(`اتفـــــــق الطرفـــــــان علـــــى ما يلــــــي`, 80, 195);

  const lineHeight = 7;
  const leftMargin = 10;
  let yPos = 200; // Start position for text

  // Article 1: Subject of the Contract
  doc.setFont(fontInfo.family);
  doc.text('المادة الأولــى موضوع العقد', leftMargin + 190, yPos, {
    maxWidth: 200,
    lineHeightFactor: 1,

    baseline: "top",
    align: "right",
    lang: "ar"

  });
  yPos += lineHeight;
  yPos += lineHeight;
  doc.text('يهدف هذا العقد إلى تكوين المرشح و تمكينه من اكتساب المعارف والمهارات الضرورية اللازمة التي تمكنه من سياقة مركبة تتطلب', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('قيادتها رخصةالسياقة من صنف      طبقا للبرامج المحددة من طرف الإدارة', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('كما يحدد حقوق وواجبات كال الطرفين مع مراعاة القوانين والأنظمةالجاري بها العمل في هذا الشأن.', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight + 2;

  // Article 2: Contract Duration
  doc.text('المادة الثانية مدة العقد', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('يمتد هذا العقد لمدة ستة أشهر ابتداء من تاريخ توقيعه و يمكن تمديده في حالة الاتفاق بين الطرفين ملدة لا تتعدى ثلاثة أشهر.', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight + 2;

  // Article 3: Institute's Commitments
  doc.text('المادة التزامات المؤسسة', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('تلتزم المؤسسة بتكوين المرشح طبقا للبرنامج الوطني لتعليم السياقة.', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('تلقن الدروس النظرية و التطبيقية، تحت إشراف مدير المؤسسة من طرف مدرب أو مدربي تعليم السياقة مرخص لهم تشغلهم', pageWidth - distanceFromRight, yPos, "right");
  yPos += lineHeight;
  doc.text('المؤسسة لهذا الغرض وبواسطة مركبات لتعليم السياقة في ملكيتها', pageWidth - distanceFromRight, yPos, "right");
  doc.addPage();
  yPos = 20
  yPos += lineHeight;
  doc.text('تلتزم المؤسسة بتوفير المركبة التي يتم بواسطتها إجراءالاختبار التطبيقي', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('لا يمكن بدء التدريب النظري إلا بعد أن يحصل المرشح على رقم التسجيل الممنوح له من قبل الإدارة.', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('تلتزم المؤسسة بإخبار المرشح فورا بحصوله على هذا الرقم كما تلتزم بتسليم المرشح شهادة نهاية التكوين فور إنهائه له.', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('تحتفظ المؤسسة بحق إجراء دروس التكوين إلى تاريخ الحق في حالة قوة قاهرةوفي كل الحالات التي تكون فيها السالمة غير متوفرة', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('بعداستفادة المرشح من عدد ساعات التكوين النظري والتطبيقي المتفق عليها،تلتزم المؤسسة بتقديمها لاجتياز المتحانات لنيل', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('رخصة السياقة في حدود المقاعد الممنوحة من طرف الإدارة', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 2;
  doc.text('المادة التزامات المرشج', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('إذا توقف المرشح عن التكوين سواء بصفة مؤقتة أو نهائية وكيفما كانت الأسباب يلتزم بإخبارالمؤسسة كتابيا', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('في حالة التوقف لأكثر من ثلاثة أشهر متتالية يحق للمؤسسة مطالبة المرشح بأداء مبالغ الخدمات المتبقية،وغيرالمؤداة ', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('إذا انقطع المرشح عن التكوين لمدة تفوق ستة أشهر يعتبر متخلياعن التكوين ولا يحق له أن يسترجع ما دفعه من أجله.', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('إذا تخلى المرشح عن التكوين لسبب يعود له يؤدي التعريفة كاملـة', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('ي حالة عدم النجاح في الامتحان، يلتزم المرشح بأداء مصاريف إعادة تكوينه وفقا لنفس التعريفة', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 2;
  doc.text('المادة مدة التكوين', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('اتفق الطرفان على تحديد عدد ساعات التكوين في  ساعة بالنسبة للتكوين النظري و ساعة بالنسبة للتكوين التطبيقي لا', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('يقل هذا العدد عنالعددالأدنى المحدد بالمادة من دفتر التحملات الخاص بفتح واستغلال مؤسسات تعليم السياقة', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 2;
  doc.text('المادة تعريفة التكوين', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('تحتسب التعريفة الإجمالية للتكوين على أساس تعريفة ساعة التكوين النظري والتطبيقي المحددة في المادة من القرار الذي يحدد', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('تعريفة ساعة التكوين النظري والتطبيقي', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 2;
  doc.text('المادة كيفيات الأداء', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('تسلم للمرشح فاتورة تحدد المبالغ المدفوعة للمؤسسة تكون هذه الفاتورة مؤرخة وموقعة من طرف صاحب المؤسسة تحمل هذه', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('الفاتورةاسم وطابع المؤسسة وفقا للتشريعات الجاري بهاالعمل', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight;
  doc.text('في حالة الاتفاق بين الطرفين يمكن أداء مبلغ التكوين على أقساط', pageWidth - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 4;
  doc.text('عقد محررفي ثلاثة نظائر أصلية', pageWidth / 1.5 - distanceFromRight,
    yPos,
    "right");
  yPos += lineHeight + 4;
  doc.text('في', pageWidth / 1.5 + 20,
    yPos,
    "right");
  doc.text('بتاريخ', pageWidth / 1.5 - 30,
    yPos,
    "right");
  yPos += lineHeight + 4;
  doc.text('توقيع صاحب المؤسسة أو ممثله القانوني', pageWidth / 1.5 + 50,
    yPos,
    "right");
  doc.text('توقيع المرشح أو ولي أمره مصادق عليه', pageWidth / 1.5 - 50,
    yPos,
    "right");

  // ... (Remaining code)







  const footerLine = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';
  const footerX2 = 0;
  const footerY2 = doc.internal.pageSize.getHeight() - 20;
  doc.text(footerLine, footerX2, footerY2);
  const footerText = `Auto-École ${formData.nom} ${formData.adresse} ${formData.ville} Tél: ${formData.telephone}  Email: ${formData.email} `;
  const footerX = 30;
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.text(footerText, footerX, footerY);

  return Promise.resolve(doc.output('arraybuffer'));
}
