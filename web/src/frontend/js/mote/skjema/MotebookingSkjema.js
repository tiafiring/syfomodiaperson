import React, {PropTypes} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import TextField from '../../components/TextField';
import LederFields, {ManuellUtfyltLeder} from './LederFields';
import Tidspunkter from './Tidspunkter';
import KontaktInfoFeilmelding from '../components/KontaktInfoFeilmelding';
import Sidetopp from '../../components/Sidetopp';
import {Varselstripe} from 'digisyfo-npm';
import {genererDato, erGyldigKlokkeslett, erGyldigEpost, erGyldigDato} from '../utils/index';

export function getData(values) {
    const deltaker = Object.assign({}, values.deltakere[0], {
        type: 'arbeidsgiver',
    });

    const alternativer = values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            sted: values.sted,
            valgt: false,
        };
    });

    return {
        alternativer,
        deltakere: [Object.assign(deltaker, {svar: alternativer, avvik: []})],
    };
}

export const Arbeidstaker = ({navn, kontaktinfo}) => {
    return (<div className="arbeidstakersOpplysninger skjema-fieldset blokk--xl">
        <legend>2. Arbeidstakers opplysninger</legend>
        <div className="nokkelopplysning">
            <h4>Navn</h4>
            <p>{navn}</p>
        </div>
        <div className="nokkelopplysning">
            <h4>E-post</h4>
            <p>{kontaktinfo.epost}</p>
        </div>
        <div className="nokkelopplysning">
            <h4>Telefon</h4>
            <p className="sist">{kontaktinfo.tlf}</p>
        </div>
    </div>);
};

Arbeidstaker.propTypes = {
    navn: PropTypes.string,
    kontaktinfo: PropTypes.object,
};

export const MotebookingSkjema = ({
    handleSubmit, arbeidstaker, opprettMote, fnr, sender, sendingFeilet, ledere,
    autofill, untouch, hentLedereFeiletBool
}) => {
    const submit = (values) => {
        const data = getData(values);
        data.fnr = fnr;
        opprettMote(data);
    };

    const visArbeidstaker = arbeidstaker && arbeidstaker.kontaktinfo && arbeidstaker.kontaktinfo.reservasjon.skalHaVarsel;
    const feilAarsak = arbeidstaker && arbeidstaker.kontaktinfo ? arbeidstaker.kontaktinfo.reservasjon.feilAarsak : '';

    return (<div>
        { !visArbeidstaker && <KontaktInfoFeilmelding feilAarsak={feilAarsak}/> }
        <form className="panel" onSubmit={handleSubmit(submit)}>
            <Sidetopp tittel="Møteforespørsel"/>

            {
                hentLedereFeiletBool && <div className="blokk">
                    <Varselstripe>
                        <p>Beklager, det oppstod en feil ved uthenting av nærmeste leder. Du kan likevel sende
                            møteforespøsel.</p>
                    </Varselstripe>
                </div>
            }

            <fieldset className="skjema-fieldset js-arbeidsgiver blokk--l">
                <legend>1. Fyll inn arbeidsgiverens opplysninger</legend>
                {
                    ledere.length > 0 && <Fields
                        autofill={autofill}
                        untouch={untouch}
                        names={['arbeidsgiverType', 'deltakere[0].navn', 'deltakere[0].epost', 'deltakere[0].orgnummer']}
                        ledere={ledere}
                        component={LederFields}/>
                }
                {
                    ledere.length === 0 && <ManuellUtfyltLeder />
                }
            </fieldset>
            {
                visArbeidstaker && <Arbeidstaker {...arbeidstaker} />
            }
            <fieldset className="skjema-fieldset blokk">
                <legend>{visArbeidstaker ? '3.' : '2.'} Velg dato, tid og sted</legend>
                <Tidspunkter />
                <label htmlFor="sted">Sted</label>
                <Field id="sted" component={TextField} name="sted" className="input--xxl js-sted"
                       placeholder="Skriv møtested eller om det er et videomøte"/>
            </fieldset>

            <div aria-live="polite" role="alert">
                { sendingFeilet && <div className="panel panel--ramme">
                    <div className="varselstripe varselstripe--feil">
                        <div className="varselstripe__ikon">
                            <img src="/sykefravaer/img/svg/utropstegn.svg"/>
                        </div>
                        <p className="sist">Beklager, det oppstod en feil. Prøv igjen litt senere.</p>
                    </div>
                </div>}
            </div>

            <div className="knapperad blokk">
                <input type="submit" className="knapp" value="Send" disabled={sender}/>
            </div>
        </form>
    </div>);
};

MotebookingSkjema.propTypes = {
    fnr: PropTypes.string,
    handleSubmit: PropTypes.func,
    opprettMote: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    ledere: PropTypes.array,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    hentLedereFeiletBool: PropTypes.bool,
    arbeidstaker: PropTypes.object,
};

export function validate(values, props) {
    const feilmeldinger = {};
    const lederFeilmelding = {};
    let tidspunkterFeilmeldinger = [{}, {}];

    if (!values.deltakere || !values.deltakere[0] || !values.deltakere[0].navn) {
        lederFeilmelding.navn = 'Vennligst fyll ut nærmeste leders navn';
    }

    if (!values.deltakere || !values.deltakere[0] || !values.deltakere[0].epost) {
        lederFeilmelding.epost = 'Vennligst fyll ut nærmeste leders e-post-adresse';
    } else if (!erGyldigEpost(values.deltakere[0].epost)) {
        lederFeilmelding.epost = 'Vennligst fyll ut en gyldig e-post-adresse';
    }

    if ((!values.arbeidsgiverType || values.arbeidsgiverType === 'manuell') && values.deltakere && values.deltakere[0].orgnummer &&
        (values.deltakere[0].orgnummer.length !== 9 || isNaN(values.deltakere[0].orgnummer))) {
        lederFeilmelding.orgnummer = 'Et orgnummer består av 9 siffer';
    }

    if (lederFeilmelding.navn || lederFeilmelding.epost || lederFeilmelding.orgnummer) {
        feilmeldinger.deltakere = [lederFeilmelding];
    }

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

    if (values.arbeidsgiverType === 'VELG' || (props.ledere.length > 0 && !values.arbeidsgiverType)) {
        feilmeldinger.arbeidsgiverType = 'Vennligst velg arbeidsgiver';
    }

    return feilmeldinger;
}

const ReduxSkjema = reduxForm({
    form: 'opprettMote',
    validate,
})(MotebookingSkjema);

export default ReduxSkjema;
