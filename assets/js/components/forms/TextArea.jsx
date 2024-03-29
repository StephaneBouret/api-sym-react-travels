import React from 'react';

const TextArea = ({
    name,
    label,
    value,
    onChange,
    error = "",
    row,
    classCss = ""
}) => {
    return ( 
        <div className={`form-group ${classCss}`}>
            <label htmlFor={name}>{label}</label>
            <textarea 
                className={"form-control" + (error && " is-invalid")} 
                name={name} 
                rows={row} 
                value={value}
                onChange={onChange}
            ></textarea>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}
 
export default TextArea;