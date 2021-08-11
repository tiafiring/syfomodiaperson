import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import { SykmeldingUtdragContainer } from "../../src/components/speiling/sykepengsoknader/SykmeldingUtdragContainer";
import mockSykepengesoknader from "../mockdata/mockSykepengesoknader";
import mockSykmeldinger from "../mockdata/sykmeldinger/mockSykmeldinger";
import SykmeldingUtdrag from "../../src/components/speiling/sykepengsoknader/soknad-felles/SykmeldingUtdrag";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { newSMFormat2OldFormat } from "../../src/utils/sykmeldinger/sykmeldingParser";

const ARBEIDSTAKERSOKNAD_ID = "b9732cc7-6101-446e-a1ef-ec25a425b4fb";
const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const fnr = "12345000000";
const soknad = mockSykepengesoknader.find(
  (s) => s.id === ARBEIDSTAKERSOKNAD_ID
);
const sykmelding = mockSykmeldinger.find((s) => {
  return s.id === soknad.sykmeldingId;
});

describe("SykmeldingUtdrag", () => {
  it("Skal hente sykmeldinger", () => {
    const mockStore = store({ ...realState });
    mount(
      <Provider store={mockStore}>
        <SykmeldingUtdragContainer fnr={fnr} soknad={soknad} />
      </Provider>
    );
    const hentSykmeldingerAction = {
      type: "HENT_SYKMELDINGER_FORESPURT",
      fnr: "12345000000",
    };
    expect(mockStore.getActions()).to.deep.equal([hentSykmeldingerAction]);
  });

  it("Skal vise SykmeldingUtdrag for riktig sykmelding", () => {
    const sykmeldingerData = mockSykmeldinger.map((s) =>
      newSMFormat2OldFormat(s, fnr)
    );
    const mockStore = store({
      ...realState,
      sykmeldinger: { data: sykmeldingerData },
    });
    const wrapper = mount(
      <Provider store={mockStore}>
        <SykmeldingUtdragContainer fnr={fnr} soknad={soknad} />
      </Provider>
    );
    expect(wrapper.find(SykmeldingUtdrag).prop("sykmelding").id).to.equal(
      sykmelding.id
    );
  });
});
