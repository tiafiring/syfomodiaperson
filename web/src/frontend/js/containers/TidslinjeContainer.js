import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as tidslinjerActions from '../actions/tidslinjer_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tidslinje, setHendelseData, getLedetekst, Varselstripe } from 'digisyfo-npm';
import TidslinjeVelgArbeidssituasjonContainer from './TidslinjeVelgArbeidssituasjonContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';

export class TidslinjeSide extends Component {
    componentWillMount() {
        const { fnr, apneHendelseIder, arbeidssituasjon } = this.props;
        this.props.actions.hentTidslinjer(fnr, apneHendelseIder, arbeidssituasjon);
    }

    render() {
        const { hendelser, ledetekster, actions, valgtArbeidssituasjon, henter, hentingFeilet, brukernavn } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Tidslinjen',
        }];
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
                    <div className="panel">
                        <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                            <p>Dette er slik {brukernavn} ser det på nav.no</p>
                        </Varselstripe>
                    </div>
                    <div className="speiling">
                        <Brodsmuler brodsmuler={brodsmuler} />
                        <SidetoppSpeilet tittel="Tidslinjen" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjonContainer valgtArbeidssituasjon={valgtArbeidssituasjon} />
                        <Tidslinje hendelser={hendelser} ledetekster={ledetekster} setHendelseData={actions.setHendelseData} />
                    </div>
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
    brukernavn: PropTypes.string,
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
        brukernavn: state.navbruker.data.navn,
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
