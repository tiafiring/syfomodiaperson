import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import AppSpinner from "../../src/components/AppSpinner";
import Feilmelding from "../../src/components/Feilmelding";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Motelandingsside from "../../src/components/mote/components/Motelandingsside";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";

const realState = createStore(rootReducer).getState();

describe("MotelandingssideContainer", () => {
  describe("MotelandingssideSide", () => {
    let component;
    let store;
    let mockState;

    beforeEach(() => {
      store = configureStore([]);
      mockState = {
        tilgang: {
          data: {
            harTilgang: true,
          },
        },
        navbruker: {
          data: {
            kontaktinfo: {
              fnr: "19026900010",
            },
          },
        },
        moter: {
          data: [],
        },
      };
    });

    it("Skal vise AppSpinner når henter tilgang", () => {
      mockState.tilgang = {
        henter: true,
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <Motelandingsside fnr="19026900010" />
        </Provider>
      );

      expect(component.find(AppSpinner)).to.have.length(1);
    });

    it("Skal vise AppSpinner når henter møter", () => {
      mockState.moter = {
        henter: true,
        data: [],
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <Motelandingsside fnr="19026900010" />
        </Provider>
      );

      expect(component.find(AppSpinner)).to.have.length(1);
    });

    it("Skal hente møter ved init", () => {
      mockState.tilgang = {
        data: {
          harTilgang: false,
        },
      };
      const mockStore = store({ ...realState, ...mockState });
      component = mount(
        <Provider store={mockStore}>
          <Motelandingsside fnr="19026900010" />
        </Provider>
      );

      const expectedActions = [
        { type: "HENT_MOTER_FORESPURT", fnr: "19026900010" },
      ];
      expect(mockStore.getActions()).to.deep.equal(expectedActions);
    });

    it("Skal vise feilmelding hvis ikke tilgang", () => {
      mockState.tilgang = {
        data: {
          harTilgang: false,
        },
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <Motelandingsside fnr="19026900010" />
        </Provider>
      );

      expect(component.find(Feilmelding)).to.have.length(1);
    });

    it("Skal vise feilmelding hvis hentingFeilet", () => {
      mockState.tilgang = {
        hentingFeilet: true,
        data: {
          harTilgang: true,
        },
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <Motelandingsside fnr="19026900010" />
        </Provider>
      );

      expect(component.find(Feilmelding)).to.have.length(1);
    });

    it("Skal vise Se møtestatus når møte opprettet", () => {
      mockState.moter = {
        data: [
          {
            id: 1,
            status: "OPPRETTET",
          },
        ],
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <MemoryRouter>
            <Motelandingsside fnr="887766" />
          </MemoryRouter>
        </Provider>
      );

      expect(component.find("h3").text()).to.equal("Se møtestatus");
    });

    it("Skal vise Bekreftet møte når møte bekreftet", () => {
      mockState.moter = {
        data: [
          {
            id: 1,
            status: "BEKREFTET",
          },
        ],
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <MemoryRouter>
            <Motelandingsside fnr="887766" />
          </MemoryRouter>
        </Provider>
      );

      expect(component.find("h3").text()).to.equal("Bekreftet møte");
    });

    it("Skal vise Forespør møte når møte avbrutt", () => {
      mockState.moter = {
        data: [
          {
            id: 1,
            status: "AVBRUTT",
          },
        ],
      };
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <MemoryRouter>
            <Motelandingsside fnr="887766" />
          </MemoryRouter>
        </Provider>
      );

      expect(component.find("h3").text()).to.equal("Forespør møte");
    });

    it("Skal vise Forespør møte når det ikke finnes møter", () => {
      component = mount(
        <Provider store={store({ ...realState, ...mockState })}>
          <MemoryRouter>
            <Motelandingsside fnr="887766" />
          </MemoryRouter>
        </Provider>
      );

      expect(component.find("h3").text()).to.equal("Forespør møte");
    });
  });
});
