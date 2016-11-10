import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import * as tidslinjerActions from '../actions/tidslinjer_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tidslinje, setHendelseData } from 'digisyfo-npm';
import TidslinjeVelgArbeidssituasjonContainer from './TidslinjeVelgArbeidssituasjonContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';

export class TidslinjeSide extends Component {
    componentWillMount() {
        const { fnr, apneHendelseIder, arbeidssituasjon } = this.props;
        this.props.actions.hentTidslinjer(fnr, apneHendelseIder, arbeidssituasjon);
    }

    render() {
        const { hendelser, ledetekster, actions, valgtArbeidssituasjon, henter, hentingFeilet } = this.props;
        return (<Side tittel="Tidslinje">
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<div>
                    <Sidetopp tittel="Tidslinjen" />
                    <TidslinjeVelgArbeidssituasjonContainer valgtArbeidssituasjon={valgtArbeidssituasjon} />
                    <Tidslinje hendelser={hendelser} ledetekster={ledetekster} setHendelseData={actions.setHendelseData} />
                </div>);
            })()
        }
        </Side>);
    }
}

TidslinjeSide.propTypes = {
    fnr: PropTypes.string,
    apneHendelseIder: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    actions: PropTypes.object,
    valgtArbeidssituasjon: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hendelser: PropTypes.array,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, tidslinjerActions, { setHendelseData });
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function getArbeidssituasjon(arbeidssituasjon) {
    if (arbeidssituasjon === 'uten-arbeidsgiver') {
        return 'UTEN_ARBEIDSGIVER';
    }
    return 'MED_ARBEIDSGIVER';
}

export function setHash(hendelser) {
    const apneHendelser = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${apneHendelser}`);
}

export function mapStateToProps(state, ownProps) {
    const fnr = state.navbruker.data.fnr;
    const hendelser = state.tidslinjer && state.tidslinjer.data && state.tidslinjer.data.length ? state.tidslinjer.data[0].hendelser : [];
    const valgtArbeidssituasjon = getArbeidssituasjon(ownProps.params.valgtArbeidssituasjon);
    if (hendelser.length) {
        setHash(hendelser);
    }
    const apneHendelseIder = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];
    const henter = state.tidslinjer.henter || state.ledetekster.henter;
    const hentingFeilet = state.tidslinjer.hentingFeilet || state.ledetekster.hentingFeilet;
    return {
        fnr,
        hendelser,
        valgtArbeidssituasjon,
        apneHendelseIder,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
    };
}

const TidslinjeContainer = connect(mapStateToProps, mapDispatchToProps)(TidslinjeSide);
export default TidslinjeContainer;
