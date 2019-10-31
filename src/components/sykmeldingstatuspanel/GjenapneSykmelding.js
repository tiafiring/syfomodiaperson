import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';

const GjenapneSykmelding = () => {
    return (<div className="verktoylinje">
        <button className="knapp knapp--mini js-gjenaapne-sykmelding">
            {getLedetekst('din-sykmelding.avbrutt.gjenaapne')}
        </button>
    </div>);
};

export default GjenapneSykmelding;
