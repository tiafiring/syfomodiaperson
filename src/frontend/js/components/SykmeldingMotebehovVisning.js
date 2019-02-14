import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import {
    tilLesbarPeriodeMedArstall,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import {
    Row,
    Column,
} from 'nav-frontend-grid';
import {
    erArbeidsforEtterPerioden,
    erBedringAvArbeidsevnenInformasjon,
    erFriskmeldingInformasjon,
    erHensynPaaArbeidsplassenInformasjon,
    erMeldingTilArbeidsgiverInformasjon,
    erMeldingTilNavInformasjon,
    erUtdypendeOpplysningerInformasjon,
} from '../utils/sykmeldingUtils';

export const ledetekster = {
    arbeidsforEtterPeriodeKnapp: 'Pasienten er 100 % arbeidsfør etter perioden',
    tilbakeTilSammeArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver',
    tilbakeTilAnnenArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver',
    tilbakeIArbeid: 'Jeg antar at pasienten på sikt kan komme tilbake i arbeid',
    hensynPaaArbeidsplassen: 'Beskriv eventuelle hensyn som må tas på arbeidsplassen',
    utdypendeOpplysningerMedArbeidsgiver: '8 uker: Pasient med arbeidsgiver, utdypende opplysninger',
    utdypendeOpplysningerUtenArbeidsgiver: '8 uker: Pasient uten arbeidsgiver, utdypende opplysninger',
    naarKanDetteSkje: 'Når tror du dette kan skje?',
    hvisUsikker: 'Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?',
    utdypendeOpplysninger8Uker: 'Utdypende opplysninger ved 8 uker',
    sykehistorieSymptomerOgFunn: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon',
    sykdommenPaavirkerArbeidsevnen: 'Hvordan påvirker sykdommen arbeidsevnen?',
    behandlingBedretArbeidsevnen: 'Har behandlingen frem til nå bedret arbeidsevnen?',
    paagaaendeOgPlanlagtBehandling: 'Beskriv pågående og planlagt henvisning, utredning og/eller behandling',
    bedreArbeidsevnen: 'Hva skal til for å bedre arbeidsevnen?',
    tilretteleggingPaaArbeidsplassen: 'Tilrettelegging/hensyn som bør tas på arbeidsplassen. Beskriv',
    tiltakIRegiAvNav: 'Tiltak i regi av NAV. Beskriv',
    andreInnspillTilNav: 'Eventuelle andre innspill til NAV. Beskriv',
    meldingTilNav: 'Melding til NAV',
    onskesBistand: 'Ønskes bistand fra NAV nå?',
    begrunnNaermere: 'Begrunn nærmere',
    meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
    andreInnspillTilArbeidsgiver: 'Andre innspill til arbeidsgiver',
};


export const SykmeldingMotebehovVisning = (
    {
        sykmelding,
    }) => {
    return (<div className="sykmeldingMotebehovVisning">
        <GenerellSykmeldingInfo sykmelding={sykmelding} />
        <TilbakeIArbeid sykmelding={sykmelding} />
        <UtdypendeOpplysninger sykmelding={sykmelding} />
        <BedreArbeidsevnen sykmelding={sykmelding} />
        <MeldingTilNav sykmelding={sykmelding} />
        <MeldingTilArbeidsgiver sykmelding={sykmelding} />
    </div>)
};

SykmeldingMotebehovVisning.propTypes = {
    sykmelding: PropTypes.object,
};

export const GenerellSykmeldingInfo = (
    {
        sykmelding,
    }) => {
    const hovedDiagnose = sykmelding.diagnose.hoveddiagnose;
    const biDiagnoser = sykmelding.diagnose.bidiagnoser
        ? sykmelding.diagnose.bidiagnoser
        : [];
    return (<div className="sykmeldingMotebehovVisning__avsnitt">
        <h3 className="undertittel">{`${tilLesbarPeriodeMedArstall(sykmelding.mulighetForArbeid.perioder[0].fom, sykmelding.mulighetForArbeid.perioder[0].tom)}: ${sykmelding.mulighetForArbeid.perioder[0].grad}%`}</h3>

        <p className="sporsmaal">Grad</p>
        <p>{`${sykmelding.mulighetForArbeid.perioder[0].grad} %`}</p>
        <DiagnoseBoks diagnose={hovedDiagnose} />

        {
            biDiagnoser.map((diagnose, index) => {
                return (<DiagnoseBoks key={index} diagnose={diagnose} erBiDiagnose/>);
            })
        }

        {
            erArbeidsforEtterPerioden(sykmelding) &&
            <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={ledetekster.arbeidsforEtterPeriodeKnapp} checked={sykmelding.friskmelding.arbeidsfoerEtterPerioden} disabled />
        }
        {
            erHensynPaaArbeidsplassenInformasjon(sykmelding) &&
            [
                <p key={0} className="sporsmaal">{ledetekster.hensynPaaArbeidsplassen}</p>,
                <p key={1}>{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
            ]
        }
    </div>)
};

export const DiagnoseBoks = (
    {
        diagnose,
        erBiDiagnose = false,
    }) => {
    const diagnoseTittel = erBiDiagnose
        ? 'Bidiagnose'
        : 'Diagnose';
    const diagnosekodeTittel = 'Diagnosekode';

    return (<div className="sykmeldingMotebehovVisning__diagnoseBoks">
            <Row>
                <Column className="col-sm-6">
                    <p className="sykmeldingMotebehovVisning__diagnoseBoks--tittel">{diagnoseTittel}</p>
                </Column>
                <Column className="col-sm-6">
                    <p className="sykmeldingMotebehovVisning__diagnoseBoks--tittel">{diagnosekodeTittel}</p>
                </Column>
            </Row>
            <Row>
                <Column className="col-sm-6">
                    <p className="sykmeldingMotebehovVisning__diagnoseBoks--tekst">{diagnose.diagnose}</p>
                </Column>
                <Column className="col-sm-6">
                    <p className="sykmeldingMotebehovVisning__diagnoseBoks--tekst">{`${diagnose.diagnosekode} ${diagnose.diagnosesystem}`}</p>
                </Column>
            </Row>
    </div>)
};

DiagnoseBoks.propTypes = {
    diagnose: PropTypes.object,
    erBiDiagnose: PropTypes.bool,
};

GenerellSykmeldingInfo.propTypes = {
    sykmelding: PropTypes.object,
};

export const TilbakeIArbeid = (
    {
        sykmelding,
    }) => {
    const harArbeidsgiver = sykmelding.arbeidsgiver;
    const friskmelding = sykmelding.friskmelding;
    const skalVise = erFriskmeldingInformasjon(sykmelding);
    return (
        skalVise &&
        <div className="sykmeldingMotebehovVisning__avsnitt">
        {
            !!harArbeidsgiver
                ? (<div>
                    <h3 className="undertittel">{ledetekster.utdypendeOpplysningerMedArbeidsgiver}</h3>
                    <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={ledetekster.tilbakeTilSammeArbeidsgiver} checked={friskmelding.antarReturSammeArbeidsgiver} disabled />
                    <p className="sporsmaal">{ledetekster.naarKanDetteSkje}</p>
                    <p>{tilLesbarDatoMedArstall(friskmelding.antattDatoReturSammeArbeidsgiver)}</p>

                    <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={ledetekster.tilbakeTilAnnenArbeidsgiver} checked={friskmelding.antarReturAnnenArbeidsgiver} disabled />
                    <p className="sporsmaal">{ledetekster.hvisUsikker}</p>
                    <p>{tilLesbarDatoMedArstall(friskmelding.tilbakemeldingReturArbeid)}</p>
                </div>)
                : (<div>
                    <h3 className="undertittel">{ledetekster.utdypendeOpplysningerUtenArbeidsgiver}</h3>
                    <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={ledetekster.tilbakeIArbeid} checked={friskmelding.utenArbeidsgiverAntarTilbakeIArbeid} disabled />
                    <p className="sporsmaal">{ledetekster.hvisUsikker}</p>
                    <p>{tilLesbarDatoMedArstall(friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
                </div>)
        }
    </div>)
};

TilbakeIArbeid.propTypes = {
    sykmelding: PropTypes.object,
};

export const UtdypendeOpplysninger = (
    {
        sykmelding,
    }) => {
    const utdypendeOpplysninger = sykmelding.utdypendeOpplysninger;
    const skalVise = erUtdypendeOpplysningerInformasjon(sykmelding);
    return (
        skalVise &&
        <div className="sykmeldingMotebehovVisning__avsnitt">
        <h3 className="undertittel">{ledetekster.utdypendeOpplysninger8Uker}</h3>

        {
            utdypendeOpplysninger.sykehistorie &&
            <div>
                <h4 className="sporsmaal">{ledetekster.sykehistorieSymptomerOgFunn}</h4>
                <p>{utdypendeOpplysninger.sykehistorie}</p>
            </div>
        }

        {
            utdypendeOpplysninger.paavirkningArbeidsevne &&
            <div>
                <h4 className="sporsmaal">{ledetekster.sykdommenPaavirkerArbeidsevnen}</h4>
                <p>{utdypendeOpplysninger.paavirkningArbeidsevne}</p>
            </div>
        }

        {
            utdypendeOpplysninger.resultatAvBehandling &&
            <div>
                <h4 className="sporsmaal">{ledetekster.behandlingBedretArbeidsevnen}</h4>
                <p>{utdypendeOpplysninger.resultatAvBehandling}</p>
            </div>
        }

        {
            utdypendeOpplysninger.henvisningUtredningBehandling &&
            <div>
                <h4 className="sporsmaal">{ledetekster.paagaaendeOgPlanlagtBehandling}</h4>
                <p>{utdypendeOpplysninger.henvisningUtredningBehandling}</p>
            </div>
        }
    </div>)
};

UtdypendeOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
};

export const BedreArbeidsevnen = (
    {
        sykmelding,
    }) => {
    const arbeidsevne = sykmelding.arbeidsevne;
    return (
        !!erBedringAvArbeidsevnenInformasjon(sykmelding) &&
        <div className="sykmeldingMotebehovVisning__avsnitt">
        <h3 className="undertittel">{ledetekster.bedreArbeidsevnen}</h3>

        {
            arbeidsevne.tilretteleggingArbeidsplass &&
            <div>
                <h4 className="sporsmaal">{ledetekster.tilretteleggingPaaArbeidsplassen}</h4>
                <p>{arbeidsevne.tilretteleggingArbeidsplass}</p>
            </div>
        }

        {
            arbeidsevne.tiltakNAV &&
            <div>
                <h4 className="sporsmaal">{ledetekster.tiltakIRegiAvNav}</h4>
                <p>{arbeidsevne.tiltakNAV}</p>
            </div>
        }

        {
            arbeidsevne.tiltakAndre &&
            <div>
                <h4 className="sporsmaal">{ledetekster.andreInnspillTilNav}</h4>
                <p>{arbeidsevne.tiltakAndre}</p>
            </div>
        }
    </div>)
};

BedreArbeidsevnen.propTypes = {
    sykmelding: PropTypes.object,
};

export const MeldingTilNav = (
    {
        sykmelding,
    }) => {
    const meldingTilNav = sykmelding.meldingTilNav;
    const skalVise = erMeldingTilNavInformasjon(sykmelding);
    return (
        skalVise &&
        <div className="sykmeldingMotebehovVisning__avsnitt">
        <h3 className="undertittel">{ledetekster.meldingTilNav}</h3>

        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={ledetekster.onskesBistand} checked={meldingTilNav.navBoerTaTakISaken} disabled/>
        {
            meldingTilNav.navBoerTaTakISakenBegrunnelse &&
            [
                <p key={0} className="sporsmaal">{ledetekster.begrunnNaermere}</p>,
                <p key={1}>{meldingTilNav.navBoerTaTakISakenBegrunnelse}</p>
            ]
        }
    </div>)
};

MeldingTilNav.propTypes = {
    sykmelding: PropTypes.object,
};

export const MeldingTilArbeidsgiver = (
    {
        sykmelding,
    }) => {
    const innspillTilArbeidsgiver = sykmelding.innspillTilArbeidsgiver;
    const skalVise = erMeldingTilArbeidsgiverInformasjon(sykmelding);
    return (
        skalVise &&
        <div className="sykmeldingMotebehovVisning__avsnitt">
        <h3 className="undertittel">{ledetekster.meldingTilArbeidsgiver}</h3>
        {
            innspillTilArbeidsgiver &&
            (<div>
                <p className="sporsmaal">{ledetekster.andreInnspillTilArbeidsgiver}</p>
                <p>{innspillTilArbeidsgiver}</p>
            </div>)
        }
    </div>)
};

MeldingTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
};
