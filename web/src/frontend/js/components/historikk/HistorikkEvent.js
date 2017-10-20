import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from 'digisyfo-npm';
import OppfoelgingsdialogIkon from '../../ikoner/OppfoelgingsdialogIkon';

const HistorikkEvent = ({ event }) => {
    return (<div>
        <p>
            { toDatePrettyPrint(event.tidspunkt) }
        </p>
        <div className="historikkinfo">
            <div className="historikkikon">
                <OppfoelgingsdialogIkon />
            </div>
            { event.tekst }
        </div>
    </div>);
};

HistorikkEvent.propTypes = {
    event: PropTypes.object,
};

export default HistorikkEvent;
