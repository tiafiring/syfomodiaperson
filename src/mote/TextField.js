import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'nav-frontend-skjema';

const TextField = (props) => {
    const { meta, className, label } = props;
    return (<Input
        label={label}
        feil={meta.touched && meta.error ? { feilmelding: meta.error } : undefined}
        autoComplete="off"
        placeholder={props.placeholder}
        type={props.type || 'text'}
        id={props.id}
        className={`input--xxl ${className}`}
        {...props.input}
    />);
};

TextField.propTypes = {
    label: PropTypes.string,
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
};

export default TextField;
