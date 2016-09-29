import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navigasjon = ({ fnr }) => {
    const links = [{
        sti: 'aktivitetsoversikt',
        tittel: 'Aktivitetsoversikt',
    }, {
        sti: 'sykmeldinger',
        tittel: 'Sykmeldinger',
    }, {
        sti: 'naermeste-leder',
        tittel: 'Nærmeste leder',
    }];

    return (<ul className="navigasjon">
    {
        links.map((link, index) => {
            return (<li key={index}>
                <Link className="navigasjon__link" activeClassName="navigasjon__link--aktiv" to={`/sykefravaer/${fnr}/${link.sti}`}>{link.tittel}</Link>
            </li>);
        })
    }
    </ul>);
};

Navigasjon.propTypes = {
    fnr: PropTypes.string,
};

export default Navigasjon;
