import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { tilLesbarDatoMedArstall } from 'digisyfo-npm';
import { Checkbox } from 'nav-frontend-skjema';
import Alertstripe from 'nav-frontend-alertstriper';
import Knapp from 'nav-frontend-knapper';
import * as dokumentActions from '../../actions/dokumentinfo_actions';
import * as veilederoppgaverActions from '../../actions/veilederoppgaver_actions';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';

const FERDIG = 'FERDIG';

const erOppgaveFullfoert = (oppgave) => {
    return oppgave.status === FERDIG;
};

const seOppfolgingsplanOppgave = (oppfoelgingsdialog) => {
    return oppfoelgingsdialog.oppgaver.filter((oppgave) => {
        return oppgave.type === 'SE_OPPFOLGINGSPLAN';
    })[0];
};

const PlanVisning = ({ oppfoelgingsdialog, dokumentinfo, fnr, actions, veilederinfo }) => {
    const sePlanOppgave = seOppfolgingsplanOppgave(oppfoelgingsdialog);
    const bildeUrler = [];
    for (let i = 1; i <= dokumentinfo.antallSider; i += 1) {
        bildeUrler.push(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}/side/${i}`);
    }

    const Skjema = () => {
        return sePlanOppgave && sePlanOppgave.status === FERDIG
            ? <Alertstripe type="suksess">
                <p>Ferdig behandlet av {sePlanOppgave.sistEndretAv} {tilLesbarDatoMedArstall(sePlanOppgave.sistEndret)}</p>
            </Alertstripe>
                : sePlanOppgave && sePlanOppgave.status !== FERDIG
                ? <Checkbox
                    label="Marker som behandlet"
                    onClick={() => {
                        actions.behandleOppgave(sePlanOppgave.id, {
                            status: FERDIG,
                            sistEndretAv: veilederinfo.ident,
                        }, fnr);
                    }}
                    id="marker__utfoert"
                    disabled={erOppgaveFullfoert(sePlanOppgave)}
                    checked={erOppgaveFullfoert(sePlanOppgave)} />
                    : (<Alertstripe type="info">
                    <p>Fant dessverre ingen oppgave knyttet til denne planen</p>
                </Alertstripe>);
    };

    const TilbakeTilOppfolgingsplaner = () => {
        return (<div className="blokk">
            <Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner`} className="tilbakelenke">Til oppfølgingsplaner</Link>
        </div>);
    };

    return (<div className="blokk--l">
        <div className="blokk">
            <Skjema />
        </div>
        <TilbakeTilOppfolgingsplaner />
        <div className="pdfbilder blokk--s">
            {
                bildeUrler.map((bildeUrl) => {
                    return (<div className="pdfbilde">
                        <img width="944" height="1222" className="pdfbilde__bilde" key={bildeUrl} src={bildeUrl} alt="Bilde av oppfølgingsplan" />
                    </div>);
                })
            }
        </div>
        <TilbakeTilOppfolgingsplaner />
        <div className="knapperad">
            <Knapp
                type="standard"
                onClick={() => {
                    const newWindow = window.open(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}`);
                    newWindow.print();
                }}>
                Skriv ut
            </Knapp>
        </div>
    </div>);
};

PlanVisning.propTypes = {
    oppfoelgingsdialog: PropTypes.object,
    veilederinfo: PropTypes.object,
    dokumentinfo: PropTypes.object,
    actions: PropTypes.object,
    fnr: PropTypes.string,
};

class OppfoelgingsplanWrapper extends Component {
    componentWillMount() {
        const { actions, oppfoelgingsdialog } = this.props;
        actions.hentDokumentinfo(oppfoelgingsdialog.id);
    }

    render() {
        const { dokumentinfo, oppfoelgingsdialog, fnr, henter, hentingFeilet, actions, veilederinfo } = this.props;
        return (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            return (<PlanVisning
                veilederinfo={veilederinfo}
                oppfoelgingsdialog={oppfoelgingsdialog}
                dokumentinfo={dokumentinfo}
                fnr={fnr}
                actions={actions} />);
        })();
    }
}

OppfoelgingsplanWrapper.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppfoelgingsdialog: PropTypes.object,
    veilederinfo: PropTypes.object,
    actions: PropTypes.object,
    dokumentinfo: PropTypes.object,
    fnr: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, dokumentActions, veilederoppgaverActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const oppfoelgingsdialog = ownProps.oppfoelgingsdialog;
    oppfoelgingsdialog.oppgaver = state.veilederoppgaver.data.filter((_oppgave) => {
        return _oppgave.uuid === oppfoelgingsdialog.uuid;
    });
    const veilederinfo = state.veilederinfo.data;
    return {
        henter: state.dokumentinfo.henter || state.veilederoppgaver.henter,
        hentingFeilet: state.dokumentinfo.hentingFeilet,
        dokumentinfo: state.dokumentinfo.data,
        brukernavn: state.navbruker.data.navn,
        oppfoelgingsdialog,
        veilederinfo,
        ledetekster: state.ledetekster.data,
        fnr: ownProps.fnr,
        veilderoppgaver: state.veilederoppgaver.data,
    };
}

const Oppfoelgingsplan = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsplanWrapper);
export default Oppfoelgingsplan;
