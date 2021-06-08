import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import { expect } from "chai";
import {
  DialogmoteStatus,
  MotedeltakerVarselType,
} from "../../src/data/dialogmote/types/dialogmoteTypes";
import { MotehistorikkPanel } from "../../src/components/dialogmote/motehistorikk/MotehistorikkPanel";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const mockState = {
  dialogmote: {
    dialogmoter: [
      {
        uuid: 1,
        createdAt: "2021-05-26T12:56:26.238385",
        updatedAt: "2021-05-26T12:56:26.238385",
        status: DialogmoteStatus.FERDIGSTILT,
        opprettetAv: "Z999999",
        tildeltVeilederIdent: "Z999999",
        tildeltEnhet: "1000",
        arbeidstaker: {
          uuid: 2,
          personIdent: "12345678912",
          type: "ARBEIDSTAKER",
          varselList: [
            {
              uuid: 3,
              createdAt: "2021-05-26T12:56:26.271381",
              varselType: MotedeltakerVarselType.INNKALT,
              digitalt: true,
              lestDato: "2021-05-26T12:56:26.271381",
              fritekst: "Ipsum lorum arbeidstaker",
              document: [],
            },
          ],
        },
        arbeidsgiver: {
          uuid: 4,
          virksomhetsnummer: "912345678",
          lederNavn: "He-man",
          lederEpost: null,
          type: "ARBEIDSGIVER",
          varselList: [
            {
              uuid: 5,
              createdAt: "2021-05-26T12:56:26.282386",
              varselType: MotedeltakerVarselType.INNKALT,
              lestDato: "2021-05-26T12:56:26.271381",
              fritekst: "Ipsum lorum arbeidsgiver",
              document: [],
            },
          ],
        },
        sted: "Sted",
        tid: "2021-01-15T11:52:13.539843",
      },
      {
        uuid: 10,
        createdAt: "2020-05-26T12:56:26.238385",
        updatedAt: "2020-05-26T12:56:26.238385",
        status: DialogmoteStatus.AVLYST,
        opprettetAv: "Z999999",
        tildeltVeilederIdent: "Z999999",
        tildeltEnhet: "1000",
        arbeidstaker: {
          uuid: 21,
          personIdent: "12345678912",
          type: "ARBEIDSTAKER",
          varselList: [
            {
              uuid: 31,
              createdAt: "2021-05-26T12:56:26.271381",
              varselType: MotedeltakerVarselType.AVLYST,
              digitalt: true,
              lestDato: "2021-05-26T12:56:26.271381",
              fritekst: "Ipsum lorum arbeidstaker",
              document: [],
            },
          ],
        },
        arbeidsgiver: {
          uuid: 41,
          virksomhetsnummer: "912345678",
          lederNavn: "He-man",
          lederEpost: null,
          type: "ARBEIDSGIVER",
          varselList: [
            {
              uuid: 51,
              createdAt: "2021-05-26T12:56:26.282386",
              varselType: MotedeltakerVarselType.AVLYST,
              lestDato: "2021-05-26T12:56:26.271381",
              fritekst: "Ipsum lorum arbeidsgiver",
              document: [],
            },
          ],
        },
        sted: "Sted",
        tid: "2020-03-22T11:52:13.539843",
      },
    ],
  },
};

describe("Historiske dialogmøter", () => {
  it("Fremviser avholdte og avlyste dialogmøter", () => {
    const wrapper = mount(
      <Provider store={store({ ...realState, ...mockState })}>
        <MotehistorikkPanel />
      </Provider>
    );

    expect(wrapper.text()).to.contain("Avholdt møte Fredag 15. januar 2021");
    expect(wrapper.text()).to.contain("Avlyst møte Søndag 22. mars 2020");
  });
});
