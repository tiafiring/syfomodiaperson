import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import TextField from '../../components/TextField';
import { connect } from 'react-redux';
import * as virksomhetActions from '../actions/virksomhet_actions';
import { getLedetekst } from 'digisyfo-npm';


export const parseOrgnummer = (orgnummer) => {
    return orgnummer.replace(/\D/g, '').substr(0, 9);
};

export class FyllUtVirksomhet extends Component {
    componentDidUpdate(prevProps) {
        const { orgnummer, henter, hentVirksomhet } = this.props;
        if (orgnummer.length === 9 && orgnummer !== prevProps.orgnummer && !henter) {
            hentVirksomhet(orgnummer);
        }
    }

    render() {
        const { ledetekster, virksomhetsnavn, erFeil, henter } = this.props;
        let className = 'input--m';
        if (erFeil) {
            className += ' input--feil';
        }
        return (<div className="navInput blokk">
            <label htmlFor="js-orgnummer">{getLedetekst('mote.bookingskjema.fyllutvirksomhet.orgnummer.valgfritt', ledetekster)}</label>
            <Field id="js-orgnummer" component={TextField} type="text" name="deltakere[0].orgnummer" className={className}
                parse={(nr) => {
                    return parseOrgnummer(nr);
                }} />
            {
                !erFeil && virksomhetsnavn && <p>{virksomhetsnavn}</p>
            }
            {
                henter && <p className="js-henter">{getLedetekst('mote.bookingskjema.fyllutvirksomhet.orgnummer.henter', ledetekster)}</p>
            }
            <p className="skjema__feilmelding js-feilmelding" role="alert" aria-live="polite">{erFeil && !henter && getLedetekst('mote.bookingskjema.fyllutvirksomhet.orgnummer.feilmelding', ledetekster)}</p>
        </div>);
    }
}

FyllUtVirksomhet.propTypes = {
    virksomhetsnavn: PropTypes.string,
    erFeil: PropTypes.bool,
    henter: PropTypes.bool,
    orgnummer: PropTypes.string,
    ledetekster: PropTypes.object,
    hentVirksomhet: PropTypes.func,
};

const mapStateToProps = (state) => {
    const orgnummer = state.form.opprettMote.values && state.form.opprettMote.values.deltakere && state.form.opprettMote.values.deltakere[0] && state.form.opprettMote.values.deltakere[0].orgnummer ? state.form.opprettMote.values.deltakere[0].orgnummer : '';
    const virksomheter = state.virksomhet.data;

    return {
        orgnummer,
        henter: state.virksomhet.henter || state.ledetekster.henter,
        ledetekster: state.ledetekster.data,
        virksomhetsnavn: virksomheter[orgnummer],
        erFeil: virksomheter[orgnummer] === 'Fant ikke navn',
    };
};

const FyllUtVirksomhetContainer = connect(mapStateToProps, virksomhetActions)(FyllUtVirksomhet);

export default FyllUtVirksomhetContainer;
