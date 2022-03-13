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
                        className='menu__button'
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
                        className='menu__button'
                        style={{ fontSize: '2rem', borderRadius: 0 }}
                    >
                        PDF
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    className='menu__button'
                    style={{ fontSize: '2rem', borderRadius: 0 }}>PPTX</Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    className='menu__button'
                    style={{ fontSize: '2rem', borderRadius: 0 }}
                >
                    Фотоотчет
                </Button>
            </Grid>
        </Grid >
    )
}

export default Menu;
