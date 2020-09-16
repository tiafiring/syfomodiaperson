import React, {
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
    connect,
    useDispatch,
} from 'react-redux';
import { hentOppfolgingsplanerLPS } from '../actions/oppfolgingsplanerlps_actions';
import { hentPersonOppgaver } from '../actions/personoppgave_actions';
import { hentVirksomhet } from '../actions/virksomhet_actions';
import { OPPFOELGINGSPLANER } from '../enums/menypunkter';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Side from '../sider/Side';
import OppfolgingsplanLPSContent from '../components/oppfolgingsplan/lps/OppfolgingsplanLPSContent';

const texts = {
    errorTitle: 'Du har ikke tilgang til denne tjenesten',
    buttonDownload: 'Last ned',
};

const OppfolgingsplanLPSSide = (
    {
        fnr,
        henter,
        hentingFeilet,
        oppfolgingsplanLPS,
        personOppgaveList,
        tilgang,
    }
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentOppfolgingsplanerLPS(fnr));
        dispatch(hentPersonOppgaver(fnr));
    }, []);

    useEffect(() => {
        dispatch(hentOppfolgingsplanerLPS(fnr));
    }, [personOppgaveList]);

    useEffect(() => {
        if (oppfolgingsplanLPS) {
            dispatch(hentVirksomhet(oppfolgingsplanLPS.virksomhetsnummer));
        }
    }, [oppfolgingsplanLPS]);

    return (
        <Side
            fnr={fnr}
            tittel="Oppfølgingsplan"
            aktivtMenypunkt={OPPFOELGINGSPLANER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={texts.errorTitle}
                            melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
                        />);
                    } else if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (
                        <OppfolgingsplanLPSContent oppfolgingsplanLPS={oppfolgingsplanLPS} />
                    );
                })()
            }
        </Side>
    );
};

OppfolgingsplanLPSSide.propTypes = {
    fnr: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppfolgingsplanLPS: PropTypes.object,
    personOppgaveList: PropTypes.array,
    tilgang: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const uuid = ownProps.params.oppfolgingsplanUuid;
    const harForsoktHentetAlt = state.oppfolgingsplanerlps.hentingForsokt
        && state.personoppgaver.hentingForsokt;
    const henter = !harForsoktHentetAlt
        || state.tilgang.henter
        || state.veilederinfo.henter;
    const hentingFeilet = state.oppfolgingsplanerlps.hentingFeilet
        || state.personoppgaver.hentingFeilet
        || state.tilgang.hentingFeilet;

    const oppfolgingsplanLPS = state.oppfolgingsplanerlps.data.filter((plan) => {
        return plan.uuid === uuid;
    })[0];

    const personOppgaveList = state.personoppgaver.data;

    return {
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        oppfolgingsplanLPS,
        personOppgaveList,
        tilgang: state.tilgang.data,
    };
}

const OppfolgingsplanLPSSideContainer = connect(mapStateToProps)(OppfolgingsplanLPSSide);
export default OppfolgingsplanLPSSideContainer;
