import React, { PropTypes } from 'react';
import Tidspunkter from '../skjema/Tidspunkter';
import { reduxForm } from 'redux-form';
import { genererDato, erGyldigKlokkeslett, erGyldigDato } from '../utils/index';

export function getData(values) {
    const alternativer = values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            sted: values.sted,
            valgt: false,
        };
    });

    return {
        alternativer,
    };
}

const FlereTidspunktSkjema = ({ mote, antallEksisterendeTidspunkter, antallNyeTidspunkt, opprettFlereAlternativ, senderNyeAlternativ,
    nyeAlternativFeilet, flereAlternativ, avbrytFlereAlternativ, handleSubmit }) => {
    let nyeTidspunktListe = [];
    for (let i = 0; i < antallNyeTidspunkt; i++) {
        nyeTidspunktListe.push(i);
    }
    const submit = (values) => {
        const data = getData(values);
        data.alternativer.map((alternativ) => {
            alternativ.sted = mote.alternativer[0].sted;
            return alternativ;
        });
        opprettFlereAlternativ(data, mote.moteUuid);
    };

    return (
        <div className="fleretidspunkt">
            <form onSubmit={handleSubmit(submit)}>
                <Tidspunkter tidspunktNummerOffset={antallEksisterendeTidspunkter} tidspunker={nyeTidspunktListe} />
                <div>
                    <button type="button" className="tekst-knapp" onClick={() => { flereAlternativ(); }}>Flere alternativ +</button>
                </div>
                {
                    nyeAlternativFeilet && <p>Det skjedde en feil! Prøv igjen senere!</p>
                }
                <input type="submit" className="knapp" value="Send" disabled={senderNyeAlternativ} />
                <button type="button" className="tekst-knapp" onClick={() => { avbrytFlereAlternativ(); }}>Avbryt</button>
            </form>
        </div>
    );
};

FlereTidspunktSkjema.propTypes = {
    mote: PropTypes.object,
    antallEksisterendeTidspunkter: PropTypes.number,
    antallNyeTidspunkt: PropTypes.number,
    flereAlternativ: PropTypes.func,
    nyeAlternativFeilet: PropTypes.bool,
    senderNyeAlternativ: PropTypes.bool,
    opprettFlereAlternativ: PropTypes.func,
    handleSubmit: PropTypes.func,
    avbrytFlereAlternativ: PropTypes.func,
};

export function validate(values, props) {
    const feilmeldinger = {};
    let tidspunkterFeilmeldinger = Array.apply(null, Array(props.antallNyeTidspunkt)).map(() => {
    });

    if (!values.tidspunkter || !values.tidspunkter.length) {
        tidspunkterFeilmeldinger = tidspunkterFeilmeldinger.map(() => {
            return {
                dato: 'Vennligst angi dato',
                klokkeslett: 'Vennligst angi klokkeslett',
            };
        });
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

    return feilmeldinger;
}

const ReduxSkjema = reduxForm({
    form: 'flereAlternativ',
    validate,
})(FlereTidspunktSkjema);

export default ReduxSkjema;
