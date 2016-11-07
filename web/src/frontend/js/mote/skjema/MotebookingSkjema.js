import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../components/TextField';
import Tidspunkter from './Tidspunkter';

export function genererDato(dato, klokkeslett) {
    const s = new Date();
    const datoArr = dato.split('.');
    const klokkeslettArr = klokkeslett.split('.');
    const aar = datoArr[2];
    const aarPadded = aar.length === 2 ? `20${aar}` : aar;
    s.setDate(datoArr[0]);
    s.setMonth(parseInt(datoArr[1], 10) - 1);
    s.setYear(aarPadded);
    s.setHours(klokkeslettArr[0]);
    s.setMinutes(klokkeslettArr[1]);
    s.setSeconds('00');
    s.setMilliseconds('000');
    return s.toJSON();
}

export function getData(values) {
    const deltaker = Object.assign({}, values.deltakere[0], {
        type: 'arbeidsgiver',
    });

    const tidOgStedAlternativer = values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            sted: values.sted,
            valgt: false,
        };
    });

    return {
        tidOgStedAlternativer,
        deltakere: [Object.assign(deltaker, { tidOgSted: tidOgStedAlternativer, avvik: [] })],
    };
}

export const MotebookingSkjema = ({ handleSubmit, opprettMote, fnr, sender, sendingFeilet }) => {
    const submit = (values) => {
        const data = getData(values);
        opprettMote(fnr, data);
    };

    return (<form className="panel" onSubmit={handleSubmit(submit)}>
        <header className="sidetopp">
            <h3 className="sidetopp__tittel">Møteforespørsel</h3>
        </header>

        <fieldset className="blokk--xl js-arbeidsgiver">
            <legend>1. Fyll inn arbeidsgiverens opplysninger</legend>
            <div className="navInput blokk--xl">
                <label htmlFor="navn">Nærmeste leders navn</label>
                <Field id="navn" component={TextField} name="deltakere[0].navn" className="input--xxl" />
            </div>
            <div className="navInput">
                <label htmlFor="epost">E-post</label>
                <Field id="epost" component={TextField} type="email" name="deltakere[0].epost" className="input--xxl" />
            </div>
        </fieldset>

        <fieldset className="blokk--xl">
            <legend>2. Velg dato, tid og sted</legend>
            <Tidspunkter />
            <label htmlFor="sted">Sted</label>
            <Field id="sted" component={TextField} name="sted" className="input--xxl js-sted" placeholder="Skriv møtested eller om det er et videomøte" />
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

        <div className="knapperad">
            <input type="submit" className="knapp" value="Send" disabled={sender} />
        </div>
    </form>);
};

MotebookingSkjema.propTypes = {
    fnr: PropTypes.string,
    skjemaData: PropTypes.object,
    handleSubmit: PropTypes.func,
    opprettMote: PropTypes.func,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
};

function erGyldigEpost(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function erGyldigKlokkeslett(klokkeslett) {
    const re = /^([0-9]|0[0-9]|1[0-9]|2[0-3])\.[0-5][0-9]$/;
    return re.test(klokkeslett);
}

function erGyldigDato(dato) {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(dato);
}

export function validate(values) {
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

    if (lederFeilmelding.navn || lederFeilmelding.epost) {
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

    return feilmeldinger;
}

const ReduxSkjema = reduxForm({
    form: 'opprettMote',
    validate,
})(MotebookingSkjema);

export default ReduxSkjema;
