import React from 'react';
import PropTypes from 'prop-types';
import {
    Utvidbar,
    DineSykmeldingOpplysninger,
    getLedetekst,
} from 'digisyfo-npm';
import StatusPanel from './StatusPanel';
import { STATUS, INNSENDT_DATO } from './NokkelOpplysningerEnum';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';

const DinBekreftedeSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster }) => {
    return (<div>
        <StatusPanel
            sykmelding={dinSykmelding}
            ledetekster={ledetekster}
            type="suksess"
            nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />
        <Utvidbar
            className="blokk"
            erApen
            tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/person.svg"
            ikonHover="svg/person_hover.svg"
            ikonAltTekst="Du"
            variant="lysebla"
            Overskrift="H2">
            <DineSykmeldingOpplysninger sykmelding={dinSykmelding} ledetekster={ledetekster} />
        </Utvidbar>
        {
            dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' &&
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
            </div>
        }
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
