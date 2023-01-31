import React, { useRef } from 'react';

// TODO: Move directory "TextList/" up by one level
import { TextList } from '../ListOperations/TextList/TextList.js';

const SingleEditor = () => {
    const editorRef = useRef(null);
    return (
        <div>
            <TextList
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
