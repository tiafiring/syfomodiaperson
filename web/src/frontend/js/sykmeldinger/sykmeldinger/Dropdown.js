import React, { PropTypes } from 'react';

const Dropdown = ({ alternativer, bekreftetAlternativ, ariaControls, id, onChange }) => {
    return (<select
        onChange={(event) => {onChange(event.target.value);}}
        defaultValue={bekreftetAlternativ}
        value={bekreftetAlternativ}
        aria-controls={ariaControls}
        id={id}>
        {alternativer.map((alt, idx) => {
            return (<option className={`js-${alt.verdi}`} key={idx}
                value={alt.verdi}>{alt.tekst}</option>);
        })}
    </select>);
};

Dropdown.propTypes = {
    alternativer: PropTypes.array,
    bekreftetAlternativ: PropTypes.string,
    ariaControls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {
        return;
    },
};

export default Dropdown;
