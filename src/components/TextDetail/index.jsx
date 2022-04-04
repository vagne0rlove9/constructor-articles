import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Loader from '../Loader';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const PDFDetail = () => {
    const params = useParams();

    const [code, setCode] = useState(null);
    const [annotation, setAnnotaion] = useState('');
    const [type, setType] = useState('');
    const [keywords, setKeywords] = useState('');
    const [email, setEmail] = useState('');
    const [names, setNames] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        instance.get(`/api/v3/articlesimage/${params.id}`)
            .then(response => {
                if (response.data) {
                    setAnnotaion(response.data.annotation);
                    setType(response.data.type);
                    setEmail(response.data.email.slice(0, response.data.email.length - 2));
                    setKeywords(response.data.keywords);
                    setNames(response.data.author.slice(0, response.data.author.length - 2));
                    setCode(response.data.resource0.data);
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
                    <div dangerouslySetInnerHTML={{ __html: code || null }} />
                </>
            }
        </div>
    )
}

export default PDFDetail;
