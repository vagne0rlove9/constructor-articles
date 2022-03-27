import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const instance = axios.create({
    baseURL: 'http://23.111.124.132:8080/',
});

const PhotosDetail = () => {
    const swiper = useSwiper();

    const params = useParams();

    const [imagesDisplay, setImagesDisplay] = useState([]);
    const [annotation, setAnnotaion] = useState('');
    const [type, setType] = useState('');
    const [keywords, setKeywords] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        swiper?.update();
    }, [imagesDisplay, swiper]);

    useEffect(() => {
        instance.get(`/api/v3/articlesimage/${params.id}`)
            .then(response => {
                console.log('response', response);
                if (response.data) {
                    setAnnotaion(response.data.annotation);
                    setType(response.data.type);
                    setEmail(response.data.email);
                    setKeywords(response.data.keywords);
                    var blob = new Blob([new Uint8Array(response.data.resource0.bytes)], { type: 'image/png' });
                    console.log(response.data.resource0.bytes, blob);
                    setImagesDisplay([`data:image/png;base64,${response.data.resource0.bytes}`]);
                }
            });
    }, []);


    return (
        <div>
            <h3>Аннотация</h3>
            <p>{annotation}</p>
            <h3>Тип статьи</h3>
            <p>{type}</p>
            <h3>Ключевые слова</h3>
            <p>{keywords}</p>
            <h3>Email автора</h3>
            <p>{email}</p>
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

export default PhotosDetail;
