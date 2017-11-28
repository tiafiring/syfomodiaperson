import React from 'react';
import Infomelding from '../Infomelding';

const IngenHistorikk = () => {
    return (<div>
        <div className="panel">
            <h2 style={{ margin: 0 }}>Logg</h2>
        </div>
        <div className="panel">
            <Infomelding tittel="Denne personen har ingen oppfølgingshistorikk" melding="Når en sykmeldt blir fulgt opp så vil oppfølgingen bli loggført her slik at du får oversikt over hva som har skjedd og hvem som har vært involvert i oppfølgingen." />
        </div>
    </div>);
};

export default IngenHistorikk;
