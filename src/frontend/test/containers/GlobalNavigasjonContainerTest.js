import { expect } from 'chai';
import { mapStateToProps } from '../../js/containers/GlobalNavigasjonContainer';

describe('GlobalNavigasjonContainer', () => {
    describe('mapStateToProps', () => {
        const state = {
            navbruker: {
                data: {
                    kontaktinfo: {
                        fnr: '887766',
                    },
                    harTilgang: true,
                },
            },
            veilederoppgaver: {
                data: [],
            },
            motebehov: {
                data: [],
            },
        };

        it('Skal returnere fnr', () => {
            const ownProps = {
                fnr: '887766',
            };
            const props = mapStateToProps(state, ownProps);
            expect(props.fnr).to.equal('887766');
        });

        it('Skal returnere aktivtMenypunkt', () => {
            const ownProps = {
                fnr: '887766',
                aktivtMenypunkt: 'OLSEN',
            };
            const props = mapStateToProps(state, ownProps);
            expect(props.aktivtMenypunkt).to.equal('OLSEN');
        });

        it('Skal returnere motebehov === undefined dersom det ikke finnes møtebehov', () => {
            const ownProps = {
                fnr: '887766',
                aktivtMenypunkt: 'OLSEN',
            };

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehov).to.be.equal(undefined);
        });

        it('Skal returnere hentingFeilet når henting av møtebehov feiler', () => {
            const ownProps = {
                fnr: '887766',
                aktivtMenypunkt: 'OLSEN',
            };
            state.motebehov.hentingFeilet = true;

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovReducer.hentingFeilet).to.be.equal(true);
        });

        it('Skal returnere hentingFeilet når henting av møtebehov ikke feiler', () => {
            const ownProps = {
                fnr: '887766',
                aktivtMenypunkt: 'OLSEN',
            };
            state.motebehov.hentingFeilet = false;

            const props = mapStateToProps(state, ownProps);

            expect(props.motebehovReducer.hentingFeilet).to.be.equal(false);
        });
    });
});
