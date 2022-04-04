import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import Loader from '../Loader';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const PhotosDetail = () => {
    const swiper = useSwiper();

    const params = useParams();

    const [imagesDisplay, setImagesDisplay] = useState([]);
    const [annotation, setAnnotaion] = useState('');
    const [type, setType] = useState('');
    const [keywords, setKeywords] = useState('');
    const [email, setEmail] = useState('');
    const [names, setNames] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        swiper?.update();
    }, [imagesDisplay, swiper]);

    useEffect(() => {
        instance.get(`/api/v3/articlesimage/${params.id}`)
            .then(response => {
                if (response.data) {
                    setAnnotaion(response.data.annotation);
                    setType(response.data.type);
                    setEmail(response.data.email.slice(0, response.data.email.length - 2));
                    setKeywords(response.data.keywords);
                    setNames(response.data.author.slice(0, response.data.author.length - 2));
                    const resources = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const images = [];
                    resources.map(item => {
                        const res = `resource${item}`;
                        if (response.data[res]) {
                            images.push(`data:image/png;base64,${response.data[res].bytes}`);
                        }
                    });
                    setImagesDisplay(images);
                    setIsLoading(false);
                }
            });
    }, []);


    return (
        <div>
            {isLoading ? <Loader /> :
                <>
                    <h3>Аннотация</h3>
                    <p>{annotation}</p>
                    <h3>Ключевые слова</h3>
                    <p>{keywords}</p>
                    <h3>Авторы</h3>
                    <p>{names}</p>
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
                </>}
        </div>
    )
}

export default PhotosDetail;
