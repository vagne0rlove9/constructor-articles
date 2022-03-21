import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ControlPanel from '../ControlPanel/ControlPanel';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Dropzone from '../Dropzone/Dropzone';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const Input = styled('input')({
    display: 'none',
});

const PPTX = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [filePDF, setFilePDF] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFilePDF(acceptedFiles);
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
        setFilePDF([]);
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


    const loadImageHandler = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append('File', event.target.files[0]);
            console.log(event.target.files[0], formData);
            axios({
                method: 'post',
                url: 'https://v2.convertapi.com/convert/ppt/to/pdf',
                params: {
                    Secret: 'KJB1amJKHGicTPZ4',
                    StoreFile: true,
                },
                data: formData,
                headers: { 'content-type': 'multipart/form-data' },
            })
                .then(response => {
                    console.log('response', response)
                    if (response.data.Files) {
                        setFile(response.data.Files[0].Url);
                    }
                });
        }
    }, []);

    return (
        <>
            <Link to="/" className="photos__back-button">
                <Button
                    variant="outlined"
                    color="photos_primary"
                    component="span"
                    style={{ marginBottom: '24px' }}
                >
                    Вернуться на главную
                </Button>
            </Link>
            <h2>Создание статьи с помощью PPTX</h2>
            <p>
                Вы можете загрузить файл формата pptx, далее мы его преобразуем в более удобный формат pdf, после этого Вам необходимо загрузить pdf файл
            </p>
            <p>
                После добавления нажимте кнопку "Отправить статью"
            </p>
            <label htmlFor="contained-button-file">
                <Input accept="pptx/*" id="contained-button-file" multiple type="file" onChange={loadImageHandler} />
                <Button
                    variant="contained"
                    color="photos_primary"
                    component="span"
                    style={{ color: 'white', marginBottom: '24px' }}
                >
                    Загрузить файл
                </Button>
            </label>
            {
                file ?
                    <object type="application/pdf"
                        data={file}
                        width="0"
                        height="0"

                    >
                    </object>
                    :
                    <Typography className="text-container" variant="h6" gutterBottom component="div">
                        Файл не выбран
                    </Typography>
            }
            <Dropzone
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                file={filePDF}
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
                filePDF.length !== 0 &&
                    <Document file={filePDF.length !== 0 ? filePDF[0] : null} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} className="page" scale={zoom} />
                    </Document>

            }
        </>
    )
}

export default PPTX;
