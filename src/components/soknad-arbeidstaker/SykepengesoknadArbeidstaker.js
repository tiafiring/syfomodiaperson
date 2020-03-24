import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import IkkeInnsendtSoknad from '../soknad-felles/IkkeInnsendtSoknad';
import BehandletSykepengesoknad from './BehandletSykepengesoknad';
import SoknadSpeiling from '../soknad-felles/SoknadSpeiling';
import { brodsmule } from '../../propTypes';

const { NY, UTKAST_TIL_KORRIGERING } = sykepengesoknadstatuser;

const SykepengesoknadArbeidstaker = (
    {
        sykepengesoknad,
        fnr,
        brukernavn,
        brodsmuler,
    }) => {
    switch (sykepengesoknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return (<IkkeInnsendtSoknad fnr={fnr} />);
        }
        default: {
            return (
                <SoknadSpeiling
                    brodsmuler={brodsmuler}
                    fnr={fnr}
                    brukernavn={brukernavn}
                >
                    <BehandletSykepengesoknad sykepengesoknad={sykepengesoknad} fnr={fnr} />
                </SoknadSpeiling>
            );
        }
    }
};

SykepengesoknadArbeidstaker.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmule),
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengesoknadArbeidstaker;
