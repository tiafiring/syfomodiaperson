import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BekreftMote = ({ deltaker, epostinnhold, onSubmit, avbrytHref }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">Send møteresultat</h2>

        <div className="epostinnhold__mottakere blokk">
            <h3>Sendes til arbeidsgiver</h3>
            <p>{deltaker.navn}</p>
        </div>

        <h3 className="typo-element blokk-xs">Følgende e-post blir sendt til arbeidsgiver:</h3>

        <article>
            <header className="epostinnhold__emne">
                Emne: {epostinnhold.emne}
            </header>
            <div className="epostinnhold__innhold">
                <div dangerouslySetInnerHTML={{ __html: epostinnhold.innhold }} />
            </div>
        </article>

        <div className="knapperad">
            <button className="knapp blokk-xs" onClick={onSubmit}>Send møteresultat</button>
            <p><Link to={avbrytHref}>Avbryt</Link></p>
        </div>
    </div>);
};

BekreftMote.propTypes = {
    deltaker: PropTypes.object,
    epostinnhold: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
};

export default BekreftMote;
