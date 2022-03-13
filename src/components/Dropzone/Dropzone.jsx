import React from 'react';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import './Dropzone.css';

const Dropzone = ({ getRootProps, getInputProps, isDragActive, file, deleteHandler }) => {
    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} className="dropzone__input" />
            {
                file.length === 0 ?
                    isDragActive ?
                        <>
                            <CloudUploadIcon fontSize="large" />
                            <Typography
                                variant="body1"
                                gutterBottom
                                style={{ margin: 0, textAlign: 'center' }}
                            >
                                Перетащите файл сюда ...
                            </Typography>
                        </>
                        :
                        <>
                            <CloudUploadIcon fontSize="large" />
                            <Typography
                                variant="body1"
                                gutterBottom
                                style={{ margin: 0, textAlign: 'center' }}
                            >
                                Перетащите файл сюда или нажмите и выберете файл
                            </Typography>
                        </>
                    : (
                        <span className="dropzone__input-text">
                            <CloudUploadIcon fontSize="large" />
                            <Typography
                                variant="body1"
                                gutterBottom
                                comonent="div"
                                style={{ margin: 0, textAlign: 'center' }}
                            >
                                Перетащите файл сюда или нажмите и выберете файл
                            </Typography>
                            <p className="dropzone__input-file">
                                {file[0].name}
                                <DeleteForeverIcon
                                    sx={{ color: pink[500] }}
                                    onClick={deleteHandler}
                                />
                            </p>
                        </span>
                    )
            }
        </div>
    )
}

export default Dropzone;
