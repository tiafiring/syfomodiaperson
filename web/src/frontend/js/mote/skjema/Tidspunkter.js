import React, { PropTypes } from 'react';
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
