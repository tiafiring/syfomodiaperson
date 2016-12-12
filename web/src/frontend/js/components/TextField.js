import React, { PropTypes } from 'react';

const TextField = (props) => {
    const { meta, className, onBlur } = props;
    return (<div>
        <input onKeyUp={onBlur} autoComplete="off" placeholder={props.placeholder} type={props.type || 'text'} id={props.id}
            className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`} {...props.input} />
        <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
    </div>);
};

TextField.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default TextField;
