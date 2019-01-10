import {expect} from "chai";
import AlertStripe from 'nav-frontend-alertstriper';
import MotebookingStatus, { StatusVarsel, PassertVarsel } from "../../../js/mote/components/MotebookingStatus";
import Svarstatus from '../../../js/mote/components/Svarstatus';
import BekreftetMotetidspunkt from "../../../js/mote/components/BekreftetMotetidspunkt";
import KontaktInfoFeilmelding from "../../../js/mote/components/KontaktInfoFeilmelding";
import FlereTidspunktSkjema from "../../../js/mote/skjema/FlereTidspunktSkjema";
import Sidetopp from '../../../js/components/Sidetopp';
import {mount, shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import {trekkDagerFraDato, leggTilDagerPaaDato} from '../../../js/mote/utils/index';

describe("MotebookingStatus", () => {

    const arbeidstaker = {
        kontaktinfo: {
            skalHaVarsel: true,
        }
    };
    let now;
    let mote = {};
    let bekreftetMote = {};
    let motePassert;
    let bekreftetMotePassert;
    let avbrytMote;
    let ledetekster = {
        'mote.bookingstatus.passert.tittel': 'Forrige møte',
        'mote.bookingstatus.bekreftet.tittel': 'Bekreftet møtetidspunkt',
        'mote.bookingstatus.bekreftet.sendt-til': "Møtetidspunkt valgt, møteresultat og varsel er sendt til %DELTAKERE%",
        'mote.bookingstatus.foresporsel.sendt.til': 'Møteforespørselen ble sendt til %DELTAKERE%',
        'mote.bookingstatus.sendt-dato': 'Sendt: %DATO%',
    };

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: "/sykefravaer"
        }
        now = new Date();
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
            navn: "Arve Arbeidsgiver",
            epost: "arve.arbeidsgiver@nav.no",
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
            navn: "Andreas Arbeidstaker",
            epost: "andreas.arbeidstaker@nav.no",
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
        motePassert = Object.assign({}, mote);
        motePassert.alternativer = [{
            "tid": `${trekkDagerFraDato(now, 6)}`,
            "created": `${trekkDagerFraDato(now, 10)}`,
            "sted": "Oslo by",
            "valgt": false,
            "id": 1
        }, {
            "tid": `${trekkDagerFraDato(now, 8)}`,
            "created": `${trekkDagerFraDato(now, 10)}`,
            "sted": "Oslo by",
            "valgt": false,
            "id": 2
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
                "navn": "Arve Arbeidsgiver",
                "epost": "arve.arbeidsgiver@nav.no",
                "type": "arbeidsgiver",
                "svartidspunkt": "2016-11-22T12:52:06.489Z",
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
        bekreftetMotePassert = Object.assign({}, bekreftetMote);
        bekreftetMotePassert.alternativer = [{
            "tid": `${leggTilDagerPaaDato(now, 6)}`,
            "created": `${leggTilDagerPaaDato(now, 10)}`,
            "sted": "Oslo by",
            "valgt": false,
            "id": 344
        }, {
            "tid": `${trekkDagerFraDato(now, 8)}`,
            "created": `${trekkDagerFraDato(now, 10)}`,
            "sted": "Oslo by",
            "valgt": false,
            "id": 345
        }];
        bekreftetMotePassert.bekreftetAlternativ = {
            "id": 345,
            "tid": `${trekkDagerFraDato(now, 8)}`,
            "created": `${trekkDagerFraDato(now, 10)}`,
            "sted": "Oslo",
            "valgt": true
        };

        avbrytMote = sinon.spy();
    });

    describe("StatusVarsel", () => {

        it("Skal vise riktig tekst når møtet er OPPRETTET", () => {
            let component = mount(<StatusVarsel arbeidstaker={arbeidstaker} mote={mote} ledetekster={ledetekster} />)
            expect(component.find(AlertStripe).text()).to.contain("Møteforespørselen ble sendt til Arve Arbeidsgiver og Andreas Arbeidstaker");
            expect(component.find(AlertStripe).text()).to.contain("Sendt: 22.11.2016");
        });

        it("Skal vise riktig tekst når møtet er BEKREFTET", () => {
            let component = mount(<StatusVarsel arbeidstaker={arbeidstaker} mote={bekreftetMote} ledetekster={ledetekster} />)
            expect(component.find(AlertStripe).text()).to.contain("Møtetidspunkt valgt, møteresultat og varsel er sendt til Arve Arbeidsgiver");
            expect(component.find(AlertStripe).text()).to.contain("Sendt: 12.12.2011");
        });

    })

    describe("Når møtet ikke er bekreftet", () => {
        let component;

        beforeEach(() => {
            component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(1);
            expect(component.find(StatusVarsel).prop("mote")).to.deep.equal(mote);
        });

        it("Skal ikke inneholde PassertVarsel", () => {
            expect(component.find(PassertVarsel)).to.have.length(0);
        });

        it("Skal vise sted", () => {
            expect(component.text()).to.contain("Oslo by");
        });

        it("Skal inneholde Svarstatus", () => {
            expect(component.find(Svarstatus)).to.have.length(1);
        });

        it("Skal ikke vise en knapp med teksten 'Planlegg nytt møte'", () => {
            expect(component.find(".js-ny")).to.have.length(0);
        });

        it("Skal vise en knapp med teksten 'Avbryt'", () => {
            expect(component.find(".js-avbryt")).to.have.length(1);
        });

    });

    describe("Når møte ikke er bekreftet, tid har passert", () => {
        let component;
        let mote;

        beforeEach(() => {
            mote = motePassert;
            component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal vise riktig tittel", () => {
            expect(component.find(Sidetopp).prop("tittel")).to.equal("Forrige møte")
        });

        it("Skal inneholde PassertVarsel", () => {
            expect(component.find(PassertVarsel)).to.have.length(1);
        });

        it("Skal ikke inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(0);
        });

        it("Skal vise sted", () => {
            expect(component.text()).to.contain("Oslo by");
        });

        it("Skal ikke inneholde Svarstatus", () => {
            expect(component.find(Svarstatus)).to.have.length(0);
        });

        it("Skal vise en knapp med teksten 'Planlegg nytt møte'", () => {
            expect(component.find(".js-ny")).to.have.length(1);
        });

        it("Skal ikke vise en knapp med teksten 'Avbryt'", () => {
            expect(component.find(".js-avbryt")).to.have.length(0);
        });

    });

    describe("Når antallNyeTidspunkt > 0", () => {
        let component;

        beforeEach(() => {
            component = shallow(<MotebookingStatus skalViseFlereAlternativ={true} arbeidstaker={arbeidstaker} mote={mote}  antallNyeTidspunkt={4} />);
        });

        it("Skal vise Svarstatus med FlereTidspunktSkjema", () => {
            expect(component.find(Svarstatus).find(FlereTidspunktSkjema)).to.have.length(1);
        });

    });

    describe("Når møtet er bekreftet", () => {

        let mote;
        let component;

        beforeEach(() => {
            mote = bekreftetMote;
            component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} fnr="99887766554" mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal vise riktig tittel", () => {
            expect(component.find(Sidetopp).prop("tittel")).to.equal("Bekreftet møtetidspunkt")
        });

        it("Skal inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(1);
            expect(component.find(StatusVarsel).prop("mote")).to.deep.equal(mote);
        });

        it("Skal ikke inneholde PassertVarsel", () => {
            expect(component.find(PassertVarsel)).to.have.length(0);
        });

        it("Skal vise hvilket tidspunkt som er valgt", () => {
            expect(component.find(BekreftetMotetidspunkt)).to.have.length(1);
            expect(component.find(BekreftetMotetidspunkt).prop("mote")).to.deep.equal(mote);
            expect(component.find(BekreftetMotetidspunkt).prop("ledetekster")).to.deep.equal(ledetekster);
        });

        it("Skal ikke vise en knapp med teksten 'Planlegg nytt møte'", () => {
            expect(component.find(".js-ny")).to.have.length(0);
        });

        it("Skal vise en knapp med teksten 'Avbryt'", () => {
            expect(component.find(".js-avbryt")).to.have.length(1);
        });

    });

    describe("Når møte er bekreftet, tid har passert", () => {
        let component;
        let mote;
        beforeEach(() => {
            mote = bekreftetMotePassert;
            component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} fnr="99887766554" mote={mote} ledetekster={ledetekster} />);
        });

        it("Skal vise riktig tittel", () => {
            expect(component.find(Sidetopp).prop("tittel")).to.equal("Forrige møte")
        });

        it("Skal ikke inneholde PassertVarsel", () => {
            expect(component.find(PassertVarsel)).to.have.length(0);
        });

        it("Skal ikke inneholde StatusVarsel", () => {
            expect(component.find(StatusVarsel)).to.have.length(0);
        });

        it("Skal vise sted", () => {
            expect(component.text()).to.contain("Oslo by");
        });

        it("Skal ikke inneholde Svarstatus", () => {
            expect(component.find(Svarstatus)).to.have.length(0);
        });

        it("Skal vise en knapp med teksten 'Planlegg nytt møte'", () => {
            expect(component.find(".js-ny")).to.have.length(1);
        });

        it("Skal ikke vise en knapp med teksten 'Avbryt'", () => {
            expect(component.find(".js-avbryt")).to.have.length(0);
        });

        it("Skal vise hvilket tidspunkt som er valgt", () => {
            expect(component.find(BekreftetMotetidspunkt)).to.have.length(1);
            expect(component.find(BekreftetMotetidspunkt).prop("mote")).to.deep.equal(mote);
            expect(component.find(BekreftetMotetidspunkt).prop("ledetekster")).to.deep.equal(ledetekster);
        });

    });

    describe("Verktøylinje", () => {



        it("Skal vise en knapp for Ny møteforespørsel", () => {
            const component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} mote={motePassert} />);
            expect(component.find(".js-ny")).to.have.length(1)
        });

        it("Skal kalle på avbrytMoteUtenVarsel med moteUuid og fnr når man klikker på knappen", () => {
            motePassert.moteUuid = "min-mote-uuid";
            const avbrytMoteUtenVarsel = sinon.spy();
            const component = shallow(<MotebookingStatus arbeidstaker={arbeidstaker} mote={motePassert} fnr="mitt-fnr" avbrytMoteUtenVarsel={avbrytMoteUtenVarsel} />);
            component.find(".js-ny").simulate("click");
            expect(avbrytMoteUtenVarsel.calledWith("min-mote-uuid", "mitt-fnr")).to.be.true;
        });

    });

    describe("Når sykmeldt er reservert i KRR", () => {

        let mote;
        let arbeidstaker;

        beforeEach(() => {
            arbeidstaker = {
                kontaktinfo: {
                    skalHaVarsel: false,
                    feilAarsak: 'RESERVERT',
                },
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
                    "navn": "Arve Arbeidsgiver",
                    "epost": "arve.arbeidsgiver@nav.no",
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
            const component = shallow(<MotebookingStatus fnr="99887766554" mote={mote} arbeidstaker={arbeidstaker} ledetekster={ledetekster} />);
            expect(component.find(KontaktInfoFeilmelding)).to.have.length(1);
        });

    });

});