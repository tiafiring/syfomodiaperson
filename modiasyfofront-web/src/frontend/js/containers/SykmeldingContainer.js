import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import SykmeldingerNavigasjonContainer from '../containers/SykmeldingerNavigasjonContainer';

export const SykmeldingSide = ({ sykmelding }) => {
    return (
        <Side tittel="Sykefravær">
            <div className="rad">
                <nav className="kolonne">
                    <SykmeldingerNavigasjonContainer />
                </nav>
                <div className="kolonne kolonne--3">Her kommer en sykmelding {sykmelding.id}</div>
            </div>
        </Side>
    );
};

SykmeldingSide.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        sykmelding: state.arbeidsgiversSykmeldinger.data.filter((sykmelding) => {
            return sykmelding.id === ownProps.params.sykmeldingId;
        })[0]
    };
}

const SykmeldingContainer = connect(mapStateToProps)(SykmeldingSide);

export default SykmeldingContainer;
