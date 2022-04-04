import React from 'react';

import { Link } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import './styles.css';

const Menu = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Link to="/constructor" className="menu__link">
                    <Button
                        variant="contained"
                        className='menu__button-main'
                        style={{ fontSize: '2rem', borderRadius: 0 }}
                    >
                        Конструктор
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link to="/pdf" className="menu__link">
                    <Button
                        color="secondary"
                        variant="contained"
                        className='menu__button-secondary-right'
                        style={{ fontSize: '2rem', borderRadius: 0, color: 'white' }}
                    >
                        PDF
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link to="/pptx" className="menu__link">
                    <Button
                        color="photos_secondary"
                        variant="contained"
                        className='menu__button-secondary'
                        style={{
                            fontSize: '2rem',
                            borderRadius: 0,
                            color: 'white',
                            transition: 'all 0.4s',
                        }}>
                        PPTX
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link to="/photos" className="menu__link">
                    <Button
                        color="photos_primary"
                        variant="contained"
                        className='menu__button-main-right'
                        style={{ fontSize: '2rem', borderRadius: 0, color: 'white' }}
                    >
                        Фотоотчет
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link to="/all-articles" className="menu__link">
                    <Button
                        color="photos_primary"
                        variant="contained"
                        className='menu__button-articles'
                        style={{ fontSize: '2rem', borderRadius: 0, color: 'white' }}
                    >
                        Просмотреть все статьи
                    </Button>
                </Link>
            </Grid>
        </Grid >
    )
}

export default Menu;
