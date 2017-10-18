import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from 'digisyfo-npm';

const HistorikkEvent = ({ event }) => {
    return (<div className="js-panel">
        <header className="inngangspanel__header">
            <small className="inngangspanel__meta js-meta">
                { toDatePrettyPrint(event.tidspunkt) }
            </small>
        </header>
        { event.tekst }
    </div>);
};

HistorikkEvent.propTypes = {
    event: PropTypes.object,
};

export default HistorikkEvent;
