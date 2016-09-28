import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SykmeldingTeasere from '../components/SykmeldingTeasere';

const Navigasjon = ({ sykmeldinger }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmelding) => {
        return sykmelding.status === 'NY';
    });
    const behandledeSykmeldinger = sykmeldinger.filter((sykmelding) => {
        return sykmelding.status !== 'NY';
    }).slice(0, 2);

    return (<div>
        <SykmeldingTeasere sykmeldinger={nyeSykmeldinger} tittel="Nye sykmeldinger" />
        <SykmeldingTeasere sykmeldinger={behandledeSykmeldinger} tittel="Behandlede sykmeldinger" viserAlle={false} />
    </div>);
};

Navigasjon.propTypes = {
    sykmeldinger: PropTypes.array,
};

export function mapStateToProps(state) {
    return {
        sykmeldinger: state.navsSykmeldinger.data,
    };
}

const SykmeldingerNavigasjonContainer = connect(mapStateToProps)(Navigasjon);

export default SykmeldingerNavigasjonContainer;
