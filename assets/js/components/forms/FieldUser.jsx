import React from "react";

const FieldUser = ({
    name,
    src,
    label,
    value,
    onChange,
    div,
    onFocus,
    onBlur,
    placeholder = "",
    type = "text",
    disabled,
    error = ""
}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <input 
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                type={type} 
                placeholder={placeholder || label} 
                name={name} 
                disabled={disabled}
                className={"shadow-none form-control" + (error && " is-invalid")}
            />
            <img src={src} className='icon-user-input' />
            {error && <p className="invalid-feedback">{error}</p>}
            {div}
        </div> 
    );
}
 
export default FieldUser;