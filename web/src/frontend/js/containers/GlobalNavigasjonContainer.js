import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const GlobalNavigasjon = ({ fnr, harTilgangMotemodul }) => {
    const menypunkter = [naermesteLederMenypunkt];
    if (harTilgangMotemodul) {
        menypunkter.push(motemodulMenypunkt);
    }

    return (<ul className="navigasjon">
    {
        menypunkter.map(({ navn, sti }, key) => {
            return (<li key={key} className="navigasjon__element">
                <Link className="inngangspanel" activeClassName="inngangspanel--aktiv" to={`/sykefravaer/${fnr}/${sti}`}>{navn}</Link>
            </li>);
        })
    }
    </ul>);
};

GlobalNavigasjon.propTypes = {
    fnr: PropTypes.string,
    harTilgangMotemodul: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        fnr: state.navbruker.data.fnr,
        harTilgangMotemodul: state.navbruker.data.harTilgang,
    };
};

const naermesteLederMenypunkt = {
    navn: 'Nærmeste ledere',
    sti: 'naermeste-ledere',
};

const motemodulMenypunkt = {
    navn: 'Møtebooking',
    sti: 'mote',
};

const GlobalNavigasjonContainer = connect(mapStateToProps)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
