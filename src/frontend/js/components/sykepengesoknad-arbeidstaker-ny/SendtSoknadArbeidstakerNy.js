import React from 'react';
import {getLedetekst, sykmelding as sykmeldingPt, Utvidbar} from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { brodsmule, soknad as soknadPt } from '../../propTypes';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import SykepengesoknadStatuspanel from './SykepengesoknadStatuspanel';
import {VAER_KLAR_OVER_AT} from "../../enums/tagtyper";

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
        <SykepengesoknadStatuspanel soknad={soknad} />
        <SykmeldingUtdrag soknad={soknad} fnr={fnr} />
        <OppsummeringPanel
            soknad={Object.assign({}, soknad, {
                sporsmal: soknad.sporsmal.filter((s) => {
                    return s.tag !== VAER_KLAR_OVER_AT;
                }),
            })} />
        <div className="panel">
            <Oppsummeringsvisning
                soknad={Object.assign({}, soknad, {
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag === VAER_KLAR_OVER_AT;
                    }),
                })} />
        </div>
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
