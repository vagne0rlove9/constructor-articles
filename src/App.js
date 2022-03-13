import { Route, Routes } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/Menu';
import Container from '@mui/material/Container';
import Constructor from './components/Constructor';
import PDF from './components/PDF/PDF';

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
                    </Routes>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
