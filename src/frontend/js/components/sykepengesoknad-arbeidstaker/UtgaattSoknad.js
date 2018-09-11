import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <div className="panel blokk">
            <Alertstripe type="info">
                <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
            </Alertstripe>
        </div>
        <SykmeldingUtdrag soknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
