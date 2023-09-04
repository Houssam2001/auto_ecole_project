import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Paper, Container } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const ClientCategoryChart = ( {props},) => {
  const [data, setData] = useState([]);
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const { data: clientData, error } = await supabase
          .from('client_category_view')
          .select('*')
          .order('category').eq('user_id',props);

        if (error) {
          throw new Error('Error fetching client data.');
        }

        // Format the data for the chart
        const formattedData = clientData.map((entry) => ({
          category: entry.category || 'Uncategorized', // Handle null values if any
          total_clients: entry.total_clients,
        }));

        setData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" gutterBottom>
        Client Distribution par Categories
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 1, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="total_clients" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default ClientCategoryChart;
