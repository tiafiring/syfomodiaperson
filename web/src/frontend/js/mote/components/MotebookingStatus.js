import React, { PropTypes } from 'react';
import { getDatoFraZulu, fikkIkkeMoteOpprettetVarsel } from '../utils';
import Sidetopp from '../../components/Sidetopp';
import KontaktInfoFeilmelding from './KontaktInfoFeilmelding';
import BekreftetMotetidspunkt from './BekreftetMotetidspunkt';
import FlereTidspunktSkjema from '../skjema/FlereTidspunktSkjema';
import { Varselstripe, getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { proptypes as moterPropTypes } from 'moter-npm';
import Svarstatus from './Svarstatus';

export const MotetidspunktValgt = ({ bekreftetTidspunkt, ledetekster }) => {
    return <div className="motetidspunktValgt">{getLedetekst('mote.bookingstatus.valgt-sendt-til-parter', ledetekster, { '%TID%': getDatoFraZulu(bekreftetTidspunkt) })}</div>;
};

const BEKREFTET = 'BEKREFTET';
const OPPRETTET = 'OPPRETTET';

MotetidspunktValgt.propTypes = {
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

const getLedetekstFraFeilAarsak = (feilAarsak, ledetekster) => {
    let nokkel;
    switch (feilAarsak) {
        case 'RESERVERT': {
            nokkel = 'motestatus.krr.reservert';
            break;
        }
        case 'INGEN_KONTAKTINFORMASJON': {
            nokkel = 'motestatus.krr.ingen-kontaktinformasjon';
            break;
        }
        case 'UTGAATT': {
            nokkel = 'motestatus.krr.utgaatt';
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

const getSendtTilTekst = (mote, ledetekster) => {
    const navneliste = mote.deltakere.filter((deltaker) => {
        return deltaker.type !== 'Bruker' || !(deltaker.type === 'Bruker' && fikkIkkeMoteOpprettetVarsel(deltaker));
    }).map((deltaker) => {
        return deltaker.navn;
    });
    const nokkel = mote.status === OPPRETTET ? 'mote.bookingstatus.foresporsel.sendt.til' : 'mote.bookingstatus.bekreftet.sendt-til';
    return getLedetekst(nokkel, ledetekster, {
        '%DELTAKERE%': navneliste.join(' og '),
    });
};

export const StatusVarsel = ({ mote, ledetekster }) => {
    const dato = mote.status === OPPRETTET ? mote.opprettetTidspunkt : mote.bekreftetTidspunkt;
    return (<div className="panel">
        <Varselstripe type="suksess">
            <div>
                <p className="typo-element">{getSendtTilTekst(mote, ledetekster)}</p>
                <p className="sist">{getLedetekst('mote.bookingstatus.sendt-dato', ledetekster, {
                    '%DATO%': getDatoFraZulu(dato),
                })}</p>
            </div>
        </Varselstripe>
    </div>);
};

StatusVarsel.propTypes = {
    mote: moterPropTypes.mote,
    ledetekster: PropTypes.object,
};

const MotebookingStatus = (props) => {
    const { ledetekster, fikkIkkeOpprettetVarsel, fnr, mote, avbrytMoteUtenVarsel, antallNyeTidspunkt } = props;
    const { alternativer, status } = mote;
    const krrMeldingPanel = fikkIkkeOpprettetVarsel ?
        <KontaktInfoFeilmelding melding={getLedetekstFraFeilAarsak(fikkIkkeOpprettetVarsel.resultat, ledetekster)} />
    : null;
    const flereTidspunktBoks = antallNyeTidspunkt ? <FlereTidspunktSkjema {...props} antallEksisterendeTidspunkter={alternativer.length} /> : null;
    const sidetoppNokkel = mote.status === OPPRETTET ? 'mote.bookingstatus.sidetittel' : 'mote.bookingstatus.bekreftet.tittel';
    return (<div>
        <StatusVarsel mote={mote} ledetekster={ledetekster} />
        {krrMeldingPanel}
        <div className="panel">
            <Sidetopp tittel={getLedetekst(sidetoppNokkel, ledetekster)} />
            { status === BEKREFTET && <BekreftetMotetidspunkt {...props} /> }
            { status !== BEKREFTET && <Svarstatus {...props}>{flereTidspunktBoks}</Svarstatus> }
            <div className="motested">
                <h3 className="motested__tittel">{getLedetekst('mote.bookingstatus.sted', ledetekster)}</h3>
                <p className="motested__sted">{mote.alternativer[0].sted}</p>
            </div>
            <div className="knapperad">
                <Link role="button" className="knapp knapp--enten js-avbryt" to={`/sykefravaer/${fnr}/mote/${mote.moteUuid}/avbryt`}>{getLedetekst('mote.bookingstatus.knapp.avbryt', ledetekster)}</Link>
                <button className="js-ny knapp" onClick={() => {
                    avbrytMoteUtenVarsel(mote.moteUuid, fnr);
                }}>{getLedetekst('mote.bookingstatus.knapp.nytt-tidspunkt', ledetekster)}</button>
            </div>
        </div>
    </div>);
};

MotebookingStatus.propTypes = {
    mote: moterPropTypes.mote,
    antallNyeTidspunkt: PropTypes.number,
    fnr: PropTypes.string,
    arbeidstaker: PropTypes.object,
    senderNyeAlternativ: PropTypes.bool,
    nyeAlternativFeilet: PropTypes.bool,
    fikkIkkeOpprettetVarsel: PropTypes.object,
    ledetekster: PropTypes.object,
    avbrytMoteUtenVarsel: PropTypes.func,
    flereAlternativ: PropTypes.func,
    opprettFlereAlternativ: PropTypes.func,
    avbrytFlereAlternativ: PropTypes.func,
};

export default MotebookingStatus;
