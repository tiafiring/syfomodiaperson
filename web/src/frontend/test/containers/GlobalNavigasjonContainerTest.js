import { expect } from 'chai';
import { mapStateToProps } from '../../js/containers/GlobalNavigasjonContainer';

describe("GlobalNavigasjonContainer", () => {

    describe("mapStateToProps", () => {

        const state = {
            navbruker: {
                data: {
                    fnr: "887766",
                    harTilgang: true,
                },
            },
        }

        it("Skal returnere fnr", () => {
            const props = mapStateToProps(state, {});
            expect(props.fnr).to.equal("887766");
        });

        it("Skal returnere aktivtMenypunkt", () => {
            const props = mapStateToProps(state, {
                aktivtMenypunkt: "OLSEN"
            });
            expect(props.aktivtMenypunkt).to.equal("OLSEN");
        })

    });

});