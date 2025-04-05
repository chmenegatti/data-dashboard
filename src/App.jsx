import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import LineChartComponent from './components/LineChartComponent';
import {
  Container,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  ThemeProvider,
  Grid,
} from '@mui/material';
import { getTheme } from './theme';

const App = () => {
  const [data, setData] = useState([]);
  const [visibleLines, setVisibleLines] = useState({
    TESP02: true,
    TESP03: true,
    TESP05: true,
    TESP06: true,
    TECE01: true,
  });
  const [colors, setColors] = useState({
    TESP02: '#8884d8',
    TESP03: '#82ca9d',
    TESP05: '#ff7300',
    TESP06: '#00c49f',
    TECE01: '#ffbb28',
  });
  const [darkMode, setDarkMode] = useState(false);

  // Fetch e parse do CSV
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data-dashboard/dados.csv');
        if (!response.ok) throw new Error('Erro ao carregar o CSV');
        const csvText = await response.text();
        console.log('CSV carregado:', csvText);
        const parsedData = parse(csvText, { header: true, dynamicTyping: true });
        console.log('Dados parseados:', parsedData.data);
        setData(parsedData.data);
      } catch (error) {
        console.error('Erro no fetch:', error);
      }
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
    <ThemeProvider theme={getTheme(darkMode)}>
      <Box
        sx={{
          maxHeight: '99vh',
          bgcolor: 'background.default',
          m: 0,
          p: 0,
          width: '99vw',
          overflow: 'hidden', // Remove barras de rolagem globais
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            height: '98vh', // Garante que o conteúdo preencha a tela
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Evita overflow no container
          }}
        >
          {/* Cabeçalho */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h1" color="text.primary">
              Virtual Server Órfãos - Evolução - Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? 'Modo Claro' : 'Modo Escuro'}
            </Button>
          </Box>

          {/* Controles */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ mb: 4, flexShrink: 0 }} // Impede que os controles sejam espremidos
          >
            <Paper sx={{ p: 3, flex: 1, overflow: 'auto' }}>
              
              <Typography variant="h2" color="text.primary" gutterBottom>
                Mostrar/Ocultar Linhas
              </Typography>
              {Object.keys(visibleLines).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={visibleLines[key]}
                      onChange={() => toggleLine(key)}
                      sx={{ color: colors[key], '&.Mui-checked': { color: colors[key] } }}
                    />
                  }
                  label={key}
                />
              ))}
            </Paper>
            <Paper sx={{ p: 3, flex: 1, overflow: 'hidden' }}>
              <Typography variant="h2" color="text.primary" gutterBottom>
                Alterar Cores
              </Typography>
              <Grid container spacing={1.5}>
                {Object.keys(colors).map((key) => (
                  <Grid item xs={6} key={key}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        p: 1,
                        borderRadius: 1,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.2s',
                        '&:hover': { boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' },
                      }}
                    >
                      <Typography variant="body1" sx={{ mb: 0.5 }}>
                        {key}
                      </Typography>
                      <input
                        type="color"
                        value={colors[key]}
                        onChange={(e) => changeColor(key, e.target.value)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Stack>

          {/* Gráfico */}
          <Paper sx={{ p: 3, flexGrow: 1, overflow: 'hidden' }}>
            {data.length > 0 ? (
              <LineChartComponent data={data} visibleLines={visibleLines} colors={colors} />
            ) : (
              <Typography color="text.secondary">Carregando dados...</Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;