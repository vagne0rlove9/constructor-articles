import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

import 'swiper/css';
import './styles.css';

const Input = styled('input')({
    display: 'none',
});

const Photos = () => {
    const swiper = useSwiper();
    const [images, setImages] = useState([]);

    useEffect(() => {
        swiper?.update();
    }, [images])


    const loadImageHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const newVal = [...images];
            newVal.push(URL.createObjectURL(img));
            setImages(newVal);
        }
    };

    return (
        <div className="photos">
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={loadImageHandler} />
                <Button variant="contained" component="span">
                    Загрузить фото
                </Button>
            </label>
            <Swiper
                spaceBetween={24}
                slidesPerView={3}
                centeredSlides
                slideActiveClass="photos__swiper-slides"
                pagination={{
                    el: '.swiper-pagination',
                    type: 'bullets',
                }}
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
