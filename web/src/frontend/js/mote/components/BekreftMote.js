import React, {PropTypes} from "react";
import {Link} from "react-router";
import {fikkMoteOpprettetVarsel, getTidFraZulu} from "../utils/index";
import {hentDag} from "../../utils/index";

const BekreftMote = ({ deltaker, sykmeldtDeltaker, onSubmit, avbrytHref, alternativ }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">Send bekreftelse på møte</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>Dato og tid</h3>
            <p>{hentDag(alternativ.tid)} {getTidFraZulu(alternativ.tid)}</p>
        </div>

        <div className="epostinnhold__mottakere blokk epostinnhold_avgrensning_bunn">
            <h3>Møtested</h3>
            <p>{alternativ.sted}</p>
        </div>

        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til arbeidsgiver</h3>
            <p>{deltaker.navn}</p>
        </div>

        { fikkMoteOpprettetVarsel(sykmeldtDeltaker) &&
        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til sykmeldt</h3>
            <p>{sykmeldtDeltaker.navn}</p>
        </div>
        }

        <div className="knapperad">
            <button className="knapp blokk--s" onClick={onSubmit}>Send møteresultat</button>
            <p><Link to={avbrytHref}>Avbryt</Link></p>
        </div>
    </div>);
};

BekreftMote.propTypes = {
    deltaker: PropTypes.object,
    sykmeldtDeltaker: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
};

export default BekreftMote;
