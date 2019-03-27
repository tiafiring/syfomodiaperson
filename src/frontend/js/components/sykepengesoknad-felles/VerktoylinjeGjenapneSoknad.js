import React from 'react';
import { VerktoyKnapp, Verktoylinje } from '../Verktoylinje';
import { getLedetekst } from '@navikt/digisyfo-npm';

const VerktoylinjeGjenapneSoknad = () => {
    return (<Verktoylinje>
        <VerktoyKnapp>{getLedetekst('sykepengesoknad.gjenapne.knapp')}</VerktoyKnapp>
    </Verktoylinje>);
};

export default VerktoylinjeGjenapneSoknad;
