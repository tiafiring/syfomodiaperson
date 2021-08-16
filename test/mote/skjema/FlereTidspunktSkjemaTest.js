import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import {
  validate,
  FlereTidspunktSkjema,
  getData,
  dekorerMedSted,
} from "@/components/mote/skjema/FlereTidspunktSkjema";
import Tidspunkter from "../../../src/components/mote/skjema/Tidspunkter";

describe("FlereTidspunktSkjemaTest", () => {
  describe("FlereTidspunktSkjema", () => {
    let component;

    beforeEach(() => {
      component = mount(<FlereTidspunktSkjema antallNyeTidspunkt={2} />);
    });

    it("Inneholder Tidspunkter", () => {
      expect(component.find(Tidspunkter)).to.have.length(1);
      expect(
        component.find(Tidspunkter).prop("antallNyeTidspunkt")
      ).to.deep.equal(2);
    });
  });

  describe("Transformering av data før sending til server", () => {
    let values;

    beforeEach(() => {
      values = {
        tidspunkter: [
          {
            dato: "2012-02-20",
            klokkeslett: "10:20",
          },
          {
            dato: "2013-02-20",
            klokkeslett: "10:30",
          },
        ],
      };
    });

    it("getData skal mappe values om til riktig format", () => {
      expect(getData(values)).to.deep.equal([
        {
          tid: "2012-02-20T10:20:00",
          valgt: false,
        },
        {
          tid: "2013-02-20T10:30:00",
          valgt: false,
        },
      ]);
    });

    it("dekorerMedSted skal legge til sted på data", () => {
      const data = getData(values);
      const res = dekorerMedSted(data, "Oslo");
      expect(res).to.deep.equal([
        {
          tid: "2012-02-20T10:20:00",
          valgt: false,
          sted: "Oslo",
        },
        {
          tid: "2013-02-20T10:30:00",
          valgt: false,
          sted: "Oslo",
        },
      ]);
    });
  });

  describe("validate", () => {
    let values;
    let props;

    beforeEach(() => {
      values = {
        tidspunkter: [
          {
            dato: null,
            klokkeslett: null,
          },
          {
            dato: "27.02.17",
            klokkeslett: "09:00",
          },
        ],
      };
      props = {
        antallNyeTidspunkt: 2,
      };
    });

    it("Viser feilmelding dersom tidspunkter ikke er fylt ut", () => {
      const res = validate(values, props);
      expect(res.tidspunkter[0].dato).to.equal("Vennligst angi dato");
      expect(res.tidspunkter[0].klokkeslett).to.equal(
        "Vennligst angi klokkeslett"
      );
    });

    it("Viser feilmelding på riktig tidspunkt", () => {
      values = {
        tidspunkter: [
          {
            dato: "27-02-17",
            klokkeslett: "09.00",
          },
          {
            dato: null,
            klokkeslett: null,
          },
        ],
      };
      const res = validate(values, props);
      expect(res.tidspunkter[1].dato).to.equal("Vennligst angi dato");
      expect(res.tidspunkter[1].klokkeslett).to.equal(
        "Vennligst angi klokkeslett"
      );
    });

    it("Viser feilmelding på hvis feil format", () => {
      values = {
        tidspunkter: [
          {
            dato: "27-13-17",
            klokkeslett: "25.00",
          },
        ],
      };
      const res = validate(values, props);
      expect(res.tidspunkter[0].dato).to.equal(
        "Vennligst angi riktig datoformat; dd.mm.åååå"
      );
    });
  });
});
