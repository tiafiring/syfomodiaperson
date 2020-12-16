import { connect } from "react-redux";
import GlobalNavigasjon from "./GlobalNavigasjon";
import * as motebehovActions from "../../data/motebehov/motebehov_actions";
import * as moterActions from "../../data/mote/moter_actions";
import * as oppfoelgingsdialogerActions from "../../data/oppfolgingsplan/oppfoelgingsdialoger_actions";
import * as oppfolgingsplanerLPSActions from "../../data/oppfolgingsplan/oppfolgingsplanerlps_actions";
import * as personOppgaverActions from "../../data/personoppgave/personoppgave_actions";

export const mapStateToProps = (state, ownProps) => {
  return {
    fnr: ownProps.fnr,
    aktivtMenypunkt: ownProps.aktivtMenypunkt,
    motebehovReducer: state.motebehov,
    moterReducer: state.moter,
    oppfolgingsplanerReducer: state.oppfoelgingsdialoger,
    personOppgaverReducer: state.personoppgaver,
    oppfolgingsplanerLPSReducer: state.oppfolgingsplanerlps,
  };
};

const GlobalNavigasjonContainer = connect(
  mapStateToProps,
  Object.assign(
    {},
    motebehovActions,
    moterActions,
    oppfoelgingsdialogerActions,
    personOppgaverActions,
    oppfolgingsplanerLPSActions
  )
)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
