import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination } from "swiper";

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

//axios.defaults.baseURL = 'http://23.111.124.132:8080';

const Photos = () => {
    const swiper = useSwiper();
    const [images, setImages] = useState([]);
    const [imagesDisplay, setImagesDisplay] = useState([]);
    const [receivedImage, setReceivedImage] = useState(null);

    useEffect(() => {
        swiper?.update();
    }, [images, swiper])


    const loadImageHandler = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const newVal = [...images];
            const newImagesDisplay = [...imagesDisplay];
            newVal.push(img);
            newImagesDisplay.push(URL.createObjectURL(img));
            setImagesDisplay(newImagesDisplay);
            setImages(newVal);
        }
    }, [images, imagesDisplay]);

    const submitImages = useCallback(
        () => {
            images.map(item => {
                const formData = new FormData();
                formData.append('file', item);
                instance.post('/api/v3/file', formData);
            });
        },
        [images],
    );

    const receiveImages = useCallback(
        () => {
            instance.get(`/api/v3/files/${14}`, {
                responseType: "blob",
            })
                .then(response => {
                    console.log(response);
                    setReceivedImage(URL.createObjectURL(response.data));
                });
        },
        [],
    );

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
            <div>
                <Button
                    variant="contained"
                    color="photos_secondary"
                    component="span"
                    style={{ color: 'white', marginBottom: '24px' }}
                    onClick={receiveImages}
                >
                    Получить фото
                </Button>
            </div>
            <img src={receivedImage} alt='' id="image-1" />
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={loadImageHandler} />
                <Button
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
