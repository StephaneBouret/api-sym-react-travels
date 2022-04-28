import React from 'react';

const FieldLogin = ({
    name,
    src,
    label,
    value,
    onFocus,
    onBlur,
    onChange,
    div,
    placeholder = "",
    type = "text",
    error = ""
}) => {
      return ( 
        <div className="form-group">
            <input 
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                type={type} 
                placeholder={placeholder || label} 
                name={name} 
                id={name} 
                className={"sign-page form-control" + (error && " is-invalid")}
            />
            <img src={src} className='icon-sign-input' />
            {error && <p className="invalid-feedback">{error}</p>}
            {div}
        </div> 
    );
  }
 
export default FieldLogin;