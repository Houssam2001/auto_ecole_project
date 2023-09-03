import React, { useEffect } from 'react';
import * as path from 'path';
import jsPDF from 'jspdf';

export default function PDFGenerator() {
    useEffect(() => {
        const run = async () => {
            const pdfjsLib = require('pdfjs-dist');
            const pdfjsWorker = require('pdfjs-dist/build/pdf.worker');
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

            const doc = new jsPDF(
                'portrait', 'pt', [400, 400]
            );
            const x = 350;
            const offsetY = 30;
            let dummyText = `و سأعرض مثال حي لهذا ...`; // Your long Arabic text

            // Fetch and prepare font
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

            const fontInfo = await fetchPDFJSFont(
                'https://fonts.gstatic.com/s/tajawal/v3/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf'
            );

            doc.addFileToVFS(fontInfo.family, fontInfo.src);
            doc.addFont(fontInfo.family, fontInfo.family, 'normal');
            doc.setFont(fontInfo.family);

            // Add content to the PDF
            doc.text('عقد التكوين بين المرشح ومؤسسة تعليم السياقة', 20, 20);
            // Add more text...

            // Save the PDF
            const pdfBlob = doc.output('blob');
            document.getElementById('download').href = URL.createObjectURL(pdfBlob);

            // Display the PDF as an image
            // ...

            // Display the PDF as an image
            pdfjsLib.getDocument({ data: pdfBlob.arrayBuffer })
                .promise.then(function (pdfDocument) {
                    pdfDocument.getPage(1).then(function (pdfPage) {
                        const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        const { width, height } = viewport;
                        canvas.width = width;
                        canvas.height = height;

                        pdfPage
                            .render({
                                canvasContext: context,
                                viewport: viewport,
                            })
                            .promise.then(() => {
                                document.getElementById('img').src = canvas.toDataURL('image/png');
                                document.getElementById('img').style.width = width / window.devicePixelRatio + 'px';
                            })
                            .catch(console.error);
                    });
                })
                .catch(console.error);

            // ...

        };

        document.getElementById('go').addEventListener('click', run);
    }, []);

    return (
        <div>
            <button id="go">Generate PDF</button>
            <a id="download" download="generated.pdf">
                Download PDF
            </a>
            {/* <img id="img" alt="PDF Preview" /> */}
        </div>
    );
}
