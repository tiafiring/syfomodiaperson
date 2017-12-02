import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import Artikkel from '../components/Artikkel';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { TIDSLINJEN } from '../menypunkter';

export const RollerSide = ({ henter, hentingFeilet, ledetekster, fnr }) => {
    const brodsmuler = [{
        tittel: 'Tidslinjen',
    }, {
        tittel: getLedetekst('roller.sidetittel', ledetekster),
    }];
    return (<Side fnr={fnr} brodsmuler={brodsmuler} tittel={getLedetekst('roller.sidetittel', ledetekster)} aktivtMenypunkt={TIDSLINJEN}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                return (<Artikkel
                    fnr={fnr}
                    tittel={getLedetekst('roller.tittel', ledetekster)}
                    innhold={getLedetekst('roller.innhold', ledetekster)} />);
            })()
        }
    </Side>);
};

RollerSide.propTypes = {
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
    ledetekster: keyValue,
    fnr: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    return {
        fnr: ownProps.params.fnr,
        hentingFeilet: state.ledetekster.hentingFeilet,
        henter: state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
    };
}

const RolleogAnsvarsomraderContainer = connect(mapStateToProps)(RollerSide);

export default RolleogAnsvarsomraderContainer;
