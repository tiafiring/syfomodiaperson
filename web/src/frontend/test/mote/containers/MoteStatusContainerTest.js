import React from "react";
import {expect} from "chai";
import {mount, shallow, render} from "enzyme";
import {mapStateToProps} from "../../../js/mote/containers/MotestatusContainer";

describe("MotestatusContainerTest", () => {

    describe("mapStateToProps", () => {

        let state;
        let ownProps;

        beforeEach(() => {
            ownProps = { moteUuid: "dced4bbd-13a6-4c5b-81f4-e04390b8c986"};
            state = {
                ledetekster: { henter: false, data: {} },
                arbeidstaker : {
                    henter: false,
                    data: {}
                },
                moter: {
                    data: [{
                        moteUuid: "dced4bbd-13a6-4c5b-81f4-e04390b8c986",
                        status: "OPPRETTET",
                        deltakere: [],
                        alternativer: [],
                    }, {
                        moteUuid: "test",
                        status: "AVBRUTT",
                        deltakere: [],
                        alternativer: [],
                    }]
                },
                navbruker: {
                    data: {
                        fnr: "123456"
                    }
                },
                virksomhet: {
                    navn: "BEKK"
                }
            }
        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("123456");
        });

        it("Skal returnere møte", () => {
            ownProps = {
                moteUuid: "dced4bbd-13a6-4c5b-81f4-e04390b8c986"
            }
            const props = mapStateToProps(state, ownProps);
            expect(props.mote).to.deep.equal({
                moteUuid: "dced4bbd-13a6-4c5b-81f4-e04390b8c986",
                status: "OPPRETTET",
                deltakere: [],
                alternativer: [],
            });
        });

        it("Skal returnere avbryter", () => {
            state.moter.avbryter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avbryter).to.be.true;
        });

        it("Skal returnere avbrytFeilet", () => {
            state.moter.avbrytFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avbrytFeilet).to.be.true;
        });

        it("Skal returnere henter", () => {
            state.moter.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.true;
        });


    })

});