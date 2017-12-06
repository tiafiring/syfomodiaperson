import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tidslinje, setHendelseData, getLedetekst, getHtmlLedetekst, Varselstripe } from 'digisyfo-npm';
import { Panel } from 'nav-frontend-paneler';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as tidslinjerActions from '../actions/tidslinjer_actions';
import TidslinjeVelgArbeidssituasjonContainer from './TidslinjeVelgArbeidssituasjonContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import { TIDSLINJEN } from '../menypunkter';

export class TidslinjeSide extends Component {
    constructor() {
        super();
        this.state = {
            arbeidssituasjon: 'MED_ARBEIDSGIVER',
        };
        this.endreArbeidssituasjon = this.endreArbeidssituasjon.bind(this);
    }

    componentWillMount() {
        const { fnr, apneHendelseIder, arbeidssituasjon } = this.props;
        this.props.actions.hentTidslinjer(fnr, apneHendelseIder, arbeidssituasjon);
    }

    endreArbeidssituasjon(valg) {
        this.setState({
            arbeidssituasjon: valg,
        });
        this.props.actions.hentTidslinjer(this.props.fnr, [], valg);
    }

    render() {
        const { fnr, hendelser, ledetekster, actions, henter, hentingFeilet, brukernavn, ikkeTilgang, ikkeTilgangFeilmelding } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Tidslinjen',
        }];
        return (<Side fnr={fnr} tittel="Tidslinje" aktivtMenypunkt={TIDSLINJEN}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (ikkeTilgang) {
                    return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                        melding={getHtmlLedetekst(ikkeTilgangFeilmelding, ledetekster)} />);
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<div>
                    <Panel>
                        <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                            <p>Dette er slik {brukernavn} ser det på nav.no</p>
                        </Varselstripe>
                    </Panel>
                    <div className="speiling">
                        <Brodsmuler brodsmuler={brodsmuler} />
                        <SidetoppSpeilet tittel="Tidslinjen" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjonContainer ledetekster={ledetekster} valgtArbeidssituasjon={this.state.arbeidssituasjon} endreArbeidssituasjon={this.endreArbeidssituasjon} />
                        <Tidslinje arbeidssituasjon={this.state.arbeidssituasjon} hendelser={hendelser} ledetekster={ledetekster} setHendelseData={actions.setHendelseData} />
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
    ikkeTilgangFeilmelding: PropTypes.string,
    actions: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
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
    const hendelser = state.tidslinjer && state.tidslinjer.data && state.tidslinjer.data.length ? state.tidslinjer.data[0].hendelser : [];
    if (hendelser.length) {
        setHash(hendelser);
    }
    const apneHendelseIder = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];
    const henter = state.tidslinjer.henter || state.ledetekster.henter || state.ledere.henter;
    const hentingFeilet = state.tidslinjer.hentingFeilet || state.ledetekster.hentingFeilet || state.ledere.hentingFeilet;

    return {
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        hendelser,
        apneHendelseIder,
        henter,
        hentingFeilet,
        ikkeTilgang: state.ledere.ikkeTilgang,
        ikkeTilgangFeilmelding: state.ledere.ikkeTilgangFeilmelding,
        ledetekster: state.ledetekster.data,
    };
}

const TidslinjeContainer = connect(mapStateToProps, mapDispatchToProps)(TidslinjeSide);
export default TidslinjeContainer;
