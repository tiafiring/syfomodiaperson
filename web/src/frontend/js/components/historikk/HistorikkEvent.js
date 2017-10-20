import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from 'digisyfo-npm';
import OppfoelgingsdialogIkon from '../../ikoner/OppfoelgingsdialogIkon';
import MoteIkon from '../../ikoner/MoteIkon';

const hentIkon = (event) => {
    if (event.kilde === 'MOTER') {
        return <MoteIkon />;
    } else if (event.kilde === 'OPPFOELGINGSDIALOG') {
        return <OppfoelgingsdialogIkon />;
    }
    return null;
};

const HistorikkEvent = ({ event }) => {
    return (<div>
        <p>
            { toDatePrettyPrint(event.tidspunkt) }
        </p>
        <div className="historikkinfo">
            <div className="historikkikon">
                { hentIkon(event) }
            </div>
            { event.tekst }
        </div>
    </div>);
};

HistorikkEvent.propTypes = {
    event: PropTypes.object,
};

export default HistorikkEvent;
