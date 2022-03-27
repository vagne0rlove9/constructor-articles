import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import './styles.css';

const AuthorForm = ({
    id,
    name,
    secondName,
    thirdName,
    email,
    changeNameHandler,
    changeSecondNameHandler,
    changeThirdNameHandler,
    changeEmailHandler
}) => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="authors-form"
        >
            <h4>Информация об авторе</h4>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    error={name !== '' ? false : true}
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    helperText={name !== '' ? null : 'Обязательное поле'}
                    value={name}
                    onChange={(event) => changeNameHandler(event, id)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    error={secondName !== '' ? false : true}
                    label="Имя"
                    placeholder="Введите имя"
                    helperText={secondName !== '' ? null : 'Обязательное поле'}
                    value={secondName}
                    onChange={(event) => changeSecondNameHandler(event, id)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    label="Отчество"
                    placeholder="Введите отчество, если оно есть"
                    value={thirdName}
                    onChange={(event) => changeThirdNameHandler(event, id)}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                    error={email !== '' ? false : true}
                    label="Email"
                    placeholder="Введите email"
                    helperText={email !== '' ? null : 'Обязательное поле'}
                    value={email}
                    onChange={(event) => changeEmailHandler(event, id)}
                />
            </FormControl>
        </Box>
    )
}

export default AuthorForm;
