import { connect } from 'react-redux';
import GlobalNavigasjon from '../components/GlobalNavigasjon';

export const mapStateToProps = (state) => {
    return {
        fnr: state.navbruker.data.fnr,
        harTilgangMotemodul: state.navbruker.data.harTilgang,
    };
};

const GlobalNavigasjonContainer = connect(mapStateToProps)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
