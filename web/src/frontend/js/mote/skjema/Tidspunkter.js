import React from 'react';
import {Field} from 'redux-form';
import Tidspunkt from './Tidspunkt';

const Tidspunkter = ({tidspunker, tidspunktNummerOffset}) => {
    const tidspunktListe = tidspunker || [0, 1];

    return (<div className="motetidspunkter">
        {
            tidspunktListe.map((tidspunkt, index) => {
                return <Tidspunkt tidspunkt={index} key={index} tidspunktNummerOffset={tidspunktNummerOffset}/>;
            })
        }
    </div>);
};

export default Tidspunkter;
