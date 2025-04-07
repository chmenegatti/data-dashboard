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
          minHeight: '100vh',
          bgcolor: 'background.default',
          m: 0,
          p: 0,
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Cabeçalho */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h1" color="text.primary">
              Virtual Servers Órfãos - Evolução - Dashboard
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
            sx={{ mb: 4, flexShrink: 0 }}
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
              <Typography variant="h2" color="text.primary" gutterBottom textAlign={'center'}>
                Alterar Cores
              </Typography>
              <Grid container spacing={1.5} justifyContent="space-between">
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

          {/* Gráfico e Legenda */}
          <Paper sx={{ p: 3, flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {data.length > 0 ? (
              <Box sx={{ flexGrow: 1 }}>
                <LineChartComponent data={data} visibleLines={visibleLines} colors={colors} />
              </Box>
            ) : (
              <Typography color="text.secondary">Carregando dados...</Typography>
            )}
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#00ff00', display: 'inline-block', borderRadius: '2px' }}></span>
                04/02/2025 - Correção Gateway
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#ff0000', display: 'inline-block', borderRadius: '2px' }}></span>
                11/02/2025 - RDM Sanitização Redes
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;