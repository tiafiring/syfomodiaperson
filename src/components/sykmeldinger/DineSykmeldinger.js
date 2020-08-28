import React from 'react';
import PropTypes from 'prop-types';
import {
    keyValue,
    sorterSykmeldinger,
    sykmeldingstatuser,
} from '@navikt/digisyfo-npm';
import SykmeldingTeasere from './SykmeldingTeasere';
import SykmeldingerSorteringContainer from './SykmeldingerSorteringContainer';
import Pengestopp from './Pengestopp';
import { erPreProd } from '../../utils/miljoUtil';

const texts = {
    ingenSykmeldinger: 'Tidligere sykmeldinger',
    ingenNyeSykmeldinger: 'Du har ingen nye sykmeldinger',
    nyeSykmeldinger: 'Nye sykmeldinger',
};

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, sortering, fnr, brukernavn }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === sykmeldingstatuser.NY;
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== sykmeldingstatuser.NY;
    });
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;
    return (<div>
        {erPreProd() && <Pengestopp brukernavn={brukernavn} fnr={fnr} sykmeldinger={sykmeldinger} />}
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldinger(nyeSykmeldinger)}
            tittel={texts.nyeSykmeldinger}
            ingenSykmeldingerMelding={texts.ingenNyeSykmeldinger}
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            fnr={fnr}
            id="sykmelding-liste-nye" />
        {
            tidligereSykmeldinger.length > 0 && <SykmeldingTeasere
                sykmeldinger={sorterSykmeldinger(tidligereSykmeldinger, tidligereSortering)}
                tittel={texts.ingenSykmeldinger}
                ingenSykmeldingerMelding={texts.ingenSykmeldinger}
                className="js-tidligere-sykmeldinger"
                ledetekster={ledetekster}
                fnr={fnr}
                id="sykmelding-liste-tidligere">
                <SykmeldingerSorteringContainer status="tidligere" />
            </SykmeldingTeasere>
        }
    </div>);
};

DineSykmeldinger.propTypes = {
    brukernavn: PropTypes.string,
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: keyValue.isRequired,
    sortering: PropTypes.object,
    fnr: PropTypes.string,
};

export default DineSykmeldinger;
