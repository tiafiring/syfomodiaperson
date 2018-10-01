import React from 'react';
import PropTypes from 'prop-types';
import { tilLesbarDatoMedArstall } from 'digisyfo-npm';
import OppfoelgingsdialogIkon from '../../ikoner/OppfoelgingsdialogIkon';
import MoteIkon from '../../ikoner/MoteIkon';

const hentIkon = (event) => {
    if (event.kilde === 'MOTER' || event.kilde === 'MOTEBEHOV') {
        return <MoteIkon />;
    } else if (event.kilde === 'OPPFOELGINGSDIALOG') {
        return <OppfoelgingsdialogIkon />;
    }
    return null;
};

const HistorikkEvent = ({ event }) => {
    return (<li className="historikkevent">
        <p className="historikkevent__meta">
            {tilLesbarDatoMedArstall(event.tidspunkt)}
        </p>
        <div className="historikkevent__info">
            <div className="historikkevent__ikon">
                {hentIkon(event)}
            </div>
            <p className="historikkevent__tekst">{event.tekst}</p>
        </div>
    </li>);
};

HistorikkEvent.propTypes = {
    event: PropTypes.object,
};

export default HistorikkEvent;
