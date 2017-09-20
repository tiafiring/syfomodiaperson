import React, { PropTypes } from 'react';
import { getLedetekst, Soknad } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { KORRIGERT, SENDT, TIL_SENDING } from '../../../enums/sykepengesoknadstatuser';
import RelaterteSoknaderContainer from './RelaterteSoknaderContainer';
import KorrigertAvContainer from './KorrigertAvContainer';
import { mapAktiviteter } from '../../../utils/sykepengesoknadUtils';

const SykepengeSoknad = ({ sykepengesoknad, fnr }) => {
    return (<div>
        { sykepengesoknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={sykepengesoknad} /> }
        <Statuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />

        <Soknad sykepengesoknad={mapAktiviteter(sykepengesoknad)} tittel="Oppsummering" />

        <div className="oppsummering__avkrysset">
            <img src="/sykefravaer/img/png/check-box-1.png" alt="Avkrysset" />
             <span>{getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')}</span>
        </div>
        { (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) && <RelaterteSoknaderContainer fnr={fnr} sykepengesoknadId={sykepengesoknad.id} /> }
    </div>);
};

SykepengeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    fnr: PropTypes.string,
};

export default SykepengeSoknad;
