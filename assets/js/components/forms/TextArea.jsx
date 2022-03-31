import React from 'react';

const TextArea = ({
    name,
    label,
    value,
    onChange,
    error = ""
}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea 
                className={"form-control" + (error && " is-invalid")} 
                name={name} 
                rows="10" 
                value={value}
                onChange={onChange}
            ></textarea>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}
 
export default TextArea;