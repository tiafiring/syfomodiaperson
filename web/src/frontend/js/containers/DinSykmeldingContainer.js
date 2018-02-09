import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSykmelding, getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as sykmeldingerActions from '../actions/sykmeldinger_actions';
import * as arbeidsgiversSykmeldingerActions from '../actions/arbeidsgiverssykmeldinger_actions';
import SykmeldingSide from '../sykmeldinger/sykmelding/SykmeldingSide';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import Speilingvarsel from '../components/Speilingvarsel';
import { SYKMELDINGER } from '../menypunkter';

export class DinSykmeldingSide extends Component {

    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentSykmeldinger(fnr);
        this.props.actions.hentArbeidsgiversSykmeldinger(fnr);
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang, dinSykmelding, fnr, arbeidsgiversSykmelding } = this.props;

        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Dine sykmeldinger',
        }, {
            tittel: 'Sykmelding',
        }];

        return (<Side fnr={fnr} tittel="Sykmeldinger" aktivtMenypunkt={SYKMELDINGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel={getLedetekst('mote.dinsykmeldingside.ikketilgang.tittel', ledetekster)} melding={getHtmlLedetekst('sykefravaer.veileder.feilmelding.melding', ledetekster)} />);
                    }

                    return (<div>
                        <Speilingvarsel brukernavn={brukernavn} />
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                            <SidetoppSpeilet tittel="Sykmelding" />
                            <SykmeldingSide dinSykmelding={dinSykmelding} ledetekster={ledetekster} arbeidsgiversSykmelding={arbeidsgiversSykmelding} fnr={fnr} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

DinSykmeldingSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    actions: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, sykmeldingerActions, arbeidsgiversSykmeldingerActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const sykmeldingId = ownProps.params.sykmeldingId;
    const henter = state.sykmeldinger.henter || state.ledetekster.henter || state.arbeidsgiversSykmeldinger.henter;
    const hentingFeilet = state.sykmeldinger.hentingFeilet;
    const ikkeTilgang = state.sykmeldinger.ikkeTilgang;
    const dinSykmelding = getSykmelding(state.sykmeldinger.data, sykmeldingId);
    let arbeidsgiversSykmelding = {};

    if (dinSykmelding && (dinSykmelding.status === 'SENDT' || (dinSykmelding.status === 'BEKREFTET' && dinSykmelding.valgtArbeidssituasjon === 'ARBEIDSTAKER'))) {
        arbeidsgiversSykmelding = getSykmelding(state.arbeidsgiversSykmeldinger.data, sykmeldingId);
    }

    return {
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        ikkeTilgang,
        ledetekster: state.ledetekster.data,
        dinSykmelding,
        arbeidsgiversSykmelding,
    };
}

const DinSykmeldingContainer = connect(mapStateToProps, mapDispatchToProps)(DinSykmeldingSide);
export default DinSykmeldingContainer;
