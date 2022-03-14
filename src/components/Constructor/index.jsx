import React, { useState, useCallback } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button } from '@mui/material';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Constructor.css';

const Constructor = () => {
    const [editor, setEditor] = useState(EditorState.createEmpty());

    const onEditorStateChange = useCallback((editorState) => {
        setEditor(editorState);
        console.log(editorState);
    }, []);

    const onTextChange = (event) => {
        console.log(event);
    };

    return (
        <>
            <Editor
                editorState={editor}
                onChange={onTextChange}
                onEditorStateChange={onEditorStateChange}
            />
            <Button
                variant="contained"
                fullWidth
                style={{ fontSize: '1rem', borderRadius: 0 }}
            >
                Отправить
            </Button>
        </>
    )
}

export default Constructor;
