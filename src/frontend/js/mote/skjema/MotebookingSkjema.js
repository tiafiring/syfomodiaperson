import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import VelgLeder from './VelgLeder';
import Tidspunkter from './Tidspunkter';
import TextField from '../TextField';
import KontaktInfoFeilmelding from '../components/KontaktInfoFeilmelding';
import Sidetopp from '../../components/Sidetopp';
import { genererDato, erGyldigKlokkeslett, erGyldigDato } from '../utils/index';

export const OPPRETT_MOTE_SKJEMANAVN = 'opprettMote';

export function getData(values) {
    const alternativer = values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            sted: values.sted,
        };
    });
    return {
        alternativer,
    };
}

const getLedetekstnokkelFraFeilAarsak = (feilAarsak, ledetekster) => {
    let nokkel;
    switch (feilAarsak) {
        case 'RESERVERT': {
            nokkel = 'motebooking.krr.reservert';
            break;
        }
        case 'KONTAKTINFO_IKKE_FUNNET': {
            nokkel = 'motebooking.krr.ingen-kontaktinformasjon';
            break;
        }
        case 'INGEN_KONTAKTINFORMASJON': {
            nokkel = 'motebooking.krr.ingen-kontaktinformasjon';
            break;
        }
        case 'UTGAATT': {
            nokkel = 'motebooking.krr.utgaatt';
            break;
        }
        default: {
            nokkel = 'mote.krr.generell';
            break;
        }
    }
    return getHtmlLedetekst(nokkel, ledetekster);
};

export class MotebookingSkjema extends Component {
    constructor() {
        super();
        this.state = {
            valgtArbeidsgiver: 'VELG',
        };
    }

    render() {
        const { ledetekster, handleSubmit, arbeidstaker, opprettMote, fnr, sender, sendingFeilet, ledere, valgtEnhet, flereAlternativ, fjernAlternativ, antallNyeTidspunkt } = this.props;
        const submit = (values) => {
            const data = getData(values);
            data.fnr = fnr;
            data.navEnhet = valgtEnhet;
            data.orgnummer = this.state.valgtArbeidsgiver;
            opprettMote(data);
        };
        const feilAarsak = arbeidstaker && arbeidstaker.kontaktinfo ? arbeidstaker.kontaktinfo.feilAarsak : undefined;
        const feilmelding = feilAarsak && getLedetekstnokkelFraFeilAarsak(feilAarsak, ledetekster);
        return (<div>
            { !arbeidstaker.kontaktinfo.skalHaVarsel &&
                <KontaktInfoFeilmelding
                    ledetekster={ledetekster}
                    melding={feilmelding}
                />
            }
            <Sidetopp tittel={getLedetekst('mote.motebookingskjema.overskrift', ledetekster)} />
            <form className="panel" onSubmit={handleSubmit(submit)}>
                <div className="skjema-fieldset js-arbeidsgiver blokk--l">
                    <legend>{getLedetekst('mote.motebookingskjema.arbeidsgivers-opplysninger', ledetekster)}</legend>
                    <VelgLeder
                        ledetekster={ledetekster}
                        ledere={ledere}
                        valgtArbeidsgiver={this.state.valgtArbeidsgiver}
                        velgArbeidsgiver={(orgnummer) => {
                            this.setState({
                                valgtArbeidsgiver: orgnummer,
                            });
                        }}
                    />
                </div>
                <fieldset className="skjema-fieldset blokk">
                    <legend>2. {getLedetekst('mote.motebookingskjema.velg-dato-tid-sted', ledetekster)}</legend>
                    <Tidspunkter antallNyeTidspunkt={antallNyeTidspunkt} skjemanavn={OPPRETT_MOTE_SKJEMANAVN} />
                    <div className="blokk--l">
                        <button type="button" className="lenke" onClick={flereAlternativ} style={{ marginRight: '1em' }}>
                            {getLedetekst('mote.bookingstatus.fleretidspunkt.leggtil', ledetekster)}</button>
                        {
                            antallNyeTidspunkt > 1 && <button type="button" className="lenke" onClick={fjernAlternativ}>Fjern siste</button>
                        }
                    </div>
                    <Field
                        label="Sted"
                        id="sted"
                        component={TextField}
                        name="sted"
                        placeholder="Skriv møtested eller om det er et videomøte" />
                </fieldset>

                <div aria-live="polite" role="alert">
                    { sendingFeilet && <div className="panel panel--ramme">
                        <AlertStripe type="info">
                            <p className="sist">Beklager, det oppstod en feil. Prøv igjen litt senere.</p>
                        </AlertStripe>
                    </div>}
                </div>

                <div className="knapperad blokk">
                    <KnappBase
                        type="hoved"
                        spinner={sender}
                        disabled={sender || this.state.valgtArbeidsgiver === 'VELG'}>
                        Send
                    </KnappBase>
                </div>
            </form>
        </div>);
    }
}

MotebookingSkjema.propTypes = {
    fnr: PropTypes.string,
    valgtEnhet: PropTypes.string,
    handleSubmit: PropTypes.func,
    opprettMote: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    ledere: PropTypes.array,
    ledetekster: PropTypes.object,
    arbeidstaker: PropTypes.object,
    flereAlternativ: PropTypes.func,
    fjernAlternativ: PropTypes.func,
    antallNyeTidspunkt: PropTypes.number,
};

export function validate(values, props) {
    const feilmeldinger = {};
    let tidspunkterFeilmeldinger = [];
    for (let i = 0; i < props.antallNyeTidspunkt; i += 1) {
        tidspunkterFeilmeldinger.push({});
    }

    if (!values.tidspunkter || !values.tidspunkter.length) {
        tidspunkterFeilmeldinger = tidspunkterFeilmeldinger.map(() => {
            return {
                dato: 'Vennligst angi dato',
                klokkeslett: 'Vennligst angi klokkeslett',
            };
        });
        feilmeldinger.tidspunkter = tidspunkterFeilmeldinger;
    } else {
        tidspunkterFeilmeldinger = tidspunkterFeilmeldinger.map((tidspunkt, index) => {
            const tidspunktValue = values.tidspunkter[index];
            const feil = {};
            if (!tidspunktValue || !tidspunktValue.klokkeslett) {
                feil.klokkeslett = 'Vennligst angi klokkeslett';
            } else if (!erGyldigKlokkeslett(tidspunktValue.klokkeslett)) {
                feil.klokkeslett = 'Vennligst angi riktig format; f.eks. 13.00';
            }
            if (!tidspunktValue || !tidspunktValue.dato) {
                feil.dato = 'Vennligst angi dato';
            } else if (!erGyldigDato(tidspunktValue.dato)) {
                feil.dato = 'Vennligst angi riktig datoformat; dd.mm.åååå';
            }
            return feil;
        });
        feilmeldinger.tidspunkter = tidspunkterFeilmeldinger;
    }

    if (!values.sted || values.sted.trim() === '') {
        feilmeldinger.sted = 'Vennligst angi møtested';
    }

    return feilmeldinger;
}

const ReduxSkjema = reduxForm({
    form: OPPRETT_MOTE_SKJEMANAVN,
    validate,
})(MotebookingSkjema);

export default ReduxSkjema;
