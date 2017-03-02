import {expect} from "chai";
import {validate} from "../../../js/mote/skjema/FlereTidspunktSkjema";
import {mount, shallow, render} from "enzyme";
import React from "react";

describe("FlereTidspunktSkjemaTest", () => {

    describe("validate", () => {

        let values;
        let props;

        beforeEach(() => {
            values = {
                tidspunkter: [{
                    dato: null,
                    klokkeslett: null,
                },{
                    dato: "27.02.17",
                    klokkeslett: "09.00",
                }]
            };
            props = {
                antallNyeTidspunkt: 2,
                antallEksisterendeTidspunkter: 2,
            };
        });

        it("Viser feilmelding dersom tidspunkter ikke er fylt ut", () => {
            const res = validate(values, props);
            expect(res.tidspunkter[0].dato).to.equal("Vennligst angi dato");
            expect(res.tidspunkter[0].klokkeslett).to.equal("Vennligst angi klokkeslett");
        });


        it("Viser feilmelding på riktig tidspunkt", () => {
            values = {
                tidspunkter: [{
                    dato: "27.02.17",
                    klokkeslett: "09.00",
                },{
                    dato: null,
                    klokkeslett: null,
                }]
            };
            const res = validate(values, props);
            expect(res.tidspunkter[1].dato).to.equal("Vennligst angi dato");
            expect(res.tidspunkter[1].klokkeslett).to.equal("Vennligst angi klokkeslett");
        });

        it("Viser feilmelding på hvis feil format", () => {
            values = {
                tidspunkter: [{
                    dato: "27.13.17",
                    klokkeslett: "25.00",
                }]
            };
            const res = validate(values, props);
            expect(res.tidspunkter[0].dato).to.equal("Vennligst angi riktig datoformat; dd.mm.åååå");
            expect(res.tidspunkter[0].klokkeslett).to.equal("Vennligst angi riktig format; f.eks. 13.00");
        });
    });
});