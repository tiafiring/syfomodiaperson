import React from 'react';
import PropTypes from 'prop-types';
import {
    toDatePrettyPrint,
} from 'digisyfo-npm';
import { finnArbeidstakerMotebehovSvar } from '../utils/motebehovUtils';
import { Checkbox } from 'nav-frontend-skjema';
import Sidetopp from './Sidetopp';

export const finnRiktigLeder = (virksomhetsnummer, ledere) => {
    return ledere.find((leder) => {
        return leder.orgnummer === virksomhetsnummer;
    });
};

export const setSvarIkon = (deltakerOnskerMote) => {
    if (deltakerOnskerMote === true) {
        return '/sykefravaer/img/svg/motebehov--kan.svg';
    }
    if (deltakerOnskerMote === false) {
        return '/sykefravaer/img/svg/motebehov--kanikke.svg';
    }
    return '/sykefravaer/img/svg/motebehov--ikkesvart.svg';
};

export const setSvarTekst = (deltakerOnskerMote) => {
    if (deltakerOnskerMote === true) {
        return ' har svart JA';
    }
    if (deltakerOnskerMote === false) {
        return ' har svart NEI';
    }
    return ' har ikke svart';
};

export const setArbeidsgiverTekst = (leder, arbeidsgiverOnskerMote) => {
    const arbeidsgiverNavn = leder && leder.navn ? `${leder.navn},` : '';
    const arbeidsgiverBedrift = leder && leder.organisasjonsnavn ? `${leder.organisasjonsnavn},` : '';
    return `<b>Arbeidsgiveren: </b> ${arbeidsgiverNavn} ${arbeidsgiverBedrift} ${setSvarTekst(arbeidsgiverOnskerMote)}`;
};

const getGjeldendeOppgaver = (oppgaveListe, motebehovListe) => {
    return oppgaveListe.filter((oppgave) => {
        return oppgave.type === 'MOTEBEHOV_MOTTATT' && motebehovListe.findIndex((motebehov) => {
            return oppgave.uuid === motebehov.id;
        }) >= 0;
    });
};

export const getIkkeFullforteOppgaver = (oppgaveListe) => {
    return oppgaveListe.filter((oppgave) => {
        return oppgave.status !== 'FERDIG';
    });
};

export const getSistEndretOppgave = (gjeldendeOppgaver) => {
    return gjeldendeOppgaver.sort((oppgave1, oppgave2) => {
        return oppgave2.sistEndret === oppgave1.sistEndret ? 0 : oppgave2.sistEndret > oppgave1.sistEndret ? 1 : -1;
    })[0];
};

export const BehandleMotebehovKnapp = (
    {
        actions,
        fnr,
        motebehovListe,
        oppgaver,
        veilederinfo,
    }) => {
    const gjeldendeOppgaver = getGjeldendeOppgaver(oppgaver, motebehovListe);
    const sistEndretOppgave = getSistEndretOppgave(gjeldendeOppgaver);
    const ikkeFullforteOppgaver = getIkkeFullforteOppgaver(gjeldendeOppgaver);
    const erAlleOppgaverFullfort = ikkeFullforteOppgaver.length === 0;
    return (<div className="panel behandleMotebehovKnapp">
        {gjeldendeOppgaver.length > 0 ?
            <div className="skjema__input">
                <Checkbox
                    label={erAlleOppgaverFullfort ? `Ferdig behandlet av ${sistEndretOppgave.sistEndretAv} ${toDatePrettyPrint(sistEndretOppgave.sistEndret)}` : 'Marker som behandlet'}
                    onClick={() => {
                        ikkeFullforteOppgaver.forEach((oppgave) => {
                            actions.behandleOppgave(oppgave.id, {
                                status: 'FERDIG',
                                sistEndretAv: veilederinfo.ident,
                            }, fnr);
                        });
                    }}
                    id="marker__utfoert"
                    disabled={erAlleOppgaverFullfort}
                    checked={erAlleOppgaverFullfort} />
            </div> : <p>Fant dessverre ingen oppgaver knyttet til denne avklaringen</p>
        }
    </div>);
};

BehandleMotebehovKnapp.propTypes = {
    actions: PropTypes.object,
    fnr: PropTypes.string,
    motebehovListe: PropTypes.array,
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
};

export const MotebehovKvitteringBoksInnhold = (
    {
        deltakerOnskerMote,
        ikon,
        motebehov,
        tekst,
    }
) => {
    return (<div className="motebehovKvitteringBoksInnhold">
        <div>
            <img key={0} className="svarstatus__ikon" src={ikon} alt="svarstatusikon" />
        </div>
        <div>
            <span key={1} dangerouslySetInnerHTML={{ __html: tekst }} />
            { deltakerOnskerMote === false && <p key={2}>{motebehov.motebehovSvar.forklaring}</p> }
        </div>
    </div>);
};

