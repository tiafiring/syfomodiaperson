import React, { PropTypes } from 'react';

const BekreftMote = ({ deltaker, epostinnhold, onSubmit }) => {
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

        <div className="knapperad knapperad-adskilt">
            <button className="knapp" onClick={onSubmit}>Send møteresultat</button>
        </div>
    </div>);
};

BekreftMote.propTypes = {
    deltaker: PropTypes.object,
    epostinnhold: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default BekreftMote;
