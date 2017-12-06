import React from 'react';
import PropTypes from 'prop-types';
import Tidspunkt from './Tidspunkt';

const Tidspunkter = ({ tidspunker, skjemanavn }) => {
    const tidspunktListe = tidspunker || [0, 1];

    return (<div className="motetidspunkter">
        {
            tidspunktListe.map((tidspunkt, index) => {
                return <Tidspunkt skjemanavn={skjemanavn} tidspunkt={index} key={index} />;
            })
        }
    </div>);
};

Tidspunkter.propTypes = {
    tidspunker: PropTypes.array,
    tidspunktNummerOffset: PropTypes.number,
    skjemanavn: PropTypes.string.isRequired,
};

export default Tidspunkter;
