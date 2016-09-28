import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import SykmeldingerNavigasjonContainer from '../containers/SykmeldingerNavigasjonContainer';

export const SykmeldingerSide = () => {
    return (
        <Side tittel="Sykefravær">
            <div className="rad">
                <nav className="kolonne">
                    <SykmeldingerNavigasjonContainer />
                </nav>
                <div className="kolonne kolonne--3">Ja</div>
            </div>
        </Side>
    );
};

SykmeldingerSide.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        aktivSykmelding: state.arbeidsgiversSykmeldinger.data.filter((sykmelding) => {
            return sykmelding.id === ownProps.params.sykmeldingId;
        })[0],
    };
}

const SykmeldingerContainer = connect(mapStateToProps)(SykmeldingerSide);

export default SykmeldingerContainer;
