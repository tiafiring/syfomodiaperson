import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SoknadTeasere from './SoknaderTeasere';
import PlanlagteTeasere from './PlanlagteTeasere';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sykepengesoknadUtils';
import { soknad as soknadPt, sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { OPPHOLD_UTLAND } from '../../enums/soknadtyper';

const { SENDT, TIL_SENDING, UTGAATT, NY, UTKAST_TIL_KORRIGERING, FREMTIDIG, AVBRUTT } = sykepengesoknadstatuser;

const Soknader = ({ fnr, sykepengesoknader = [], soknader = [] }) => {
    const alleSoknader = [
        ...sykepengesoknader,
        ...soknader,
    ];
    const nyeSoknader = alleSoknader
        .filter((soknad) => {
            return (soknad.status === NY || soknad.status === UTKAST_TIL_KORRIGERING)
                && soknad.soknadstype !== OPPHOLD_UTLAND;
        })
        .sort(sorterEtterOpprettetDato);
    const sendteSoknader = alleSoknader
        .filter((soknad) => {
            return soknad.status === SENDT
                || soknad.status === TIL_SENDING
                || soknad.status === UTGAATT
                || soknad.status === AVBRUTT;
        })
        .sort(sorterEtterPerioder);
    const kommendeSoknader = alleSoknader
        .filter((soknad) => {
            return soknad.status === FREMTIDIG;
        })
        .sort(sorterEtterPerioder)
        .reverse();

    return (<div>
        <Sidetopp
            tittel={getLedetekst('soknader.sidetittel')}
        />
        <SoknadTeasere
            sykepengesoknader={nyeSoknader}
            fnr={fnr}
            tittel={getLedetekst('soknader.venter-paa-behandling.tittel')}
            tomListeTekst={getLedetekst('soknader.venter-paa-behandling.ingen-soknader')}
            className="js-til-behandling"
            id="soknader-list-til-behandling"
        />
        {
            kommendeSoknader.length > 0 && <PlanlagteTeasere
                sykepengesoknader={kommendeSoknader}
                fnr={fnr}
                tittel="Planlagte søknader"
            />
        }
        {
            sendteSoknader.length > 0 && (<SoknadTeasere
                sykepengesoknader={sendteSoknader}
                fnr={fnr}
                tittel={getLedetekst('soknader.sendt.tittel')}
                tomListeTekst={getLedetekst('soknader.sendt.ingen-soknader')}
                className="js-sendt"
                id="soknader-sendt"
            />)
        }
    </div>);
};

Soknader.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
    soknader: PropTypes.arrayOf(soknadPt),
    fnr: PropTypes.string,
};

export default Soknader;
