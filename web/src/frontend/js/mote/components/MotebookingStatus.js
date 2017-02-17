import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getKlokkeslettFraZulu, getDatoFraZulu, fikkIkkeMoteOpprettetVarsel } from '../utils/index';
import Sidetopp from '../../components/Sidetopp';
import KontaktInfoFeilmelding from './KontaktInfoFeilmelding';
import FlereTidspunktSkjema from '../skjema/FlereTidspunktSkjema';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';

const deltakertyper = {
    arbeidsgiver: 'Arbeidsgiver',
    bruker: 'Arbeidstaker',
    arbeidstaker: 'Arbeidstaker',
};

export const MotetidspunktValgt = ({ bekreftetTidspunkt, ledetekster }) => {
    return <div className="motetidspunktValgt">{getLedetekst('mote.bookingstatus.valgt-sendt-til-parter', ledetekster, {'%TID%': getDatoFraZulu(bekreftetTidspunkt)})}</div>;
};

MotetidspunktValgt.propTypes = {
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

const feilAarsakForklaringFunc = (feilAarsak) => {
    switch (feilAarsak) {
        case 'RESERVERT': {
            return 'motestatus.krr.reservert';
        }
        case 'INGEN_KONTAKTINFORMASJON': {
            return 'motestatus.krr.ingen-kontaktinformasjon';
        }
        default: {
            return '';
        }
    }
};

const MotebookingStatus = ({ ledetekster, arbeidstaker, fnr, mote, avbrytMoteUtenVarsel, senderNyeAlternativ, nyeAlternativFeilet, antallNyeTidspunkt, flereAlternativ, avbrytFlereAlternativ, opprettFlereAlternativ }) => {
    const { alternativer } = mote;
    let { deltakere } = mote;

    deltakere = deltakere.sort((d1, d2) => {
        return d1.type.localeCompare(d2.type);
    });

    const sendtDato = getDatoFraZulu(mote.opprettetTidspunkt);
    const arbeidsgiverDeltaker = deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
    const visVelgTidspunkt = mote.status === 'OPPRETTET' && arbeidsgiverDeltaker && arbeidsgiverDeltaker.svar.filter((svar) => {
        return svar.valgt;
    }).length > 0;

    const aktoer = deltakere.filter((deltaker) => { return deltaker.type === 'Bruker'; })[0];
    const feilmelding = aktoer && fikkIkkeMoteOpprettetVarsel(aktoer);
    let krrFeilAarsak;
    let krrFeilmeldingkey;

    if (feilmelding) {
        deltakere = deltakere
            .filter(deltaker => {
                return deltaker !== aktoer || deltaker.svartTidspunkt != null;
            });
        krrFeilAarsak = arbeidstaker && arbeidstaker.kontaktinfo ? arbeidstaker.kontaktinfo.reservasjon.feilAarsak : '';
        krrFeilmeldingkey = feilAarsakForklaringFunc(krrFeilAarsak);
    }

    const flereTidspunktBoks = antallNyeTidspunkt ?
        <FlereTidspunktSkjema mote={ mote }
                              flereAlternativ={ flereAlternativ }
                              opprettFlereAlternativ={ opprettFlereAlternativ }
                              avbrytFlereAlternativ={ avbrytFlereAlternativ }
                              senderNyeAlternativ = {senderNyeAlternativ}
                              nyeAlternativFeilet = {nyeAlternativFeilet}
                              antallEksisterendeTidspunkter={ mote.alternativer.length }
                              antallNyeTidspunkt={ antallNyeTidspunkt } /> :
        null;

    let sendtTil = getLedetekst('mote.bookingstatus.foresporsel.sendt.til', ledetekster);
    const navneliste = [];
    deltakere.forEach((deltaker) => {
        navneliste.push(deltaker.navn);
    });
    sendtTil += navneliste.join(' og ');
    return (<div>
        <div className="panel">
            <Varselstripe type="suksess">
                <div>
                    <p className="typo-element">{sendtTil}</p>
                    <p className="sist">{getLedetekst('mote.bookingstatus.sendt-dato', ledetekster, {'%DATO%': sendtDato})}</p>
                </div>
            </Varselstripe>
        </div>
        {
            feilmelding && <KontaktInfoFeilmelding feilmeldingkey={krrFeilmeldingkey} ledetekster={ledetekster} />
        }
        <div className="panel">
            <Sidetopp tittel="Status for møteforespørsel" />
            <h4 className="typo-undertittel blokk-s">{getLedetekst('mote.bookingstatus.sted', ledetekster)}</h4>
            <p className="blokk-l">{alternativer[0].sted}</p>
            <table className="motestatus blokk-l">
                <thead>
                <tr>
                    <th/>
                    {
                        deltakere && deltakere
                            .map((deltaker, index) => {
                                return (
                                    <td key={index}>
                                        <th className="motestatus__deltaker" scope="row">
                                            <strong>{deltakertyper[deltaker.type.toLowerCase()]}</strong>
                                            <span>{deltaker.navn}</span>
                                        </th>
                                    </td>);
                            })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    mote.alternativer
                        .map((alternativ, index) => {
                            let className = null;
                            if (mote.valgtAlternativ && alternativ.id === mote.valgtAlternativ.id) {
                                className = 'bekreftetTidspunkt';
                            }

                            let svarkolonne = <td key={arbeidsgiverDeltaker.svar[index].id} />;
                            if (visVelgTidspunkt && arbeidsgiverDeltaker.svar[index].valgt) {
                                svarkolonne = (<td key={arbeidsgiverDeltaker.svar[index].id} >
                                    <Link to={`/sykefravaer/${fnr}/mote/bekreft/${alternativ.id}`} className="js-velg-tidspunkt">{getLedetekst('mote.bookingstatus.velgtidspunkt', ledetekster)}</Link>
                                </td>);
                            } else if ( mote.status === 'BEKREFTET') {
                                svarkolonne = (<td key={alternativ.id}>
                                    {alternativ.id === mote.valgtAlternativ.id && <MotetidspunktValgt bekreftetTidspunkt={mote.bekreftetTidspunkt} ledetekster={ledetekster} />}
                                </td>);
                            }

                            return (<tr key={index}>
                                <th scope="col" className={className} key={index}>
                                    <div className="tabellelement">
                                        {getDatoFraZulu(alternativ.tid)}<br />{getKlokkeslettFraZulu(alternativ.tid)}
                                    </div>
                                </th>
                                {
                                    deltakere.map((deltaker, index2) => {
                                        let className = 'motestatus__svar';
                                        if (mote.valgtAlternativ && deltaker.svar[index].id === mote.valgtAlternativ.id) {
                                            className = 'motestatus__svar motestatus__svar--bekreftetTidspunkt';
                                        }
                                        return (<td key={index2} className={className}>
                                            <MotebookingIkon deltaker={deltaker} index={index} />
                                        </td>);
                                    })
                                }
                                { svarkolonne }
                            </tr>);
                        })

                }
                </tbody>
            </table>
            <button className="js-nyetidspunkt rammeknapp rammeknapp--mini" onClick={() => {
                flereAlternativ();
            }}>{getLedetekst('mote.bookingstatus.knapp.flere-tidspunkt', ledetekster)}</button>
            { flereTidspunktBoks }

            <div className="knapperad-bunn">
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
    ledetekster: PropTypes.object,
    avbrytMoteUtenVarsel: PropTypes.func,
    flereAlternativ: PropTypes.func,
    opprettFlereAlternativ: PropTypes.func,
    avbrytFlereAlternativ: PropTypes.func,
};

export default MotebookingStatus;
