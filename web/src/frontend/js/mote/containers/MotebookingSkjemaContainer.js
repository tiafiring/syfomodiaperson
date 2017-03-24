import React, { Component, PropTypes } from 'react';
import MotebookingSkjema from '../skjema/MotebookingSkjema';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { connect } from 'react-redux';
import * as ledereActions from '../../actions/ledere_actions';
import * as virksomhetActions from '../actions/virksomhet_actions';
import * as arbeidstakerActions from '../actions/arbeidstaker_actions';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';

export class MotebookingSkjemaContainer extends Component {
    componentWillMount() {
        const { fnr, hentLedere, hentArbeidstaker } = this.props;
        hentLedere(fnr);
        hentArbeidstaker(fnr);
    }
    render() {
        const { ledetekster, henter, skjermetBruker, hentingFeilet } = this.props;

        if (henter) {
            return <AppSpinner />;
        } else if (skjermetBruker) {
            return (<Feilmelding
                tittel={getLedetekst('mote.motebookingskjemacontainer.tittel', ledetekster)}
                melding={getHtmlLedetekst('mote.motebookingskjemacontainer.melding', ledetekster)} />);
        } else if (hentingFeilet) {
            return <Feilmelding />;
        }
        return <MotebookingSkjema {...this.props} />;
    }
}

MotebookingSkjemaContainer.propTypes = {
    fnr: PropTypes.string,
    hentLedere: PropTypes.func,
    hentArbeidstaker: PropTypes.func,
    henter: PropTypes.bool,
    skjermetBruker: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
};

export function mapStateToProps(state) {
    const ledere = state.ledere.data.filter((leder) => {
        return leder.erOppgitt;
    });

    return {
        ledere,
        arbeidstaker: state.arbeidstaker.data,
        henter: state.ledere.henter || state.arbeidstaker.henter || state.ledetekster.henter,
        hentLedereFeiletBool: state.ledere.hentingFeilet,
        skjermetBruker: state.moter.skjermetBruker,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.arbeidstaker.hentingFeilet,
    };
}

const container = connect(mapStateToProps, Object.assign({}, ledereActions, virksomhetActions, arbeidstakerActions))(MotebookingSkjemaContainer);

export default container;
