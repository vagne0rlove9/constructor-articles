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

const Photos = () => {
    const swiper = useSwiper();
    const [images, setImages] = useState([]);

    useEffect(() => {
        swiper?.update();
    }, [images, swiper])


    const loadImageHandler = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const newVal = [...images];
            newVal.push(URL.createObjectURL(img));
            setImages(newVal);
        }
    }, [images]);

    const submitImages = useCallback(
        () => {
            //axios.post('', images);
            console.log(images);
        },
        [images],
    )

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
                {images.map(item => (
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
