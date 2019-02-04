import React from 'react';
import { getLedetekst, tilLesbarDatoMedArstall, sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { brodsmule, soknad as soknadPt } from '../../propTypes';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';

export const SendtSoknadArbeidstakerStatuspanel = ({ soknad }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{soknad.status}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.dato.innsendt')}>
                <p>{tilLesbarDatoMedArstall(soknad.innsendtDato)}</p>
            </StatusNokkelopplysning>
        </Statusopplysninger>
    </Statuspanel>);
};

SendtSoknadArbeidstakerStatuspanel.propTypes = {
    soknad: soknadPt,
};

const OppsummeringPanel = ({ soknad }) => {
    return (<div className="panel blokk">
        <h2 className="panel__tittel blokk--xs"> {getLedetekst('sykepengesoknad.oppsummering.undertittel')}</h2>
        <Oppsummeringsvisning soknad={soknad} />
    </div>);
};

OppsummeringPanel.propTypes = {
    soknad: soknadPt,
};

const SendtSoknadArbeidstakerNy = ({ brukernavn, brodsmuler, soknad, fnr }) => {
    return (<SoknadSpeiling
        tittel="Søknad om sykepenger"
        brukernavn={brukernavn}
        brodsmuler={brodsmuler}
        fnr={fnr}>
        <SendtSoknadArbeidstakerStatuspanel soknad={soknad} />
        <SykmeldingUtdrag soknad={soknad} fnr={fnr} />
        <OppsummeringPanel soknad={soknad} />
    </SoknadSpeiling>);
};

SendtSoknadArbeidstakerNy.propTypes = {
    brukernavn: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    soknad: soknadPt,
    fnr: PropTypes.string,
    sykmelding: sykmeldingPt,
};

export default SendtSoknadArbeidstakerNy;
