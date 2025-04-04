import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data, visibleLines, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={480}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="Dia" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Legend />
        {visibleLines.TESP02 && (
          <Line
            type="monotone"
            dataKey="TESP02"
            stroke={colors.TESP02}
            name="TESP02"
          />
        )}
        {visibleLines.TESP03 && (
          <Line
            type="monotone"
            dataKey="TESP03"
            stroke={colors.TESP03}
            name="TESP03"
          />
        )}
        {visibleLines.TESP05 && (
          <Line
            type="monotone"
            dataKey="TESP05"
            stroke={colors.TESP05}
            name="TESP05"
          />
        )}
        {visibleLines.TESP06 && (
          <Line
            type="monotone"
            dataKey="TESP06"
            stroke={colors.TESP06}
            name="TESP06"
          />
        )}
        {visibleLines.TECE && (
          <Line
            type="monotone"
            dataKey="TECE"
            stroke={colors.TECE}
            name="TECE"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
