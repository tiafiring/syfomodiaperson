import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/diskresjonskode_actions';
import diskresjonskode from '../../js/reducers/diskresjonskode';

describe('diskresjonskode', () => {

    describe('henter', () => {
        let initialState = deepFreeze({
            henter: false,
            hentet: false,
            hentingFeilet: false,
            data: {},
        });

        it('håndterer HENTER_DISKRESJONSKODE', () => {
            const action = actions.henterDiskresjonskode();
            const nextState = diskresjonskode(initialState, action);
            expect(nextState).to.deep.equal({
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: {},
            });
        });

        it('håndterer DISKRESJONSKODE_HENTET', () => {
            const data = { diskresjonskode: 1};
            const action = actions.diskresjonskodeHentet(data);
            const nextState = diskresjonskode(initialState, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: data,
            });
        });

        it('håndterer HENT_DISKRESJONSKODE_FEILET', () => {
            const action = actions.hentDiskresjonskodeFeilet();
            const nextState = diskresjonskode(initialState, action);
            expect(nextState).to.deep.equal({
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: {},
            });
        });
    });
});
