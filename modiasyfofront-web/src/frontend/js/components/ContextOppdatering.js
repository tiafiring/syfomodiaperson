import React, { PropTypes } from 'react';

const ContextOppdatering = () => {

    return <div>

        <div className="panel" id="contextholderoppdatering" style={{display: 'none' }}>
            <p>Hei! Nå oppdaterte vi brukeren her automatisk fordi du søkte på en ny bruker i Modia. Hva synes du om denne funksjonaliteten? Gi oss gjerne tilbakemelding om hvordan dette fungerer her: digisyfo@nav.no</p>
        </div>



        <div id="contextholderfeil" style={{display: 'none' }}>
            <p>Hei! Nå skjedde det en feil her. Da vil ikke brukeren du søker opp i Modia automatisk oppdateres her. </p>
        </div>


    </div>;
};

export default ContextOppdatering;
