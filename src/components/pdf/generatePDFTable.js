import { useEffect, useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ... (other imports)

export const generatePDFTable = (clientsData,selectedYear) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    // Set the font size and style for the table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  doc.addPage()
  const filteredClients = clientsData.filter((client) => {
    const inscritYear = client.inscrit ? new Date(client.inscrit).getFullYear() : null;
    return inscritYear === selectedYear;
  });
    // Define table columns
    const columns = [ "Nom", "Prenom", "Categorie", "Telephone", "CIN", "Adresse", "Inscrit"];
  
    // Define table rows as a 2D array
    const rows = filteredClients.map((client) => [
    //   client.id,
      client.nom,
      client.prenom,
      client.category,
      client.phone,
      client.CIN,
      client.Adresse,
      client.inscrit,
    ]);

    // Add a header row to the table
    rows.unshift(columns);
  
    // AutoTable plugin to generate the table
    doc.autoTable({
      head: [rows[0]],
      body: rows.slice(1),
      theme: 'grid', // 'striped' or 'grid' can also be used
      margin: { top: 20 },
    });
return new Promise(resolve => {
    resolve(doc.output('arraybuffer'));
  });
  };
  