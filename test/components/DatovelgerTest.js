import chai from "chai";
import React from "react";
import { shallow } from "enzyme";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import { Field } from "react-final-form";
import Datovelger, { validerDatoField } from "../../src/components/Datovelger";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Datovelger", () => {
  let component;
  let clock;
  const today = new Date("2017-01-16");

  beforeEach(() => {
    clock = sinon.useFakeTimers(today.getTime()); // 16. januar 2017
  });

  afterEach(() => {
    clock.restore();
  });

  describe("Datovelger", () => {
    beforeEach(() => {
      component = shallow(<Datovelger name="halla" id="id" />);
    });

    it("Skal inneholde et Field", () => {
      expect(component.find(Field)).to.have.length(1);
    });

    it("Skal sende en validate-funksjon videre til Field", () => {
      expect(typeof component.find(Field).prop("validate")).to.equal(
        "function"
      );
    });

    it("Skal sende props videre til Field", () => {
      expect(component.find(Field).prop("name")).to.equal("halla");
      expect(component.find(Field).prop("id")).to.equal("id");
    });
  });

  describe("validerDatoField", () => {
    it("Skal returnere Vennligst angi dato hvis dato ikke er sendt inn", () => {
      const res = validerDatoField();
      expect(res).to.be.equal("Vennligst angi dato");
    });

    it("Skal returnere Datoen er ikke gyldig eller har ikke riktig format hvis dato er på feil format", () => {
      const s =
        "Datoen er ikke gyldig eller har ikke riktig format (dd.mm.åååå)";
      const res = validerDatoField("olsen");
      const res2 = validerDatoField("200-02-22");
      expect(res).to.equal(s);
      expect(res2).to.equal(s);
    });

    it("Skal ikke klage hvis datoen er samme dato som fra", () => {
      const res = validerDatoField("2018-12-01", new Date("2018-12-01"));
      expect(res).to.be.equal(undefined);
    });

    it("Skal ikke klage hvis datoen er etter fra", () => {
      const res = validerDatoField("2018-12-02", new Date("2018-12-01"));
      expect(res).to.be.equal(undefined);
    });
  });
});
