import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import MotestatusContainer from '../../js/mote/containers/MotestatusContainer';
import { mapStateToProps } from '../../js/containers/BekreftMoteContainer';
import sinon from 'sinon';

describe("BekreftMoteContainer", () => {

    describe("mapStateToProps", () => {

        let state;

        beforeEach(() => {
            ownProps = {
                params: {
                    alternativId: "328"
                }
            };
            state = {
                moter: {
                    data: [{
                        "id": 1,
                        "moteUuid": "2fedc0da-efec-4b6e-8597-a021628058ae",
                        "opprettetAv": "Z990562",
                        "status": "OPPRETTET",
                        "opprettetTidspunkt": "2016-11-21T11:35:51.870Z",
                        "navEnhet": "navEnhet",
                        "deltakere": [{
                            "deltakerUuid": "85a12263-d955-4103-b172-bf135df5f37a",
                            "navn": "***REMOVED***",
                            "epost": "***REMOVED***",
                            "type": "arbeidsgiver",
                            "avvik": [],
                            "svar": [{
                                "id": 328,
                                "tid": "2020-12-12T11:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }, {
                                "id": 329,
                                "tid": "2020-09-09T07:00:00Z",
                                "sted": "Oslo ",
                                "valgt": false
                            }]
                        }],
                        "alternativer": [{
                            "id": 328,
                            "tid": "2020-12-12T11:00:00Z",
                            "sted": "Oslo ",
                            "valgt": false
                        }, {
                            "id": 329,
                            "tid": "2020-09-09T07:00:00Z",
                            "sted": "Oslo ",
                            "valgt": false
                        }]
                    }]
                },
                navbruker: {
                    data: {
                        fnr: "123"
                    }
                }
            }
        });

        it("Skal returnere mote", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.mote.moteUuid).to.equal("2fedc0da-efec-4b6e-8597-a021628058ae")
        });

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal("123")
        })

        it("Skal returnere tidspunkt", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.tidspunkt).to.deep.equal({
                "id": 328,
                "tid": "2020-12-12T11:00:00Z",
                "sted": "Oslo ",
                "valgt": false
            });
        });

        it("Skal returnere henter", () => {
            state.moter.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.be.true;
        });

    });

});