import React from 'react';

const LimitedWordTextarea = ({
    name,
    label,
    value,
    onChange,
    error = "",
    textAreaCount,
    limit
}) => { 
    return ( 
        <>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea 
                className={"form-control" + (error && " is-invalid")} 
                name={name}
                rows="2" 
                value={value}
                onChange={onChange}
            ></textarea>
            <p>{textAreaCount}/{limit} Mots</p>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
        </>
     );
}
 
export default LimitedWordTextarea;
