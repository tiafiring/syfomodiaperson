import { connect } from 'react-redux';
import GlobalNavigasjon from '../components/GlobalNavigasjon';
import * as motebehovActions from '../actions/motebehov_actions';

export const mapStateToProps = (state, ownProps) => {
    return {
        oppgaver: state.veilederoppgaver.data,
        fnr: ownProps.fnr,
        aktivtMenypunkt: ownProps.aktivtMenypunkt,
        motebehovForsoktHentet: state.motebehov.henter || state.motebehov.hentet || state.motebehov.hentingFeilet,
        motebehovet: state.motebehov.data[0],
        hentingFeilet: state.motebehov.hentingFeilet,
    };
};

const GlobalNavigasjonContainer = connect(mapStateToProps, motebehovActions)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
