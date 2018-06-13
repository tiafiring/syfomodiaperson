import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar, SoknadOppsummering, BekreftetKorrektInformasjon } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { KORRIGERT, SENDT, TIL_SENDING, AVBRUTT, UTGAATT } from '../../../enums/sykepengesoknadstatuser';
import RelaterteSoknaderContainer from './RelaterteSoknaderContainer';
import KorrigertAvContainer from './KorrigertAvContainer';
import AvbruttSoknad from './AvbruttSoknad';
import UtgaattSoknad from './UtgaattSoknad';

const SykepengeSoknad = ({ sykepengesoknad, fnr }) => {
    if (sykepengesoknad.status === AVBRUTT) {
        return <AvbruttSoknad sykepengesoknad={sykepengesoknad} />;
    } else if (sykepengesoknad.status === UTGAATT) {
        return <UtgaattSoknad sykepengesoknad={sykepengesoknad} />;
    }

    return (<div>
        { sykepengesoknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={sykepengesoknad} /> }
        <Statuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />

        <Utvidbar className="blokk" tittel="Oppsummering" erApen>
            <SoknadOppsummering oppsummeringsoknad={sykepengesoknad.oppsummering} />
        </Utvidbar>
        <div className="bekreftet-container">
            <BekreftetKorrektInformasjon oppsummeringsoknad={sykepengesoknad.oppsummering} />
        </div>
        {
            (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) && <RelaterteSoknaderContainer
                fnr={fnr}
                sykepengesoknadId={sykepengesoknad.id}
            />
        }
    </div>);
};

SykepengeSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    fnr: PropTypes.string,
};

export default SykepengeSoknad;
