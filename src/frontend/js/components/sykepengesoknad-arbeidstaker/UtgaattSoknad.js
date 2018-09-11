import React from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import SykmeldingUtdrag from '../sykepengesoknad-felles/SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <div className="panel blokk">
            <Varselstripe type="info" fylt>
                <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
            </Varselstripe>
        </div>
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
