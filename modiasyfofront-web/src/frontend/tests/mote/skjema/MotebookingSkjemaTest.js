import { expect } from 'chai';
import MotebookingSkjema, { validate, genererDato, getData } from '../../../js/mote/skjema/MotebookingSkjema';

describe("MotebookingSkjema", () => {

    describe("validate", () => {

        let values;

        beforeEach(() => {
            values = {};
        })

        it("Skal validere nærmeste leders e-post dersom e-post ikke er fylt ut", () => {
            const res = validate(values);
            expect(res.deltakere[0].epost).to.equal("Vennligst fyll ut nærmeste leders e-post-adresse");
        }); 

        it("Skal validere nærmeste leders e-post dersom e-post er ugyldig", () => {
            values.deltakere = [{
                epost: "min epost"
            }];
            const res = validate(values);
            expect(res.deltakere[0].epost).to.equal("Vennligst fyll ut en gyldig e-post-adresse");
        }); 

        it("Skal validere nærmeste leders navn dersom det ikke er fylt ut", () => {
            const res = validate(values);
            expect(res.deltakere[0].navn).to.equal("Vennligst fyll ut nærmeste leders navn");
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

        it("Skal validere tidspunkter dersom dato er på feil format", () => {
            values.tidspunkter = [{
                dato: "A1.12.2016",
            }, {}]
            const res = validate(values);
            expect(res.tidspunkter[0].dato).to.equal("Vennligst angi dato på formatet dd.mm.yyyy");
        }); 

        it("Skal validere tidspunkter dersom klokkeslett er på feil format", () => {
            values.tidspunkter = [{
                dato: "12.12.2016",
                klokkeslett: "A1.11"
            }, {}]
            const res = validate(values);
            expect(res.tidspunkter[0].klokkeslett).to.equal("Vennligst angi klokkeslett på formatet 13.00");
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
            expect(res.sted).to.equal("Vennligst angi møtested")
        });


        it("Skal validere sted dersom sted finnes", () => {
            values.sted = "Økernveien 94"
            const res = validate(values)
            expect(res.sted).to.be.undefined;
        });

        it("Skal validere sted dersom sted er en tom streng (1)", () => {
            values.sted = " ";
            const res = validate(values)
            expect(res.sted).to.equal("Vennligst angi møtested")
        });

        it("Skal validere sted dersom sted er en tom streng (2)", () => {
            values.sted = "";
            const res = validate(values)
            expect(res.sted).to.equal("Vennligst angi møtested")
        });

    })

    describe("genererDato", () => {
        it("Skal returnere dato på riktig format", () => {
            const klokkeslett = "12.15";
            const dato = "15.06.2017";
            expect(genererDato(dato, klokkeslett)).to.equal("2017-06-15T10:15:00.000Z");
        });

        it("Skal returnere dato på riktig format", () => {
            const klokkeslett = "1.15";
            const dato = "15.06.2017";
            expect(genererDato(dato, klokkeslett)).to.equal("2017-06-14T23:15:00.000Z");
        });
    });

    describe("getData", () => {
        it("Skal svare med data på riktig format", () => {
            const values = {"deltakere":[{"navn":"***REMOVED***","epost":"ole.olsen@nav.no"}],"tidspunkter":[{"dato":"12.08.2016","klokkeslett":"15.00"},{"dato":"13.08.2016","klokkeslett":"12.00"}],"sted":"Oslo"};
            const res = getData(values)
            expect(res).to.deep.equal({
                deltakere: [{"navn":"***REMOVED***","epost":"ole.olsen@nav.no","type":"arbeidsgiver"}],
                tidspunkter: [{
                    "sted": "Oslo",
                    "tid": "2016-08-12T13:00:00.000Z"
                }, {
                    "sted": "Oslo",
                    "tid": "2016-08-13T10:00:00.000Z"
                }]
            })
        });
    })

})