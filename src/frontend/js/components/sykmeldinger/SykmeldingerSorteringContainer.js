import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'nav-frontend-skjema';
import { getLedetekst } from 'digisyfo-npm';
import * as actionCreators from '../../actions/sykmeldinger_actions';

const DropdownContainer = ({ alternativer, sorterSykmeldinger, ledetekster, status }) => {
    return (<Select
        label={getLedetekst('dine-sykmeldinger.sorter.label', ledetekster)}
        aria-controls={`sykmelding-liste-${status}`}
        onChange={(event) => {
            console.log("event", event.target.value, status);
            sorterSykmeldinger(event.target.value, status);
        }}>
        {alternativer.map((alt, idx) => {
            return (<option key={idx} value={alt.verdi}>{alt.tekst}</option>);
        })}
    </Select>);
};

DropdownContainer.propTypes = {
    alternativer: PropTypes.array,
    sorterSykmeldinger: PropTypes.func,
    ledetekster: PropTypes.object,
    status: PropTypes.string,
};

function mapStateToProps(state) {
    const ledetekster = state.ledetekster.data;

    return {
        ledetekster,
        alternativer: [{
            tekst: getLedetekst('dine-sykmeldinger.sorter.dato', ledetekster),
            verdi: 'fom',
        }, {
            tekst: getLedetekst('dine-sykmeldinger.sorter.arbeidsgiver', ledetekster),
            verdi: 'arbeidsgiver',
        }],
    };
}

const SykmeldingerSorteringContainer = connect(mapStateToProps, actionCreators)(DropdownContainer);

export default SykmeldingerSorteringContainer;
