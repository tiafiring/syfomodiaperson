import { mount } from "enzyme";
import React from "react";
import { expect } from "chai";
import SykmeldingPeriodeInfo from "../../src/components/speiling/sykmeldinger/sykmeldinger/SykmeldingPeriodeInfo";
import { SykmeldingPeriodeDTO } from "../../src/data/sykmelding/types/SykmeldingOldFormat";
import { toDateWithoutNullCheck } from "../../src/utils/datoUtils";

const arbeidsgiver = "Arne Arbeidsgiver";
const periodeFlereDager: SykmeldingPeriodeDTO = {
  fom: toDateWithoutNullCheck("2021-06-01"),
  tom: toDateWithoutNullCheck("2021-06-10"),
};
const periodeEnDag: SykmeldingPeriodeDTO = {
  fom: toDateWithoutNullCheck("2021-06-01"),
  tom: toDateWithoutNullCheck("2021-06-01"),
};

describe("SykmeldingPeriodeInfo", () => {
  it("viser tekst med antall dager når sykmeldt flere dager", () => {
    const wrapper = mount(
      <SykmeldingPeriodeInfo
        periode={periodeFlereDager}
        arbeidsgiver={arbeidsgiver}
      />
    );

    expect(wrapper.text()).to.contain(
      `Sykmeldt fra ${arbeidsgiver} i 10 dager`
    );
  });

  it("viser tekst med én dag når sykmeldt én dag", () => {
    const wrapper = mount(
      <SykmeldingPeriodeInfo
        periode={periodeEnDag}
        arbeidsgiver={arbeidsgiver}
      />
    );

    expect(wrapper.text()).to.contain(`Sykmeldt fra ${arbeidsgiver} i 1 dag`);
  });

  it("viser tekst med behandlingsdag når sykmeldt én dag, ingen gradering, med behandlingsdag", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeEnDag,
      behandlingsdager: 1,
    };
    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(`1 behandlingsdag i løpet av 1 dag`);
  });

  it("viser tekst med behandlingsdager når sykmeldt én dag, ingen gradering, med behandlingsdager", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeEnDag,
      behandlingsdager: 3,
    };
    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(`3 behandlingsdager`);
  });

  it("viser tekst med behandlingsdager når sykmeldt flere dager med behandlingsdager", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeFlereDager,
      behandlingsdager: 3,
    };
    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(`3 behandlingsdager i løpet av 10 dager`);
  });

  it("viser tekst med reisetilskudd hvis sykmeldt én dag, ingen gradering med reisetilskudd", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeEnDag,
      reisetilskudd: true,
    };

    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(`Reisetilskudd i 1 dag`);
  });

  it("viser tekst med reisetilskudd hvis sykmeldt flere dager med reisetilskudd", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeFlereDager,
      reisetilskudd: true,
    };

    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(`Reisetilskudd i 10 dager`);
  });

  it("viser tekst med reisetilskudd hvis gradert sykmeldt flere dager med reisetilskudd", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeFlereDager,
      reisetilskudd: true,
      grad: 80,
    };

    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(
      `80 % sykmelding med reisetilskudd i 10 dager`
    );
  });

  it("viser tekst avventende hvis avventende sykmeldt én dag", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeEnDag,
      avventende: "Avventende",
    };

    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(
      `Avventende sykmelding fra ${arbeidsgiver} i 1 dag`
    );
  });

  it("viser tekst avventende hvis avventende sykmeldt flere dager", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeFlereDager,
      avventende: "Avventende",
    };

    const wrapper = mount(
      <SykmeldingPeriodeInfo periode={periode} arbeidsgiver={arbeidsgiver} />
    );

    expect(wrapper.text()).to.contain(
      `Avventende sykmelding fra ${arbeidsgiver} i 10 dager`
    );
  });

  it("viser tekst avventende hvis avventende sykmeldt flere dager uten arbeidsgiver", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeFlereDager,
      avventende: "Avventende",
    };

    const wrapper = mount(<SykmeldingPeriodeInfo periode={periode} />);

    expect(wrapper.text()).to.contain(`Avventende sykemelding i 10 dager`);
  });

  it("viser tekst avventende hvis avventende sykmeldt én dag uten arbeidsgiver", () => {
    const periode: SykmeldingPeriodeDTO = {
      ...periodeEnDag,
      avventende: "Avventende",
    };

    const wrapper = mount(<SykmeldingPeriodeInfo periode={periode} />);

    expect(wrapper.text()).to.contain(`Avventende sykemelding i 1 dag`);
  });
});
