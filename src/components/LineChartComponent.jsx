import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ data, visibleLines, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={490}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#8884" />
        <XAxis dataKey="Dia" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffffcc',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        {visibleLines.TESP02 && (
          <Line
            type="monotone"
            dataKey="TESP02"
            stroke={colors.TESP02}
            name="TESP02"
            activeDot={{ r: 8 }}
          />
        )}
        {visibleLines.TESP03 && (
          <Line type="monotone" dataKey="TESP03" stroke={colors.TESP03} name="TESP03" />
        )}
        {visibleLines.TESP05 && (
          <Line type="monotone" dataKey="TESP05" stroke={colors.TESP05} name="TESP05" />
        )}
        {visibleLines.TESP06 && (
          <Line type="monotone" dataKey="TESP06" stroke={colors.TESP06} name="TESP06" />
        )}
        {visibleLines.TECE01 && (
          <Line type="monotone" dataKey="TECE01" stroke={colors.TECE01} name="TECE01" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;