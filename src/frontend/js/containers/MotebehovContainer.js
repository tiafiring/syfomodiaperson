import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as motebehovActions from '../actions/motebehov_actions';
import * as veilederoppgaverActions from '../actions/veilederoppgaver_actions';
import { MOETEPLANLEGGER } from '../enums/menypunkter';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';
import {
    sorterMotebehovDataEtterDato,
    finnNyesteMotebehovsvarFraHverDeltaker,
} from '../utils/motebehovUtils';
import {
    harForsoktHentetLedetekster,
    harForsoktHentetMotebehov,
    ikkeHenterEllerForsoktHentetMotebehov,
} from '../utils/reducerUtils';
import { MotebehovKvittering } from '../components/MotebehovKvittering';
import { bindActionCreators } from 'redux';


export class MotebehovSide extends Component {
    componentDidMount() {
        const {
            actions,
            fnr,
            skalHenteMotebehov,
        } = this.props;
        if (skalHenteMotebehov) {
            actions.hentMotebehov(fnr);
        }
    }

    render() {
        const {
            actions,
            fnr,
            henter,
            hentingFeilet,
            ledereData,
            ledereUtenInnsendtMotebehov,
            ledetekster,
            motebehovListeUtenFlereSvarFraSammePerson,
            motebehovTilgang,
            oppgaver,
            sykmeldt,
            tilgang,
            ufiltrertMotebehovListeTilOppgaveBehandling,
            veilederinfo,
        } = this.props;
        return (<Side fnr={fnr} tittel="Møtebehov" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (motebehovTilgang.harTilgang === false) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(motebehovTilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (motebehovListeUtenFlereSvarFraSammePerson.length > 0) {
                        return (<MotebehovKvittering
                            actions={actions}
                            fnr={fnr}
                            ledereData={ledereData}
                            ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
                            motebehovListe={motebehovListeUtenFlereSvarFraSammePerson}
                            oppgaver={oppgaver}
                            sykmeldt={sykmeldt}
                            ufiltrertMotebehovListeTilOppgaveBehandling={ufiltrertMotebehovListeTilOppgaveBehandling}
                            veilederinfo={veilederinfo}
                        />);
                    }
                    return (<Feilmelding
                        tittel={getLedetekst('mote.motebehov.feilmelding.tittel', ledetekster)}
                        melding={getHtmlLedetekst('mote.motebehov.feilmelding.ikkeFunnet', ledetekster)}
                    />);
                })()
            }
        </Side>);
    }
}

MotebehovSide.propTypes = {
    actions: PropTypes.object,
    fnr: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledereData: PropTypes.array,
    ledereUtenInnsendtMotebehov: PropTypes.array,
    ledetekster: PropTypes.object,
    motebehovListeUtenFlereSvarFraSammePerson: PropTypes.array,
    motebehovTilgang: PropTypes.object,
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    skalHenteMotebehov: PropTypes.bool,
    sykmeldt: PropTypes.object,
    tilgang: PropTypes.object,
    ufiltrertMotebehovListeTilOppgaveBehandling: PropTypes.array,
    veilederinfo: PropTypes.object,
};

export const filtrerLederePaaArbeidstakersMotebehov = (ledereData, motebehovData) => {
    return ledereData.filter((leder) => {
        return motebehovData.findIndex((motebehov) => {
            return motebehov.opprettetAv === motebehov.aktorId && leder.orgnummer === motebehov.virksomhetsnummer;
        }) >= 0;
    });
};

export const fjernLedereMedInnsendtMotebehov = (ledereListe, motebehovData) => {
    return ledereListe.filter((leder) => {
        return motebehovData.findIndex((motebehov) => {
            return motebehov.opprettetAv !== motebehov.aktorId && motebehov.virksomhetsnummer === leder.orgnummer;
        }) < 0;
    });
};

export const finnLedereutenInnsendtMotebehov = (ledereData, motebehovData) => {
    const ledereFiltrertPaaArbeidstakersMotebehov = filtrerLederePaaArbeidstakersMotebehov(ledereData, motebehovData);
    return fjernLedereMedInnsendtMotebehov(ledereFiltrertPaaArbeidstakersMotebehov, motebehovData);
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, motebehovActions, veilederoppgaverActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export const mapStateToProps = (state, ownProps) => {
    const motebehovData = state.motebehov.data;
    const sortertMotebehovListe = motebehovData.sort(sorterMotebehovDataEtterDato);
    const motebehovListeUtenFlereSvarFraSammePerson = finnNyesteMotebehovsvarFraHverDeltaker(sortertMotebehovListe);

    const ledereData = state.ledere.data;
    const ledereUtenInnsendtMotebehov = finnLedereutenInnsendtMotebehov(ledereData, motebehovData);

    const harForsoktHentetAlt = harForsoktHentetMotebehov(state.motebehov)
    && harForsoktHentetLedetekster(state.ledetekster);
    return {
        fnr: ownProps.params.fnr,
        henter: !harForsoktHentetAlt,
        hentingFeilet:
        state.motebehov.hentingFeilet
        || state.ledetekster.hentingFeilet,
        ledereData,
        ledereUtenInnsendtMotebehov,
        ledetekster: state.ledetekster.data,
        motebehovListeUtenFlereSvarFraSammePerson,
        motebehovTilgang: state.motebehov.tilgang,
        oppgaver: state.veilederoppgaver.data,
        skalHenteMotebehov: ikkeHenterEllerForsoktHentetMotebehov(state.motebehov),
        sykmeldt: state.navbruker.data,
        tilgang: state.tilgang.data,
        ufiltrertMotebehovListeTilOppgaveBehandling: state.motebehov.data,
        veilederinfo: state.veilederinfo.data,
    };
};

const MotebehovContainer = connect(mapStateToProps, mapDispatchToProps)(MotebehovSide);

export default MotebehovContainer;
