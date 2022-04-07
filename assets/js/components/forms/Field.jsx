import React from 'react';

const Field = ({ 
    name,
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    disabled,
    error = "",
    classCss = ""
}) => {
    return ( 
        <div className={`form-group ${classCss}`}>
            <label htmlFor={name}>{label}</label>
            <input 
                value={value}
                onChange={onChange}
                placeholder={placeholder || label} 
                name={name}
                id={name}
                type={type}
                disabled={disabled}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}
 
export default Field;