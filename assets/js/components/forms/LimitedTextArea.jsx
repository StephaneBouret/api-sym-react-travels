import React from 'react';

const LimitedTextArea = ({
    name,
    label,
    limitCar,
    value,
    onChange,
    classCss = "",
    error = "",
}) => {
    return ( 
        <>
        <div className={`form-group ${classCss}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
            className={"form-control" + (error && " is-invalid")}
            rows="5"
            onChange={onChange}
            value={value}
            />
            <p>
                {value.length}/{limitCar} caractères
            </p>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
        </>
     );
}
 
export default LimitedTextArea;