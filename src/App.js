import { Route, Routes } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/Menu';
import Container from '@mui/material/Container';
import Constructor from './components/Constructor';
import Photos from './components/Photos';
import PDF from './components/PDF/PDF';
import PPTX from './components/PPTX';
import PhotosDetail from './components/PhotosDetail';
import PDFDetail from './components/PDFDetail';
import TextDetail from './components/TextDetail';
import AllArticles from './components/AllArticles';

import './App.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#05415d',
            light: '#534bae',
            dark: '#000051',
        },
        secondary: {
            main: '#0abfc5',
            light: '#6effe8',
            dark: '#00b686',
        },
        photos_primary: {
            main: '#f7c853',
            light: '#7953d2',
            dark: '#311b92',
        },
        photos_secondary: {
            main: '#f24c51',
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
                        <Route exact path="/all-articles" element={<AllArticles />} />
                        <Route path="/constructor" element={<Constructor />} />
                        <Route path="/constructor/:id" element={<TextDetail />} />
                        <Route path="/pdf" element={<PDF />} />
                        <Route path="/pdf/:id" element={<PDFDetail />} />
                        <Route path="/photos" element={<Photos />} />
                        <Route path="/photos/:id" element={<PhotosDetail />} />
                        <Route path="/pptx" element={<PPTX />} />
                        <Route path="/pptx/:id" element={<PDFDetail />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
