import React, {Component, PropTypes} from "react";
import MotebookingSkjema from "../skjema/MotebookingSkjema";
import {connect} from "react-redux";
import * as ledereActions from "../../actions/ledere_actions";
import * as virksomhetActions from "../actions/virksomhet_actions";
import * as arbeidstakerActions from "../actions/arbeidstaker_actions";
import AppSpinner from "../../components/AppSpinner";
import Feilmelding from "../../components/Feilmelding";

export class MotebookingSkjemaContainer extends Component {
    componentWillMount() {
        const { fnr, hentLedere, hentArbeidstaker } = this.props;
        hentLedere(fnr);
        hentArbeidstaker(fnr);
    }
    render() {
        const { henter, skjermetBruker } = this.props;

        if (henter) {
            return <AppSpinner />;
        } else if (skjermetBruker) {
            return <Feilmelding tittel = 'Ikke mulig å sende møteforespørsel' melding = 'Brukeren er registrert med skjermingskode 6 eller 7.' />;
        }
        return <MotebookingSkjema {...this.props} />;
    }
}

MotebookingSkjemaContainer.propTypes = {
    fnr: PropTypes.string,
    hentLedere: PropTypes.func,
    hentArbeidstaker: PropTypes.func,
    henter: PropTypes.bool,
};

export function mapStateToProps(state) {
    const ledere = state.ledere.data.filter((leder) => {
        return leder.erOppgitt;
    });

    return {
        ledere,
        arbeidstaker: state.arbeidstaker.data,
        henter: state.ledere.henter || state.arbeidstaker.henter,
        hentLedereFeiletBool: state.ledere.hentingFeilet,
        skjermetBruker: state.moter.skjermetBruker,
        hentArbeidstakerFeilet: state.arbeidstaker.hentingFeilet,
    };
}

const container = connect(mapStateToProps, Object.assign({}, ledereActions, virksomhetActions, arbeidstakerActions))(MotebookingSkjemaContainer);

export default container;
