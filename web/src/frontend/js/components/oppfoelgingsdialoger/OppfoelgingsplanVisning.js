import React, { PropTypes } from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';

const gjennomFoeringArbeidsoppgave = (gjennomfoering) => {
    if (gjennomfoering.kanGjennomfoeres === 'KAN') {
        return (<div>Kan gjennomføres</div>);
    } else if (gjennomfoering.kanGjennomfoeres === 'KAN_IKKE') {
        return (<div>Arbeidsoppgaven kan ikke gjennomføres.<div>"{gjennomfoering.kanIkkeBeskrivelse}"</div></div>);
    } else if (gjennomfoering.kanGjennomfoeres === 'TILRETTELEGGING') {
        return (<div>Kan gjennomføres med tilrettelegging.
            {gjennomfoering.paaAnnetSted ? <div className="oppfoelgingsplan__arbeidsoppgave__gjennomfoering--inntrykk">På annet sted</div> : null}
            {gjennomfoering.medMerTid ? <div className="oppfoelgingsplan__arbeidsoppgave__gjennomfoering--inntrykk">Med mer tid</div> : null}
            {gjennomfoering.medHjelp ? <div className="oppfoelgingsplan__arbeidsoppgave__gjennomfoering--inntrykk">Med hjelp</div> : null}
            <div>"{gjennomfoering.kanBeskrivelse}"</div>
        </div>);
    }
    return <div>Den sykmeldte har ikke tatt hensyn til om dette lar seg gjennomføre.</div>;
};

const opprettetStatusLinje = (navn, dato) => {
  return <p>{`${navn} opprettet denne versjonen ${toDatePrettyPrint(dato)}`}</p>;
};

const godkjentStatusLinje = (navn, dato) => {
    return <p>{`${navn} godkjente denne versjonen ${toDatePrettyPrint(dato)}`}</p>;
};

const OppfoelgingsplanVisning = ({ oppfoelgingsdialog, versjonertOppfoelgingsdialog, ledetekster = {} }) => {
    const sykmeldtOpprettetVersjon = versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver > versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker;
    const arbeidsoppgaverKanGjennomfoeres = versjonertOppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return !arbeidsoppgave.gjennomfoering.kanGjennomfoeres || arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'KAN';
    });
    const arbeidsoppgaverKanIkkeGjennomfoeres = versjonertOppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'KAN_IKKE';
    });
    const arbeidsoppgaverKanGjennomfoeresMedTilrettelegging = versjonertOppfoelgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
        return arbeidsoppgave.gjennomfoering.kanGjennomfoeres === 'TILRETTELEGGING';
    });

    return (<div className="panel">
       <h1>{`Versjon ${versjonertOppfoelgingsdialog.versjon} av oppfølgingsplanen`}</h1>
        <div className="blokk--s">
            <label className="oppfoelgingsplan__infotekst">{`Gyldig: ${toDatePrettyPrint(versjonertOppfoelgingsdialog.godkjentFom)} - ${toDatePrettyPrint(versjonertOppfoelgingsdialog.godkjentTom)}`}</label>
            <label className="oppfoelgingsplan__infotekst">{`Evalueres: ${toDatePrettyPrint(versjonertOppfoelgingsdialog.godkjentEvalueres)}`}</label>
        </div>
        <div className="oppfoelgingsplan__statuslinjer blokk--s">
            <div className="oppfoelgingsplan__statuslinje">
                <img className="ikon--lite" src="/sykefravaer/img/svg/status--kan.svg" />
                { sykmeldtOpprettetVersjon ? opprettetStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker) : opprettetStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver)}
            </div>
            <div className="oppfoelgingsplan__statuslinje">
                <img className="ikon--lite" src="/sykefravaer/img/svg/status--kan.svg" />
                { sykmeldtOpprettetVersjon ? godkjentStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver) : godkjentStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker)}
            </div>
        </div>
        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Den sykmeldtes kontaktinfo</h2>
                </div>

            </div>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Fødselsnummer</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidstaker.fnr}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Navn</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidstaker.navn}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Telefonnummer</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidstaker.tlf}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Email</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidstaker.email}</label>
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Arbeidsgiverens kontaktinfo</h2>
                </div>
            </div>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Organisasjonsnummer</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.virksomhetsnummer}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Navn på nærmeste leder</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidsgiver.navn}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Telefonnummer</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidsgiver.tlf}</label>
            <label className="oppfoelgingsdialog__nokkelinfo--overskrift">Email</label>
            <label className="oppfoelgingsdialog__nokkelinfo--opplysning">{oppfoelgingsdialog.arbeidsgiver.email}</label>
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Arbeidsoppgaver</h2>
                </div>
            </div>
            { versjonertOppfoelgingsdialog.arbeidsoppgaveListe.length === 0 ? <p>Det er ikke lagt til noen arbeidsoppgaver</p> : null }
            { arbeidsoppgaverKanGjennomfoeres.length > 0 ?
                <div className="blokk--l">
                    <h3 className="typo-element">Arbeidsoppgaver som kan gjøres som normalt</h3>
                    {
                        arbeidsoppgaverKanGjennomfoeres.map((arbeidsoppgave, index) => {
                            return (<div className="panel--green blokk--s" key={index}>
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
                            return (<div className="panel--yellow blokk--s" key={index}>
                                <h4 className="typo-bold">{arbeidsoppgave.arbeidsoppgavenavn}</h4>
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
                            return (<div className="panel--red blokk--s" key={index}>
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
            {versjonertOppfoelgingsdialog.tiltakListe.map((tiltak, index) => {
                return (<div key={index}>
                    <div className="panel--lightgray blokk--s">
                        <h4 className="typo-element">{tiltak.tiltaknavn}</h4>
                        <label>{tiltak.opprettetAv.navn}:</label>
                        <label>"{tiltak.beskrivelse}"</label>
                    </div>
                </div>);
            })}
            {
                versjonertOppfoelgingsdialog.tiltakListe.length === 0 ? <p>Det er ikke registrert noen tiltak.</p> : null
            }
        </section>

    </div>);
};

OppfoelgingsplanVisning.propTypes = {
    oppfoelgingsdialog: PropTypes.object.isRequired,
    versjonertOppfoelgingsdialog: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default OppfoelgingsplanVisning;
