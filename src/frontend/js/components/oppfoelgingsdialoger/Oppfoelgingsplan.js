import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { Checkbox } from 'nav-frontend-skjema';
import KnappBase from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
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

const PlanVisning = ({ oppfoelgingsdialog, dokumentinfo, fnr, actions, veilederinfo }) => {
    const sePlanOppgave = seOppfolgingsplanOppgave(oppfoelgingsdialog);
    const bildeUrler = [];
    for (let i = 1; i <= dokumentinfo.antallSider; i += 1) {
        bildeUrler.push(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}/side/${i}`);
    }
    return (<div>
        <div className="blokk--s" style={{ borderBottom: '1px solid #b7b1a9' }}>
            <Panel className="blokk--s">
                {
                    bildeUrler.map((bildeUrl, index) => {
                        return <img className="pdfbilde" key={index} src={bildeUrl} height="735px" width="567px" alt="plan" />;
                    })
                }
            </Panel>
        </div>
        { sePlanOppgave ?
            <div className="skjema__input blokk--l">
                <Checkbox
                    label={sePlanOppgave.status === 'FERDIG' ? `Ferdig behandlet av ${sePlanOppgave.sistEndretAv} ${toDatePrettyPrint(sePlanOppgave.sistEndret)}` : 'Marker som behandlet'}
                    onClick={() => {
                        actions.behandleOppgave(sePlanOppgave.id, {
                            status: 'FERDIG',
                            sistEndretAv: veilederinfo.ident,
                        }, fnr);
                    }}
                    id="marker__utfoert"
                    disabled={erOppgaveFullfoert(sePlanOppgave)}
                    checked={erOppgaveFullfoert(sePlanOppgave)} />
            </div> : <p>Fant dessverre ingen oppgave knyttet til denne planen</p>
        }
        <Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner`}>
            <KnappBase type="standard">Tilbake</KnappBase>
        </Link>
        <KnappBase
            type="standard"
            onClick={() => {
                const newWindow = window.open(`${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/dokument/${oppfoelgingsdialog.id}`);
                newWindow.print();
            }}>
            Skriv ut
        </KnappBase>
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
            return (<div>
                <PlanVisning veilederinfo={veilederinfo} oppfoelgingsdialog={oppfoelgingsdialog} dokumentinfo={dokumentinfo} fnr={fnr} actions={actions} />
            </div>);
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
