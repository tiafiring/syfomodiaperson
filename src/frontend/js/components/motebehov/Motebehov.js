import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import MotebehovKvittering from './MotebehovKvittering';
import BehandleMotebehovKnapp from './BehandleMotebehovKnapp';
import UtdragFraSykefravaeret from './UtdragFraSykefravaeret';
import { sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';

export class Motebehov extends Component {
    componentWillMount() {
        const {
            actions,
            aktiveDialoger,
        } = this.props;
        aktiveDialoger.forEach((dialog) => {
            if (!dialog.virksomhet.navn) {
                actions.hentVirksomhet(dialog.virksomhet.virksomhetsnummer);
            }
        });
    }

    render() {
        const {
            actions,
            aktiveDialoger,
            fnr,
            ledereData,
            ledereUtenInnsendtMotebehov,
            ledetekster,
            motebehovListe,
            oppgaver,
            sykmeldt,
            ufiltrertMotebehovListeTilOppgavebehandling,
            veilederinfo,
            oppfolgingstilfelleperioder,
            sykmeldinger,
        } = this.props;
        return (<div className="motebehovSide">
            <Sidetopp tittel={'Behov for dialogmøte'} />
            <MotebehovKvittering
                ledereData={ledereData}
                ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
                motebehovListe={motebehovListe}
                sykmeldt={sykmeldt}
            />
            <UtdragFraSykefravaeret
                aktiveDialoger={aktiveDialoger}
                fnr={fnr}
                ledetekster={ledetekster}
                oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
                sykmeldinger={sykmeldinger}
            />
            <BehandleMotebehovKnapp
                actions={actions}
                fnr={fnr}
                motebehovListe={ufiltrertMotebehovListeTilOppgavebehandling}
                oppgaver={oppgaver}
                veilederinfo={veilederinfo}
            />
        </div>);
    }
}

Motebehov.propTypes = {
    actions: PropTypes.object,
    aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
    fnr: PropTypes.string,
    ledereData: PropTypes.arrayOf(PropTypes.object),
    ledereUtenInnsendtMotebehov: PropTypes.arrayOf(PropTypes.object),
    ledetekster: PropTypes.object,
    motebehovListe: PropTypes.arrayOf(PropTypes.object),
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    sykmeldt: PropTypes.object,
    ufiltrertMotebehovListeTilOppgavebehandling: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
    oppfolgingstilfelleperioder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
};

export default Motebehov;
