import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as dokumentActions from '../../actions/dokumentinfo_actions';
import * as veilederoppgaverActions from '../../actions/veilederoppgaver_actions';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';

const erOppgaveFullfoert = (oppgave) => {
    return oppgave.status === 'FERDIG';
};

const seOppfolgingsplanOppgave = (oppfoelgingsdialog) => {
    return oppfoelgingsdialog.oppgaver.filter((oppgave) => {
        return oppgave.type === 'SE_OPPFOLGINGSPLAN';
    })[0];
};

class PlanVisning extends Component {
    render() {
        const { oppfoelgingsdialog, dokumentinfo, fnr, actions } = this.props;

        const sePlanOppgave = seOppfolgingsplanOppgave(oppfoelgingsdialog);
        const bildeUrler = [];
        for (let i = 1; i <= dokumentinfo.antallSider; i++) {
            bildeUrler.push(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}/side/${i}`)
        }
        return (<div>
            <div className="blokk--s" style={{ borderBottom: '1px solid #b7b1a9' }}>
                <div className="panel blokk--s">
                    {
                        bildeUrler.map((bildeUrl, index) => {
                            return <img className="pdfbilde" key={index} src={bildeUrl} />
                        })
                    }
                </div>
            </div>
            { sePlanOppgave ?
            <div className="skjema__input blokk--l">
                <input onClick={() => {
                    actions.behandleOppgave(sePlanOppgave.id, {
                        status: 'FERDIG',
                    });
                }} id="marker__utfoert" type="checkbox" className="checkboks" disabled={erOppgaveFullfoert(sePlanOppgave)} checked={erOppgaveFullfoert(sePlanOppgave)} />
                <label htmlFor="marker__utfoert">Marker som behandlet</label>
            </div> : <p>Fant dessverre ingen oppgave knyttet til denne planen</p>
            }
            <Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner`}>
                <button className="rammeknapp">Tilbake</button>
            </Link>
            <button className="rammeknapp" onClick={ () => {
                const newWindow = window.open(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}`);
                newWindow.print();
            }}>Skriv ut</button>
        </div>);
    }
}

PlanVisning.propTypes = {
    oppfoelgingsdialog: PropTypes.object,
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
        const { dokumentinfo, oppfoelgingsdialog, fnr, henter, hentingFeilet, actions } = this.props;
        return (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<div>
                        <PlanVisning oppfoelgingsdialog={oppfoelgingsdialog} dokumentinfo={dokumentinfo} fnr={fnr} actions={actions} />
                    </div>);
                })();
    }
}

OppfoelgingsplanWrapper.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppfoelgingsdialog: PropTypes.object,
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
    oppfoelgingsdialog.oppgaver = oppfoelgingsdialog.oppgaver.map((oppgave) => {
        return state.veilederoppgaver.data.filter((_oppgave) => {
            return _oppgave.id === oppgave.id;
        })[0];
    });
    return {
        henter: state.dokumentinfo.henter || state.veilederoppgaver.henter,
        hentingFeilet: state.dokumentinfo.hentingFeilet || state.veilederoppgaver.hentingFeilet,
        dokumentinfo: state.dokumentinfo.data,
        brukernavn: state.navbruker.data.navn,
        oppfoelgingsdialog,
        ledetekster: state.ledetekster.data,
        fnr: ownProps.fnr
    };
}

const Oppfoelgingsplan = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsplanWrapper);
export default Oppfoelgingsplan;
