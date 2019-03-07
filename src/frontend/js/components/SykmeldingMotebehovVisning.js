import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import {
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
    sorterSykmeldingPerioderEtterDato,
} from '../utils/sykmeldingUtils';
import { tilLesbarPeriodeMedAarUtenMaanednavn } from '../utils/datoUtils';

const tekster = {
    generellSykmeldingInfo: {
        arbeidsforEtterPerioden: {
            tittel: 'Pasienten er 100 % arbeidsfør etter perioden',
        },
        hensynPaaArbeidsplassen: {
            tittel: 'Beskriv eventuelle hensyn som må tas på arbeidsplassen',
        },
    },
    tilbakeIArbeid: {
        medArbeidsgiver: {
            header: '8 uker: Pasient med arbeidsgiver, utdypende opplysninger',
            returSammeArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver',
            datoSporsmaal: 'Når tror du dette kan skje?',
            returAnnenArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver',
            usikkerDatoSporsmaal: 'Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?',
        },
        utenArbeidsgiver: {
            header: '8 uker: Pasient uten arbeidsgiver, utdypende opplysninger',
            retur: 'Jeg antar at pasienten på sikt kan komme tilbake i arbeid',
            usikkerDatoSporsmaal: 'Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?',
        },
    },
    UtdypendeOpplysninger: {
        header: 'Utdypende opplysninger ved 8 uker',
        sykehistorieTittel: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon',
        paavirkningArbeidsevneTittel: 'Hvordan påvirker sykdommen arbeidsevnen?',
        behandlingsResultatTittel: 'Har behandlingen frem til nå bedret arbeidsevnen?',
        henvisningTittel: 'Beskriv pågående og planlagt henvisning, utredning og/eller behandling',
    },
    bedreArbeidsevnen: {
        header: 'Hva skal til for å bedre arbeidsevnen?',
        tilretteleggingTittel: 'Tilrettelegging/hensyn som bør tas på arbeidsplassen. Beskriv',
        tiltakNavTittel: 'Tiltak i regi av NAV. Beskriv',
        tiltakAndreTittel: 'Eventuelle andre innspill til NAV. Beskriv',
    },
    meldingTilNav: {
        header: 'Melding til NAV',
        navBoerTaTakISaken: {
            tittel: 'Ønskes bistand fra NAV nå?',
            begrunnelseTittel: 'Begrunn nærmere',
        },
    },
    meldingTilArbeidsgiver: {
        header: 'Melding til arbeidsgiver',
        innspillTittel: 'Andre innspill til arbeidsgiver',
    },
};

export const BoksRad = (
    {
        kolonne1Tekst,
        kolonne2Tekst,
        erTittel,
    }) => {
    return (<Row>
        <Column className="col-sm-6">
            <p className={`sykmeldingMotebehovVisning__boksRad--${erTittel ? 'tittel' : 'tekst'}`}>{kolonne1Tekst}</p>
        </Column>
        <Column className="col-sm-6">
            <p className={`sykmeldingMotebehovVisning__boksRad--${erTittel ? 'tittel' : 'tekst'}`}>{kolonne2Tekst}</p>
        </Column>
    </Row>);
};

BoksRad.propTypes = {
    kolonne1Tekst: PropTypes.string,
    kolonne2Tekst: PropTypes.string,
    erTittel: PropTypes.bool,
};

export const PeriodeBoks = (
    {
        periode,
    }) => {
    return (<div className="sykmeldingMotebehovVisning__periodeBoks">
        <BoksRad
            kolonne1Tekst={`${tilLesbarPeriodeMedAarUtenMaanednavn(periode.fom, periode.tom)}`}
            kolonne2Tekst={`${periode.grad}%`}
            erTittel
        />
    </div>);
};

PeriodeBoks.propTypes = {
    periode: PropTypes.object,
};

export const Perioder = (
    {
        perioder,
    }) => {
    return (<div className="sykmeldingMotebehovVisning__perioder">
        <h6 className="sporsmaal">Perioder</h6>
        {
            perioder.map((periode, index) => {
                return (<PeriodeBoks key={index} periode={periode} />);
            })
        }
    </div>);
};

Perioder.propTypes = {
    perioder: PropTypes.arrayOf(PropTypes.object),
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
        <BoksRad
            kolonne1Tekst={diagnoseTittel}
            kolonne2Tekst={diagnosekodeTittel}
            erTittel
        />
        <BoksRad
            kolonne1Tekst={diagnose.diagnose}
            kolonne2Tekst={`${diagnose.diagnosekode} ${diagnose.diagnosesystem}`}
        />
    </div>);
};

DiagnoseBoks.propTypes = {
    diagnose: PropTypes.object,
    erBiDiagnose: PropTypes.bool,
};

export const Diagnoser = (
    {
        hovedDiagnose,
        biDiagnoser,
    }) => {
    return (<div className="sykmeldingMotebehovVisning__diagnoser">
        <DiagnoseBoks diagnose={hovedDiagnose} />

        {
            biDiagnoser.map((diagnose, index) => {
                return (<DiagnoseBoks key={index} diagnose={diagnose} erBiDiagnose />);
            })
        }
    </div>);
};

Diagnoser.propTypes = {
    hovedDiagnose: PropTypes.object,
    biDiagnoser: PropTypes.arrayOf(PropTypes.object),
};

