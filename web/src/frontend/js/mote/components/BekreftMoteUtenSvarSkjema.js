import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';

const BekreftMoteUtenSvarSkjema = (props) => {
    const { ledetekster, bekrefter, bekreftFeilet, avbrytHref, bekreftMoteUtenSvar } = props;

    return (<div className="bekreftutensvarinnhold">
        <h2 className="sidetopp__tittel">{getLedetekst('mote.bekreftmoteutensvar.lightbox-overskrift', ledetekster)}</h2>
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
                className="rammeknapp" onClick={bekreftMoteUtenSvar}>
                {getLedetekst('mote.bekreftmoteutensvar.lightbox-send-knapp', ledetekster)}
                { bekrefter && <span className="knapp__spinner" /> }
            </button>
            <Link to={avbrytHref} className="hjelpetekstlenke">{getLedetekst('mote.bekreftmoteutensvar.lightbox-avbryt-knapp', ledetekster)}</Link>
        </div>
    </div>);
};

BekreftMoteUtenSvarSkjema.propTypes = {
    ledetekster: PropTypes.object,
    avbrytHref: PropTypes.string,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    bekreftMoteUtenSvar: PropTypes.func,
};

export default BekreftMoteUtenSvarSkjema;
