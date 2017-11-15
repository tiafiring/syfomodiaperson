import { connect } from 'react-redux';
import Brukerinfo from '../components/Brukerinfo';
import { bindActionCreators } from 'redux';
import * as navbrukerActions from '../actions/navbruker_actions';

export function mapStateToProps(state) {
    return {
        navbruker: state.navbruker.data,
        behandlendeEnhet: state.behandlendeEnhet.data,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navbrukerActions, dispatch),
    };
}

const NavbrukerinfoContainer = connect(mapStateToProps, mapDispatchToProps)(Brukerinfo);

export default NavbrukerinfoContainer;
