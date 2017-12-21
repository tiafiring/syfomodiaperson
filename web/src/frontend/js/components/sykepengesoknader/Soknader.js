import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import SoknadTeasere from './SoknaderTeasere';
import PlanlagteTeasere from './PlanlagteTeasere';
import { SENDT, TIL_SENDING, UTGAATT, NY, UTKAST_TIL_KORRIGERING, FREMTIDIG, AVBRUTT } from '../../enums/sykepengesoknadstatuser';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sykepengesoknadUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const Soknader = ({ fnr, sykepengesoknader = [] }) => {
    const nyeSoknader = sykepengesoknader.filter((soknad) => {
        return soknad.status === NY || soknad.status === UTKAST_TIL_KORRIGERING;
    }).sort(sorterEtterOpprettetDato);
    const sendteSoknader = sykepengesoknader.filter((soknad) => {
        return soknad.status === SENDT || soknad.status === TIL_SENDING || soknad.status === UTGAATT || soknad.status === AVBRUTT;
    }).sort(sorterEtterPerioder);
    const kommendeSoknader = sykepengesoknader.filter((soknad) => {
        return soknad.status === FREMTIDIG;
    }).sort(sorterEtterPerioder).reverse();

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
    fnr: PropTypes.string,
};

export default Soknader;
