import { expect } from "chai";
import {
  referatTexts,
  StandardtekstKey,
} from "../../src/data/dialogmote/dialogmoteTexts";

const expectedStandardtekstKeys = [
  "IKKE_BEHOV",
  "FRISKMELDING_ARBEIDSFORMIDLING",
  "AVKLARING_ARBEIDSEVNE",
  "OPPFOLGINGSTILTAK",
  "ARBEIDSRETTET_REHABILITERING",
  "OPPLAERING_UTDANNING",
  "UNNTAK_ARBEIDSGIVERPERIODE",
  "REISETILSKUDD",
  "HJELPEMIDLER_TILRETTELEGGING",
  "MIDLERTIDIG_LONNSTILSKUDD",
  "OKONOMISK_STOTTE",
  "INGEN_RETTIGHETER",
];

describe("dialogmoteTexts", () => {
  it("inneholder forventede standardtekst-nøkler", () => {
    expect(Object.values(StandardtekstKey)).to.deep.equal(
      expectedStandardtekstKeys,
      "har ikke forventede standardtekst-nøkler"
    );
  });

  it("referattekster har tekster for alle standardtekst-nøkler", () => {
    expectedStandardtekstKeys.forEach((key) => {
      expect(
        referatTexts.standardTekster.some(
          (standardTekst) => standardTekst.key === key
        ),
        `mangler standardtekst for nøkkel ${key}`
      ).to.be.true;
    });
  });
});
