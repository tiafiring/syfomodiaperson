import React from 'react';
import { getLedetekst, sykmelding as sykmeldingPt, Utvidbar } from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { brodsmule, soknad as soknadPt } from '../../propTypes';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import SykepengesoknadStatuspanel from './SykepengesoknadStatuspanel';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import { KORRIGERT } from '../../enums/soknadstatuser';
import KorrigertAvContainer from '../sykepengesoknad-arbeidstaker/KorrigertAvContainer';
import RelaterteSoknaderContainer from '../sykepengesoknad-arbeidstaker/RelaterteSoknaderContainer';

const OppsummeringUtvidbar = ({ soknad }) => {
    return (<Utvidbar
        className="blokk"
        tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')}>
        <Oppsummeringsvisning soknad={soknad} />
    </Utvidbar>);
};

OppsummeringUtvidbar.propTypes = {
    soknad: soknadPt,
};

const SendtSoknadArbeidstakerNy = ({ brukernavn, brodsmuler, soknad, fnr }) => {
    return (<SoknadSpeiling
        tittel="Søknad om sykepenger"
        brukernavn={brukernavn}
        brodsmuler={brodsmuler}
        fnr={fnr}>
        { soknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={soknad} fnr={fnr} /> }
        <SykepengesoknadStatuspanel soknad={soknad} />
        <SykmeldingUtdrag soknad={soknad} fnr={fnr} />
        <OppsummeringUtvidbar
            soknad={Object.assign({}, soknad, {
                sporsmal: soknad.sporsmal.filter((s) => {
                    return s.tag !== VAER_KLAR_OVER_AT;
                }),
            })} />
        <div className="panel blokk">
            <Oppsummeringsvisning
                soknad={Object.assign({}, soknad, {
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag === VAER_KLAR_OVER_AT;
                    }),
                })} />
        </div>
        <RelaterteSoknaderContainer sykepengesoknadId={soknad.id} fnr={fnr} />
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
