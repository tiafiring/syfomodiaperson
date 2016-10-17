import React, { PropTypes } from 'react';

const ContextOppdatering = () => {

    return <div>

        <div className="panel" id="contextholderoppdatering" style={{display: 'none' }} dangerouslySetInnerHTML={{ __html: innhold }}>

            <p>Hei! Nå oppdaterte vi brukeren her automatisk fordi du søkte på en ny bruker i Modia. Hva synes du om denne funksjonaliteten?
                Gi oss gjerne tilbakemelding om hvordan dette fungerer her: <a href="mailto:digisyfo@nav.no?Subject=Veileder%20Tilbakemelding" target="_top">Tilbakemelding</a></p>
        </div>



        <div className="panel" id="contextholderfeil" style={{display: 'none' }}>
            <p>Hei! Nå skjedde det en feil her. Da vil ikke brukeren du søker opp i Modia automatisk oppdateres her. Skjer dette deg ofte?
                Gi oss gjerne en tilbakemelding. Inkluder gjerne hva slags nettleser og versjon du bruker: <a href="mailto:digisyfo@nav.no?Subject=Veileder%20Tilbakemelding" target="_top">Tilbakemelding</a></p>
        </div>


    </div>;
};

export default ContextOppdatering;
