import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Referat from "../../src/components/dialogmote/referat/Referat";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmote/dialogmoteTypes";
import { Innholdstittel } from "nav-frontend-typografi";
import { expect } from "chai";
import { Checkbox } from "nav-frontend-skjema";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const arbeidstakerPersonIdent = "05087321470";
const arbeidstakerNavn = "Arne Arbeidstaker";
const veilederNavn = "Vetle Veileder";
const moteUuid = "123abc";
const mote: DialogmoteDTO = {
  arbeidsgiver: {
    virksomhetsnummer: "912345678",
    type: "ARBEIDSGIVER",
    varselList: [],
  },
  arbeidstaker: {
    personIdent: arbeidstakerPersonIdent,
    type: "ARBEIDSTAKER",
    varselList: [],
  },
  createdAt: "",
  opprettetAv: "",
  status: DialogmoteStatus.INNKALT,
  tildeltEnhet: "",
  tildeltVeilederIdent: "",
  updatedAt: "",
  uuid: moteUuid,
  tid: "2021-05-10T09:00:00.000",
  sted: "Videomøte",
};

const mockState = {
  veilederinfo: {
    data: {
      navn: veilederNavn,
    },
  },
  navbruker: {
    data: {
      navn: arbeidstakerNavn,
      kontaktinfo: {
        fnr: arbeidstakerPersonIdent,
      },
    },
  },
};

describe("ReferatSkjemaTest", () => {
  it("viser arbeidstaker, dato og sted i tittel", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/dialogmote/${moteUuid}/referat`]}
      >
        <Route path="/sykefravaer/dialogmote/:dialogmoteUuid/referat">
          <Provider store={store({ ...realState, ...mockState })}>
            <Referat dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    expect(wrapper.find(Innholdstittel).text()).to.equal(
      `${arbeidstakerNavn}, 10. mai 2021, Videomøte`
    );
  });
  it("viser alle deltakere forhåndsvalgt uten mulighet til å fjerne arbeidstaker", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/dialogmote/${moteUuid}/referat`]}
      >
        <Route path="/sykefravaer/dialogmote/:dialogmoteUuid/referat">
          <Provider store={store({ ...realState, ...mockState })}>
            <Referat dialogmote={mote} />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    const checkboxes = wrapper.find(Checkbox);
    const arbeidstakerCheckbox = checkboxes.at(0);
    const arbeidsgiverCheckbox = checkboxes.at(1);
    const veilederCheckbox = checkboxes.at(2);

    expect(arbeidstakerCheckbox.props().checked).to.be.true;
    expect(arbeidsgiverCheckbox.props().checked).to.be.true;
    expect(veilederCheckbox.props().checked).to.be.true;

    expect(arbeidstakerCheckbox.props().disabled).to.be.true;
    expect(arbeidsgiverCheckbox.props().disabled).to.be.false;
    expect(veilederCheckbox.props().disabled).to.be.false;
  });
});
