import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

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
    baseURL: 'http://23.111.124.132:8080/',
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
    const [isFullImages, setIsFullImages] = useState(false);
    const [isFullAuthors, setIsFullAuthors] = useState(false);
    const [keywords, setKeywords] = useState('');

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
                    id: '1',
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
            const date = new Date();

            const data = {
                id: '1',
                fio: `${authors[0].secondName} ${authors[0].name}`,
                email: authors[0].email,
                annotation,
                keywords: keywords,
                type: type,
                date: date.toLocaleString(),
                resources: images,
            };

            instance.post('/api/v3/articleimage', data);
        },
        [annotation, authors, images, keywords, type],
    );

    // const receiveImages = useCallback(
    //     () => {
    //         instance.get(`/api/v3/files/${14}`, {
    //             responseType: "blob",
    //         })
    //             .then(response => {
    //                 console.log(response);
    //                 setReceivedImage(URL.createObjectURL(response.data));
    //             });
    //     },
    //     [],
    // );

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
        <div className="photos">
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
                <Button
                    variant="contained"
                    color="photos_secondary"
                    component="span"
                    style={{ color: 'white', marginBottom: '24px' }}
                    onClick={submitImages}
                >
                    Отправить отчет
                </Button>
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
        </div>
    )
}

export default Photos;
