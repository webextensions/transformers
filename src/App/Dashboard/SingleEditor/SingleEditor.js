import React, { useRef } from 'react';

import { MainEditor } from '../MainEditor/MainEditor.js';

const SingleEditor = () => {
    const editorRef = useRef(null);
    return (
        <div>
            <MainEditor
                placeholder="Provide text here"
                onLoad={(editor) => {
                    editorRef.current = editor;
                }}
                style={{ marginTop: 5 }}
                editorWidth="1120px"
                editorHeight="300px"
            />
        </div>
    );
};

export { SingleEditor };
