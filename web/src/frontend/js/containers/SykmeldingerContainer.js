import React, {Component, PropTypes} from "react";
import Side from "../sider/Side";
import * as sykmeldingerActions from "../actions/sykmeldinger_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Tidslinje, setHendelseData, getLedetekst, Varselstripe} from "digisyfo-npm";
import Feilmelding from "../components/Feilmelding";
import AppSpinner from "../components/AppSpinner";
import Brodsmuler from "../components/Brodsmuler";
import {SYKMELDINGER} from "../menypunkter";

export class SykmeldingerSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentSykmeldinger(fnr);
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Sykmeldinger',
        }];
        return (<Side tittel="Sykmeldinger" aktivtMenypunkt={SYKMELDINGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (ikkeTilgang) {
                        return (<Feilmelding tittel="Under arbeid" melding="Du har foreløpig ikke tilgang til denne tjenesten. Vi jobber med å få på plass riktig tilgangsstyring.
                    Veiledere som jobber med sykefraværsoppfølging og veiledere på kontaktsenteret vil etter hver få tilgang. Takk for at du prøver igjen senere!" />);
                    }
                    return (<div>
                        <div className="panel">
                            <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                                <p>Dette er slik {brukernavn} ser det på nav.no</p>
                            </Varselstripe>
                        </div>
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

SykmeldingerSide.propTypes = {
    fnr: PropTypes.string,
    actions: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, sykmeldingerActions);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function mapStateToProps(state, ownProps) {
    const fnr = state.navbruker.data.fnr;
    const henter = state.sykmeldinger.henter || state.ledetekster.henter;
    const hentingFeilet = state.sykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet;
    const ikkeTilgang = state.sykmeldinger.ikkeTilgang;
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        henter,
        hentingFeilet,
        ikkeTilgang,
        ledetekster: state.ledetekster.data,
    };
}

const SykmeldingerContainer = connect(mapStateToProps, mapDispatchToProps)(SykmeldingerSide);
export default SykmeldingerContainer;
