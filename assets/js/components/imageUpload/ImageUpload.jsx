import React, { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import FileField from '../forms/FileField';
import "./ImageUpload.css";

const ImageUpload = ({ changeHandler, errors, handleSubmission, isSelected, selectedFile, travel}) => {
    const [isOpen, setIsOpen] = useState(false);

    return ( 
        <>
        <form className="travel-form mb-3" onSubmit={handleSubmission}>
            <div className="form-group">
                {(travel.fileUrl && 
                    <div className="edit-img mb-3">
                        <img 
                        src={travel.fileUrl}
                        onClick={() => setIsOpen(true)}
                        />
                        {isOpen && (
                        <Lightbox
                        mainSrc={travel.fileUrl}
                        onCloseRequest={() => setIsOpen(false)}
                        />
                        )}
                    </div>
                ) || (<h5>Aucune image</h5>)}
                    <FileField
                    name={"file"}
                    onChange={changeHandler}
                    error={errors.file}
                    />
                    <div className="tags-img mt-2">
                        {isSelected ? (
                        <>
                            <p>Type : {selectedFile.type}</p>
                            <p>Taille en octets : {selectedFile.size}</p>
                        </>
                        ) : (
                            <p>Merci de sélectionner un fichier</p>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success">
                        Enregistrer
                        </button>
                    </div>
            </div>
        </form>
        </>
     );
}
 
export default ImageUpload;