import React, { PropTypes } from 'react';
import Tidspunkter from './Tidspunkter';
import { reduxForm } from 'redux-form';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import { genererDato, erGyldigKlokkeslett, erGyldigDato } from '../utils';

const FLERE_TIDSPUNKTER_SKJEMANAVN = 'flereAlternativ';

export const getData = (values) => {
    return values.tidspunkter.map((tidspunkt) => {
        return {
            tid: genererDato(tidspunkt.dato, tidspunkt.klokkeslett),
            valgt: false,
        };
    });
};

export const dekorerMedSted = (data, sted) => {
    return data.map((alternativ) => {
        return Object.assign({}, alternativ, { sted });
    });
};

const Feilmelding = () => {
    return (<div className="blokk">
        <Varselstripe type="feil">
            <p>Beklager, det oppstod en feil. Prøv igjen senere!</p>
        </Varselstripe>
    </div>);
};

export const FlereTidspunktSkjema = (props) => {
    const {
        ledetekster,
        mote,
        antallNyeTidspunkt,
        opprettFlereAlternativ,
        senderNyeAlternativ,
        nyeAlternativFeilet,
        flereAlternativ,
        avbrytFlereAlternativ,
        handleSubmit } = props;
    let nyeTidspunktListe = [];
    for (let i = 0; i < antallNyeTidspunkt; i++) {
        nyeTidspunktListe.push(i);
    }
    const submit = (values) => {
        const data = dekorerMedSted(getData(values), mote.alternativer[0].sted);
        opprettFlereAlternativ(data, mote.moteUuid);
    };

    return (
        <div className="fleretidspunkt">
            <form onSubmit={handleSubmit(submit)}>
                <Tidspunkter tidspunker={nyeTidspunktListe} skjemanavn={FLERE_TIDSPUNKTER_SKJEMANAVN} />
                <div className="blokk--l">
                    <button type="button" className="lenke" onClick={flereAlternativ}>
                    {getLedetekst('mote.bookingstatus.fleretidspunkt.leggtil', ledetekster)}</button>
                </div>
                {
                    nyeAlternativFeilet && <Feilmelding />
                }
                <button
                    type="submit"
                    className="knapp knapp--enten"
                    disabled={senderNyeAlternativ}>
                    {`${getLedetekst('mote.bookingstatus.fleretidspunkt.send', ledetekster)}`}
                    { senderNyeAlternativ && <span className="knapp__spinner" /> }
                </button>
                <button type="button" className="lenke" onClick={() => { avbrytFlereAlternativ(); }}>{getLedetekst('mote.bookingstatus.fleretidspunkt.avbryt', ledetekster)}</button>
            </form>
        </div>
    );
};

FlereTidspunktSkjema.propTypes = {
    mote: PropTypes.object,
    ledetekster: PropTypes.object,
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
    let tidspunkterFeilmeldinger = [];
    for (let i = 0; i < props.antallNyeTidspunkt; i++) {
        tidspunkterFeilmeldinger.push({});
    }

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
    form: FLERE_TIDSPUNKTER_SKJEMANAVN,
    validate,
})(FlereTidspunktSkjema);

export default ReduxSkjema;
