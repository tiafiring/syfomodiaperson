import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import IkkeInnsendtSoknad from '../sykepengesoknad-felles/IkkeInnsendtSoknad';
import BehandletSykepengesoknad from './BehandletSykepengesoknad';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import { brodsmule } from '../../propTypes/index';

const { NY, UTKAST_TIL_KORRIGERING } = sykepengesoknadstatuser;

const SykepengesoknadArbeidstaker = ({ sykepengesoknad, fnr, brukernavn, brodsmuler }) => {
    switch (sykepengesoknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return (<IkkeInnsendtSoknad fnr={fnr} />);
        }
        default: {
            return (<SoknadSpeiling
                brodsmuler={brodsmuler}
                fnr={fnr}
                brukernavn={brukernavn}>
                <BehandletSykepengesoknad sykepengesoknad={sykepengesoknad} fnr={fnr} />
            </SoknadSpeiling>);
        }
    }
};

SykepengesoknadArbeidstaker.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    children: PropTypes.node,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengesoknadArbeidstaker;
