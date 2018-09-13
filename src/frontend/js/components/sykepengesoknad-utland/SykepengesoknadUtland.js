import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { brodsmule, soknad as soknadPt } from '../../propTypes';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import StatuspanelUtland from './StatuspanelUtland';

const OppsummeringPanel = ({ soknad }) => {
    return (<div className="panel blokk">
        <h2 className="panel__tittel blokk--xs"> {getLedetekst('sykepengesoknad.oppsummering.undertittel')}</h2>
        <Oppsummeringsvisning soknad={soknad} />
    </div>);
};

OppsummeringPanel.propTypes = {
    soknad: soknadPt,
};

const SykepengesoknadUtland = ({ brukernavn, brodsmuler, soknad, fnr }) => {
    return (<SoknadSpeiling
        tittel="Søknad om sykepenger under opphold utenfor Norge"
        brukernavn={brukernavn}
        brodsmuler={brodsmuler}
        fnr={fnr}>
        <StatuspanelUtland soknad={soknad} />
        <OppsummeringPanel soknad={soknad} />
    </SoknadSpeiling>);
};

SykepengesoknadUtland.propTypes = {
    brukernavn: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    soknad: soknadPt,
    fnr: PropTypes.string,
}

export default SykepengesoknadUtland;
