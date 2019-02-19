import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import {
    senesteTom,
    tidligsteFom,
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

export const DiagnoseBoksRad = (
    {
        kolonne1Tekst,
        kolonne2Tekst,
        erTittel,
    }) => {
    return (<Row>
        <Column className="col-sm-6">
            <p className={`sykmeldingMotebehovVisning__diagnoseBoks--${erTittel ? 'tittel' : 'tekst'}`}>{kolonne1Tekst}</p>
        </Column>
        <Column className="col-sm-6">
            <p className={`sykmeldingMotebehovVisning__diagnoseBoks--${erTittel ? 'tittel' : 'tekst'}`}>{kolonne2Tekst}</p>
        </Column>
    </Row>);
};

DiagnoseBoksRad.propTypes = {
    kolonne1Tekst: PropTypes.string,
    kolonne2Tekst: PropTypes.string,
    erTittel: PropTypes.bool,
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
        <DiagnoseBoksRad
            kolonne1Tekst={diagnoseTittel}
            kolonne2Tekst={diagnosekodeTittel}
            erTittel
        />
        <DiagnoseBoksRad
            kolonne1Tekst={diagnose.diagnose}
            kolonne2Tekst={`${diagnose.diagnosekode} ${diagnose.diagnosesystem}`}
        />
    </div>);
};

DiagnoseBoks.propTypes = {
    diagnose: PropTypes.object,
    erBiDiagnose: PropTypes.bool,
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
        <h3 className="undertittel">{`${tilLesbarPeriodeMedArstall(tidligsteFom(sykmelding.mulighetForArbeid.perioder), senesteTom(sykmelding.mulighetForArbeid.perioder))}: ${sykmelding.mulighetForArbeid.perioder[0].grad}%`}</h3>

        <p className="sporsmaal">Grad</p>
        <p>{`${sykmelding.mulighetForArbeid.perioder[0].grad} %`}</p>
        <DiagnoseBoks diagnose={hovedDiagnose} />

        {
            biDiagnoser.map((diagnose, index) => {
                return (<DiagnoseBoks key={index} diagnose={diagnose} erBiDiagnose />);
            })
        }

        {
            erArbeidsforEtterPerioden(sykmelding) &&
                <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.generellSykmeldingInfo.arbeidsforEtterPerioden.tittel} checked={sykmelding.friskmelding.arbeidsfoerEtterPerioden} disabled />
        }
        {
            erHensynPaaArbeidsplassenInformasjon(sykmelding) &&
            [
                <p key={0} className="sporsmaal">{tekster.generellSykmeldingInfo.hensynPaaArbeidsplassen.tittel}</p>,
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
                        <h3 className="undertittel">{tekster.tilbakeIArbeid.medArbeidsgiver.header}</h3>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returSammeArbeidsgiver} checked={friskmelding.antarReturSammeArbeidsgiver} disabled />
                        <p className="sporsmaal">{tekster.tilbakeIArbeid.medArbeidsgiver.datoSporsmaal}</p>
                        <p>{tilLesbarDatoMedArstall(friskmelding.antattDatoReturSammeArbeidsgiver)}</p>

                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returAnnenArbeidsgiver} checked={friskmelding.antarReturAnnenArbeidsgiver} disabled />
                        <p className="sporsmaal">{`Hvis usikker: ${tekster.tilbakeIArbeid.medArbeidsgiver.usikkerDatoSporsmaal}`}</p>
                        <p>{tilLesbarDatoMedArstall(friskmelding.tilbakemeldingReturArbeid)}</p>
                    </div>)
                    : (<div>
                        <h3 className="undertittel">{tekster.tilbakeIArbeid.utenArbeidsgiver.header}</h3>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.utenArbeidsgiver.retur} checked={friskmelding.utenArbeidsgiverAntarTilbakeIArbeid} disabled />
                        <p className="sporsmaal">{`Hvis usikker: ${tekster.tilbakeIArbeid.utenArbeidsgiver.usikkerDatoSporsmaal}`}</p>
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
            <h3 className="undertittel">{tekster.UtdypendeOpplysninger.header}</h3>

            {
                utdypendeOpplysninger.sykehistorie && <div>
                    <h4 className="sporsmaal">{tekster.UtdypendeOpplysninger.sykehistorieTittel}</h4>
                    <p>{utdypendeOpplysninger.sykehistorie}</p>
                </div>
            }

            {
                utdypendeOpplysninger.paavirkningArbeidsevne && <div>
                    <h4 className="sporsmaal">{tekster.UtdypendeOpplysninger.paavirkningArbeidsevneTittel}</h4>
                    <p>{utdypendeOpplysninger.paavirkningArbeidsevne}</p>
                </div>
            }

            {
                utdypendeOpplysninger.resultatAvBehandling && <div>
                    <h4 className="sporsmaal">{tekster.UtdypendeOpplysninger.behandlingsResultatTittel}</h4>
                    <p>{utdypendeOpplysninger.resultatAvBehandling}</p>
                </div>
            }

            {
                utdypendeOpplysninger.henvisningUtredningBehandling && <div>
                    <h4 className="sporsmaal">{tekster.UtdypendeOpplysninger.henvisningTittel}</h4>
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
            <h3 className="undertittel">{tekster.bedreArbeidsevnen.header}</h3>

            {
                arbeidsevne.tilretteleggingArbeidsplass && <div>
                    <h4 className="sporsmaal">{tekster.bedreArbeidsevnen.tilretteleggingTittel}</h4>
                    <p>{arbeidsevne.tilretteleggingArbeidsplass}</p>
                </div>
            }

            {
                arbeidsevne.tiltakNAV && <div>
                    <h4 className="sporsmaal">{tekster.bedreArbeidsevnen.tiltakNavTittel}</h4>
                    <p>{arbeidsevne.tiltakNAV}</p>
                </div>
            }

            {
                arbeidsevne.tiltakAndre && <div>
                    <h4 className="sporsmaal">{tekster.bedreArbeidsevnen.tiltakAndreTittel}</h4>
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
            <h3 className="undertittel">{tekster.meldingTilNav.header}</h3>

            <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.meldingTilNav.navBoerTaTakISaken.tittel} checked={meldingTilNav.navBoerTaTakISaken} disabled />
            {
                meldingTilNav.navBoerTaTakISakenBegrunnelse &&
                [
                    <p key={0} className="sporsmaal">{tekster.meldingTilNav.navBoerTaTakISaken.begrunnelseTittel}</p>,
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
            <h3 className="undertittel">{tekster.meldingTilArbeidsgiver.header}</h3>
            {
                innspillTilArbeidsgiver &&
                (<div>
                    <p className="sporsmaal">{tekster.meldingTilArbeidsgiver.innspillTittel}</p>
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
