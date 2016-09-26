import React from 'react';
import SykmeldingTeaser from './SykmeldingTeaser';

const SykmeldingTeasere = ({ sykmeldinger, tittel, viserAlle = true }) => {
    return (<div className="inngangspaneler">
        <h3 className="inngangspaneler__header">{tittel}</h3>
        {sykmeldinger.map((sykmelding, index) => {
            return <SykmeldingTeaser key={index} sykmelding={sykmelding} />
        })}
        {
            !viserAlle && <button className="inngangspaneler__flere">Se flere</button>
        }
    </div>)
};

export default SykmeldingTeasere;
