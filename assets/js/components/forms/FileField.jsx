import React from 'react';

const FileField = ({ 
    name,
    label,
    onChange,
    type = "file",
    error = "",
    accept = ".jpeg, .jpg, .png, .webp"
}) => {
    return ( 
        <>
            <label htmlFor={name}>{label}</label>
            <input 
                onChange={onChange}
                name={name}
                id={name}
                type={type}
                accept={accept}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </>
    );
}
 
export default FileField;