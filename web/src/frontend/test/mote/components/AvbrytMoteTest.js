import { expect } from 'chai';
import AvbrytMote from '../../../js/mote/components/AvbrytMote'
import AppSpinner from '../../../js/components/AppSpinner';
import { mount, shallow } from 'enzyme';
import React from 'react'

describe("AvbrytMote", () => {
    it("Viser spinner om varselinnhold hentes", () => {
        const arbeidsgiver = {
            deltakerUuid: "uuid1",
            navn: "arbeidsgiver",
        };
        const sykmeldt = {
            deltakerUuid: "uuid2",
            navn: "sykmeldt",
        };

        let component = shallow(<AvbrytMote arbeidsgiver={arbeidsgiver} sykmeldt={sykmeldt} henterInnhold={true}/>);

        expect(component.find(AppSpinner)).to.length(1);
    });

    it("Viser endel selv om varselinnhold av varsel hentes", () => {
        const arbeidsgiver = {
            deltakerUuid: "uuid1",
            navn: "arbeidsgiver",
        };
        const sykmeldt = {
            deltakerUuid: "uuid2",
            navn: "sykmeldt",
        };

        let component = shallow(<AvbrytMote arbeidsgiver={arbeidsgiver} sykmeldt={sykmeldt} henterInnhold={true}/>)
        expect(component.find('.epostinnhold__mottakere')).to.length(2);
    });

    it("Viser varselinnhold om varselinnhold er hentet", () => {
        const arbeidsgiver = {
            deltakerUuid: "uuid1",
            navn: "arbeidsgiver",
        };
        const sykmeldt = {
            deltakerUuid: "uuid2",
            navn: "sykmeldt",
        };
        const varselinnhold = {
            emne: "emne",
            innhold: "innhold",
        };

        let component = shallow(<AvbrytMote arbeidsgiver={arbeidsgiver} sykmeldt={sykmeldt} henterInnhold={false} varselinnhold={varselinnhold}/>)
        expect(component.find('.epostinnhold_infoboks')).to.length(2);
    });
});