import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination } from "swiper";

import AuthorForm from '../AuthorForm';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

const Input = styled('input')({
    display: 'none',
});

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const emptyAuthor = {
    name: '',
    secondName: '',
    thirdName: '',
    email: '',
};

const Photos = () => {
    const swiper = useSwiper();
    const [images, setImages] = useState([]);
    const [imagesDisplay, setImagesDisplay] = useState([]);
    const [authors, setAuthors] = useState([emptyAuthor]);
    const [annotation, setAnnotation] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFullImages, setIsFullImages] = useState(false);
    const [isFullAuthors, setIsFullAuthors] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [isDone, setIsDone] = useState(true);
    const [articleId, setArticleId] = useState(3);

    useEffect(() => {
        swiper?.update();
    }, [imagesDisplay, swiper]);

    const deleteHandler = useCallback((index) => {
        let newAuthors = [...authors];

        if (newAuthors.length === 1) {
            return;
        }

        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    }, [authors]);

    const loadImageHandler = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            const newImagesDisplay = [...imagesDisplay];
            newImagesDisplay.push(URL.createObjectURL(img));

            if (newImagesDisplay.length === 11) {
                setIsFullImages(true);
                return;
            }

            event.target.files[0].arrayBuffer().then(resp => {
                let ui8 = new Uint8Array(resp);
                let rawData = [...ui8];

                const data = {
                    id: '',
                    name: img.name,
                    originalFileName: img.name,
                    contentType: img.type,
                    size: img.size,
                    bytes: rawData,
                };

                const newVal = [...images];
                newVal.push(data);
                setImages(newVal);
            });

            setImagesDisplay(newImagesDisplay);
        }
    }, [images, imagesDisplay]);

    const submitImages = useCallback(
        () => {
            setIsLoading(prev => !prev);

            const date = new Date();

            const data = {
                id: '',
                annotation,
                keywords: keywords,
                type: type,
                date: date.toLocaleString(),
                resources: images,
            };
            data.author = '';
            data.email = '';
            authors.map(author => {
                data.author = data.author + `${author.secondName} ${author.name}, `;
                data.email = data.email + `${author.email}, `;
            });

            instance.post('/api/v3/articleimage', data)
                .then(response => {
                    setIsLoading(prev => !prev)
                    setArticleId(response.id);
                    setIsDone(true);
                });
        },
        [annotation, authors, images, keywords, type],
    );

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

    return (
        <Grid container spacing={5}>
            <Grid item xs={4}>
                <h2>Фотоотчет</h2>
                <p>
                    Вы можете добавить все необходимые фотографии в отчет
                </p>
                <p>
                    После добавления нажимте кнопку "Отправить отчет"
                </p>
                <div style={{ maxWidth: 400, margin: '12px auto' }}>
                    <TextField
                        fullWidth
                        label="Аннотация"
                        multiline
                        maxRows={4}
                        value={annotation}
                        onChange={(event) => setAnnotation(event.target.value)}
                    />
                </div>
                <div style={{ maxWidth: 400, margin: '12px auto' }}>
                    <TextField
                        fullWidth
                        label="Тип статьи"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    />
                </div>
                <div style={{ maxWidth: 400, margin: '12px auto' }}>
                    <TextField
                        fullWidth
                        label="Ключевые слова"
                        placeholder="Введите ключевые слова через запятую"
                        value={keywords}
                        onChange={(event) => setKeywords(event.target.value)}
                    />
                </div>
                <div>
                    {isDone ?
                        <Link to={`/photos/${articleId}`} className="menu__link">
                            <Button
                                variant="contained"
                            >
                                Перейти к статье
                            </Button>
                        </Link> :
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="photos_secondary"
                            component="span"
                            style={{ color: 'white', marginBottom: '24px' }}
                            onClick={submitImages}
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
                        deleteHandler={() => deleteHandler(index)}
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
                <label htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={loadImageHandler}
                        disabled={isFullImages}
                    />
                    <Button
                        disabled={isFullImages}
                        variant="contained"
                        color="photos_primary"
                        component="span"
                        style={{ color: 'white', marginBottom: '24px' }}
                    >
                        Загрузить фото
                    </Button>
                </label>
                <Swiper
                    spaceBetween={24}
                    slidesPerView={3}
                    centeredSlides
                    navigation
                    pagination
                    modules={[Navigation, Pagination]}
                >
                    {imagesDisplay.map(item => (
                        <SwiperSlide key={item}>
                            <picture>
                                <source srcSet={item} />
                                <img alt="" src={item} loading="lazy" className="photos__swiper-slide-img" />
                            </picture>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Grid>
        </Grid>
    )
}

export default Photos;
