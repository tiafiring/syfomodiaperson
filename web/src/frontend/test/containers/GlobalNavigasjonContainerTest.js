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

        it("Skal returnere fnr og harTilgangMotemodul", () => {
            const props = mapStateToProps(state);
            expect(props.fnr).to.equal("887766");
            expect(props.harTilgangMotemodul).to.equal(true);
        });

    });

});