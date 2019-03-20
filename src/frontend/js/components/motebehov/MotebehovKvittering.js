import React from 'react';
import PropTypes from 'prop-types';
import { finnArbeidstakerMotebehovSvar } from '../../utils/motebehovUtils';

export const finnRiktigLeder = (virksomhetsnummer, ledere) => {
    return ledere.find((leder) => {
        return leder.orgnummer === virksomhetsnummer;
    });
};

export const setSvarIkon = (deltakerOnskerMote) => {
    switch (deltakerOnskerMote) {
        case true: {
            return '/sykefravaer/img/svg/motebehov--kan.svg';
        }
        case false: {
            return '/sykefravaer/img/svg/motebehov--kanikke.svg';
        }
        default: {
            return '/sykefravaer/img/svg/motebehov--ikkesvart.svg';
        }
    }
};

export const setSvarTekst = (deltakerOnskerMote) => {
    switch (deltakerOnskerMote) {
        case true: {
            return ' har svart JA';
        }
        case false: {
            return ' har svart NEI';
        }
        default: {
            return ' har ikke svart';
        }
    }
};

export const bareArbeidsgiversMotebehov = (motebehov) => {
    return motebehov.opprettetAv !== motebehov.aktorId;
};

export const setArbeidsgiverTekst = (leder, arbeidsgiverOnskerMote) => {
    const arbeidsgiverNavn = leder && leder.navn ? `${leder.navn},` : '';
    const arbeidsgiverBedrift = leder && leder.organisasjonsnavn ? `${leder.organisasjonsnavn},` : '';
    return `<b>Arbeidsgiveren: </b> ${arbeidsgiverNavn} ${arbeidsgiverBedrift} ${setSvarTekst(arbeidsgiverOnskerMote)}`;
};

export const MotebehovKvitteringInnhold = (
    {
        deltakerOnskerMote,
        motebehov,
        tekst,
    }
) => {
    const skalViseForklaring = motebehov && motebehov.motebehovSvar && motebehov.motebehovSvar.forklaring;
    return (<div className="motebehovKvitteringBoksInnhold">
        <div>
            <img className="svarstatus__ikon" src={setSvarIkon(deltakerOnskerMote)} alt="svarstatusikon" />
        </div>
        <div>
            <span dangerouslySetInnerHTML={{ __html: tekst }} />
            { skalViseForklaring && <p>{motebehov.motebehovSvar.forklaring}</p> }
        </div>
    </div>);
};

MotebehovKvitteringInnhold.propTypes = {
    deltakerOnskerMote: PropTypes.bool,
    motebehov: PropTypes.object,
    tekst: PropTypes.string,
};

export const MotebehovKvitteringInnholdArbeidstaker = (
    {
        arbeidstakersMotebehov,
        sykmeldt,
    }
) => {
    const arbeidstakerOnskerMote = arbeidstakersMotebehov && arbeidstakersMotebehov.motebehovSvar.harMotebehov;
    const arbeidstakerTekst = `<b>Den sykmeldte: </b> ${sykmeldt.navn} ${setSvarTekst(arbeidstakerOnskerMote)}`;
    return (<MotebehovKvitteringInnhold
        deltakerOnskerMote={arbeidstakerOnskerMote}
        motebehov={arbeidstakersMotebehov}
        tekst={arbeidstakerTekst}
    />);
};

MotebehovKvitteringInnholdArbeidstaker.propTypes = {
    arbeidstakersMotebehov: PropTypes.object,
    sykmeldt: PropTypes.object,
};

export const MotebehovKvitteringInnholdArbeidsgiver = (
    {
        motebehovListeMedBareArbeidsgiversMotebehov,
        ledereData,
    }
) => {
    return motebehovListeMedBareArbeidsgiversMotebehov.map((motebehov, index) => {
        const arbeidsgiverOnskerMote = motebehov.motebehovSvar.harMotebehov;
        const riktigLeder = finnRiktigLeder(motebehov.virksomhetsnummer, ledereData);
        return (<MotebehovKvitteringInnhold
            key={index}
            deltakerOnskerMote={arbeidsgiverOnskerMote}
            motebehov={motebehov}
            tekst={setArbeidsgiverTekst(riktigLeder, arbeidsgiverOnskerMote)}
        />);
    });
};

MotebehovKvitteringInnholdArbeidsgiver.propTypes = {
    motebehovListeMedBareArbeidsgiversMotebehov: PropTypes.arrayOf(PropTypes.object),
    ledereData: PropTypes.arrayOf(PropTypes.object),
};

export const MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov = (
    {
        ledereUtenInnsendtMotebehov,
    }
) => {
    return ledereUtenInnsendtMotebehov.map((leder, index) => {
        return (<MotebehovKvitteringInnhold
            key={index}
            tekst={setArbeidsgiverTekst(leder)}
        />);
    });
};

MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov.propTypes = {
    ledereUtenInnsendtMotebehov: PropTypes.array,
};

export const MotebehovKvittering = (
    {
        ledereData,
        ledereUtenInnsendtMotebehov,
        motebehovListe,
        sykmeldt,
    }
) => {
    return (<div className="panel motebehovKvitteringInnhold">
        <MotebehovKvitteringInnholdArbeidstaker
            arbeidstakersMotebehov={finnArbeidstakerMotebehovSvar(motebehovListe)}
            sykmeldt={sykmeldt}
        />
        <MotebehovKvitteringInnholdArbeidsgiver
            motebehovListeMedBareArbeidsgiversMotebehov={motebehovListe.filter(bareArbeidsgiversMotebehov)}
            ledereData={ledereData}
        />
        <MotebehovKvitteringInnholdArbeidsgiverUtenMotebehov
            ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
        />
    </div>);
};

MotebehovKvittering.propTypes = {
    ledereData: PropTypes.arrayOf(PropTypes.object),
    ledereUtenInnsendtMotebehov: PropTypes.arrayOf(PropTypes.object),
    motebehovListe: PropTypes.arrayOf(PropTypes.object),
    sykmeldt: PropTypes.object,
};
export default MotebehovKvittering;
