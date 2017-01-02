import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe } from 'digisyfo-npm';

const AvbrytMote = ({ deltaker, epostinnhold, onSubmit, avbrytHref, avbryter, avbrytFeilet }) => {
    return (<div className="epostinnhold">
        <h2 className="typo-innholdstittel">Avbryt møteresultat</h2>

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
