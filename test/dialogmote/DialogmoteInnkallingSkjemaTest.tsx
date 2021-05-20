import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { expect } from "chai";
import { MemoryRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DialogmoteInnkallingSkjema from "../../src/components/dialogmote/innkalling/DialogmoteInnkallingSkjema";
import {
  leggTilDagerPaDato,
  toDatePrettyPrint,
} from "../../src/utils/datoUtils";
import { InputDateStringToISODateString } from "nav-datovelger/lib/utils/dateFormatUtils";
import { Feilmelding } from "nav-frontend-typografi";
import { Feiloppsummering } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import { texts as skjemaFeilOppsummeringTexts } from "../../src/components/SkjemaFeiloppsummering";
import { texts as valideringsTexts } from "../../src/utils/valideringUtils";

const realState = createStore(rootReducer).getState();

const arbeigsgiverOrgnr = "110110110";
const moteSted = "Møtested";
const moteDato = toDatePrettyPrint(leggTilDagerPaDato(new Date(), 1)) as string;
const moteKlokkeslett = "08:00";
const moteDatoTid = `${InputDateStringToISODateString(
  moteDato
)}T${moteKlokkeslett}:00`;
const moteVideoLink = "https://www.link.no";
const fritekstTilArbeidstaker = "Noe fritekst til arbeidstaker";
const fritekstTilArbeidsgiver = "Noe fritekst til arbeidsgiver";
const arbeidstakerFnr = "05087321470";
const navEnhet = "1000";
const store = configureStore([]);
const mockState = {
  enhet: {
    valgtEnhet: navEnhet,
  },
  ledere: {
    data: [
      {
        navn: "Tatten Tattover",
        aktoerId: "1902690001009",
        tlf: "12345666",
        epost: "test3@test.no",
        fomDato: new Date(),
        aktiv: true,
        orgnummer: arbeigsgiverOrgnr,
        organisasjonsnavn: "PONTYPANDY FIRE SERVICE",
        arbeidsgiverForskuttererLoenn: false,
      },
    ],
  },
};

describe("DialogmoteInnkallingSkjema", () => {
  it("validerer arbeidsgiver, dato, tid og sted", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/${arbeidstakerFnr}/dialogmote`]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote">
          <Provider store={store({ ...realState, ...mockState })}>
            <DialogmoteInnkallingSkjema />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.orgMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.dateMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.timeMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.placeMissing
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(valideringsTexts.orgMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.dateMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.timeMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.placeMissing);
  });

  it("valideringsmeldinger forsvinner ved utbedring", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/${arbeidstakerFnr}/dialogmote`]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote">
          <Provider store={store({ ...realState, ...mockState })}>
            <DialogmoteInnkallingSkjema />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.orgMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.dateMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.timeMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) => feil.text() === valideringsTexts.placeMissing
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(valideringsTexts.orgMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.dateMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.timeMissing);
    expect(feiloppsummering.text()).to.contain(valideringsTexts.placeMissing);

    // Fyll inn felter i skjema
    const arbeidsgiverDropdown = wrapper.find("select");
    changeFieldValue(arbeidsgiverDropdown, arbeigsgiverOrgnr);
    const datoVelger = wrapper.find("ForwardRef(DateInput)");
    changeFieldValue(datoVelger, moteDato);
    datoVelger.simulate("blur");

    const inputs = wrapper.find("input");
    const stedInput = inputs.findWhere((w) => w.prop("name") === "sted");
    const videoLinkInput = inputs.findWhere(
      (w) => w.prop("name") === "videoLink"
    );
    const klokkeslettInput = inputs.findWhere(
      (w) => w.prop("name") === "klokkeslett"
    );
    changeFieldValue(stedInput, moteSted);
    changeFieldValue(videoLinkInput, moteVideoLink);
    changeFieldValue(klokkeslettInput, moteKlokkeslett);

    const textAreas = wrapper.find("textarea");
    const fritekstArbeidsgiverTextArea = textAreas.findWhere(
      (w) => w.prop("name") === "fritekstArbeidsgiver"
    );
    const fritekstArbeidstakerTextArea = textAreas.findWhere(
      (w) => w.prop("name") === "fritekstArbeidstaker"
    );
    changeFieldValue(fritekstArbeidsgiverTextArea, fritekstTilArbeidsgiver);
    changeFieldValue(fritekstArbeidstakerTextArea, fritekstTilArbeidstaker);

    // Feilmeldinger og feiloppsummering forsvinner
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(0);

    // Tøm felt for sted
    changeFieldValue(stedInput, "");

    // Feilmelding vises, feiloppsummering vises ved neste submit
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(1);

    wrapper.find(Hovedknapp).simulate("click");
    expect(wrapper.find(Feiloppsummering)).to.have.length(1);
  });

  it("oppretter innkalling med verdier fra skjema", () => {
    const mockStore = store({ ...realState, ...mockState });
    const wrapper = mount(
      <MemoryRouter initialEntries={["/sykefravaer/05087321470/dialogmote"]}>
        <Route path="/sykefravaer/:fnr/dialogmote">
          <Provider store={mockStore}>
            <DialogmoteInnkallingSkjema />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    const arbeidsgiverDropdown = wrapper.find("select");
    changeFieldValue(arbeidsgiverDropdown, arbeigsgiverOrgnr);
    const datoVelger = wrapper.find("ForwardRef(DateInput)");
    changeFieldValue(datoVelger, moteDato);
    datoVelger.simulate("blur");

    const inputs = wrapper.find("input");
    const stedInput = inputs.findWhere((w) => w.prop("name") === "sted");
    const videoLinkInput = inputs.findWhere(
      (w) => w.prop("name") === "videoLink"
    );
    const klokkeslettInput = inputs.findWhere(
      (w) => w.prop("name") === "klokkeslett"
    );
    changeFieldValue(stedInput, moteSted);
    changeFieldValue(videoLinkInput, moteVideoLink);
    changeFieldValue(klokkeslettInput, moteKlokkeslett);

    const textAreas = wrapper.find("textarea");
    const fritekstArbeidsgiverTextArea = textAreas.findWhere(
      (w) => w.prop("name") === "fritekstArbeidsgiver"
    );
    const fritekstArbeidstakerTextArea = textAreas.findWhere(
      (w) => w.prop("name") === "fritekstArbeidstaker"
    );
    changeFieldValue(fritekstArbeidsgiverTextArea, fritekstTilArbeidsgiver);
    changeFieldValue(fritekstArbeidstakerTextArea, fritekstTilArbeidstaker);

    wrapper.find("form").simulate("submit");

    const expectedAction = {
      type: "OPPRETT_INNKALLING_FORESPURT",
      fnr: arbeidstakerFnr,
      data: {
        tildeltEnhet: navEnhet,
        arbeidsgiver: {
          virksomhetsnummer: arbeigsgiverOrgnr,
          fritekstInnkalling: fritekstTilArbeidsgiver,
          innkalling: [],
        },
        arbeidstaker: {
          personIdent: arbeidstakerFnr,
          fritekstInnkalling: fritekstTilArbeidstaker,
          innkalling: [],
        },
        tidSted: {
          sted: moteSted,
          tid: moteDatoTid,
          videoLink: moteVideoLink,
        },
      },
    };

    expect(mockStore.getActions()[0]).to.deep.equal(expectedAction);
  });
});

const changeFieldValue = (field: ReactWrapper<any, any>, newValue: string) => {
  field.simulate("change", {
    target: {
      value: newValue,
    },
  });
};
