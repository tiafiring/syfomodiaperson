import React from 'react';
import Infomelding from '../Infomelding';

const IngenPlaner = () => {
    return (<div>
        <div className="panel">
            <h2 style={{ margin: 0 }}>Oppfølgingsplaner</h2>
        </div>
        <div className="panel">
            <Infomelding tittel="Du har ikke mottatt noen oppfølgingsplaner" melding="For å se oppfølgingsplaner her må den sykmeldte eller nærmeste leder sende den inn fra sin side på nav.no" />
        </div>
    </div>);
};

export default IngenPlaner;
