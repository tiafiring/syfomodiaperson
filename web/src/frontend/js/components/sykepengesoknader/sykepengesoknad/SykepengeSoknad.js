import React from 'react';
import { getLedetekst, Soknad } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { SENDT, TIL_SENDING } from '../../../enums/sykepengesoknadstatuser';
import RelaterteSoknaderContainer from './RelaterteSoknaderContainer';

const SykepengeSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <Statuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />

        <Soknad apentUtdrag={false} sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />

        <div className="oppsummering__avkrysset">
            <img src="/sykefravaer/img/png/check-box-1.png" alt="Avkrysset" />
             <span>{getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')}</span>
        </div>
        { (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) && <RelaterteSoknaderContainer sykepengesoknadId={sykepengesoknad.id} /> }
    </div>);
};

SykepengeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengeSoknad;
