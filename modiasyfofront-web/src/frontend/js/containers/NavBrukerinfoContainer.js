import { connect } from 'react-redux';
import NavBrukerinfo from '../components/NavBrukerinfo';

export function mapStateToProps(state, ownProps) {
    return {
        navBruker: state.navBruker.data,
        fnr: ownProps.fnr,
    };
}

const NavBrukerinfoContainer = connect(mapStateToProps)(NavBrukerinfo);

export default NavBrukerinfoContainer;
