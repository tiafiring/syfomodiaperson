import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Knapp from 'nav-frontend-knapper';
import * as dokumentActions from '../../actions/dokumentinfo_actions';
import Feilmelding from '../Feilmelding';
import AppSpinner from '../AppSpinner';

const PlanVisning = (
    {
        dokumentinfo,
        fnr,
        oppfolgingsplan,
    }) => {
    const bildeUrler = [];
    for (let i = 1; i <= dokumentinfo.antallSider; i += 1) {
        bildeUrler.push(`${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/${oppfolgingsplan.id}/side/${i}`);
    }

    const TilbakeTilOppfolgingsplaner = () => {
        return (<div className="blokk">
            <Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner`} className="tilbakelenke">Til oppfølgingsplaner</Link>
        </div>);
    };

    return (<div className="blokk--l">
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
                    const newWindow = window.open(`${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/${oppfolgingsplan.id}`);
                    newWindow.print();
                }}>
                Skriv ut
            </Knapp>
        </div>
    </div>);
};

PlanVisning.propTypes = {
    oppfolgingsplan: PropTypes.object,
    veilederinfo: PropTypes.object,
    dokumentinfo: PropTypes.object,
    actions: PropTypes.object,
    fnr: PropTypes.string,
};

class OppfoelgingsplanWrapper extends Component {
    componentWillMount() {
        const {
            actions,
            oppfolgingsplan,
        } = this.props;
        actions.hentDokumentinfo(oppfolgingsplan.id);
    }

    render() {
        const {
            actions,
            dokumentinfo,
            fnr,
            henter,
            hentingFeilet,
            oppfolgingsplan,
            veilederinfo,
        } = this.props;
        return (() => {
            if (henter) {
                return <AppSpinner />;
            }
            if (hentingFeilet) {
                return <Feilmelding />;
            }
            return (<PlanVisning
                veilederinfo={veilederinfo}
                oppfolgingsplan={oppfolgingsplan}
                dokumentinfo={dokumentinfo}
                fnr={fnr}
                actions={actions} />);
        })();
    }
}

OppfoelgingsplanWrapper.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppfolgingsplan: PropTypes.object,
    veilederinfo: PropTypes.object,
    actions: PropTypes.object,
    dokumentinfo: PropTypes.object,
    fnr: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, dokumentActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const oppfolgingsplan = ownProps.oppfoelgingsdialog;
    const veilederinfo = state.veilederinfo.data;
    let oppfolgingsplanDokumentinfoReducer = {};
    if (oppfolgingsplan) {
        oppfolgingsplanDokumentinfoReducer = state.dokumentinfo[oppfolgingsplan.id] || {};
    }
    return {
        henter: !oppfolgingsplanDokumentinfoReducer.hentingForsokt || state.veilederoppgaver.henter,
        hentingFeilet: oppfolgingsplanDokumentinfoReducer.hentingFeilet,
        dokumentinfo: oppfolgingsplanDokumentinfoReducer && oppfolgingsplanDokumentinfoReducer.data,
        brukernavn: state.navbruker.data.navn,
        oppfolgingsplan,
        veilederinfo,
        fnr: ownProps.fnr,
    };
}

const Oppfoelgingsplan = connect(mapStateToProps, mapDispatchToProps)(OppfoelgingsplanWrapper);
export default Oppfoelgingsplan;
