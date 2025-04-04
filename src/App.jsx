import React, { useState, useEffect } from "react";
import LineChartComponent from "./components/LineChartComponent";
import { parse } from "papaparse";

const App = () => {
  const [data, setData] = useState([]);
  const [visibleLines, setVisibleLines] = useState({
    TESP02: true,
    TESP03: true,
    TESP05: true,
    TESP06: true,
    TECE: true,
  });
  const [colors, setColors] = useState({
    TESP02: "#8884d8",
    TESP03: "#82ca9d",
    TESP05: "#ff7300",
    TESP06: "#00c49f",
    TECE: "#ffbb28",
  });
  const [darkMode, setDarkMode] = useState(false);

  // Fetch e parse do CSV
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data-dashboard/dados.csv");
      const csvText = await response.text();
      const parsedData = parse(csvText, { header: true, dynamicTyping: true });
      setData(parsedData.data);
    };
    fetchData();
  }, []);

  // Alternar visibilidade das linhas
  const toggleLine = (key) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Alterar cor de uma linha
  const changeColor = (key, color) => {
    setColors((prev) => ({ ...prev, [key]: color }));
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        {/* Cabeçalho */}
        <div className="header">
          <h1>Virtuais Servers Órfãos - Evolução - Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </button>
        </div>

        {/* Controles */}
        <div className="controls">
          <div className="control-panel">
            <h2>Mostrar/Ocultar Linhas</h2>
            {Object.keys(visibleLines).map((key) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={visibleLines[key]}
                  onChange={() => toggleLine(key)}
                />
                {key}
              </label>
            ))}
          </div>
          <div className="control-panel">
            <h2>Alterar Cores</h2>
            {Object.keys(colors).map((key) => (
              <div key={key} className="color-picker">
                <span>{key}</span>
                <input
                  type="color"
                  value={colors[key]}
                  onChange={(e) => changeColor(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico */}
        <div className="chart-container">
          <LineChartComponent
            data={data}
            visibleLines={visibleLines}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
