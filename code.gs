function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const pdf = generatePDF(data);
  const file = DriveApp.createFile(pdf);
  return ContentService.createTextOutput(file.getUrl());
}

function generatePDF(data) {
  const { jsPDF } = require('jspdf');
  const doc = new jsPDF();

  doc.text('Facture', 10, 10);
  doc.text(`Client: ${data.client}`, 10, 20);
  doc.text(`Date: ${data.date}`, 10, 30);
  doc.text(`Type: ${data.type}`, 10, 40);

  let y = 50;
  data.lignes.forEach(line => {
    doc.text(`${line.nom} - ${line.prix} € x ${line.qte}`, 10, y);
    y += 10;
  });

  return doc.output('blob');
}
