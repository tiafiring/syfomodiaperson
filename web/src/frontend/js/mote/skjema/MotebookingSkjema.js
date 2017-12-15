import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../components/TextField';
import VelgLeder from './VelgLeder';
import Tidspunkter from './Tidspunkter';
import KontaktInfoFeilmelding from '../components/KontaktInfoFeilmelding';
import Sidetopp from '../../components/Sidetopp';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
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
        case 'INGEN_KONTAKTINFORMASJON': {
            nokkel = 'motebooking.krr.ingen-kontaktinformasjon';
            break;
        }
        case 'UTGAATT': {
            nokkel = 'motebooking.krr.utgaatt';
            break;
        }
        default: {
            nokkel = '';
            break;
        }
    }
    if (nokkel !== '') {
        return getHtmlLedetekst(nokkel, ledetekster);
    }
    return '';
};

export class MotebookingSkjema extends Component {
    constructor() {
        super();
        this.state = {
            valgtArbeidsgiver: 'VELG',
        };
    }

    render() {
        const { ledetekster, handleSubmit, arbeidstaker, opprettMote, fnr, sender, sendingFeilet, ledere, valgtEnhet } = this.props;
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
            { !arbeidstaker.kontaktinfo.skalHaVarsel && <KontaktInfoFeilmelding melding={feilmelding} ledetekster={ledetekster} /> }
            <form className="panel" onSubmit={handleSubmit(submit)}>
                <Sidetopp tittel={getLedetekst('mote.motebookingskjema.overskrift', ledetekster)} />
                <div className="skjema-fieldset js-arbeidsgiver blokk--l">
                    <legend>{getLedetekst('mote.motebookingskjema.arbeidsgivers-opplysninger', ledetekster)}</legend>
                    <VelgLeder ledetekster={ledetekster} ledere={ledere} valgtArbeidsgiver={this.state.valgtArbeidsgiver}
                        velgArbeidsgiver={(orgnummer) => {
                            this.setState({
                                valgtArbeidsgiver: orgnummer,
                            });
                        }}
                    />
                </div>
                <fieldset className="skjema-fieldset blokk">
                    <legend>2. {getLedetekst('mote.motebookingskjema.velg-dato-tid-sted', ledetekster)}</legend>
                    <Tidspunkter skjemanavn={OPPRETT_MOTE_SKJEMANAVN} />
                    <label htmlFor="sted">Sted</label>
                    <Field id="sted" component={TextField} name="sted" className="input--xxl js-sted"
                        placeholder="Skriv møtested eller om det er et videomøte" />
                </fieldset>

                <div aria-live="polite" role="alert">
                    { sendingFeilet && <div className="panel panel--ramme">
                        <div className="varselstripe varselstripe--feil">
                            <div className="varselstripe__ikon">
                                <img src="/sykefravaer/img/svg/utropstegn.svg" />
                            </div>
                            <p className="sist">Beklager, det oppstod en feil. Prøv igjen litt senere.</p>
                        </div>
                    </div>}
                </div>

                <div className="knapperad blokk">
                    <button
                        type="submit"
                        className="knapp"
                        disabled={sender || this.state.valgtArbeidsgiver === 'VELG'}>
                        Send
                        { sender && <span className="knapp__spinner" /> }
                    </button>
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
};

export function validate(values) {
    const feilmeldinger = {};
    let tidspunkterFeilmeldinger = [{}, {}];
    if (!values.tidspunkter || !values.tidspunkter.length) {
        tidspunkterFeilmeldinger = [{
            dato: 'Vennligst angi dato',
            klokkeslett: 'Vennligst angi klokkeslett',
        }, {
            dato: 'Vennligst angi dato',
            klokkeslett: 'Vennligst angi klokkeslett',
        }];
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
    }

    if (JSON.stringify(tidspunkterFeilmeldinger) !== JSON.stringify([{}, {}])) {
        feilmeldinger.tidspunkter = tidspunkterFeilmeldinger;
    }

    if (!values.sted || values.sted.trim() === '') {
        feilmeldinger.sted = 'Vennligst angi møtested';
    }

    if (values.orgnummer === 'VELG') {
        feilmeldinger.orgnummer = 'Vennligst velg arbeidsgiver';
    }

    return feilmeldinger;
}

const ReduxSkjema = reduxForm({
    form: OPPRETT_MOTE_SKJEMANAVN,
    validate,
})(MotebookingSkjema);

export default ReduxSkjema;
