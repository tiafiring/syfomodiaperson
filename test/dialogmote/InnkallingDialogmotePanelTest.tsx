import { expect } from "chai";
import { mount } from "enzyme";
import { Link, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import {
  InnkallingDialogmotePanel,
  texts as innkallingDialmotePanelTexts,
} from "../../src/components/mote/components/innkalling/InnkallingDialogmotePanel";
import { createStore } from "redux";
import { rootReducer } from "@/data/rootState";
import configureStore from "redux-mock-store";
import Alertstripe from "nav-frontend-alertstriper";
import { NyttDialogMote } from "@/components/mote/components/innkalling/NyttDialogMote";
import ModalWrapper from "nav-frontend-modal";
import { brukerKanIkkeVarslesTekst } from "@/components/BrukerKanIkkeVarslesText";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const brukerKanVarsles = {
  data: {
    kontaktinfo: {
      skalHaVarsel: true,
    },
  },
};
const brukerKanIkkeVarsles = {
  data: {
    kontaktinfo: {
      skalHaVarsel: false,
    },
  },
};

const mockState = {
  unleash: {
    dm2Enabled: true,
  },
};

describe("InnkallingDialogmotePanel med dm2 enabled", () => {
  it("viser advarsel når bruker ikke kan varsles", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/sykefravaer/moteoversikt`]}>
        <Route path="/sykefravaer/moteoversikt">
          <Provider
            store={store({
              ...realState,
              ...mockState,
              navbruker: brukerKanIkkeVarsles,
            })}
          >
            <InnkallingDialogmotePanel />
          </Provider>
        </Route>
      </MemoryRouter>
    );
    const alertstripe = wrapper.find(Alertstripe);
    expect(alertstripe.prop("type")).to.equal("advarsel");
    expect(alertstripe.text()).to.contain(brukerKanIkkeVarslesTekst);
    expect(alertstripe.text()).to.contain(
      innkallingDialmotePanelTexts.kanIkkeVarslesDialogmoteInnkalling
    );
  });
  it("Nytt dialogmøte-knapp linker direkte til møteplanleggeren uten modaler når bruker ikke kan varsles", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/sykefravaer/moteoversikt`]}>
        <Route path="/sykefravaer/moteoversikt">
          <Provider
            store={store({
              ...realState,
              ...mockState,
              navbruker: brukerKanIkkeVarsles,
            })}
          >
            <InnkallingDialogmotePanel />
          </Provider>
        </Route>
      </MemoryRouter>
    );
    expect(wrapper.find(NyttDialogMote).find(Link).prop("to")).to.equal(
      "/sykefravaer/mote"
    );
    expect(wrapper.find(NyttDialogMote).find(ModalWrapper)).to.have.length(0);
  });
  it("viser ingen advarsel når bruker kan varsles", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/sykefravaer/moteoversikt`]}>
        <Route path="/sykefravaer/moteoversikt">
          <Provider
            store={store({
              ...realState,
              ...mockState,
              navbruker: brukerKanVarsles,
            })}
          >
            <InnkallingDialogmotePanel />
          </Provider>
        </Route>
      </MemoryRouter>
    );
    expect(wrapper.find(Alertstripe)).to.have.length(0);
  });
  it("Nytt dialogmøte-knapp viser modaler når bruker kan varsles", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/sykefravaer/moteoversikt`]}>
        <Route path="/sykefravaer/moteoversikt">
          <Provider
            store={store({
              ...realState,
              ...mockState,
              navbruker: brukerKanVarsles,
            })}
          >
            <InnkallingDialogmotePanel />
          </Provider>
        </Route>
      </MemoryRouter>
    );
    expect(wrapper.find(NyttDialogMote).find(Link)).to.have.length(0);
    expect(wrapper.find(NyttDialogMote).find(ModalWrapper)).to.have.length(2);
  });
});
