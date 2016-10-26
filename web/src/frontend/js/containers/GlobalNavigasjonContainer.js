import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const GlobalNavigasjon = ({ fnr }) => {
    const menypunkter = [{
        navn: 'Nærmeste ledere',
        sti: 'naermeste-ledere',
    }, {
        navn: 'Møteplanlegger',
        sti: 'mote',
    }];

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
};

const mapStateToProps = (state) => {
    return {
        fnr: state.navbruker.data.fnr,
    };
};

const GlobalNavigasjonContainer = connect(mapStateToProps)(GlobalNavigasjon);

export default GlobalNavigasjonContainer;
