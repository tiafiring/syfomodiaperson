import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';

const BekreftMoteUtenSvarSkjema = (props) => {
    const { ledetekster, bekrefter, bekreftFeilet, avbrytHref, bekreftMoteUtenSvar } = props;

    return (<div className="bekreftutensvarinnhold">
        <h2 className="sidetopp__tittel">{getLedetekst('mote.bekreftmoteutensvar.lightbox-overskrift', ledetekster)}</h2>
        <div aria-live="polite" role="alert">
            { bekreftFeilet && (<div className="blokk">
                <AlertStripe
                    type="advarsel">
                    <p>{getLedetekst('mote.bekreftmote.feil', ledetekster)}</p>
                </AlertStripe>
            </div>)}
        </div>
        <div className="blokk--s">
            <KnappBase
                type="standard"
                spinner={bekrefter}
                disabled={bekrefter}
                onClick={bekreftMoteUtenSvar}>
                {getLedetekst('mote.bekreftmoteutensvar.lightbox-send-knapp', ledetekster)}
            </KnappBase>
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
