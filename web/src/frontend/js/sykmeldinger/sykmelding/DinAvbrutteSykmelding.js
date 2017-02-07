import React, { PropTypes } from 'react';
import { Utvidbar, DineSykmeldingOpplysninger, getLedetekst } from 'digisyfo-npm';
import StatusPanel from './StatusPanel';
import { STATUS, INNSENDT_DATO } from './NokkelOpplysningerEnum';

const DinAvbrutteSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <StatusPanel
            sykmelding={sykmelding}
            ledetekster={ledetekster}
            type="avbrutt"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar erApen tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Du" className="blokk" variant="lysebla" Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinAvbrutteSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinAvbrutteSykmelding;
