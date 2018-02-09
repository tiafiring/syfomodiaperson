import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, Utvidbar, SoknadOppsummering, BekreftetKorrektInformasjon, mapBackendsoknadToSkjemasoknad, mapSkjemasoknadToOppsummeringsoknad } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { KORRIGERT, SENDT, TIL_SENDING, AVBRUTT, UTGAATT } from '../../../enums/sykepengesoknadstatuser';
import RelaterteSoknaderContainer from './RelaterteSoknaderContainer';
import KorrigertAvContainer from './KorrigertAvContainer';
import AvbruttSoknad from './AvbruttSoknad';
import UtgaattSoknad from './UtgaattSoknad';
import { mapAktiviteter } from '../../../utils/sykepengesoknadUtils';

const SykepengeSoknad = ({ sykepengesoknad, fnr }) => {
    if (sykepengesoknad.status === AVBRUTT) {
        return <AvbruttSoknad sykepengesoknad={sykepengesoknad} />;
    } else if (sykepengesoknad.status === UTGAATT) {
        return <UtgaattSoknad sykepengesoknad={sykepengesoknad} />;
    }

    let oppsummeringsoknad = sykepengesoknad.oppsummering;

    if (!oppsummeringsoknad) {
        const skjemasoknad = mapBackendsoknadToSkjemasoknad(sykepengesoknad);
        oppsummeringsoknad = mapSkjemasoknadToOppsummeringsoknad(skjemasoknad, sykepengesoknad);
    }

    return (<div>
        { sykepengesoknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={sykepengesoknad} /> }
        <Statuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />

        <Soknad sykepengesoknad={mapAktiviteter(sykepengesoknad)} tittel="Oppsummering" />

        <Utvidbar className="blokk" tittel="Oppsummering" erApen>
            <SoknadOppsummering oppsummeringsoknad={oppsummeringsoknad} />
        </Utvidbar>
        <div className="bekreftet-container">
            <BekreftetKorrektInformasjon oppsummeringsoknad={oppsummeringsoknad} />
        </div>

        { (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) && <RelaterteSoknaderContainer fnr={fnr} sykepengesoknadId={sykepengesoknad.id} /> }
    </div>);
};

SykepengeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    fnr: PropTypes.string,
};

export default SykepengeSoknad;
