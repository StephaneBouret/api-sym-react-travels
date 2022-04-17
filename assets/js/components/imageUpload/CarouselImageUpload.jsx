import React from 'react';
import undefinedImg from "../../../media/undefined.jpg";

const CarouselImageUpload = ({ travel, changeHandler, errors, handleClick, inputId, clickDelete, isSelected, selectedFile }) => {
    return ( 
        <>
        <div className="form-group">
        {travel.images.length === 0 && (
            <p className="invalid-carousel">Merci de sélectionner au moins trois images</p>
        )}
        {travel.images.length > 0 && (
            <div className="edit-img mb-3 d-flex flex-wrap">
                {travel.images.map(image => (
                    image.fileUrl !== null
                    ? (
                    <div key={image.id} className="d-flex flex-column me-5 mb-4">
                        <label htmlFor={`file-${image.id}`}>
                            <img src={image.fileUrl} />
                        </label>
                        <input 
                            onChange={changeHandler}
                            name={"file"}
                            id={`file-${image.id}`}
                            type="file"
                            accept={".jpeg, .jpg, .png, .webp"}
                            className="form-control d-none"
                            error={errors.file}
                        />
                        <div className="form-group mt-2 d-flex justify-content-between">
                            <button 
                                type="button" 
                                id={`file-${image.id}`}
                                value={image.id} 
                                className={`btn btn-success create-img-carousel ${inputId === "file-" + image.id ? "visible" : "invisible"}`}
                                onClick={handleClick}
                            >
                                Enregistrer
                            </button>
                            <button 
                                type="button" 
                                value={image.id} 
                                className="btn btn-danger delete-img-carousel"
                                onClick={clickDelete}
                            >
                                Supprimer
                            </button>
                        </div>
                        {inputId === "file-" + image.id && (
                            <div className="row">
                                <div className="form-group">
                                    <div className="tags-img mt-2">
                                        {isSelected ? (
                                        <>
                                            <p>Nom : {selectedFile.name}</p>
                                            <p>Taille en octets : {selectedFile.size}</p>
                                        </>
                                        ) : (
                                            <p>Merci de sélectionner un fichier</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    )
                    : (
                    <div key={image.id} className="d-flex flex-column">
                        <label htmlFor="file-input" className='file-input position-relative'>
                            <img src={undefinedImg} />
                        </label>
                        <input 
                            onChange={changeHandler}
                            name={"file"}
                            id={"file-input"}
                            type="file"
                            accept={".jpeg, .jpg, .png, .webp"}
                            className="form-control d-none"
                            error={errors.file}
                        />
                        <div className="form-group mt-2 d-flex justify-content-between">
                            <button 
                                type="button" 
                                id={`file-${image.id}`}
                                value={image.id} 
                                className={`btn btn-success create-img-carousel ${inputId === "file-input" ? "visible" : "invisible"}`}
                                onClick={handleClick}
                                >
                                    Enregistrer
                                </button>
                                <button 
                                type="button" 
                                value={image.id} 
                                className="btn btn-danger delete-img-carousel"
                                onClick={clickDelete}
                                >
                                    Supprimer
                            </button>
                        </div>
                        {inputId === "file-input" && (
                            <div className="row">
                                <div className="form-group">
                                    <div className="tags-img mt-2">
                                        {isSelected ? (
                                            <>
                                            <p>Nom : {selectedFile.name}</p>
                                            <p>Taille en octets : {selectedFile.size}</p>
                                            </>
                                        ) : (
                                            <p>Merci de sélectionner un fichier</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    )
                ))}
            </div>
        )}
        </div>
        </>
     );
}
 
export default CarouselImageUpload;