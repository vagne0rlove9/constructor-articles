import { Route, Routes } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/Menu';
import Container from '@mui/material/Container';
import Constructor from './components/Constructor';
import Photos from './components/Photos';
import PDF from './components/PDF/PDF';
import PPTX from './components/PPTX';

import './App.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1a237e',
            light: '#534bae',
            dark: '#000051',
        },
        secondary: {
            main: '#1de9b6',
            light: '#6effe8',
            dark: '#00b686',
        },
        photos_primary: {
            main: '#4527a0',
            light: '#7953d2',
            dark: '#311b92',
        },
        photos_secondary: {
            main: '#2e7d32',
            light: '#7953d2',
            dark: '#005005',
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container>
                    <Routes>
                        <Route exact path="/" element={<Menu />} />
                        <Route path="/constructor" element={<Constructor />} />
                        <Route path="/pdf" element={<PDF />} />
                        <Route path="/photos" element={<Photos />} />
                        <Route path="/pptx" element={<PPTX />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
