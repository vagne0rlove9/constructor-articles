import React, { useState, useCallback } from 'react';
import { EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

import AuthorForm from '../AuthorForm';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Constructor.css';

const instance = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://23.111.124.132:8080/',
});

const emptyAuthor = {
    name: '',
    secondName: '',
    thirdName: '',
    email: '',
};

const Constructor = () => {
    const [editor, setEditor] = useState(EditorState.createEmpty());
    const [authors, setAuthors] = useState([emptyAuthor]);
    const [annotation, setAnnotation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFullAuthors, setIsFullAuthors] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [articleId, setArticleId] = useState(null);

    const onEditorStateChange = useCallback((editorState) => {
        setEditor(editorState);
    }, []);

    const submitArticle = useCallback(() => {
        setIsLoading(prev => !prev);

        const date = new Date();

        const data = {
            id: '',
            annotation,
            keywords: keywords,
            type: 'constructor',
            date: date.toLocaleString(),
            resources: [{
                data: document.querySelector('.rdw-editor-main').innerHTML,
            }],
        };

        data.author = '';
        data.email = '';
        authors.map(author => {
            data.author = data.author + `${author.secondName} ${author.name}, `;
            data.email = data.email + `${author.email}, `;
        });

        instance.post('/api/v3/articleimage', data)
            .then(response => {
                setArticleId(response.data.id);
                setIsDone(true);
            })
            .finally(response => setIsLoading(prev => !prev));
    }, [annotation, authors, keywords]);

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

    const deleteAuthorHandler = useCallback((index) => {
        let newAuthors = [...authors];

        if (newAuthors.length === 1) {
            return;
        }

        newAuthors.splice(index, 1);
        setAuthors(newAuthors);
    }, [authors]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <h2>Создание статьи с помощью редактора</h2>
                <p>
                    Вы можете написать Вашу статью
                </p>
                <p>
                    После написания нажмите кнопку "Отправить статью"
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
                        label="Ключевые слова"
                        placeholder="Введите ключевые слова через запятую"
                        value={keywords}
                        onChange={(event) => setKeywords(event.target.value)}
                    />
                </div>
                <div>
                    {isDone ?
                        <Link to={`/constructor/${articleId}`} className="menu__link">
                            <Button
                                variant="contained"
                            >
                                Перейти к статье
                            </Button>
                        </Link> :
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="secondary"
                            component="span"
                            style={{ color: 'white', marginBottom: '24px' }}
                            onClick={submitArticle}
                        >
                            Отправить отчет
                        </LoadingButton>}
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
                        deleteHandler={() => deleteAuthorHandler(index)}
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
            </Grid>
            <Grid item xs={8}>
                <Editor
                    editorState={editor}
                    onEditorStateChange={onEditorStateChange}
                />
            </Grid>
        </Grid>
    )
}

export default Constructor;
