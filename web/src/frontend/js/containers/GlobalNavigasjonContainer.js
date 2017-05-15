import { connect } from 'react-redux';
import GlobalNavigasjon from '../components/GlobalNavigasjon';

export const mapStateToProps = (state, ownProps) => {
    return {
        fnr: state.navbruker.data.fnr,
        aktivtMenypunkt: ownProps.aktivtMenypunkt,
    };
};

const GlobalNavigasjonContainer = connect(mapStateToProps)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
