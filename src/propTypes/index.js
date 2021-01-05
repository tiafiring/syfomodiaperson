import PropTypes from "prop-types";
import { gamleSMStatuser } from "../utils/sykmeldinger/sykmeldingstatuser";
import * as soknadtyper from "../enums/soknadtyper";
import * as soknadstatuser from "../enums/soknadstatuser";
import * as arbeidssituasjoner from "../enums/arbeidssituasjoner";
import * as svartyper from "../enums/svartyper";
import { fields as inntektskildetyper } from "../enums/inntektskildetyper";
import * as forskutterersvar from "../enums/forskutterersvar";
import * as sykepengesoknadsvartyper from "../enums/sykepengesoknadsvartyper";
import * as sporsmalstyper from "../enums/sporsmalstyper";

export * from "./moteProptypes";

export const arbeidssituasjon = PropTypes.oneOf([
  arbeidssituasjoner.ARBEIDSTAKER,
  arbeidssituasjoner.NAERINGSDRIVENDE,
  arbeidssituasjoner.FRILANSER,
  arbeidssituasjoner.ARBEIDSLEDIG,
  arbeidssituasjoner.ANNET,
]);

export const brodsmule = PropTypes.shape({
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
});

export const naermesteLeder = PropTypes.shape({
  navn: PropTypes.string,
  epost: PropTypes.string,
  mobil: PropTypes.string,
  orgnummer: PropTypes.string,
  organisasjonsnavn: PropTypes.string,
  aktivTom: PropTypes.string,
});

export const arbeidsgiver = PropTypes.shape({
  navn: PropTypes.string,
  orgnummer: PropTypes.string,
  naermesteLeder,
});

export const svartypePt = PropTypes.oneOf(Object.values(svartyper));

export const svar = PropTypes.arrayOf(
  PropTypes.shape({
    verdi: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  })
);

const sporsmalShape = {
  id: PropTypes.string,
  kriterieForVisningAvUndersporsmal: PropTypes.string,
  max: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  sporsmalstekst: PropTypes.string,
  svar,
  svartype: svartypePt,
  tag: PropTypes.string,
  undertekst: PropTypes.string,
  pavirkerAndreSporsmal: PropTypes.bool,
};

sporsmalShape.undersporsmal = PropTypes.arrayOf(PropTypes.shape(sporsmalShape));

export const sporsmal = PropTypes.shape(sporsmalShape);

export const soknad = PropTypes.shape({
  id: PropTypes.string,
  sykmeldingId: PropTypes.string,
  soknadstype: PropTypes.oneOf(Object.values(soknadtyper)),
  status: PropTypes.oneOf(Object.values(soknadstatuser)),
  fom: PropTypes.instanceOf(Date),
  tom: PropTypes.instanceOf(Date),
  opprettetDato: PropTypes.instanceOf(Date),
  innsendtDato: PropTypes.instanceOf(Date),
  sendtTilNAVDato: PropTypes.instanceOf(Date),
  sendtTilArbeidsgiverDato: PropTypes.instanceOf(Date),
  sporsmal: PropTypes.arrayOf(sporsmal),
  korrigerer: PropTypes.string,
  korrigertAv: PropTypes.string,
  arbeidsgiver: PropTypes.shape({
    navn: PropTypes.string,
    orgnummer: PropTypes.string,
  }),
});

export const soknadperiode = PropTypes.shape({
  fom: PropTypes.instanceOf(Date),
  tom: PropTypes.instanceOf(Date),
});

export const sykepengesoknadoppsummeringledetekst = PropTypes.shape({
  nokkel: PropTypes.string,
  tekst: PropTypes.string,
  verdier: PropTypes.shape({}),
});

export const sykepengesoknadoppsummeringtilleggstekst = PropTypes.shape({
  ledetekst: sykepengesoknadoppsummeringledetekst,
  type: PropTypes.oneOf(Object.keys(sykepengesoknadsvartyper)),
});

export const sykepengesoknadoppsummeringsvar = PropTypes.shape({
  ledetekst: sykepengesoknadoppsummeringledetekst,
  type: PropTypes.oneOf(Object.keys(sykepengesoknadsvartyper)),
  tilleggstekst: sykepengesoknadoppsummeringtilleggstekst,
});

export const sykepengesoknadoppsummeringsporsmal = PropTypes.shape({
  ledetekst: sykepengesoknadoppsummeringledetekst,
  svar: PropTypes.arrayOf(sykepengesoknadoppsummeringsvar),
  type: PropTypes.oneOf(Object.values(sporsmalstyper)),
});

