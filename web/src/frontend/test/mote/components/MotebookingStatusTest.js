import {expect} from "chai";
import MotebookingStatus, { MotetidspunktValgt, StatusVarsel } from "../../../js/mote/components/MotebookingStatus";
import Svarstatus from '../../../js/mote/components/Svarstatus';
import BekreftetMotetidspunkt from "../../../js/mote/components/BekreftetMotetidspunkt";
import KontaktInfoFeilmelding from "../../../js/mote/components/KontaktInfoFeilmelding";
import FlereTidspunktSkjema from "../../../js/mote/skjema/FlereTidspunktSkjema";
import Sidetopp from '../../../js/components/Sidetopp';
import {mount, shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import {Varselstripe} from "digisyfo-npm";

describe("MotebookingStatus", () => {

    let mote = {}
    let avbrytMote;
    let ledetekster = {
        'mote.bookingstatus.bekreftet.tittel': 'Bekreftet møtetidspunkt',
        'mote.bookingstatus.bekreftet.sendt-til': "Møtetidspunkt valgt, møteresultat og varsel er sendt til %DELTAKERE%",
        'mote.bookingstatus.foresporsel.sendt.til': 'Møteforespørselen ble sendt til %DELTAKERE%',
        'mote.bookingstatus.sendt-dato': 'Sendt: %DATO%',
    }

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        }
        mote.alternativer = [{
            "tid": "2012-12-12T11:00:00Z",
            "created": "2011-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 1
        }, {
            "tid": "2009-09-09T07:00:00Z",
            "created": "2011-12-12T11:00:00Z",
            "sted": "Oslo by",
            "valgt": false,
            "id": 2
        }];
        mote.opprettetTidspunkt = "2016-11-22T12:56:32.561Z";
        mote.status = 'OPPRETTET';
        mote.deltakere = [{
            type: "arbeidsgiver",
            navn: "Helge",
            epost: "***REMOVED***",
            avvik: [],
            hendelser: [],
            svar: [{
                "tid": "2012-12-12T11:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 1
            }, {
                "tid": "2009-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 2
            }],
        }, {
            type: "Bruker",
            navn: "Ole",
            avvik: [],
            hendelser: [],
            epost: "***REMOVED***",
            svar: [{
                "tid": "2012-12-12T11:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 1
            }, {
                "tid": "2009-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo by",
                "valgt": false,
                "id": 2
            }],
        }];
        bekreftetMote =  {
            "id": 0,
            "moteUuid": "f26984a2-e038-4de6-a6af-4f4f5db96b26",
            "opprettetAv": "Z990562",
            "status": "BEKREFTET",
            "opprettetTidspunkt": "2016-11-22T12:56:32.561Z",
            "bekreftetTidspunkt": "2017-03-23T12:56:32.561Z",
            "navEnhet": "navEnhet",
            "deltakere": [{
                "deltakerUuid": "3b0dc3b2-587c-4105-98df-99b4205d3ce9",
                "navn": "***REMOVED***",
                "epost": "***REMOVED***",
                "type": "arbeidsgiver",
                "svartidspunkt": "2016-11-22T12:52:06.489Z",
                "avvik": [],
                "hendelser": [],
                "svar": [{
                    "id": 344,
                    "tid": "2019-09-09T07:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": true
                }, {
                    "id": 345,
                    "tid": "2020-09-09T18:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": false
                }]
            }],
            "bekreftetAlternativ": {
                "id": 344,
                "tid": "2019-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo",
                "valgt": true
            },
            "alternativer": [{
                "id": 344,
                "tid": "2019-09-09T07:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo",
                "valgt": true
            }, {
                "id": 345,
                "tid": "2020-09-09T18:00:00Z",
                "created": "2011-12-12T11:00:00Z",
                "sted": "Oslo",
                "valgt": false
            }]
        };
        avbrytMote = sinon.spy();
    })

    describe("StatusVarsel", () => {

        it("Skal vise riktig tekst når møtet er OPPRETTET", () => {
            let component = mount(<StatusVarsel mote={mote} ledetekster={ledetekster} />)
            expect(component.find(Varselstripe).text()).to.contain("Møteforespørselen ble sendt til Helge og Ole");
            expect(component.find(Varselstripe).text()).to.contain("Sendt: 22.11.2016");
        });

        it("Skal vise riktig tekst når møtet er OPPRETTET og arbeidstaker er reservert i KRR", () => {
            mote.deltakere[1].hendelser = [{
                varseltype: "OPPRETTET",
                resultat: "RESERVERT"
            }]
            let component = mount(<StatusVarsel mote={mote} ledetekster={ledetekster} />)
            expect(component.find(Varselstripe).text()).to.contain("Møteforespørselen ble sendt til Helge");
            expect(component.find(Varselstripe).text()).not.to.contain("Ole");
            expect(component.find(Varselstripe).text()).to.contain("Sendt: 22.11.2016");
        });

        it("Skal vise riktig tekst når møtet er BEKREFTET", () => {
            let component = mount(<StatusVarsel mote={bekreftetMote} ledetekster={ledetekster} />)
            expect(component.find(Varselstripe).text()).to.contain("Møtetidspunkt valgt, møteresultat og varsel er sendt til ***REMOVED***");
            expect(component.find(Varselstripe).text()).to.contain("Sendt: 23.03.2017");
        });

    })

    describe("Når møtet ikke er bekreftet", () => {
        let component;

        beforeEach(() => {
            component = shallow(<MotebookingStatus mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(1);
            expect(component.find(StatusVarsel).prop("mote")).to.deep.equal(mote);
        });

        it("Skal vise sted", () => {
            expect(component.text()).to.contain("Oslo by"); 
        });

        it("Skal inneholde Svarstatus", () => {
            expect(component.find(Svarstatus)).to.have.length(1);
        });

        it("Skal ikke vise en knapp med teksten 'Velg tidspunkt for møte'", () => {
            expect(component.find(".js-velg-tidspunkt")).to.have.length(0);
        });

    });

    describe("Når antallNyeTidspunkt > 0", () => {
        let component;

        beforeEach(() => {
            component = shallow(<MotebookingStatus mote={mote} antallNyeTidspunkt={4} />);
        });

        it("Skal vise Svarstatus med FlereTidspunktSkjema", () => {
            expect(component.find(Svarstatus).find(FlereTidspunktSkjema)).to.have.length(1);
        });

    });

    describe("Når møtet er bekreftet", () => {

        let mote;

        beforeEach(() => {
            mote = bekreftetMote;
            component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal vise riktig tittel", () => {
            expect(component.find(Sidetopp).prop("tittel")).to.equal("Bekreftet møtetidspunkt")
        })

        it("Skal inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(1);
            expect(component.find(StatusVarsel).prop("mote")).to.deep.equal(mote);
        });

        it("Skal vise hvilket tidspunkt som er valgt", () => {
            expect(component.find(BekreftetMotetidspunkt)).to.have.length(1);
            expect(component.find(BekreftetMotetidspunkt).prop("mote")).to.deep.equal(mote);
            expect(component.find(BekreftetMotetidspunkt).prop("ledetekster")).to.deep.equal(ledetekster);
        });

    });

    describe("Verktøylinje", () => {
            
        it("Skal vise en knapp for Ny møteforespørsel", () => {
            const component = shallow(<MotebookingStatus mote={mote} />);
            expect(component.find(".js-ny")).to.have.length(1)
        });

        it("Skal kalle på avbrytMoteUtenVarsel med moteUuid og fnr når man klikker på knappen", () => {
            mote.moteUuid = "min-mote-uuid";
            const avbrytMoteUtenVarsel = sinon.spy();
            const component = shallow(<MotebookingStatus mote={mote} fnr="mitt-fnr" avbrytMoteUtenVarsel={avbrytMoteUtenVarsel} />);
            component.find(".js-ny").simulate("click");
            expect(avbrytMoteUtenVarsel.calledWith("min-mote-uuid", "mitt-fnr")).to.be.true;
        })
        
        it("Skal vise en link til avbryt møte", () => {
            const component = shallow(<MotebookingStatus mote={mote} />);
            expect(component.find(".js-avbryt")).to.have.length(1)
        });

    })

    describe("Når sykmeldt er reservert i KRR", () => {

        let mote;
        let fikkIkkeOpprettetVarsel;

        beforeEach(() => {
            fikkIkkeOpprettetVarsel = {
                "resultat": "RESERVERT",
                "varseltype": "OPPRETTET",
            };
            mote = {
                "id": 0,
                "moteUuid": "f26984a2-e038-4de6-a6af-4f4f5db96b26",
                "opprettetAv": "Z990562",
                "status": "OPPRETTET",
                "opprettetTidspunkt": "2016-11-22T12:56:32.561Z",
                "navEnhet": "navEnhet",
                "deltakere": [{
                    "deltakerUuid": "3b0dc3b2-587c-4105-98df-99b4205d3ce9",
                    "navn": "***REMOVED***",
                    "epost": "***REMOVED***",
                    "type": "arbeidsgiver",
                    "svartidspunkt": "2016-11-22T12:52:06.489Z",
                    "hendelser": [],
                    "svar": [{
                        "id": 344,
                        "tid": "2019-09-09T07:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": true
                    }, {
                        "id": 345,
                        "tid": "2020-09-09T18:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": false
                    }]
                }],
                "alternativer": [{
                    "id": 344,
                    "tid": "2019-09-09T07:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": true
                }, {
                    "id": 345,
                    "tid": "2020-09-09T18:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": false
                }]
            }
        });

        it("Skal vise KrrMeldingPanel", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} fikkIkkeOpprettetVarsel={fikkIkkeOpprettetVarsel} ledetekster={ledetekster} />);
            expect(component.find(KontaktInfoFeilmelding)).to.have.length(1);
        });

    });

    describe("Når sykmeldt er reservert i KRR, men har svart", () => {

        let mote;
        let fikkIkkeOpprettetVarsel;

        beforeEach(() => {
            fikkIkkeOpprettetVarsel = {
                "resultat": "RESERVERT",
                "varseltype": "OPPRETTET",
            };
            mote = {
                "id": 0,
                "moteUuid": "f26984a2-e038-4de6-a6af-4f4f5db96b26",
                "opprettetAv": "Z990562",
                "status": "OPPRETTET",
                "opprettetTidspunkt": "2016-11-22T12:56:32.561Z",
                "navEnhet": "navEnhet",
                "deltakere": [{
                    "deltakerUuid": "3b0dc3b2-587c-4105-98df-99b4205d3ce9",
                    "navn": "***REMOVED***",
                    "epost": "***REMOVED***",
                    "type": "arbeidsgiver",
                    "svartidspunkt": "2016-11-22T12:52:06.489Z",
                    "hendelser": [],
                    "svar": [{
                        "id": 344,
                        "tid": "2019-09-09T07:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": true
                    }, {
                        "id": 345,
                        "tid": "2020-09-09T18:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": false
                    }]
                },{
                    "deltakerUuid": "3b0dc3b2-587c-4105-98df-99b4205d3ce0",
                    "navn": "Sygve Sykmeldt",
                    "type": "Bruker",
                    "svartidspunkt": "2016-11-22T12:52:06.489Z",
                    "hendelser": [{
                        "resultat": "RESERVERT",
                        "varseltype": "OPPRETTET",
                    }],
                    "svar": [{
                        "id": 344,
                        "tid": "2019-09-09T07:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": true
                    }, {
                        "id": 345,
                        "tid": "2020-09-09T18:00:00Z",
                        "created": "2011-12-12T11:00:00Z",
                        "sted": "Oslo",
                        "valgt": false
                    }]
                }],
                "alternativer": [{
                    "id": 344,
                    "tid": "2019-09-09T07:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": true
                }, {
                    "id": 345,
                    "tid": "2020-09-09T18:00:00Z",
                    "created": "2011-12-12T11:00:00Z",
                    "sted": "Oslo",
                    "valgt": false
                }]
            }
        });

        it("Skal vise KrrMeldingPanel", () => {
            const component = shallow(<MotebookingStatus fnr="***REMOVED***" mote={mote} fikkIkkeOpprettetVarsel={fikkIkkeOpprettetVarsel} ledetekster={ledetekster} />);
            expect(component.find(KontaktInfoFeilmelding)).to.have.length(1);
        });

    });

});