export const GenerellSykmeldingInfo = (
    {
        sykmelding,
    }) => {
    const hovedDiagnose = sykmelding.diagnose.hoveddiagnose;
    const biDiagnoser = sykmelding.diagnose.bidiagnoser
        ? sykmelding.diagnose.bidiagnoser
        : [];
    const sykmeldingPerioderSortertEtterDato = sorterSykmeldingPerioderEtterDato(sykmelding.mulighetForArbeid.perioder);
    return (<div className="sykmeldingMotebehovVisning__avsnitt">
        <Perioder perioder={sykmeldingPerioderSortertEtterDato} />

        <Diagnoser hovedDiagnose={hovedDiagnose} biDiagnoser={biDiagnoser} />

        {
            erArbeidsforEtterPerioden(sykmelding) &&
                <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.generellSykmeldingInfo.arbeidsforEtterPerioden.tittel} checked={sykmelding.friskmelding.arbeidsfoerEtterPerioden} disabled />
        }
        {
            erHensynPaaArbeidsplassenInformasjon(sykmelding) &&
            [
                <h6 key={0} className="sporsmaal">{tekster.generellSykmeldingInfo.hensynPaaArbeidsplassen.tittel}</h6>,
                <p key={1}>{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>,
            ]
        }
    </div>);
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
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            {
                !!harArbeidsgiver
                    ? (<div>
                        <h5 className="undertittel">{tekster.tilbakeIArbeid.medArbeidsgiver.header}</h5>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returSammeArbeidsgiver} checked={friskmelding.antarReturSammeArbeidsgiver} disabled />
                        <h6 className="sporsmaal">{tekster.tilbakeIArbeid.medArbeidsgiver.datoSporsmaal}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.antattDatoReturSammeArbeidsgiver)}</p>

                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returAnnenArbeidsgiver} checked={friskmelding.antarReturAnnenArbeidsgiver} disabled />
                        <h6 className="sporsmaal">{`Hvis usikker: ${tekster.tilbakeIArbeid.medArbeidsgiver.usikkerDatoSporsmaal}`}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.tilbakemeldingReturArbeid)}</p>
                    </div>)
                    : (<div>
                        <h5 className="undertittel">{tekster.tilbakeIArbeid.utenArbeidsgiver.header}</h5>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.utenArbeidsgiver.retur} checked={friskmelding.utenArbeidsgiverAntarTilbakeIArbeid} disabled />
                        <h6 className="sporsmaal">{`Hvis usikker: ${tekster.tilbakeIArbeid.utenArbeidsgiver.usikkerDatoSporsmaal}`}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
                    </div>)
            }
        </div>);
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
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            <h5 className="undertittel">{tekster.UtdypendeOpplysninger.header}</h5>

            {
                utdypendeOpplysninger.sykehistorie && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.sykehistorieTittel}</h6>
                    <p>{utdypendeOpplysninger.sykehistorie}</p>
                </div>
            }

            {
                utdypendeOpplysninger.paavirkningArbeidsevne && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.paavirkningArbeidsevneTittel}</h6>
                    <p>{utdypendeOpplysninger.paavirkningArbeidsevne}</p>
                </div>
            }

            {
                utdypendeOpplysninger.resultatAvBehandling && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.behandlingsResultatTittel}</h6>
                    <p>{utdypendeOpplysninger.resultatAvBehandling}</p>
                </div>
            }

            {
                utdypendeOpplysninger.henvisningUtredningBehandling && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.henvisningTittel}</h6>
                    <p>{utdypendeOpplysninger.henvisningUtredningBehandling}</p>
                </div>
            }
        </div>);
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
        !!erBedringAvArbeidsevnenInformasjon(sykmelding) && <div className="sykmeldingMotebehovVisning__avsnitt">
            <h5 className="undertittel">{tekster.bedreArbeidsevnen.header}</h5>

            {
                arbeidsevne.tilretteleggingArbeidsplass && <div>
                    <h6 className="sporsmaal">{tekster.bedreArbeidsevnen.tilretteleggingTittel}</h6>
                    <p>{arbeidsevne.tilretteleggingArbeidsplass}</p>
                </div>
            }

            {
                arbeidsevne.tiltakNAV && <div>
                    <h6 className="sporsmaal">{tekster.bedreArbeidsevnen.tiltakNavTittel}</h6>
                    <p>{arbeidsevne.tiltakNAV}</p>
                </div>
            }

            {
                arbeidsevne.tiltakAndre && <div>
                    <h6 className="sporsmaal">{tekster.bedreArbeidsevnen.tiltakAndreTittel}</h6>
                    <p>{arbeidsevne.tiltakAndre}</p>
                </div>
            }
        </div>);
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
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            <h5 className="undertittel">{tekster.meldingTilNav.header}</h5>

            <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.meldingTilNav.navBoerTaTakISaken.tittel} checked={meldingTilNav.navBoerTaTakISaken} disabled />
            {
                meldingTilNav.navBoerTaTakISakenBegrunnelse &&
                [
                    <h6 key={0} className="sporsmaal">{tekster.meldingTilNav.navBoerTaTakISaken.begrunnelseTittel}</h6>,
                    <p key={1}>{meldingTilNav.navBoerTaTakISakenBegrunnelse}</p>,
                ]
            }
        </div>);
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
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            <h5 className="undertittel">{tekster.meldingTilArbeidsgiver.header}</h5>
            {
                innspillTilArbeidsgiver &&
                (<div>
                    <h6 className="sporsmaal">{tekster.meldingTilArbeidsgiver.innspillTittel}</h6>
                    <p>{innspillTilArbeidsgiver}</p>
                </div>)
            }
        </div>);
};

MeldingTilArbeidsgiver.propTypes = {
    sykmelding: PropTypes.object,
};

const SykmeldingMotebehovVisning = (
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
    </div>);
};

SykmeldingMotebehovVisning.propTypes = {
    sykmelding: PropTypes.object,
};

export default SykmeldingMotebehovVisning;
