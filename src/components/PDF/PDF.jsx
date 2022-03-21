import React, { useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ControlPanel from '../ControlPanel/ControlPanel';
import Dropzone from '../Dropzone/Dropzone';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import './PDF.css';

axios.defaults.baseURL = 'http://localhost:8080/';

const PDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [file, setFile] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        setPageNumber(1);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);

        // var formData = new FormData();
        // formData.append("file", file[0]);
        // axios.post('/v1/pdfs/rotate/all', formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // });
    }

    const deleteHandler = event => {
        event.stopPropagation();
        setFile([]);
        setPageNumber(null);
    }

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

    const submitArtcile = useCallback(
        () => {
            //axios.post('', images);
            console.log(file);
        },
        [file],
    )

    return (
        <div>
            <Link to="/" className="photos__back-button">
                <Button
                    variant="outlined"
                    color="secondary"
                    component="span"
                    style={{ marginBottom: '24px' }}
                >
                    Вернуться на главную
                </Button>
            </Link>
            <h2>Создание статьи с помощью PDF</h2>
            <p>
                Вы можете добавить Вашу статью в формате PDF файла
            </p>
            <p>
                После добавления нажимте кнопку "Отправить статью"
            </p>
            <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    style={{ color: 'white', marginBottom: '24px' }}
                    onClick={submitArtcile}
                >
                    Отправть отчет
                </Button>
            <Dropzone
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                file={file}
                deleteHandler={deleteHandler}
            />
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
    );
};

export default PDF;
