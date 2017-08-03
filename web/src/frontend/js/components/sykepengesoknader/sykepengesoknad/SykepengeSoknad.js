import React from 'react';
import { getLedetekst, Soknad } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

const SykepengeSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <Statuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />

        <Soknad apentUtdrag={false} sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />

        <div className="oppsummering__avkrysset">
            <img src="/sykefravaer/img/png/check-box-1.png" alt="Avkrysset" />
             <span>{getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')}</span>
        </div>
    </div>);
};

SykepengeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengeSoknad;
