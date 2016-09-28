import { connect } from 'react-redux';
import Brukerinfo from '../components/Brukerinfo';

export function mapStateToProps(state, ownProps) {
    return {
        navBruker: state.navBruker.data,
        fnr: ownProps.fnr,
    };
}

const NavBrukerinfoContainer = connect(mapStateToProps)(Brukerinfo);

export default NavBrukerinfoContainer;