MotebehovKvitteringBoksInnhold.propTypes = {
    deltakerOnskerMote: PropTypes.bool,
    ikon: PropTypes.string,
    motebehov: PropTypes.object,
    tekst: PropTypes.string,
};

export const MotebehovKvitteringBoks = (
    {
        ledereData,
        ledereUtenInnsendtMotebehov,
        motebehovListe,
        sykmeldt,
    }
) => {
    const arbeidstakerMotebehov = finnArbeidstakerMotebehovSvar(motebehovListe);
    const arbeidstakerOnskerMote = arbeidstakerMotebehov ? arbeidstakerMotebehov.motebehovSvar.harMotebehov : null;
    const arbeidstakerIkon = setSvarIkon(arbeidstakerOnskerMote);
    const arbeidstakerTekst = `<b>Den sykmeldte: </b> ${sykmeldt.navn} ${setSvarTekst(arbeidstakerOnskerMote)}`;

    return (<div className="panel motebehovKvitteringInnhold">
        {[
            <MotebehovKvitteringBoksInnhold
                key={0}
                deltakerOnskerMote={arbeidstakerOnskerMote}
                ikon={arbeidstakerIkon}
                motebehov={arbeidstakerMotebehov}
                tekst={arbeidstakerTekst}
            />,
            motebehovListe.map((motebehov, index) => {
                if (motebehov.opprettetAv !== motebehov.aktorId) {
                    const arbeidsgiverOnskerMote = motebehov.motebehovSvar ? motebehov.motebehovSvar.harMotebehov : null;
                    const riktigLeder = finnRiktigLeder(motebehov.virksomhetsnummer, ledereData);
                    const arbeidsgiverIkon = setSvarIkon(arbeidsgiverOnskerMote);
                    const arbeidsgiverTekst = setArbeidsgiverTekst(riktigLeder, arbeidsgiverOnskerMote);
                    return (<MotebehovKvitteringBoksInnhold
                        key={index + 1}
                        deltakerOnskerMote={arbeidsgiverOnskerMote}
                        ikon={arbeidsgiverIkon}
                        motebehov={motebehov}
                        tekst={arbeidsgiverTekst}
                    />);
                }
                return null;
            }),
            ledereUtenInnsendtMotebehov.map((leder, index) => {
                const arbeidsgiverTekst = setArbeidsgiverTekst(leder, null);
                return (<MotebehovKvitteringBoksInnhold
                    key={motebehovListe.length + index + 1}
                    deltakerOnskerMote={null}
                    ikon={'/sykefravaer/img/svg/motebehov--ikkesvart.svg'}
                    motebehov={null}
                    tekst={arbeidsgiverTekst}
                />);
            }),
        ]}
    </div>);
};

MotebehovKvitteringBoks.propTypes = {
    ledereData: PropTypes.array,
    ledereUtenInnsendtMotebehov: PropTypes.array,
    motebehovListe: PropTypes.array,
    sykmeldt: PropTypes.object,
};

export const MotebehovKvittering = (
    {
        actions,
        fnr,
        ledereData,
        ledereUtenInnsendtMotebehov,
        motebehovListe,
        oppgaver,
        sykmeldt,
        ufiltrertMotebehovListeTilOppgaveBehandling,
        veilederinfo,
    }) => {
    return (<div className="motebehovSide">
        <Sidetopp tittel={'Avklaring dialogmøte'} />
        <MotebehovKvitteringBoks
            ledereData={ledereData}
            ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
            motebehovListe={motebehovListe}
            sykmeldt={sykmeldt}
        />
        <BehandleMotebehovKnapp
            actions={actions}
            fnr={fnr}
            motebehovListe={ufiltrertMotebehovListeTilOppgaveBehandling}
            oppgaver={oppgaver}
            veilederinfo={veilederinfo}
        />
    </div>);
};

MotebehovKvittering.propTypes = {
    actions: PropTypes.object,
    fnr: PropTypes.string,
    ledereData: PropTypes.array,
    ledereUtenInnsendtMotebehov: PropTypes.array,
    motebehovListe: PropTypes.array,
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    sykmeldt: PropTypes.object,
    ufiltrertMotebehovListeTilOppgaveBehandling: PropTypes.array,
    veilederinfo: PropTypes.object,
};

export default MotebehovKvittering;
