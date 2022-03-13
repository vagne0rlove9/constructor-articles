import React from 'react';
import { grey } from '@mui/material/colors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import './ControlPanel.css';

const ControlPanel = ({
    page,
    maxPage,
    changePageHandler,
    clickForward,
    clickBack,
    clickFirstPage,
    clickLastPage,
    isEnableForward,
    isEnableBack,
    isEnableFirst,
    isEnableLast,
    zoom,
    changeZoomHandler
}) => {
    return (
        <div className="control-panel control-panel--width">
            <div className="control-panel__item">
                <ZoomOutIcon
                    sx={{ color: grey[600] }}
                    className="control-panel__item-nav"
                    onClick={(event) => changeZoomHandler(event, '-')}
                />
                <input
                    className="control-panel__item-input-zoom"
                    value={zoom}
                    readOnly
                />%
                <ZoomInIcon
                    sx={{ color: grey[600] }}
                    className="control-panel__item-nav"
                    onClick={(event) => changeZoomHandler(event, '+')}
                />
            </div>
            <div className="control-panel__item">
                <FirstPageIcon
                    sx={{ color: grey[600] }}
                    onClick={clickFirstPage}
                    className="control-panel__item-nav"
                />
                <KeyboardArrowLeftIcon
                    sx={{ color: grey[600] }}
                    onClick={clickBack}
                    className="control-panel__item-nav"
                />
                <input
                    className="control-panel__item-input-page"
                    value={page ? page : ''}
                    onChange={changePageHandler}
                />
                &nbsp;/ {maxPage}
                <KeyboardArrowRightIcon
                    sx={{ color: grey[600] }}
                    onClick={clickForward}
                    className="control-panel__item-nav"
                />
                <LastPageIcon
                    sx={{ color: grey[600] }}
                    onClick={clickLastPage}
                    className="control-panel__item-nav"
                />
            </div>
            <div className="control-panel__item">
                <FileUploadIcon
                    sx={{ color: grey[600] }}
                    className="control-panel__item-nav control-panel__item-nav--rotate"
                />
                <LocalPrintshopIcon
                    sx={{ color: grey[600] }}
                    className="control-panel__item-nav"
                />
            </div>
        </div>
    )
}

export default ControlPanel;
