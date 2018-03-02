import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Artikkel = ({ tittel, innhold, fnr }) => {
    return (<article className="panel">
        <header className="artikkel__header">
            <div className="artikkel__meta">
                <Link to={`/sykefravaer/${fnr}/tidslinjen`} className="tilbakelenke">Tilbake</Link>
            </div>
            <h1 className="artikkel__tittel">{tittel}</h1>
        </header>
        <div
            className="artikkel__innhold js-roller blokk"
            dangerouslySetInnerHTML={{ __html: innhold }} />
        <footer className="artikkel__footer">
            <Link to={`/sykefravaer/${fnr}/tidslinjen`} className="tilbakelenke">Tilbake</Link>
        </footer>
    </article>);
};

Artikkel.propTypes = {
    tittel: PropTypes.string,
    innhold: PropTypes.string,
    fnr: PropTypes.string,
};

export default Artikkel;
