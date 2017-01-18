import React, {PropTypes} from "react";
import {Link} from "react-router";
import {Varselstripe} from "digisyfo-npm";

const AvbrytMote = ({ deltaker, sykmeldtDeltaker, onSubmit, avbrytHref, avbryter, avbrytFeilet }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">Avbryt møteresultat</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til arbeidsgiver</h3>
            <p>{deltaker.navn}</p>
        </div>


        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til sykmeldt</h3>
            <p>{sykmeldtDeltaker.navn}</p>
        </div>

        <div className="epostinnhold_infoboks">
            <p>*Partene blir informert at møteforespørselen blir avbrutt på e-post, sms og på nav.no</p>
        </div>

        <div aria-live="polite" role="alert">
            { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>Beklager, det oppstod en feil. Prøv igjen litt senere.</p></Varselstripe></div>}
        </div>

        <div className="knapperad">
            <button disabled={avbryter} className="knapp blokk--s" onClick={onSubmit}>Send</button>
            <p><Link to={avbrytHref}>Avbryt</Link></p>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    deltaker: PropTypes.object,
    epostinnhold: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export default AvbrytMote;
