import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Utvidbar } from "@navikt/digisyfo-npm";
import { PERSONKORTVISNING_TYPE } from "../../konstanter";
import { hentDiskresjonskode } from "../../actions/diskresjonskode_actions";
import { hentEgenansatt } from "../../actions/egenansatt_actions";
import { hentFastleger } from "../../actions/fastleger_actions";
import { hentLedere } from "../../actions/ledere_actions";
import { hentOppfolgingstilfelleperioder } from "../../actions/oppfolgingstilfelleperioder_actions";
import { hentSykmeldinger } from "../../actions/sykmeldinger_actions";
import OversiktLink from "./OversiktLink";
import PersonkortHeader from "./PersonkortHeader";
import PersonkortVisning from "./PersonkortVisning";

const texts = {
  buttons: {
    sykmeldt: "Kontaktinformasjon",
    leder: "Nærmeste leder",
    fastlege: "Fastlege",
    enhet: "Behandlende enhet",
  },
};

const Personkort = () => {
  const behandlendeEnhetState = useSelector(
    (state: any) => state.behandlendeEnhet
  );
  const behandlendeEnhet = behandlendeEnhetState.data;

  const diskresjonskode = useSelector((state: any) => state.diskresjonskode);
  const egenansatt = useSelector((state: any) => state.egenansatt);
  const fastleger = useSelector((state: any) => state.fastleger);

  const personadresseState = useSelector((state: any) => state.personadresse);
  const personadresse = personadresseState.data;

  const oppfolgingstilfelleperioder = useSelector(
    (state: any) => state.oppfolgingstilfelleperioder
  );

  const sykmeldingerState = useSelector((state: any) => state.sykmeldinger);
  const sykmeldinger = sykmeldingerState.data;

  const [visning, setVisning] = useState(PERSONKORTVISNING_TYPE.SYKMELDT);

  const dispatch = useDispatch();

  const ledereState = useSelector((state: any) => state.ledere);
  const ledere = ledereState.data;
  const navbrukerState = useSelector((state: any) => state.navbruker);
  const navbruker = navbrukerState.data;

  useEffect(() => {
    const brukerFnr = navbruker.kontaktinfo && navbruker.kontaktinfo.fnr;
    if (brukerFnr) {
      dispatch(hentDiskresjonskode(brukerFnr));
      dispatch(hentEgenansatt(brukerFnr));
      dispatch(hentFastleger(brukerFnr));
      dispatch(hentLedere(brukerFnr));
      dispatch(hentSykmeldinger(brukerFnr));
    }
  }, []);

  useEffect(() => {
    const brukerFnr = navbruker.kontaktinfo && navbruker.kontaktinfo.fnr;

    dispatch(hentOppfolgingstilfelleperioder(brukerFnr));
  }, [ledere]);

  return (
    <div className="personkort">
      <OversiktLink />
      <Utvidbar
        erApen={false}
        tittel={
          <PersonkortHeader
            diskresjonskode={diskresjonskode}
            egenansatt={egenansatt}
            navbruker={navbruker}
            oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
            sykmeldinger={sykmeldinger}
          />
        }
      >
        <div>
          <ul>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.SYKMELDT &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.SYKMELDT}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.SYKMELDT);
                }}
              >
                {texts.buttons.sykmeldt}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.LEDER &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEDER}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.LEDER);
                }}
              >
                {texts.buttons.leder}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.LEGE &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEGE}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.LEGE);
                }}
              >
                {texts.buttons.fastlege}
              </button>
            </li>
            <li>
              <button
                className={`${
                  visning === PERSONKORTVISNING_TYPE.ENHET &&
                  "personkort__knapp--aktiv"
                }`}
                aria-pressed={visning === PERSONKORTVISNING_TYPE.ENHET}
                onClick={() => {
                  setVisning(PERSONKORTVISNING_TYPE.ENHET);
                }}
              >
                {texts.buttons.enhet}
              </button>
            </li>
          </ul>

          <div aria-live="polite">
            <PersonkortVisning
              behandlendeEnhet={behandlendeEnhet}
              fastleger={fastleger}
              ledere={ledere}
              navbruker={navbruker}
              personadresse={personadresse}
              sykmeldinger={sykmeldinger}
              visning={visning}
            />
          </div>
        </div>
      </Utvidbar>
    </div>
  );
};

export default Personkort;
