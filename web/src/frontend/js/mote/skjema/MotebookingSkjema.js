import React, { PropTypes } from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
import TextField from '../../components/TextField';
import LederFields, { FyllUtLeder } from './LederFields';
import Tidspunkter from './Tidspunkter';
import Sidetopp from '../../components/Sidetopp';
import { Varselstripe } from 'digisyfo-npm';

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

    const alternativer = values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            sted: values.sted,
            valgt: false,
        };
    });

    return {
        alternativer,
        deltakere: [Object.assign(deltaker, { svar: alternativer, avvik: [] })],
    };
}

export const MotebookingSkjema = ({ handleSubmit, opprettMote, fnr, sender, sendingFeilet, ledere,
    virksomhet, autofill, untouch, hentLedereFeiletBool, hentVirksomhet, nullstillVirksomhet }) => {
    const submit = (values) => {
        const data = getData(values);
        data.fnr = fnr;
        opprettMote(data);
    };

    return (<form className="panel" onSubmit={handleSubmit(submit)}>
        <Sidetopp tittel="Møteforespørsel" />

        {
            hentLedereFeiletBool && <div className="blokk--xl">
                <Varselstripe>
                    <p>Beklager, det oppstod en feil ved uthenting av nærmeste leder. Du kan likevel sende møteforespøsel.</p>
                </Varselstripe>
            </div>
        }

        <fieldset className="skjema-fieldset blokk--xl js-arbeidsgiver">
            <legend>1. Fyll inn arbeidsgiverens opplysninger</legend>
            {
                ledere.length > 0 && <Fields
                    autofill={autofill}
                    untouch={untouch}
                    names={['arbeidsgiverType', 'deltakere[0].navn', 'deltakere[0].epost', 'deltakere[0].orgnummer']}
                    ledere={ledere}
                    virksomhet={virksomhet}
                    nullstillVirksomhet={nullstillVirksomhet}
                    hentVirksomhet={hentVirksomhet}
                    component={LederFields} />
            }
            {
                ledere.length === 0 && <FyllUtLeder virksomhet={virksomhet} hentVirksomhet={hentVirksomhet} nullstillVirksomhet={nullstillVirksomhet} />
            }
        </fieldset>

        <fieldset className="skjema-fieldset blokk--xl">
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
    ledere: PropTypes.array,
    virksomhet: PropTypes.string,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
    hentLedereFeiletBool: PropTypes.bool,
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
