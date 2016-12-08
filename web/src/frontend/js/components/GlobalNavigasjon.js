import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

const naermesteLederMenypunkt = {
    navn: 'Nærmeste leder',
    sti: 'naermeste-leder',
};

const motemodulMenypunkt = {
    navn: 'Møteplanlegger',
    sti: 'mote',
};

const tidslinjeMenypunkt = {
    navn: 'Tidslinjen',
    sti: 'tidslinjen',
};

class GlobalNavigasjon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: -1,
        };
    }

    setFocus(fokusId) {
        const ref = `js-${fokusId}`;
        this.refs[ref].focus();
    }

    handleKeyup(e) {
        const DOWN = 40;
        const UP = 38;
        switch (e.keyCode) {
            case DOWN: {
                let nyFokus = this.state.focus + 1;
                if (nyFokus === this.menypunkter.length) {
                    nyFokus = 0;
                }
                this.setState({
                    focus: nyFokus,
                });
                this.setFocus(nyFokus);
                return;
            }
            case UP: {
                let nyFokus = this.state.focus - 1;
                if (nyFokus === -1) {
                    nyFokus = this.menypunkter.length - 1;
                }
                this.setState({
                    focus: nyFokus,
                });
                this.setFocus(nyFokus);
                return;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const { fnr, harTilgangMotemodul } = this.props;
        this.menypunkter = [naermesteLederMenypunkt, tidslinjeMenypunkt];
        if (harTilgangMotemodul) {
            this.menypunkter.push(motemodulMenypunkt);
        }

        return (<ul className="navigasjon" tabIndex="0" onKeyUp={(e) => {
            this.handleKeyup(e);
        }}>
        {
            this.menypunkter.map(({ navn, sti }, index) => {
                return (<li key={index} className="navigasjon__element">
                    <a tabIndex="-1" ref={`js-${index}`} className="navigasjonspanel" onClick={(e) => {
                        e.preventDefault();
                        browserHistory.push(`/sykefravaer/${fnr}/${sti}`);
                    }} href={`/sykefravaer/${fnr}/${sti}`}>{navn}</a>
                </li>);
            })
        }
        </ul>);
    }
}

GlobalNavigasjon.propTypes = {
    fnr: PropTypes.string,
    harTilgangMotemodul: PropTypes.bool,
};

export default GlobalNavigasjon;
