import React from 'react';
import PropTypes from 'prop-types';
import {
    Utvidbar,
    DineSykmeldingOpplysninger,
    getLedetekst,
} from '@navikt/digisyfo-npm';
import SykmeldingStatuspanel from '../sykmeldingstatuspanel/SykmeldingStatuspanel';

const DinUtgatteSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <SykmeldingStatuspanel sykmelding={sykmelding} />
        <Utvidbar
            className="blokk"
            erApen
            tittel={getLedetekst('din-sykmelding.dine-opplysninger.tittel', ledetekster)}
            ikon="svg/doctor-2.svg"
            ikonHover="svg/doctor-2_hover.svg"
            ikonAltTekst="Lege"
            variant="lysebla">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </Utvidbar>
    </div>);
};

DinUtgatteSykmelding.propTypes = {
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default DinUtgatteSykmelding;
