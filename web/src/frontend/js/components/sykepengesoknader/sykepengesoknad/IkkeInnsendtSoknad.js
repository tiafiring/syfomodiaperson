import React from 'react';
import { Panel } from 'nav-frontend-paneler';

const IkkeInnsendtSoknad = () => {
    return (<Panel className="panel--melding">
            <h2 className="hode hode--info hode-dekorert">Søknaden er ikke sendt ennå</h2>
            <p>Når brukeren har fullført søknaden og sendt den inn til arbeidsgiver og/eller NAV vil du kunne se statusen på søknaden her.</p>
    </Panel>);
};

export default IkkeInnsendtSoknad;
