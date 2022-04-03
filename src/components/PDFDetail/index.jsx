import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import ControlPanel from '../ControlPanel/ControlPanel';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const PDFDetail = () => {
    const params = useParams();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [file, setFile] = useState([]);
    const [annotation, setAnnotaion] = useState('');
    const [type, setType] = useState('');
    const [keywords, setKeywords] = useState('');
    const [email, setEmail] = useState('');
    const [names, setNames] = useState('');

    useEffect(() => {
        instance.get(`/api/v3/articlesimage/${params.id}`)
            .then(response => {
                if (response.data) {
                    setAnnotaion(response.data.annotation);
                    setType(response.data.type);
                    setEmail(response.data.email.slice(0, response.data.email.length - 2));
                    setKeywords(response.data.keywords);
                    setNames(response.data.author.slice(0, response.data.author.length - 2));

                    let bstr = atob(response.data.resource0.bytes),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);

                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }

                    const newFile = new File([u8arr], response.data.name, {type: "application/pdf"});
                    setFile([newFile]);
                    setPageNumber(1);
                }
            });
    }, []);

    const changePageHandler = event => {
        if (!pageNumber) {
            return;
        }
        if (Number.isInteger(+event.target.value)) {
            setPageNumber(+event.target.value);
        }
    }

    const clickForwardHandler = () => {
        if (!pageNumber || pageNumber === numPages) {
            return;
        }
        if (pageNumber !== numPages) {
            setPageNumber(prev => prev + 1);
        }
    }

    const clickBackHandler = () => {
        if (!pageNumber || pageNumber === 1) {
            return;
        }
        if (pageNumber !== 1) {
            setPageNumber(prev => prev - 1);
        }
    }

    const clickFirstHandler = () => {
        if (!pageNumber || pageNumber === 1) {
            return;
        }
        setPageNumber(1);
    }

    const clickLastHandler = () => {
        if (!pageNumber || pageNumber === numPages) {
            return;
        }
        setPageNumber(numPages);
    }

    const changeZoomHandler = (event, type) => {
        if (type === '+') {
            if (Math.round(zoom) >= 0 && Math.round(zoom) <= 2) {
                setZoom(prev => prev + 0.1);
            }
        }
        if (type === '-') {
            if (Math.round(zoom) >= 1 && Math.round(zoom) <= 3) {
                setZoom(prev => prev - 0.1);
            }
        }
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    return (
        <div>
            <h3>Аннотация</h3>
            <p>{annotation}</p>
            <h3>Тип статьи</h3>
            <p>{type}</p>
            <h3>Ключевые слова</h3>
            <p>{keywords}</p>
            <h3>Авторы</h3>
            <p>{names}</p>
            <h3>Email автора</h3>
            <p>{email}</p>
            <ControlPanel
                page={pageNumber}
                maxPage={numPages}
                changePageHandler={changePageHandler}
                clickForward={clickForwardHandler}
                clickBack={clickBackHandler}
                clickFirstPage={clickFirstHandler}
                clickLastPage={clickLastHandler}
                zoom={zoom * 100}
                changeZoomHandler={changeZoomHandler}
            />
            {
                file.length !== 0 ?
                    <Document file={file.length !== 0 ? file[0] : null} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} className="page" scale={zoom} />
                    </Document>
                    :
                    <Typography className="text-container" variant="h6" gutterBottom component="div">
                        Файл не выбран
                    </Typography>
            }
        </div>
    )
}

export default PDFDetail;
