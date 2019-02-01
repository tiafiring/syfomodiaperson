import React from 'react';
import PropTypes from 'prop-types';
import {
    Utvidbar,
    DineSykmeldingOpplysninger,
    getLedetekst,
} from '@navikt/digisyfo-npm';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import SykmeldingStatuspanel from '../sykmeldingstatuspanel/SykmeldingStatuspanel';

const DinSendteSykmelding = ({ dinSykmelding, ledetekster, arbeidsgiversSykmelding }) => {
    return (<div>
        <SykmeldingStatuspanel sykmelding={dinSykmelding} />
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
        <div className="blokk--l">
            <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
        </div>
    </div>);
};

DinSendteSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export default DinSendteSykmelding;
