import React from 'react';

const FieldContact = ({ 
    name,
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    disabled,
    error = "",
    classCss = "",
    min = ""
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
                min={min}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}
 
export default FieldContact;