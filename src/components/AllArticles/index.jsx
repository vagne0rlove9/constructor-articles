import { useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, Button } from '@mui/material';

import ArticleCard from './ArticleCard';
import Loader from '../Loader';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const AllArticles = () => {
    const [cards, setCards] = useState(null);

    useEffect(() => {
        instance.get('/api/v3/articlesimage')
            .then(response => {
                setCards(response.data);
            });
    }, [])

    return (
        <Grid container spacing={2} style={{ padding: '24px 0', justifyContent: 'center' }}>
            {cards ? cards.map(article => (
                <Grid item xs={12} key={article.id}>
                    <ArticleCard
                        authors={article.author}
                        date={article.date}
                        type={article.type}
                        annotation={article.annotation}
                        keywords={article.keywords}
                        id={article.id}
                    />
                </Grid>
            )) : <Loader />}
        </Grid>
    )
}

export default AllArticles;