export const oppsummeringsoknad = PropTypes.shape({
  bekreftetKorrektInformasjon: sykepengesoknadoppsummeringsporsmal,
  oppsummering: PropTypes.arrayOf(sykepengesoknadoppsummeringsporsmal),
  vaerKlarOverAt: sykepengesoknadoppsummeringtilleggstekst,
});

export const annenInntektskilde = PropTypes.shape({
  sykmeldt: PropTypes.bool,
  annenInntektskildeType: PropTypes.oneOf([
    inntektskildetyper.ANDRE_ARBEIDSFORHOLD,
    inntektskildetyper.SELVSTENDIG_NAERINGSDRIVENDE,
    inntektskildetyper.SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA,
    inntektskildetyper.JORDBRUKER_FISKER_REINDRIFTSUTOEVER,
    inntektskildetyper.FRILANSER,
    inntektskildetyper.ANNET,
  ]),
});

export const soknadsaktivitet = PropTypes.shape({
  periode: soknadperiode,
  grad: PropTypes.number,
  avvik: PropTypes.shape({
    arbeidstimerNormalUke: PropTypes.number,
    arbeidsgrad: PropTypes.number,
    timer: PropTypes.number,
    beregnetArbeidsgrad: PropTypes.number,
  }),
  id: PropTypes.number,
});

export const soknadaktiviteter = PropTypes.arrayOf(soknadsaktivitet);

export const sykepengesoknadstatus = PropTypes.oneOf([
  soknadstatuser.SENDT,
  soknadstatuser.NY,
  soknadstatuser.TIL_SENDING,
  soknadstatuser.UTGAATT,
  soknadstatuser.UTKAST_TIL_KORRIGERING,
  soknadstatuser.KORRIGERT,
  soknadstatuser.AVBRUTT,
  soknadstatuser.FREMTIDIG,
  soknadstatuser.SLETTET_UTKAST,
]);

export const sykepengesoknad = PropTypes.shape({
  id: PropTypes.string,
  status: sykepengesoknadstatus,
  sendtTilArbeidsgiverDato: PropTypes.instanceOf(Date),
  sendtTilNAVDato: PropTypes.instanceOf(Date),
  avbruttDato: PropTypes.instanceOf(Date),
  opprettetDato: PropTypes.instanceOf(Date),
  arbeidsgiver,
  identdato: PropTypes.instanceOf(Date),
  oppfoelgingsdato: PropTypes.instanceOf(Date),
  ansvarBekreftet: PropTypes.bool,
  bekreftetKorrektInformasjon: PropTypes.bool,
  arbeidsgiverForskutterer: PropTypes.oneOf([
    null,
    forskutterersvar.JA,
    forskutterersvar.NEI,
    forskutterersvar.VET_IKKE,
  ]),
  egenmeldingsperioder: PropTypes.arrayOf(soknadperiode),
  gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
  ferie: PropTypes.arrayOf(soknadperiode),
  permisjon: PropTypes.arrayOf(soknadperiode),
  utenlandsopphold: PropTypes.shape({
    perioder: PropTypes.arrayOf(soknadperiode),
    soektOmSykepengerIPerioden: PropTypes.bool,
  }),
  aktiviteter: soknadaktiviteter.isRequired,
  andreInntektskilder: PropTypes.arrayOf(annenInntektskilde),
  utdanning: PropTypes.shape({
    utdanningStartdato: PropTypes.instanceOf(Date),
    erUtdanningFulltidsstudium: PropTypes.bool,
  }),
  sykmeldingSkrevetDato: PropTypes.instanceOf(Date),
  erUnderEndring: PropTypes.bool,
  del: PropTypes.number,
  fom: PropTypes.instanceOf(Date),
  tom: PropTypes.instanceOf(Date),
  sykmeldingId: PropTypes.string,
  forrigeSendteSoknadTom: PropTypes.instanceOf(Date),
  oppsummering: oppsummeringsoknad,
});

export const oppsummeringSporsmal = {
  svar,
  sporsmalstekst: PropTypes.string,
  tag: PropTypes.string,
};

export const soknadEllerSykepengesoknad = PropTypes.oneOfType([
  soknad,
  sykepengesoknad,
]);

export const sykmeldingdiagnose = PropTypes.shape({
  diagnose: PropTypes.string,
  diagnosekode: PropTypes.string,
  diagnosesystem: PropTypes.string,
});

export const sykmeldingperiode = PropTypes.shape({
  fom: PropTypes.instanceOf(Date),
  tom: PropTypes.instanceOf(Date),
  grad: PropTypes.number,
  behandlingsdager: PropTypes.number,
  reisetilskudd: PropTypes.bool,
  avventende: PropTypes.string,
});

