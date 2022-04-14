import { ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './EditorWysiwyg.css';

const EditorWysiwyg = ({ description, travel, onEditorStateChange }) => { 
    const contentBlocks  = htmlToDraft(travel.hobbies);
    const contentState = ContentState.createFromBlockArray(contentBlocks)
    const rawHtml = convertToRaw(contentState)

    return ( 
        <>
        <div className="form-group">
            <label htmlFor="">Loisirs</label>
            <Editor
            toolbarHidden={false}
            editorState={description.editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="hobbies-wrapper"
            editorClassName="hobbies-custom"
            contentState={rawHtml}
            />
        </div>
        </>
     );
}
 
export default EditorWysiwyg;