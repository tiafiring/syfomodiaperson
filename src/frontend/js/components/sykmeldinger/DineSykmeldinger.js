import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sorterSykmeldinger, sykmeldingstatuser } from 'digisyfo-npm';
import SykmeldingTeasere from './SykmeldingTeasere';
import SykmeldingerSorteringContainer from './SykmeldingerSorteringContainer';

const DineSykmeldinger = ({ sykmeldinger = [], ledetekster = {}, sortering, fnr }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === sykmeldingstatuser.NY;
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== sykmeldingstatuser.NY;
    });
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;
    return (<div>
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldinger(nyeSykmeldinger)}
            tittel={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.tittel', ledetekster)}
            ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.ingen-sykmeldinger.melding', ledetekster)}
            className="js-nye-sykmeldinger"
            ledetekster={ledetekster}
            fnr={fnr}
            id="sykmelding-liste-nye" />
        {
            tidligereSykmeldinger.length > 0 && <SykmeldingTeasere
                sykmeldinger={sorterSykmeldinger(tidligereSykmeldinger, tidligereSortering)}
                tittel={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.tittel', ledetekster)}
                ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.ingen-sykmeldinger.melding', ledetekster)}
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
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    sortering: PropTypes.object,
    fnr: PropTypes.string,
};

export default DineSykmeldinger;
