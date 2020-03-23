import { expect } from 'chai';
import sinon from 'sinon';
import {
    mockAvbruttActiveOppfolgingsplan,
    mockAvbruttInactiveOppfolgingsplan,
    mockValidActiveOppfolgingsplan,
    mockValidActiveOppfolgingsplanWithDifferentVirksomhet,
} from '../mockdata/mockOppfolgingsplaner';
import { activeOppfolgingsplaner } from '../../src/utils/oppfolgingsplanerUtils';

describe('oppfolgingsplanerUtils', () => {
    let clock;
    const today = new Date(Date.now());

    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    describe('activeOppfolgingsplaner', () => {
        it('Gives a list of one plan, when one is active', () => {
            const planer = [
                mockValidActiveOppfolgingsplan,
            ];

            const actualPlaner = activeOppfolgingsplaner(planer);

            expect(actualPlaner.length).to.be.equal(planer.length);
            expect(actualPlaner[0]).to.deep.equal(planer[0]);
        });

        it('Gives a list of one plan, when one is active and avbrutt', () => {
            const planer = [
                mockAvbruttActiveOppfolgingsplan,
            ];

            const actualPlaner = activeOppfolgingsplaner(planer);

            expect(actualPlaner.length).to.be.equal(planer.length);
            expect(actualPlaner[0]).to.deep.equal(planer[0]);
        });

        it('Gives empty list if all plans are invalid', () => {
            const planer = [
                mockAvbruttInactiveOppfolgingsplan,
            ];

            const actualPlaner = activeOppfolgingsplaner(planer);
            expect(actualPlaner.length).to.be.equal(0);
        });

        it('Gives two plans if the are from different virksomheter', () => {
            const planer = [
                mockValidActiveOppfolgingsplanWithDifferentVirksomhet,
                mockValidActiveOppfolgingsplan,
            ];

            const actualPlaner = activeOppfolgingsplaner(planer);

            expect(actualPlaner.length).to.be.equal(planer.length);
            expect(actualPlaner[0]).to.deep.equal(planer[0]);
            expect(actualPlaner[1]).to.deep.equal(planer[1]);
        });

        it('Gives the plan shared lates, if more than one from a virksomhet', () => {
            const planer = [
                mockAvbruttActiveOppfolgingsplan,
                mockValidActiveOppfolgingsplan,
            ];

            const expectedPlan = mockValidActiveOppfolgingsplan;

            const actualPlaner = activeOppfolgingsplaner(planer);

            expect(actualPlaner.length).to.be.equal(1);
            expect(actualPlaner[0]).to.deep.equal(expectedPlan);
        });
    });
});