export const sykmeldingstatus = PropTypes.oneOf([
  gamleSMStatuser.NY,
  gamleSMStatuser.SENDT,
  gamleSMStatuser.UTGAATT,
  gamleSMStatuser.AVBRUTT,
  gamleSMStatuser.BEKREFTET,
  gamleSMStatuser.TIL_SENDING,
]);

export const sykmelding = PropTypes.shape({
  id: PropTypes.string,
  erPapirsykmelding: PropTypes.bool,
  erEgenmeldt: PropTypes.bool,
  startLegemeldtFravaer: PropTypes.instanceOf(Date),
  skalViseSkravertFelt: PropTypes.bool,
  identdato: PropTypes.instanceOf(Date),
  status: sykmeldingstatus,
  naermesteLederStatus: PropTypes.string,
  innsendtArbeidsgivernavn: PropTypes.string,
  valgtArbeidssituasjon: arbeidssituasjon,
  mottakendeArbeidsgiver: PropTypes.shape({
    navn: PropTypes.string,
    virksomhetsnummer: PropTypes.string,
    juridiskOrgnummer: PropTypes.string,
  }),
  orgnummer: PropTypes.string,
  sendtDato: PropTypes.instanceOf(Date),
  pasient: PropTypes.shape({
    fnr: PropTypes.string,
    fornavn: PropTypes.string,
    mellomnavn: PropTypes.string,
    etternavn: PropTypes.string,
  }),
  arbeidsgiver: PropTypes.string,
  stillingsprosent: PropTypes.number,
  diagnose: PropTypes.shape({
    hoveddiagnose: sykmeldingdiagnose,
    bidiagnoser: PropTypes.arrayOf(sykmeldingdiagnose),
    fravaersgrunnLovfestet: PropTypes.string,
    fravaerBeskrivelse: PropTypes.string,
    svangerskap: PropTypes.bool,
    yrkesskade: PropTypes.bool,
    yrkesskadeDato: PropTypes.instanceOf(Date),
  }),
  mulighetForArbeid: PropTypes.shape({
    perioder: PropTypes.arrayOf(sykmeldingperiode),
    aktivitetIkkeMulig433: PropTypes.arrayOf(PropTypes.string),
    aktivitetIkkeMulig434: PropTypes.arrayOf(PropTypes.string),
    aarsakAktivitetIkkeMulig433: PropTypes.string,
    aarsakAktivitetIkkeMulig434: PropTypes.string,
  }),
  friskmelding: PropTypes.shape({
    arbeidsfoerEtterPerioden: PropTypes.bool,
    hensynPaaArbeidsplassen: PropTypes.string,
    antarReturSammeArbeidsgiver: PropTypes.bool,
    antattDatoReturSammeArbeidsgiver: PropTypes.instanceOf(Date),
    antarReturAnnenArbeidsgiver: PropTypes.bool,
    tilbakemeldingReturArbeid: PropTypes.instanceOf(Date),
    utenArbeidsgiverAntarTilbakeIArbeid: PropTypes.bool,
    utenArbeidsgiverAntarTilbakeIArbeidDato: PropTypes.instanceOf(Date),
    utenArbeidsgiverTilbakemelding: PropTypes.instanceOf(Date),
  }),
  utdypendeOpplysninger: PropTypes.shape({
    sykehistorie: PropTypes.string,
    paavirkningArbeidsevne: PropTypes.string,
    resultatAvBehandling: PropTypes.string,
    henvisningUtredningBehandling: PropTypes.string,
    grupper: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        sporsmal: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            svar: PropTypes.string,
          })
        ),
      })
    ),
  }),
  arbeidsevne: PropTypes.shape({
    tilretteleggingArbeidsplass: PropTypes.string,
    tiltakNAV: PropTypes.string,
    tiltakAndre: PropTypes.string,
  }),
  meldingTilNav: PropTypes.shape({
    navBoerTaTakISaken: PropTypes.bool,
    navBoerTaTakISakenBegrunnelse: PropTypes.string,
  }),
  innspillTilArbeidsgiver: PropTypes.string,
  tilbakedatering: PropTypes.shape({
    dokumenterbarPasientkontakt: PropTypes.instanceOf(Date),
    tilbakedatertBegrunnelse: PropTypes.string,
  }),
  bekreftelse: PropTypes.shape({
    utstedelsesdato: PropTypes.instanceOf(Date),
    sykmelder: PropTypes.string,
    sykmelderTlf: PropTypes.string,
  }),
});
