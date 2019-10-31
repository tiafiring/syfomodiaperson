import React from 'react';
import PropTypes from 'prop-types';
import {
    Utvidbar,
    DineSykmeldingOpplysninger,
    getLedetekst,
    keyValue,
} from '@navikt/digisyfo-npm';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import BekreftetSykmeldingStatuspanel from '../sykmeldingstatuspanel/BekreftetSykmeldingStatuspanel';

const DinBekreftedeSykmelding = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster }) => {
    return (<div>
        <BekreftetSykmeldingStatuspanel sykmelding={dinSykmelding} />
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
        { dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER' &&
            <div className="blokk">
                <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />
            </div>
        }
    </div>);
};

DinBekreftedeSykmelding.propTypes = {
    ledetekster: keyValue,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export default DinBekreftedeSykmelding;
