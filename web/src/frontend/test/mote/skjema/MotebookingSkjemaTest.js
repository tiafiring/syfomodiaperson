import {expect} from "chai";
import {MotebookingSkjema, validate, getData, Arbeidstaker} from "../../../js/mote/skjema/MotebookingSkjema";
import {genererDato} from "../../../js/mote/utils/index";
import KontaktInfoFeilmelding from "../../../js/mote/components/KontaktInfoFeilmelding";
import LederFields, {ManuellUtfyltLeder} from "../../../js/mote/skjema/LederFields";
import Tidspunkter from "../../../js/mote/skjema/Tidspunkter";
import {Field, Fields} from "redux-form";
import {mount, shallow, render} from "enzyme";
import {Varselstripe} from "digisyfo-npm";
import React from "react";
import sinon from "sinon";

describe("MotebookingSkjemaTest", () => {

    describe("MotebookingSkjema", () => {

        let handleSubmit;

        beforeEach(() => {
            handleSubmit = sinon.spy();
        })

        it("Skal inneholde tidspunkter", () => {
            const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} />);
            expect(compo.contains(<Tidspunkter skjemanavn="opprettMote" />)).to.be.true;
        });

        it("Skal inneholde felt med mulighet for å skrive inn sted", () => {
            const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} />);
            expect(compo.find(".js-sted").prop("name")).to.equal("sted");
        });

        it("Skal ikke vise feilmelding hvis sendingFeilet !== true", () => {
            const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} />);
            expect(compo.text()).not.to.contain("Beklager")
        });

        it("Skal vise feilmelding hvis sendingFeilet", () => {
            const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} sendingFeilet />);
            expect(compo.text()).to.contain("Beklager")
        });

        it("Skal vise en varselstripe dersom henting av ledere feiler", () => {
            const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} hentLedereFeiletBool />);
            expect(compo.find(Varselstripe)).to.have.length(1);
        });

        describe("Dersom det ikke finnes ledere", () => {
            it("Skal vise ManuellUtfyltLeder", () => {
                const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} />);
                expect(compo.find(ManuellUtfyltLeder)).to.have.length(1);
            })

            it("Skal ikke vise en dropdown", () => {
                const compo = shallow(<MotebookingSkjema ledere={[]} handleSubmit={handleSubmit} />);
                expect(compo.find(Fields)).to.have.length(0);
            });
        });

        describe("Dersom det finnes ledere", () => {

            let ledere;

            beforeEach(() => {
                ledere = [{
                    navn: "Ole",
                    epost: "ole@ole.no",
                    organisasjonsnavn: "Oles pizza"
                }];
            });

            it("SKal ikke vise ManuellUtfyltLeder", () => {
                const compo = shallow(<MotebookingSkjema ledere={ledere} handleSubmit={handleSubmit} />);
                expect(compo.find(ManuellUtfyltLeder)).to.have.length(0);
            })

            it("Skal vise en Fields", () => {
                const compo = shallow(<MotebookingSkjema ledere={ledere} handleSubmit={handleSubmit} />);
                expect(compo.find(Fields)).to.have.length(1);
                expect(compo.find(Fields).prop("component")).to.deep.equal(LederFields);
            });

        });

        describe("Visning av arbeidstakers opplysninger", () => {

            let arbeidstaker;
            let ledere = [];
            let ledetekster;

            beforeEach(() => {
                arbeidstaker = {"navn":"***REMOVED***","kontaktinfo":{"tlf":"+4799999999","epost":"tester.scrambling-script@fellesregistre.no","reservasjon":{"skalHaVarsel":true}}, "hendelser": []};
                ledetekster = {
                    'mote.motebookingskjema.velg-dato-tid-sted': "Velg dato",
                };
            });

            describe("Arbeidstaker", () => {

                it("Skal vise arbeidstakers opplysninger", () => {
                    const compo = shallow(<Arbeidstaker {...arbeidstaker} />);
                    expect(compo.text()).to.contain("***REMOVED***");
                    expect(compo.text()).to.contain("4799999999");
                    expect(compo.text()).to.contain("tester.scrambling-script@fellesregistre.no");
                });

                it("Skal vise riktig overskrift", () => {
                    const compo = shallow(<Arbeidstaker {...arbeidstaker} />);
                    expect(compo.text()).to.contain("2. Arbeidstakers opplysninger")
                })

            });


            describe("Dersom dersom kontaktinfo.reservasjon.skalHaVarsel === true", () => {

                beforeEach(() => {
                    arbeidstaker.kontaktinfo.reservasjon.skalHaVarsel = true;
                })

                it("Skal vise arbeidstakers info", () => {
                    const compo = shallow(<MotebookingSkjema arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} />);
                    expect(compo.find(Arbeidstaker)).to.have.length(1); 
                });

                it("Skal ikke vise info om reservasjon", () => {
                    const compo = shallow(<MotebookingSkjema arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} />);
                    expect(compo.find(KontaktInfoFeilmelding)).to.have.length(0);
                });

                it("SKal vise riktig nummerering", () => {
                    const compo = shallow(<MotebookingSkjema arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} ledetekster={ledetekster} />);
                    expect(compo.text()).to.contain("3. Velg dato");
                }); 

            });

            describe("Dersom dersom kontaktinfo.reservasjon.skalHaVarsel === false", () => {

                beforeEach(() => {
                    arbeidstaker.kontaktinfo.reservasjon.skalHaVarsel = false;
                })

                it("Skal ikke vise arbeidstakers info ", () => {
                    const compo = shallow(<MotebookingSkjema arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} />);
                    expect(compo.find(Arbeidstaker)).to.have.length(0); 
                });

                it("Skal vise info om reservasjon med riktig feilAarsak", () => {
                    arbeidstaker.kontaktinfo.reservasjon.feilAarsak = "KODE6"
                    const compo = shallow(<MotebookingSkjema ledetekster={ledetekster} arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} />);
                    expect(compo.find(KontaktInfoFeilmelding)).to.have.length(1);
                });

                it("Skal vise info om reservasjon med riktig feilAarsak", () => {
                    arbeidstaker.kontaktinfo.reservasjon.feilAarsak = "INGEN_KONTAKTINFORMASJON"
                    const compo = shallow(<MotebookingSkjema ledetekster={ledetekster} arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} />);
                    expect(compo.find(KontaktInfoFeilmelding)).to.have.length(1);
                });

                it("SKal vise riktig nummerering", () => {
                    const compo = shallow(<MotebookingSkjema arbeidstaker={arbeidstaker} ledere={ledere} handleSubmit={handleSubmit} ledetekster={ledetekster} />);
                    expect(compo.text()).not.to.contain("2. Arbeidstakers opplysninger");
                    expect(compo.text()).to.contain("2. Velg dato");
                }); 

            });

        });

    });

    describe("validate", () => {

        let values;
        let props;

        beforeEach(() => {
            values = {};
            props = {
                nullstillVirksomhet: Function,
                hentVirksomhet: Function,
                ledere: []
            };
        });

        it("Skal validere nærmeste leders e-post dersom e-post ikke er fylt ut", () => {
            const res = validate(values, props);
            expect(res.deltakere[0].epost).to.equal("Vennligst fyll ut nærmeste leders e-post-adresse");
        });

        it("Skal vise feilmelding dersom orgnummer består av 8 tegn", () => {
            values.deltakere = [{ orgnummer:"12345678" }];
            values.arbeidsgiverType = "manuell";
            const res = validate(values, props);
            expect(res.deltakere[0].orgnummer).to.equal("Et orgnummer består av 9 siffer");
        });

        it("Skal ikke vise feilmelding dersom orgnummer består av 9 tegn", () => {
            values.deltakere = [{ orgnummer:"123456789" }];
            values.arbeidsgiverType = "manuell";
            const res = validate(values, props);
            expect(res.deltakere[0].orgnummer).to.equal(undefined);
        });

        it("Skal vise feilmelding dersom orgnummer består av 9 tegn, men en bokstav", () => {
            values.deltakere = [{ orgnummer:"12345678a" }];
            values.arbeidsgiverType = "manuell";
            const res = validate(values, props);
            expect(res.deltakere[0].orgnummer).to.equal("Et orgnummer består av 9 siffer");
        });

        it("Skal ikke vise feilmelding dersom orgnummer består 8 tegn, men type valg", () => {
            values.deltakere = [{ orgnummer:"12345678" }];
            values.arbeidsgiverType = "valg";
            const res = validate(values, props);
            expect(res.deltakere[0].orgnummer).to.equal(undefined);
        });

        it("Skal validere nærmeste leders e-post dersom e-post er ugyldig", () => {
            values.deltakere = [{
                epost: "min epost"
            }];
            const res = validate(values, props);
            expect(res.deltakere[0].epost).to.equal("Vennligst fyll ut en gyldig e-post-adresse");
        });

        it("Skal validere nærmeste leders navn dersom det ikke er fylt ut", () => {
            const res = validate(values, props);
            expect(res.deltakere[0].navn).to.equal("Vennligst fyll ut nærmeste leders navn");
        });

        it("Skal validere tidspunkter dersom ingen felt er angitt (1)", () => {
            const res = validate(values, props);
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
            const res = validate(values, props);
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
            const res = validate(values, props);
            expect(res.tidspunkter).to.deep.equal([{
                dato: "Vennligst angi dato",
            }, {}])
        });

        it("Skal validere tidspunkter dersom dato er på feil format", () => {
            values.tidspunkter = [{
                dato: "A1.12.2016",
            }, {}]
            const res = validate(values, props);
            expect(res.tidspunkter[0].dato).to.equal("Vennligst angi riktig datoformat; dd.mm.åååå");
        });

        it("Skal validere tidspunkter dersom klokkeslett er på feil format", () => {
            values.tidspunkter = [{
                dato: "12.12.2016",
                klokkeslett: "A1.11"
            }, {}]
            const res = validate(values, props);
            expect(res.tidspunkter[0].klokkeslett).to.equal("Vennligst angi riktig format; f.eks. 13.00");
        });

        it("Skal validere tidspunkter dersom andre felt mangler dato", () => {
            values.tidspunkter = [{
                dato: "22.02.2016",
                klokkeslett: "12.15"
            }, {
                klokkeslett: "10.00"
            }]
            const res = validate(values, props);
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
            const res = validate(values, props);
            expect(res.tidspunkter).to.deep.equal([{}, {
                klokkeslett: "Vennligst angi klokkeslett",
            }])
        });

        it("Skal validere sted dersom sted ikke finnes", () => {
            const res = validate(values, props);
            expect(res.sted).to.equal("Vennligst angi møtested")
        });

        it("Skal validere sted dersom sted finnes", () => {
            values.sted = "Økernveien 94"
            const res = validate(values, props);
            expect(res.sted).to.be.undefined;
        });

        it("Skal validere sted dersom sted er en tom streng (1)", () => {
            values.sted = " ";
            const res = validate(values, props);
            expect(res.sted).to.equal("Vennligst angi møtested")
        });

        it("Skal validere sted dersom sted er en tom streng (2)", () => {
            values.sted = "";
            const res = validate(values, props);
            expect(res.sted).to.equal("Vennligst angi møtested")
        });

        it("Skal validere arbeidsgiverType dersom det finnes ledere", () => {
            props.ledere = [{id: 1}];
            const res = validate(values, props);
            expect(res.arbeidsgiverType).to.equal("Vennligst velg arbeidsgiver");
        });

        it("Skal ikke validere arbeidsgiverType dersom det ikke finnes ledere", () => {
            const res = validate(values, props);
            expect(res.arbeidsgiverType).to.be.undefined;
        });

        it("Skal ikke klage på arbeidsgiverType dersom det er valgt arbeidsgiverType", () => {
            values.arbeidsgiverType = "manuell";
            const res = validate(values, props);
            expect(res.arbeidsgiverType).to.be.undefined;

            values.arbeidsgiverType = "123";
            const res2 = validate(values, props);
            expect(res2.arbeidsgiverType).to.be.undefined;
        });


        it("Skal klage på arbeidsgiverType dersom det er valgt arbeidsgiverType === 'VELG' og det finnes ledere", () => {
            values.ledere = [{ id: "88"}];
            values.arbeidsgiverType = "VELG";
            const res = validate(values, props);
            expect(res.arbeidsgiverType).to.equal("Vennligst velg arbeidsgiver");
        });

    })

    describe("genererDato", () => {
        it("Skal returnere dato på riktig format når dato er dd.mm.åååå", () => {
            const klokkeslett = "12.15";
            const dato = "15.06.2017";
            expect(genererDato(dato, klokkeslett)).to.equal("2017-06-15T10:15:00.000Z");
        });

        it("Skal returnere dato på riktig format når dato er dd.mm.åå", () => {
            const klokkeslett = "12.15";
            const dato = "15.06.17";
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
            const values = {
                "deltakere": [
                    {
                        "navn": "***REMOVED***",
                        "epost": "ole.olsen@nav.no",
                    }
                ],
                "tidspunkter": [
                    {
                        "dato": "12.08.2016",
                        "klokkeslett": "15.00"
                    },
                    {
                        "dato": "13.08.2016",
                        "klokkeslett": "12.00"
                    }
                ],
                "sted": "Oslo"
            };
            const res = getData(values)
            expect(res).to.deep.equal({
                deltakere: [
                    {
                        "navn": "***REMOVED***",
                        "epost": "ole.olsen@nav.no",
                        "type": "arbeidsgiver",
                        "svar": [
                            {
                                "sted": "Oslo",
                                "tid": "2016-08-12T13:00:00.000Z",
                                "valgt":false,
                            },
                            {
                                "sted": "Oslo",
                                "tid": "2016-08-13T10:00:00.000Z",
                                "valgt":false,
                            }
                        ],
                    }
                ],
                alternativer: [{
                    "sted": "Oslo",
                    "tid": "2016-08-12T13:00:00.000Z",
                    "valgt": false
                }, {
                    "sted": "Oslo",
                    "tid": "2016-08-13T10:00:00.000Z",
                    "valgt": false
                }]
            })
        });
    })

})