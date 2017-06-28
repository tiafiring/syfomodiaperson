import React, { PropTypes } from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';


const opprettetStatusLinje = (navn, dato) => {
    return <p>{`${navn} opprettet denne versjonen ${toDatePrettyPrint(dato)}`}</p>;
};

const godkjentStatusLinje = (navn, dato) => {
    return <p>{`${navn} godkjente denne versjonen ${toDatePrettyPrint(dato)}`}</p>;
};

const OppfoelgingsplanVisning = ({ oppfoelgingsdialog, ledetekster = {} }) => {
    const sykmeldtOpprettetVersjon = oppfoelgingsdialog.godkjentDatoArbeidsgiver > oppfoelgingsdialog.godkjentDatoArbeidstaker;
    const arbeidsoppgaverKanGjennomfoeres = oppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return !arbeidsoppgave.gjennomfoering.kanGjennomfoeres || arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'KAN';
    });
    const arbeidsoppgaverKanIkkeGjennomfoeres = oppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'KAN_IKKE';
    });
    const arbeidsoppgaverKanGjennomfoeresMedTilrettelegging = oppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'TILRETTELEGGING';
    });

    return (<div><div className="panel oppfoelgingsdialogvisning">
        <header className="oppfoelgingsdialog__header blokk--xl">
            <div>
               <h1>{'Oppfølgingsplanen'}</h1>
                <p>{`Mellom ${oppfoelgingsdialog.arbeidstaker.navn} og ${oppfoelgingsdialog.arbeidsgiver.navn}`}</p>
            </div>
            <div>
                <label className="oppfoelgingsplan__infotekst">{`Gyldig: ${toDatePrettyPrint(oppfoelgingsdialog.godkjentFom)} - ${toDatePrettyPrint(oppfoelgingsdialog.godkjentTom)}`}</label>
                <label className="oppfoelgingsplan__infotekst">{`Evalueres: ${toDatePrettyPrint(oppfoelgingsdialog.godkjentEvalueres)}`}</label>
            </div>
        </header>
        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo__header">
                <h2>Om denne versjonen av planen</h2>
            </div>
            <div className="oppfoelgingsplan__statuslinjer blokk--s">
                <div className="oppfoelgingsplan__statuslinje">
                    <img className="ikon--lite" src="/sykefravaer/img/svg/status--kan.svg" />
                    { sykmeldtOpprettetVersjon ? opprettetStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, oppfoelgingsdialog.godkjentDatoArbeidstaker) : opprettetStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, oppfoelgingsdialog.godkjentDatoArbeidsgiver)}
                </div>
                <div className="oppfoelgingsplan__statuslinje">
                    <img className="ikon--lite" src="/sykefravaer/img/svg/status--kan.svg" />
                    { sykmeldtOpprettetVersjon ? godkjentStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, oppfoelgingsdialog.godkjentDatoArbeidsgiver) : godkjentStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, oppfoelgingsdialog.godkjentDatoArbeidstaker)}
                </div>
            </div>
        </section>
        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Den sykmeldtes kontaktinfo</h2>
                </div>

            </div>
            <table>
                <tr>
                    <th>Navn</th>
                    <th>Fødselsnummer</th>
                </tr>
                <tr>
                    <td>{oppfoelgingsdialog.arbeidstaker.navn}</td>
                    <td>{oppfoelgingsdialog.arbeidstaker.fnr}</td>
                </tr>
            </table>

            <table>
                <tr>
                    <th>Telefonnummer</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td>{oppfoelgingsdialog.arbeidstaker.tlf}</td>
                    <td>{oppfoelgingsdialog.arbeidstaker.email}</td>
                </tr>
            </table>
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Arbeidsgiverens kontaktinfo</h2>
                </div>
            </div>
            <table>
                <tr>
                    <th>Bedriftens navn</th>
                    <th>Navn på nærmeste leder</th>
                </tr>
                <tr>
                    <td>{oppfoelgingsdialog.virksomhetsnavn}</td>
                    <td>{oppfoelgingsdialog.arbeidsgiver.navn}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th>Organisasjonsnummer</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td>{oppfoelgingsdialog.virksomhetsnummer}</td>
                    <td>{oppfoelgingsdialog.arbeidsgiver.email}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th></th>
                    <th>Telefonnummer</th>
                </tr>
                <tr>
                    <td></td>
                    <td>{oppfoelgingsdialog.arbeidsgiver.tlf}</td>
                </tr>
            </table>
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Arbeidsoppgaver</h2>
                </div>
            </div>
            { oppfoelgingsdialog.arbeidsoppgaveListe.length === 0 ? <p>Det er ikke lagt til noen arbeidsoppgaver</p> : null }
            { arbeidsoppgaverKanGjennomfoeres.length > 0 ?
                <div className="blokk--l">
                    <h3 className="typo-element">Arbeidsoppgaver som kan gjøres som normalt</h3>
                    {
                        arbeidsoppgaverKanGjennomfoeres.map((arbeidsoppgave, index) => {
                            return (<div className="panel--ok panel--arbeidsoppgave blokk--s" key={index}>
                                <h4 className="typo-element">{arbeidsoppgave.arbeidsoppgavenavn}</h4>
                            </div>);
                        })
                    }
                </div> : null
            }

            { arbeidsoppgaverKanGjennomfoeresMedTilrettelegging.length > 0 ?
                <div className="blokk--l">
                    <h3 className="typo-element">Arbeidsoppgaver som kan gjennomføres med hjelp/hjelpemiddel</h3>
                    {
                        arbeidsoppgaverKanGjennomfoeresMedTilrettelegging.map((arbeidsoppgave, index) => {
                            return (<div className="panel--maybe panel--arbeidsoppgave blokk--s" key={index}>
                                <h4 className="typo-bold">{arbeidsoppgave.arbeidsoppgavenavn}</h4>
                                {
                                    arbeidsoppgave.paaAnnetSted && <p className="tilretteleggesbools">På annet sted</p>
                                }
                                {
                                    arbeidsoppgave.medMerTid && <p className="tilretteleggesbools">Med mer tid</p>
                                }
                                {
                                    arbeidsoppgave.medHjelp && <p className="tilretteleggesbools">Med hjelp</p>
                                }
                                <label>{oppfoelgingsdialog.arbeidstaker.navn}:</label>
                                <p>"{arbeidsoppgave.gjennomfoering.kanBeskrivelse}"</p>
                            </div>);
                        })
                    }
                </div> : null
            }

            { arbeidsoppgaverKanIkkeGjennomfoeres.length > 0 ?
                <div className="blokk--l">
                    <h3 className="typo-element">Arbeidsoppgaver som ikke kan gjøres som normalt</h3>
                    {
                        arbeidsoppgaverKanIkkeGjennomfoeres.map((arbeidsoppgave, index) => {
                            return (<div className="panel--not panel--arbeidsoppgave blokk--s" key={index}>
                                <h4 className="typo-element">{arbeidsoppgave.arbeidsoppgavenavn}</h4>
                                <label>{oppfoelgingsdialog.arbeidstaker.navn}:</label>
                                <p>"{arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse}"</p>
                            </div>);
                        })
                    }
                </div> : null
            }
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Tiltak</h2>
                </div>
            </div>
            {oppfoelgingsdialog.tiltakListe.map((tiltak, index) => {
                return (<div key={index}>
                    <div className="panel--tiltak blokk--s">
                        <h4 className="typo-element">{tiltak.tiltaknavn}</h4>
                        <label>{tiltak.opprettetAv.navn}:</label>
                        <label>"{tiltak.beskrivelse}"</label>
                    </div>
                </div>);
            })}
            {
                oppfoelgingsdialog.tiltakListe.length === 0 ? <p>Det er ikke registrert noen tiltak.</p> : null
            }
        </section>
    </div>
        <div className="oppfoelgingsdialog__visning__lastnedlenke">
            <a href={`/oppfoelgingsdialogrest/api/dokument/${oppfoelgingsdialog.oppfoelgingsdialogId}/versjon/${oppfoelgingsdialog.versjon}`}>
                <button className="rammeknapp">LAST NED</button>
            </a>
        </div>
    </div>);
};

OppfoelgingsplanVisning.propTypes = {
    oppfoelgingsdialog: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default OppfoelgingsplanVisning;
