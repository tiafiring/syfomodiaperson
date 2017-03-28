import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';

const KlokkeslettField = (props) => {
    const { meta, className } = props;
    return (<div>
        <MaskedInput mask="11.11" autoComplete="off" placeholder={props.placeholder} type={props.type || 'text'} id={props.id}
            className={`${className}${meta.touched && meta.error ? ' input--feil' : ''}`} {...props.input} />
        <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
    </div>);
};

KlokkeslettField.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
};

export default KlokkeslettField;
