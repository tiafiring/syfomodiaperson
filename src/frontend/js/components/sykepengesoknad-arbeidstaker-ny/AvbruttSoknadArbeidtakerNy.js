import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { brodsmule, soknadPt } from '../../propTypes/index';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../components/Statuspanel';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import VerktoylinjeGjenapne from '../sykepengesoknad-felles/VerktoylinjeGjenapneSoknad';

const AvbruttSoknadArbeidstakerStatuspanel = ({ soknad }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{getLedetekst('sykepengesoknad.status.AVBRUTT')}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel="Dato avbrutt">
                <p>
                    {tilLesbarDatoMedArstall(soknad.avbruttDato)}
                </p>
            </StatusNokkelopplysning>
        </Statusopplysninger>
        <VerktoylinjeGjenapne />
    </Statuspanel>);
};

AvbruttSoknadArbeidstakerStatuspanel.propTypes = {
    brukernavn: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    soknad: soknadPt,
    fnr: PropTypes.string,
    sykmelding: sykmeldingPt,
};

const AvbruttSoknadArbeidstaker = ({ brukernavn, brodsmuler, soknad, fnr }) => {
    return (<div>
        <SoknadSpeiling
            tittel="Søknad om sykepenger"
            brukernavn={brukernavn}
            brodsmuler={brodsmuler}
            fnr={fnr}>
            <AvbruttSoknadArbeidstakerStatuspanel soknad={soknad} />
            <SykmeldingUtdrag soknad={soknad} fnr={fnr} />
        </SoknadSpeiling>
    </div>);
};

AvbruttSoknadArbeidstaker.propTypes = {
    brukernavn: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    soknad: soknadPt,
    fnr: PropTypes.string,
};

export default AvbruttSoknadArbeidstaker;
