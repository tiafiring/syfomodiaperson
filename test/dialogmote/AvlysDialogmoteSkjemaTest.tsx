import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import { expect } from "chai";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmote/dialogmoteTypes";
import { Feilmelding } from "nav-frontend-typografi";
import { Feiloppsummering } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import AvlysDialogmoteSkjema from "../../src/components/dialogmote/avlys/AvlysDialogmoteSkjema";
import { texts as skjemaFeilOppsummeringTexts } from "../../src/components/SkjemaFeiloppsummering";
import { texts as valideringsTexts } from "../../src/utils/valideringUtils";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const moteUuid = "123abc";
const mote: DialogmoteDTO = {
  arbeidsgiver: {
    virksomhetsnummer: "912345678",
    type: "ARBEIDSGIVER",
  },
  arbeidstaker: {
    personIdent: "05087321470",
    varselList: [],
    type: "ARBEIDSTAKER",
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
const tekstTilArbeidstaker = "Noe tekst til arbeidstaker";
const tekstTilArbeidsgiver = "Noe tekst til arbeidsgiver";

describe("AvlysDialogmoteSkjemaTest", () => {
  it("viser møtetidspunkt", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} pageTitle="test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    expect(wrapper.text()).to.contain("Gjelder dialogmøtet");
    expect(wrapper.text()).to.contain("Mandag 10. mai 2021 kl. 09.00");
  });
  it("validerer begrunnelser", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} pageTitle="test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === valideringsTexts.begrunnelseArbeidstakerMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === valideringsTexts.begrunnelseArbeidsgiverMissing
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.begrunnelseArbeidstakerMissing
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.begrunnelseArbeidsgiverMissing
    );
  });
  it("valideringsmeldinger forsvinner ved utbedring", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={store({ ...realState })}>
            <AvlysDialogmoteSkjema dialogmote={mote} pageTitle="test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feilmeldinger = wrapper.find(Feilmelding);
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === valideringsTexts.begrunnelseArbeidstakerMissing
      )
    ).to.be.true;
    expect(
      feilmeldinger.someWhere(
        (feil) =>
          feil.text() === valideringsTexts.begrunnelseArbeidsgiverMissing
      )
    ).to.be.true;

    // Feilmeldinger i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.begrunnelseArbeidstakerMissing
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.begrunnelseArbeidsgiverMissing
    );

    // Angi begrunnelser
    changeTextAreaValue(
      wrapper,
      "begrunnelseArbeidsgiver",
      tekstTilArbeidsgiver
    );
    changeTextAreaValue(
      wrapper,
      "begrunnelseArbeidstaker",
      tekstTilArbeidstaker
    );

    // Feilmeldinger og feiloppsummering forsvinner
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(0);

    // Fjern begrunnelser
    changeTextAreaValue(wrapper, "begrunnelseArbeidsgiver", "");
    changeTextAreaValue(wrapper, "begrunnelseArbeidstaker", "");

    // Feilmeldinger vises, feiloppsummering vises ved neste submit
    expect(wrapper.find(Feiloppsummering)).to.have.length(0);
    expect(wrapper.find(Feilmelding)).to.have.length(2);

    wrapper.find(Hovedknapp).simulate("click");
    expect(wrapper.find(Feiloppsummering)).to.have.length(1);
  });
  it("avlyser møte ved submit av skjema", () => {
    const mockStore = store({ ...realState });
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["/sykefravaer/05087321470/dialogmote/123abc/avlys"]}
      >
        <Route path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys">
          <Provider store={mockStore}>
            <AvlysDialogmoteSkjema dialogmote={mote} pageTitle="test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    changeTextAreaValue(
      wrapper,
      "begrunnelseArbeidsgiver",
      tekstTilArbeidsgiver
    );
    changeTextAreaValue(
      wrapper,
      "begrunnelseArbeidstaker",
      tekstTilArbeidstaker
    );

    wrapper.find("form").simulate("submit");

    expect(mockStore.getActions()[0]).to.deep.equal({
      type: "AVLYS_MOTE_FORESPURT",
      fnr: "05087321470",
      moteUuid: moteUuid,
      data: {
        arbeidsgiver: {
          avlysning: [],
          begrunnelse: tekstTilArbeidsgiver,
        },
        arbeidstaker: {
          avlysning: [],
          begrunnelse: tekstTilArbeidstaker,
        },
      },
    });
  });
});

const changeTextAreaValue = (
  wrapper: ReactWrapper<any, any>,
  textAreaName: string,
  value: string
) => {
  const textAreas = wrapper.find("textarea");
  textAreas
    .findWhere((w) => w.prop("name") === textAreaName)
    .simulate("change", { target: { value: value } });
};
