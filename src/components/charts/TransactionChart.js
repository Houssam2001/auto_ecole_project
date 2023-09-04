import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionChart = ({ data, groupBy }) => {
  return (
    <Box component={Paper} elevation={3} p={3}>
      <Typography variant="h6">Transaction Statistics</Typography>
      <Typography variant="subtitle1">Group by: {groupBy}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="date_group" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="total_amount" name="Total Amount" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionChart;
