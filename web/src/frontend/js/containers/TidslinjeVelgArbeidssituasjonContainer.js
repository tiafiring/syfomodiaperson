import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { getLedetekst, Radiofaner } from 'digisyfo-npm';
import { hentTidslinjer } from '../actions/tidslinjer_actions';

const verdier = {
    MED_ARBEIDSGIVER: 'med-arbeidsgiver',
    UTEN_ARBEIDSGIVER: 'uten-arbeidsgiver',
};

export class VelgArbeidssituasjon extends Component {
    redirect(verdi) {
        history.replace(`/sykefravaer/${this.props.fnr}/tidslinjen/${verdi}`);
    }

    changeHandler(verdi) {
        this.redirect(verdier[verdi]);
        this.props.hentTidslinjer(this.props.fnr, [], verdi);
    }

    render() {
        return (<Radiofaner
            alternativer={this.props.arbeidssituasjoner}
            valgtAlternativ={this.props.valgtArbeidssituasjon}
            changeHandler={(verdi) => {
                this.changeHandler(verdi);
            }}
            radioName="tidslinje-arbeidssituasjon"
            className="blokk-xl" />);
    }
}

VelgArbeidssituasjon.propTypes = {
    arbeidssituasjoner: PropTypes.array,
    valgtArbeidssituasjon: PropTypes.string,
    hentTidslinjer: PropTypes.func,
    fnr: PropTypes.string,
};

export function mapStateToProps(state, ownProps) {
    const ledetekster = state.ledetekster.data;
    const fnr = state.navbruker.data.fnr;
    return {
        valgtArbeidssituasjon: ownProps.valgtArbeidssituasjon,
        fnr,
        arbeidssituasjoner: [{
            tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver', ledetekster),
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: getLedetekst('tidslinje.filter.uten-arbeidsgiver', ledetekster),
            verdi: 'UTEN_ARBEIDSGIVER',
            hjelpetekst: {
                tittel: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tittel', ledetekster),
                tekst: getLedetekst('tidslinje.filter.med-arbeidsgiver.hjelpetekst.tekst', ledetekster),
            },
        }],
    };
}

const TidslinjeVelgArbeidssituasjonContainer = connect(mapStateToProps, { hentTidslinjer })(VelgArbeidssituasjon);

export default TidslinjeVelgArbeidssituasjonContainer;
