import { connect } from 'react-redux';
import GlobalNavigasjon from '../components/GlobalNavigasjon';
import * as motebehovActions from '../actions/motebehov_actions';

export const mapStateToProps = (state, ownProps) => {
    return {
        oppgaver: state.veilederoppgaver.data,
        fnr: ownProps.fnr,
        aktivtMenypunkt: ownProps.aktivtMenypunkt,
        motebehovReducer: state.motebehov,
    };
};

const GlobalNavigasjonContainer = connect(mapStateToProps, Object.assign({}, motebehovActions))(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
