import React, { PropTypes } from 'react';
import { getDatoFraZulu } from '../utils/index';
import Sidetopp from '../../components/Sidetopp';
import KontaktInfoFeilmelding from './KontaktInfoFeilmelding';
import MotebookingStatusTabell from './MotebookingStatusTabell';
import ValgtMoteTidspunkt from './ValgtMoteTidspunkt';
import FlereTidspunktSkjema from '../skjema/FlereTidspunktSkjema';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { fikkIkkeMoteOpprettetVarsel, getLedetekstnokkelFraFeilAarsak } from '../utils/index';

export const MotetidspunktValgt = ({ bekreftetTidspunkt, ledetekster }) => {
    return <div className="motetidspunktValgt">{getLedetekst('mote.bookingstatus.valgt-sendt-til-parter', ledetekster, { '%TID%': getDatoFraZulu(bekreftetTidspunkt) })}</div>;
};

MotetidspunktValgt.propTypes = {
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

const MotebookingStatus = ({ ledetekster, fikkIkkeOpprettetVarsel, fnr, mote, avbrytMoteUtenVarsel, senderNyeAlternativ, nyeAlternativFeilet, antallNyeTidspunkt, flereAlternativ, avbrytFlereAlternativ, opprettFlereAlternativ }) => {
    let { deltakere, alternativer, valgtAlternativ, status, bekreftetTidspunkt } = mote;
    const sendtDato = getDatoFraZulu(mote.opprettetTidspunkt);

    const krrMeldingPanel = fikkIkkeOpprettetVarsel ?
        <KontaktInfoFeilmelding feilmeldingkey={ getLedetekstnokkelFraFeilAarsak(fikkIkkeOpprettetVarsel.resultat)} ledetekster={ledetekster} />
    : null;

    const flereTidspunktBoks = antallNyeTidspunkt ?
        <FlereTidspunktSkjema mote={ mote }
            flereAlternativ={ flereAlternativ }
            opprettFlereAlternativ={ opprettFlereAlternativ }
            avbrytFlereAlternativ={ avbrytFlereAlternativ }
            senderNyeAlternativ = {senderNyeAlternativ}
            nyeAlternativFeilet = {nyeAlternativFeilet}
            antallEksisterendeTidspunkter={ alternativer.length }
            antallNyeTidspunkt={ antallNyeTidspunkt } /> :
        null;

    let sendtTil = getLedetekst('mote.bookingstatus.foresporsel.sendt.til', ledetekster);
    const navneliste = [];
    deltakere.filter((deltaker) => {
        return deltaker.type !== 'Bruker' || !(deltaker.type === 'Bruker' && fikkIkkeMoteOpprettetVarsel(deltaker));
    }).forEach((deltaker) => {
        navneliste.push(deltaker.navn);
    });
    sendtTil += navneliste.join(' og ');

    const tabell = status === 'BEKREFTET' ? <ValgtMoteTidspunkt ledetekster={ledetekster} fnr={fnr} deltakere={deltakere} valgtAlternativ={valgtAlternativ} bekreftetTidspunkt={bekreftetTidspunkt} flereAlternativ={flereAlternativ} /> :
        <MotebookingStatusTabell status={status} deltakere={deltakere} alternativer={alternativer} ledetekster={ledetekster} fnr={fnr} mote={mote} flereAlternativ={flereAlternativ} />;

    return (<div>
        <div className="panel">
            <Varselstripe type="suksess">
                <div>
                    <p className="typo-element">{sendtTil}</p>
                    <p className="sist">{ getLedetekst('mote.bookingstatus.sendt-dato', ledetekster, { '%DATO%': sendtDato }) }</p>
                </div>
            </Varselstripe>
        </div>
        { krrMeldingPanel }
        <div className="panel">
            <Sidetopp tittel={getLedetekst('mote.bookingstatus.sidetittel', ledetekster)} />
            <p className="blokk-l">{getLedetekst('mote.bookingstatus.forklarendetekst', ledetekster)}</p>
            <h4 className="typo-undertittel blokk-s">{getLedetekst('mote.bookingstatus.sted', ledetekster)}</h4>
            <p className="blokk-l">{alternativer[0].sted}</p>

            <h4 className="typo-undertittel blokk-s">{getLedetekst('mote.bookingstatus.motetider', ledetekster)}</h4>
            { tabell }

            { flereTidspunktBoks }

            <div>
                <Link role="button" className="luft__right knapp knapp--mini" to={`/sykefravaer/${fnr}/mote/${mote.moteUuid}/avbryt`}>{getLedetekst('mote.bookingstatus.knapp.avbryt', ledetekster)}</Link>
                <button className="js-ny knapp knapp--mini" onClick={() => {
                    avbrytMoteUtenVarsel(mote.moteUuid, fnr);
                }}>{getLedetekst('mote.bookingstatus.knapp.nytt-tidspunkt', ledetekster)}</button>
            </div>
        </div>
    </div>);
};

MotebookingStatus.propTypes = {
    mote: PropTypes.shape({
        alternativer: PropTypes.arrayOf(PropTypes.shape({
            tid: PropTypes.string,
            sted: PropTypes.string,
        })),
        deltakere: PropTypes.arrayOf(PropTypes.shape({
            navn: PropTypes.string,
            epost: PropTypes.string,
            tidOgSted: PropTypes.array,
            type: PropTypes.string,
        })),
    }),
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
