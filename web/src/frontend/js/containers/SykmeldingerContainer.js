import React, { Component, PropTypes } from 'react';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import { bindActionCreators } from 'redux';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import * as actionCreators from '../actions/sykmeldinger_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import DineSykmeldinger from '../sykmeldinger/sykmeldinger/DineSykmeldinger';
import Brodsmuler from '../components/Brodsmuler';
import { SYKMELDINGER } from '../menypunkter';

export class SykmeldingerSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentSykmeldinger(fnr);
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, ikkeTilgang, sykmeldinger, fnr } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Dine sykmeldinger',
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
                        return (<Feilmelding tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)} melding={getLedetekst('sykefravaer.veileder.feilmelding.melding', ledetekster)} />);
                    }
                    return (<div>
                        <div className="panel">
                            <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                                <p>Dette er slik {brukernavn} ser det på nav.no</p>
                            </Varselstripe>
                        </div>
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                            <SidetoppSpeilet tittel="Dine sykmeldinger" htmlTekst={htmlIntro} />
                            <DineSykmeldinger fnr={fnr} sykmeldinger={sykmeldinger} ledetekster={ledetekster} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

SykmeldingerSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    actions: PropTypes.object,
    sykmeldinger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, actionCreators);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}


export function mapStateToProps(state) {
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
        sykmeldinger: state.sykmeldinger.data,
    };
}

const SykmeldingerContainer = connect(mapStateToProps, mapDispatchToProps)(SykmeldingerSide);
export default SykmeldingerContainer;
