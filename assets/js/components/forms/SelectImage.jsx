import React from 'react';

const SelectImage = ({
    name,
    value,
    error = "",
    label,
    onChange,
    children,
    classCss,
    disabled
}) => {
    return ( 
        <div className={`form-group ${classCss}`}>
            <label htmlFor={name}>{label}</label>
            <select
                onChange={onChange}
                name={name}
                id={name}
                value={value}
                className={"form-select" + (error && " is-invalid")}
                disabled={disabled}
            >
            {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
     );
}
 
export default SelectImage;