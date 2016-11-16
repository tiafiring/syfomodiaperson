import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const naermesteLederMenypunkt = {
    navn: 'Nærmeste ledere',
    sti: 'naermeste-ledere',
};

const motemodulMenypunkt = {
    navn: 'Møteplanlegger',
    sti: 'mote',
};

const tidslinjeMenypunkt = {
    navn: 'Tidslinjen',
    sti: 'tidslinjen',
};

const GlobalNavigasjon = ({ fnr, harTilgangMotemodul }) => {
    const menypunkter = [naermesteLederMenypunkt, tidslinjeMenypunkt];
    if (harTilgangMotemodul) {
        menypunkter.push(motemodulMenypunkt);
    }

    return (<ul className="navigasjon">
    {
        menypunkter.map(({ navn, sti }, key) => {
            return (<li key={key} className="navigasjon__element">
                <Link className="navigasjonspanel" activeClassName="navigasjonspanel--aktiv" to={`/sykefravaer/${fnr}/${sti}`}>{navn}</Link>
            </li>);
        })
    }
    </ul>);
};

GlobalNavigasjon.propTypes = {
    fnr: PropTypes.string,
    harTilgangMotemodul: PropTypes.bool,
};

export default GlobalNavigasjon;
