import React, { useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ControlPanel from '../ControlPanel/ControlPanel';
import Dropzone from '../Dropzone/Dropzone';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';

import { Button, Grid } from '@mui/material';

import AuthorForm from '../AuthorForm';

import './PDF.css';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const emptyAuthor = {
    name: '',
    secondName: '',
    thirdName: '',
    email: '',
};

const PDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [zoom, setZoom] = useState(0.7);
    const [file, setFile] = useState([]);
    const [fileRequest, setFileRequest] = useState(null);
    const [authors, setAuthors] = useState([emptyAuthor]);
    const [annotation, setAnnotation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFullAuthors, setIsFullAuthors] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [articleId, setArticleId] = useState(null);

    const deleteAuthorHandler = useCallback((index) => {
        let newAuthors = [...authors];

        if (newAuthors.length === 1) {
            return;
        }

        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    }, [authors]);

    const addAuthorHandler = useCallback(() => {
        const newAuthors = [...authors];
        newAuthors.push({ name: '', secondName: '', thirdName: '', email: '' });

        if (newAuthors.length === 10) {
            setIsFullAuthors(true);
            return;
        }

        setAuthors(newAuthors);
    }, [authors]);

    const changeNameHandler = useCallback(({ target }, id) => {
        const newAuthors = [...authors];
        newAuthors[id].name = target.value;
        setAuthors(newAuthors);
    }, [authors]);

    const changeSecondNameHandler = useCallback(({ target }, id) => {
        const newAuthors = [...authors];
        newAuthors[id].secondName = target.value;
        setAuthors(newAuthors);
    }, [authors]);

    const changeThirdNameHandler = useCallback(({ target }, id) => {
        const newAuthors = [...authors];
        newAuthors[id].thirdName = target.value;
        setAuthors(newAuthors);
    }, [authors]);

    const changeEmailHandler = useCallback(({ target }, id) => {
        const newAuthors = [...authors];
        newAuthors[id].email = target.value;
        setAuthors(newAuthors);
    }, [authors]);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);

        var reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = function () {
            const data = {
                id: '',
                name: acceptedFiles[0].name,
                originalFileName: acceptedFiles[0].name,
                contentType: acceptedFiles[0].type,
                size: acceptedFiles[0].size,
                bytes: reader.result.slice(28, reader.result.length),
            };

            setFileRequest(data);
        };

        setPageNumber(1);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const deleteFileHandler = event => {
        event.stopPropagation();
        setFile([]);
        setFileRequest(null);
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
            setIsLoading(prev => !prev);

            const date = new Date();

            const data = {
                id: '',
                annotation,
                keywords: keywords,
                type: 'pdf',
                date: date.toLocaleString(),
                resources: [fileRequest],
            };
            data.author = '';
            data.email = '';
            authors.map(author => {
                data.author = data.author + `${author.secondName} ${author.name}, `;
                data.email = data.email + `${author.email}, `;
            });

            instance.post('/api/v3/articleimage', data)
                .then(response => {
                    setArticleId(response.data.id);
                    setIsDone(true);
                })
                .finally(response => setIsLoading(prev => !prev));
        },
        [annotation, authors, fileRequest, keywords],
    )

    return (
        <Grid container spacing={5}>
            <Grid item xs={4}>
                <h2>Создание статьи с помощью PDF</h2>
                <p>
                    Вы можете добавить Вашу статью в формате PDF файла
                </p>
                <p>
                    После добавления нажмите кнопку "Отправить статью"
                </p>
                <div style={{ maxWidth: 400, margin: '12px auto' }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField
                            fullWidth
                            label="Аннотация"
                            multiline
                            maxRows={4}
                            value={annotation}
                            onChange={(event) => setAnnotation(event.target.value)}
                        />
                    </FormControl>
                </div>
                <div style={{ maxWidth: 400, margin: '12px auto' }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField
                            fullWidth
                            label="Ключевые слова"
                            placeholder="Введите ключевые слова через запятую"
                            value={keywords}
                            onChange={(event) => setKeywords(event.target.value)}
                        />
                    </FormControl>
                </div>
                <div>
                    {isDone ?
                        <Link to={`/pdf/${articleId}`} className="menu__link">
                            <Button
                                variant="contained"
                            >
                                Перейти к статье
                            </Button>
                        </Link> :
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="secondary"
                            component="span"
                            style={{ color: 'white', marginBottom: '24px' }}
                            onClick={submitArtcile}
                        >
                            Отправить отчет
                        </LoadingButton>}
                </div>
                {authors.map((author, index) => (
                    <AuthorForm
                        id={index}
                        key={index}
                        name={author.name}
                        secondName={author.secondName}
                        thirdName={author.thirdName}
                        email={author.email}
                        addAuthorHandler={addAuthorHandler}
                        changeNameHandler={changeNameHandler}
                        changeSecondNameHandler={(event) => changeSecondNameHandler(event, index)}
                        changeThirdNameHandler={(event) => changeThirdNameHandler(event, index)}
                        changeEmailHandler={(event) => changeEmailHandler(event, index)}
                        deleteHandler={() => deleteAuthorHandler(index)}
                    />
                ))}
                <div>
                    <Button
                        disabled={isFullAuthors}
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                            color: 'white',
                            marginBottom: '24px'
                        }}
                        onClick={addAuthorHandler}
                    >
                        Добавить автора
                    </Button>
                </div>
            </Grid>
            <Grid item xs={8}>
                <Dropzone
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    file={file}
                    deleteHandler={deleteFileHandler}
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
            </Grid>
        </Grid>
    );
};

export default PDF;
