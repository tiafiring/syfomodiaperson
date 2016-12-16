import React, { PropTypes } from 'react';

const TextField = (props) => {
    const { meta, className, onKeyUp } = props;
    return (<div>
        <input onKeyUp={onKeyUp} autoComplete="off" placeholder={props.placeholder} type={props.type || 'text'} id={props.id}
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
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
};

export default TextField;
