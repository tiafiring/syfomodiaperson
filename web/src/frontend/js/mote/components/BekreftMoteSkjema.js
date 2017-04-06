import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import Epostmottakere from './Epostmottakere';
import { connect } from 'react-redux';
import { proptypes as motePropTypes } from 'moter-npm';
import Innholdsviser from './Innholdsviser';
import { mapStateToInnholdsviserProps } from './AvbrytMote';

export const InnholdsviserContainer = connect(mapStateToInnholdsviserProps)(Innholdsviser);

const BekreftMoteSkjema = (props) => {
    const { mote, ledetekster, bekrefter, bekreftFeilet, onSubmit, avbrytHref, hentEpostinnhold } = props;

    return (<div className="epostinnhold">
        <h2 className="epostinnhold__tittel">{getLedetekst('mote.bekreftmote.lightbox-overskrift', ledetekster)}</h2>
        <Epostmottakere mote={mote} ledetekster={ledetekster} />
        <InnholdsviserContainer mote={mote} hentEpostinnhold={hentEpostinnhold} ledetekster={ledetekster} />
        <div aria-live="polite" role="alert">
            { bekreftFeilet && (<div className="blokk">
                <Varselstripe type="feil">
                    <p>{getLedetekst('mote.bekreftmote.feil', ledetekster)}</p>
                </Varselstripe>
            </div>)}
        </div>
        <div className="blokk--s">
            <button
                disabled={bekrefter}
                className="knapp blokk--s knapp--enten" onClick={onSubmit}>
                {getLedetekst('mote.bekreftmote.lightbox-send-knapp', ledetekster)}
                { bekrefter && <span className="knapp__spinner" /> }
            </button>
            <Link to={avbrytHref} className="lenke">{getLedetekst('mote.bekreftmote.lightbox-avbryt-knapp', ledetekster)}</Link>
        </div>
    </div>);
};
BekreftMoteSkjema.propTypes = {
    ledetekster: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    mote: motePropTypes.mote,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    hentEpostinnhold: PropTypes.func,
};

export default BekreftMoteSkjema;
