import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { expect } from "chai";
import { MemoryRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DialogmoteInnkallingSkjema from "../../src/components/dialogmote/DialogmoteInnkallingSkjema";
import {
  leggTilDagerPaDato,
  toDatePrettyPrint,
} from "../../src/utils/datoUtils";
import { InputDateStringToISODateString } from "nav-datovelger/lib/utils/dateFormatUtils";

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

    expect(wrapper.text()).to.contain("Vennligst velg arbeidsgiver");
    expect(wrapper.text()).to.contain("Vennligst angi dato");
    expect(wrapper.text()).to.contain("Vennligst angi klokkeslett");
    expect(wrapper.text()).to.contain("Vennligst angi møtested");
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
      (w) => w.prop("name") === "tidspunkt.klokkeslett"
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
