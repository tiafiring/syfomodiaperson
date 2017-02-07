import React, { PropTypes } from 'react';
import Tidspunkt from './Tidspunkt';

const Tidspunkter = ({ tidspunker, tidspunktNummerOffset }) => {
    const tidspunktListe = tidspunker || [0, 1];

    return (<div className="motetidspunkter">
        {
            tidspunktListe.map((tidspunkt, index) => {
                return <Tidspunkt tidspunkt={index} key={index} tidspunktNummerOffset={tidspunktNummerOffset} />;
            })
        }
    </div>);
};

Tidspunkter.propTypes = {
    tidspunker: PropTypes.array,
    tidspunktNummerOffset: PropTypes.number,
};

export default Tidspunkter;
