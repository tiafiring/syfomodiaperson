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
    const gyldigFra = versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver > versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker ? versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver : versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker;
    let evalueresDato = new Date(gyldigFra);
    evalueresDato.setMonth(evalueresDato.getMonth() + 2);

    const sykmeldtOpprettetVersjon = versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver > versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker;

    return (<div className="panel">
       <h1>{`Versjon ${versjonertOppfoelgingsdialog.versjon} av oppfølgingsplanen`}</h1>
        <div className="blokk--s">
            <label className="oppfoelgingsplan__infotekst">{`Gyldig: ${toDatePrettyPrint(new Date(gyldigFra))} - ${toDatePrettyPrint(evalueresDato)}`}</label>
            <label className="oppfoelgingsplan__infotekst">{`Evalueres: ${toDatePrettyPrint(evalueresDato)}`}</label>
        </div>
        <div className="oppfoelgingsplan__statuslinjer blokk--s">
            <div className="oppfoelgingsplan__statuslinje">
                <img src="/sykefravaer/img/svg/status--kan.svg" />
                { sykmeldtOpprettetVersjon ? opprettetStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker) : opprettetStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver)}
            </div>
            <div className="oppfoelgingsplan__statuslinje">
                <img src="/sykefravaer/img/svg/status--kan.svg" />
                { sykmeldtOpprettetVersjon ? godkjentStatusLinje(oppfoelgingsdialog.arbeidsgiver.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidsgiver) : godkjentStatusLinje(oppfoelgingsdialog.arbeidstaker.navn, versjonertOppfoelgingsdialog.godkjentDatoArbeidstaker)}
            </div>
        </div>
        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <img src="/sykefravaer/img/svg/oppfolgingsdialogAT.svg" />
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
                <img src="/sykefravaer/img/svg/oppfolgingsdialogAG.svg" />
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
                <img src="/sykefravaer/img/svg/oppfolgingsplan-opprett.svg" />
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Arbeidsoppgaver</h2>
                </div>
            </div>
            {versjonertOppfoelgingsdialog.arbeidsoppgaveListe.map((arbeidsoppgave, index) => {
                return (<div key={index}>
                    <h3 className="typo-element">{arbeidsoppgave.arbeidsoppgavenavn}</h3>
                    <div className="oppfoelgingsdialog__informasjonsboks--faded">
                        {gjennomFoeringArbeidsoppgave(arbeidsoppgave.gjennomfoering)}
                    </div>
                </div>);
            })}
        </section>

        <section className="blokk--l">
            <div className="oppfoelgingsdialog__nokkelinfo">
                <img src="/sykefravaer/img/svg/tiltakIkon.svg" />
                <div className="oppfoelgingsdialog__nokkelinfo__header">
                    <h2>Tiltak</h2>
                </div>
            </div>
            {versjonertOppfoelgingsdialog.tiltakListe.map((tiltak, index) => {
                return (<div key={index}>
                    <h3>{tiltak.tiltaknavn}</h3>
                    <div className="oppfoelgingsdialog__informasjonsboks--active">
                        <label>Beskrivelse:</label>
                        <label>"{tiltak.beskrivelse}"</label>
                    </div>
                </div>);
            })}
        </section>

    </div>);
};

OppfoelgingsplanVisning.propTypes = {
    oppfoelgingsdialog: PropTypes.object.isRequired,
    versjonertOppfoelgingsdialog: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default OppfoelgingsplanVisning;
