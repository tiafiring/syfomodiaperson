import { expect } from 'chai';
import MotebookingSkjema, { validate } from '../../../js/mote/skjema/MotebookingSkjema';

describe("MotebookingSkjema", () => {

    describe("validate", () => {

        let values;

        beforeEach(() => {
            values = {};
        })

        it("Skal validere nærmeste leders e-post dersom e-post ikke er fylt ut", () => {
            const res = validate(values);
            expect(res.naermesteLederEpost).to.equal("Vennligst fyll ut nærmeste leders e-post-adresse");
        }); 

        it("Skal validere nærmeste leders e-post dersom e-post er ugyldig", () => {
            values.naermesteLederEpost = "min epost";
            const res = validate(values);
            expect(res.naermesteLederEpost).to.equal("Vennligst fyll ut en gyldig e-post-adresse");
        }); 

        it("Skal validere nærmeste leders navn dersom det ikke er fylt ut", () => {
            const res = validate(values);
            expect(res.naermesteLederNavn).to.equal("Vennligst fyll ut nærmeste leders navn");
        });

        it("Skal validere tidspunkter dersom ingen felt er angitt (1)", () => {
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{
                dato: "Vennligst angi dato",
                klokkeslett: "Vennligst angi klokkeslett"
            }, {
                dato: "Vennligst angi dato",
                klokkeslett: "Vennligst angi klokkeslett"
            }])
        });

        it("Skal validere tidspunkter dersom ingen felt er angitt (2)", () => {
            values.tidspunkter = []
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{
                dato: "Vennligst angi dato",
                klokkeslett: "Vennligst angi klokkeslett"
            }, {
                dato: "Vennligst angi dato",
                klokkeslett: "Vennligst angi klokkeslett"
            }])
        });

        it("Skal validere tidspunkter dersom første felt mangler dato", () => {
            values.tidspunkter = [{
                klokkeslett: "12.15"
            }, {
                dato: "22.01.2016",
                klokkeslett: "10.00"
            }]
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{
                dato: "Vennligst angi dato",
            }, {}])
        }); 

        it("Skal validere tidspunkter dersom første felt mangler klokkeslett", () => {
            values.tidspunkter = [{
                dato: "12.12.2016",
            }, {
                dato: "22.01.2016",
                klokkeslett: "10.00"
            }]
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{
                klokkeslett: "Vennligst angi klokkeslett",
            }, {}])
        }); 

        it("Skal validere tidspunkter dersom andre felt mangler dato", () => {
            values.tidspunkter = [{
                dato: "22.02.2016",
                klokkeslett: "12.15"
            }, {
                klokkeslett: "10.00"
            }]
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{}, {
                dato: "Vennligst angi dato",
            }])
        }); 

        it("Skal validere tidspunkter dersom andre felt mangler klokkeslett", () => {
            values.tidspunkter = [{
                dato: "12.12.2016",
                klokkeslett: "10.00"
            }, {
                dato: "22.01.2016",
            }]
            const res = validate(values);
            expect(res.tidspunkter).to.deep.equal([{}, {
                klokkeslett: "Vennligst angi klokkeslett",
            }])
        });

        it("Skal validere sted dersom sted ikke finnes", () => {
            const res = validate(values)
            expect(res.moetested).to.equal("Vennligst angi møtested")
        });


        it("Skal validere sted dersom sted finnes", () => {
            values.moetested = "Økernveien 94"
            const res = validate(values)
            expect(res.moetested).to.be.undefined;
        });


    })

})